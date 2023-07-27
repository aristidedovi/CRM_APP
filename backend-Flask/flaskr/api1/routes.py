# routes.py
# for rendering api routes
from flaskr import db
from flaskr.models import ProductImport
from . import api1
from flask import abort, request, jsonify, current_app
from sqlalchemy import func, create_engine
import os
import csv
import pandas as pd
from os import environ, path
import psycopg2
import firebase_admin
from firebase_admin import credentials, auth
from datetime import datetime
from sqlalchemy import desc
from datetime import date





import random

# Define folder to save uploaded files to process further
UPLOAD_FOLDER = os.path.join('staticFiles', 'uploads')
 
# Define allowed files (for this example I want only csv file)
ALLOWED_EXTENSIONS = {'csv'}

def product_yuupee_price(price):
    prix_yuupee = 0
    if (price <= 5000):
        prix_yuupee = (price*50/100)+price
    elif (price > 5000 and price <= 10000):
        prix_yuupee = (price*(40/100)) + price
    elif (price > 10000 and price <= 100000):
        prix_yuupee = (price*(20/100)) + price
    elif(price > 100000 and price <= 190000):
        prix_yuupee = (price*(20/100)) + price
    elif (price > 190000 and price <= 390000):
        prix_yuupee = (price*(15/100)) + price
    elif (price >= 390000):
        prix_yuupee = (price*(10/100)) + price
    else :
        prix_yuupee = 0;

    return prix_yuupee



@api1.after_request
def after_request(response):
    '''defining extra headers'''
    # response.headers.add('Access-Control-Allow-Headers',
    #                      'Content-Type,Authorization,true')
    # response.headers.add('Access-Control-Allow-Methods',
    #                      'GET,PATCH,POST,DELETE,OPTIONS')
    # response.headers.add('Content-Type',
    #                      'application/json')
    # response.header.add('Access-Control-Allow-Private-Network',
    #                     'true')
    # response.header.add('Access-Control-Allow-Origin',
    #                     '*')
    
    response.headers["Access-Control-Allow-Origin"] = "*"
    
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With, Authorization,true"
    response.headers['Content-Type'] = 'application/json'
    #print(response.headers)

    return response

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def verify_firebase_token(func):
    def wrapper(*args, **kwargs):
        if current_app.config['TESTING'] == True:
            # Skip verification in the test environment
            return func(*args, **kwargs)
        
        id_token = request.headers.get('Authorization')
        #print(id_token)
        
        #print(current_app.config['DEBUG'])
        if id_token is None :
            return jsonify({'message': 'Firebase token missing'}), 401

        try:
            # Remove "Bearer " prefix from the token
            id_token = id_token.replace('Bearer ', '')
            decoded_token = auth.verify_id_token(id_token)
            # Perform additional validation or processing if needed

            return func(*args, **kwargs)
        except auth.InvalidIdTokenError:
            return jsonify({'message': 'Invalid Firebase token'}), 401

    wrapper.__name__ = func.__name__
    return wrapper

def if_is_testing():
    # Define your condition logic here
    # Return True if the condition is met, False otherwise
    return True

@api1.route('/generate_token', methods=['POST'])
def generate_token():
    email = request.json['email']
    password = request.json['password']

    ##print(firebase_admin.__version__)


    # user = auth.sign_in_with_email_and_password(email, password)
    # print(user)


