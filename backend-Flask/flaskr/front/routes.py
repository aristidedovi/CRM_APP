from flaskr import db, cache
from flaskr.models import ProductImport
from . import front
from flask import abort, request, jsonify, current_app, render_template
from sqlalchemy import desc
from datetime import datetime


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


@front.route('/')
def home():
        #print(request.headers.get('Authorization'))
    # Establish a connection to the PostgreSQL database

    engine = db.get_engine()

    # Example: Creating and executing an SQL command
    sql_command = '''
        SELECT * FROM products;
    '''

    product_histories = ProductImport.query.order_by(desc(ProductImport.id)).first()
    #print(product_histories.date_import)

    # Créer un objet de date à partir des valeurs
    date_donnee = product_histories.date_import

    # Date actuelle
    date_actuelle = datetime.now()

    # Calculer la différence entre les deux dates
    import_day_difference = date_actuelle - date_donnee

    #print(difference)

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


    return render_template('index.html')


    # return jsonify({
    #     'success': True,
    #     'products': products,
    #     'products_size': len(products),
    #     'last_date_import': import_day_difference.days
    # })

@front.route('/tables-data.html')
def datatable():
    return render_template('tables-data.html')
