from . import db

'''
Question

'''

class ProductImport(db.Model):
    __tablename__ = 'product_import_history'

    id = db.Column(db.Integer, primary_key=True)
    date_import = db.Column(db.DateTime)
    file_name = db.Column(db.String)
    file_size = db.Column(db.String)
    file_url = db.Column(db.String)

    def __init__(self, date_import, file_name, file_size, file_url):
        self.date_import = date_import
        self.file_name = file_name
        self.file_size = file_size
        self.file_url = file_url

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'date_import': self.date_import,
            'file_name': self.file_name,
            'file_size': self.file_size,
            'file_url': self.file_url
        }


# class Question(db.Model):
#     __tablename__ = 'questions'

#     id = db.Column(db.Integer, primary_key=True)
#     question = db.Column(db.String)
#     answer = db.Column(db.String)
#     category = db.Column(db.String)
#     difficulty = db.Column(db.Integer)

#     def __init__(self, question, answer, category, difficulty):
#         self.question = question
#         self.answer = answer
#         self.category = category
#         self.difficulty = difficulty

#     def insert(self):
#         db.session.add(self)
#         db.session.commit()

#     def update(self):
#         db.session.commit()

#     def delete(self):
#         db.session.delete(self)
#         db.session.commit()

#     def format(self):
#         return {
#             'id': self.id,
#             'question': self.question,
#             'answer': self.answer,
#             'category': self.category,
#             'difficulty': self.difficulty
#         }


# '''
# Category

# '''


# class Category(db.Model):
#     __tablename__ = 'categories'

#     id = db.Column(db.Integer, primary_key=True)
#     type = db.Column(db.String)

#     def __init__(self, type):
#         self.type = type

#     def format(self):
#         return {
#             'id': self.id,
#             'type': self.type
#         }