@api1.route('/upload_data', methods=['POST'])
def post_csv_file():
    data = []
    if request.method == 'POST':
        # upload file flask
        uploaded_file = request.files['uploaded-file']
        #print(uploaded_file)

        uploaded_file.filename = datetime.now().isoformat()+uploaded_file.filename
        filepath = os.path.join(current_app.config['FILE_UPLOADS'], uploaded_file.filename)
        #uploaded_file.filename = uploaded_file.filename+datetime.now().isoformat()
        uploaded_file.save(filepath)
        file_size = os.stat(filepath).st_size

        #get old file
        old_file = ProductImport.query.order_by(desc(ProductImport.id)).first()

        # Ouvrir le premier fichier CSV et le lire dans un dictionnaire
        with open(old_file.file_url, 'r') as file1:
            csv_reader1 = csv.DictReader(file1)
            produits1 = {}
            for row in csv_reader1:
                produits1[row['AR_Design']] = row['AR_PrixVen']

        # Ouvrir le deuxième fichier CSV et le lire dans un dictionnaire
        with open(filepath, 'r') as file2:
            csv_reader2 = csv.DictReader(file2)
            produits2 = {}
            for row in csv_reader2:
                produits2[row['AR_Design']] = row['AR_PrixVen']

        # Parcourir les produits des deux fichiers et comparer les prix
        for nom_produit in produits1.keys():
            if nom_produit in produits2:
                if produits1[nom_produit] != produits2[nom_produit]:
                    print(f"Le prix du produit {nom_produit} a été mis à jour : {produits1[nom_produit]} -> {produits2[nom_produit]}")
            else:
                print(f"Le produit {nom_produit} a été supprimé du fichier 2.")

        for nom_produit in produits2.keys():
            if nom_produit not in produits1:
                print(f"Le produit {nom_produit} a été ajouté dans le fichier 2 avec le prix {produits2[nom_produit]}.")


        # Comparer les deux dictionnaires et stocker les différences dans une liste
        differences = []
        for nom_produit in produits1.keys():
            if nom_produit in produits2:
                if produits1[nom_produit] != produits2[nom_produit]:
                    difference = {"nom_produit": nom_produit, "ancien_prix": produits1[nom_produit], "nouveau_prix": produits2[nom_produit]}
                    differences.append(difference)
            else:
                difference = {"nom_produit": nom_produit, "ancien_prix": produits1[nom_produit], "nouveau_prix": None}
                differences.append(difference)

        for nom_produit in produits2.keys():
            if nom_produit not in produits1:
                difference = {"nom_produit": nom_produit, "ancien_prix": None, "nouveau_prix": produits2[nom_produit]}
                differences.append(difference)

        # Écrire les différences dans un nouveau fichier CSV
        with open(os.path.join(current_app.config['FILE_UPLOADS'])+'/differences.csv', 'w', newline='') as csvfile:
            fieldnames = ['nom_produit','ancien_prix', 'nouveau_prix']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for difference in differences:
                writer.writerow(difference)



        product_import = ProductImport(datetime.now(), uploaded_file.filename, file_size, filepath)
        product_import.insert()

        with open(filepath) as file:
                csv_file = csv.reader(file)
                for row in csv_file:
                    data.append(row)

        #engine=create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/yuupee_db")
        #engine=create_engine(environ.get('DEV_DATABASE_URI'))
        engine = db.get_engine()

        df = pd.read_csv(filepath)
        df2 = pd.read_csv(os.path.join(current_app.config['FILE_UPLOADS'])+'/differences.csv')
        try:
            df.to_sql('products', con=engine, if_exists='replace')
            df2.to_sql('update_list', con=engine, if_exists='replace')

        except Exception as e:
            abort(422)
        finally:
            engine.dispose()



        #print(data)
        return jsonify({
            'success': True,
            'message': 'Import data success'
        })
        # Extracting uploaded data file name
        #data_filename = secure_filename(uploaded_df.filename)

        # flask upload file to database (defined uploaded folder in static path)
        #uploaded_df.save(os.path.join(app.config['UPLOAD_FOLDER'], data_filename))

        # Storing uploaded file path in flask session
        #session['uploaded_data_file_path'] = os.path.join(app.config['UPLOAD_FOLDER'], data_filename)
        
        # Retrieving uploaded file path from session
        #data_file_path = session.get('uploaded_data_file_path', None)

        # read csv file in python flask (reading uploaded csv file from uploaded server location)
        #uploaded_df = pd.read_csv(data_file_path)

@api1.route('/products', methods=['GET'])
@verify_firebase_token
def get_products():
    #print(request.headers.get('Authorization'))
    # Establish a connection to the PostgreSQL database

    engine = db.get_engine()

    # Example: Creating and executing an SQL command
    sql_command = '''
        SELECT * FROM products;
    '''

    product_histories = ProductImport.query.order_by(desc(ProductImport.id)).first()
    #print(product_histories.date_import)

    with engine.connect() as connection:
        result = connection.execute(sql_command)
    
    products = []
    # Process the result set
    for row in result:
        # Access row values using column names or indexes
        product = {
            'id': row[0],
            'AR_Ref': row[1],
            'FA_CodeFamille': row[2],
            'AR_Design': row[3],
            'Colonne1': row[4],
            'AR_PrixVen': row[5],
            'YU_PRIX': product_yuupee_price(int(row[5]) if row[5] is not None else 0),
            'StockTOTAL': row[6],
            # Add more attributes as needed
        }
        products.append(product)

    return jsonify({
        'success': True,
        'products': products,
        'products_size': len(products),
        'last_date_import': product_histories.date_import.strftime("%m/%d/%Y, %H:%M:%S")
    })


