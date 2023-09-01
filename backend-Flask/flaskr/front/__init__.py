# API Blueprint
from flask import Blueprint
from flask_cors import CORS

# initializing the blueprint
front = Blueprint('front', __name__)
CORS(front, resources={r'/*': {'origins': '*'}})
# importing routes
from . import routes