@api1.route('/product_histories', methods=['GET'])
@verify_firebase_token
def get_product_histories():

    # paginate questions, and store the current page questions in a list
    page = request.args.get('page', 1, type=int)

    '''get all categories'''
    product_histories = ProductImport.query.order_by(desc(ProductImport.id)).paginate(
        page, current_app.config['QUESTIONS_PER_PAGE'], True)
    #product_history_dict = {prodcut_history.id: prodcut_history.file_name for prodcut_history in product_histories}
    product_history_dict  = [product_history.format() for product_history in product_histories.items]
    if len(product_history_dict) == 0:  # no categories available, return a 404 error
        abort(404)
    return jsonify({
        'success': True,
        'product_history': product_history_dict,
        'has_next': product_histories.has_next,
        'pages' : product_histories.pages,
        'current_page': product_histories.page,
    })

@api1.route('/product_update_list', methods=['GET'])
@verify_firebase_token
def get_product_update_list():

    engine = db.get_engine()

    # Example: Creating and executing an SQL command
    sql_command = '''
        SELECT * FROM update_list;
    '''

    with engine.connect() as connection:
        result = connection.execute(sql_command)
    
    product_histories = ProductImport.query.order_by(desc(ProductImport.id)).first()

    #print(result)
    products = []
    for row in result:
        # Access row values using column names or indexes
        #print(type(row[2]))
        product = {
            'id': row[0],
            'nom_produit': row[1],
            'ancien_prix': product_yuupee_price(int(row[2]) if row[2] is not None else 0), 
            'nouveau_prix': product_yuupee_price(int(row[3]) if row[3] is not None else 0)
            # 'Colonne1': row[4],
            # 'AR_PrixVen': row[5],
            # 'YU_PRIX': product_yuupee_price(row[5]),
            # 'StockTOTAL': row[6],
            # Add more attributes as needed
        }
        products.append(product)

    return jsonify({
            'success': True,
            'products': products,
            'products_size': len(products),
            'last_date_import': product_histories.date_import.strftime("%m/%d/%Y, %H:%M:%S")

        })

   


   


# @api1.route('/categories')
# def get_categories():
#     '''get all categories'''
#     categories = Category.query.all()
#     category_dict = {category.id: category.type for category in categories}
#     if len(category_dict) == 0:  # no categories available, return a 404 error
#         abort(404)
#     return jsonify({
#         'success': True,
#         'categories': category_dict
#     })


# @api1.route('/questions')
# def get_questions():
#     '''gett all questions'''
#     # paginate questions, and store the current page questions in a list
#     page = request.args.get('page', 1, type=int)
#     selection = Question.query.order_by(Question.id).paginate(
#         page, current_app.config['QUESTIONS_PER_PAGE'], True)
#     total_questions = selection.total
#     if total_questions == 0:
#         # no questions are found, abort with a 404 error.
#         abort(404)
#     current_questions = [question.format() for question in selection.items]
#     # load all categories from db
#     categories = Category.query.all()
#     category_dict = {category.id: category.type for category in categories}
#     return jsonify({
#         'success': True,
#         'questions': current_questions,
#         'total_questions': total_questions,
#         'categories': category_dict
#     })


# @api1.route('/questions/search', methods=['POST'])
# def search_questions():
#     '''search for a question in the database'''
#     body = request.get_json()
#     if not body:
#         # posting an envalid json should return a 400 error.
#         abort(400)
#     if body.get('searchTerm'):
#         # searchTerm is available in the request body
#         search_term = body.get('searchTerm')
#         # query the database for paginated results, store the current page results in a list
#         page = request.args.get('page', 1, type=int)
#         selection = Question.query.filter(
#             Question.question.ilike(f'%{search_term}%')).paginate(page, current_app.config['QUESTIONS_PER_PAGE'], True)
#         total_questions = selection.total
#         if total_questions == 0:
#             # no questions are available in the search results
#             abort(404)
#         current_questions = [question.format() for question in selection.items]
#         return jsonify({
#             'success': True,
#             'questions': current_questions,
#             'total_questions': total_questions
#         })
#     else:
#         # if searchTerm was not posted, return a 400 error
#         abort(400)


# @api1.route('/questions', methods=['POST'])
# def post_new_question():
#     body = request.get_json()
#     if not body:
#         # posting an envalid json should return a 400 error.
#         abort(400)
#     if (body.get('question') and body.get('answer') and body.get('difficulty') and body.get('category')):
#         # posted a new question
#         new_question = body.get('question')
#         new_answer = body.get('answer')
#         new_category = body.get('category')
#         new_difficulty = body.get('difficulty')
#         # insure that difficulty is only from 1 to 5
#         if not 1 <= int(new_difficulty) < 6:
#             abort(400)
#         try:
#             # insert the new question to the database
#             question = Question(new_question, new_answer,
#                                 new_category, new_difficulty)
#             question.insert()
#             # query the database for all questions
#             page = request.args.get('page', 1, type=int)
#             selection = Question.query.order_by(Question.id).paginate(
#                 page, current_app.config['QUESTIONS_PER_PAGE'], True)
#             total_questions = selection.total
#             if total_questions == 0:
#                 # no questions were found, return a 404 error.
#                 abort(404)
#             current_questions = [question.format()
#                                  for question in selection.items]
#             return jsonify({
#                 'success': True,
#                 'id': question.id,
#                 'question': question.question,
#                 'questions': current_questions,
#                 'total_questions': total_questions
#             })
#         except:
#             # creating the question failed, rollback and close the connection
#             db.session.rollback()
#             abort(422)
#     else:
#         # anything else posted in the body should return a 400 error
#         abort(400)


# @api1.route('/questions/<question_id>', methods=['DELETE'])
# def delete_question(question_id):
#     '''Delete a question from the database'''
#     try:
#         question = Question.query.filter(
#             Question.id == question_id).one_or_none()
#         # return 404 if question is not available
#         if question is None:
#             abort(404)
#         question.delete()
#         return jsonify({
#             'success': True,
#             'deleted': question_id
#         })
#     except:
#         # rollback and close the connection
#         db.session.rollback()
#         abort(422)


# @api1.route('/categories/<category_id>/questions')
# def get_questions_by_category(category_id):
#     '''Get all questions for a specific category'''
#     category = Category.query.filter(Category.id == category_id).one_or_none()
#     # abort with a 404 error if category is unavailable
#     if category is None:
#         abort(404)
#     # paginate questions, and store the current page questions in a list
#     page = request.args.get('page', 1, type=int)
#     selection = Question.query.filter(
#         Question.category == category.id).order_by(Question.id).paginate(page, current_app.config['QUESTIONS_PER_PAGE'], True)
#     total_questions = selection.total
#     if total_questions == 0:
#         # if there are no questions for this category, return a 404 error
#         abort(404)
#     total_questions = selection.total
#     current_questions = [question.format() for question in selection.items]
#     return jsonify({
#         'success': True,
#         'questions': current_questions,
#         'total_questions': total_questions,
#         'current_category': category.type
#     })


# @api1.route('/quizzes', methods=['POST'])
# def play_quiz():
#     '''play quiz game'''
#     # load the request body
#     body = request.get_json()
#     if not body:
#         # posting an envalid json should return a 400 error.
#         abort(400)
#     if (body.get('previous_questions') is None or body.get('quiz_category') is None):
#         # if previous_questions or quiz_category are missing, return a 400 error
#         abort(400)
#     previous_questions = body.get('previous_questions')
#     if type(previous_questions) != list:
#         # previous_questions should be a list, otherwise return a 400 error
#         abort(400)
#     category = body.get('quiz_category')
#     # just incase, convert category id to integer
#     category_id = int(category['id'])
#     # insure that there are questions to be played.
#     if category_id == 0:
#         # if category id is 0, query the database for a random object of all questions
#         selection = Question.query.order_by(func.random())
#     else:
#         # load a random object of questions from the specified category
#         selection = Question.query.filter(
#             Question.category == category_id).order_by(func.random())
#     if not selection.all():
#         # No questions available, abort with a 404 error
#         abort(404)
#     else:
#         # load a random question from our previous query, which is not in the previous_questions list.
#         question = selection.filter(Question.id.notin_(
#             previous_questions)).first()
#     if question is None:
#         # all questions were played, returning a success message without a question signifies the end of the game
#         return jsonify({
#             'success': True
#         })
#     # Found a question that wasn't played before, let's return it to the user
#     return jsonify({
#         'success': True,
#         'question': question.format()
#     })

# error handlers


@api1.errorhandler(400)
def bad_request(error):
    return jsonify({
        'success': False,
        'error': 400,
        'message': 'bad request'
    }), 400


@api1.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 404,
        'message': 'resource not found'
    }), 404


@api1.errorhandler(405)
def not_allowed(error):
    return jsonify({
        'success': False,
        'error': 405,
        'message': 'method not allowed'
    }), 405


@api1.errorhandler(422)
def unprocessable(error):
    return jsonify({
        'success': False,
        'error': 422,
        'message': 'unprocessable'
    }), 422


@api1.errorhandler(500)
def server_error(error):
    return jsonify({
        'success': False,
        'error': 500,
        'message': 'internal error'
    }), 500
