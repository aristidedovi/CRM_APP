"""Flask configuration file"""
from os import environ, path
import os
from dotenv import load_dotenv
basedir = path.abspath(path.dirname(__file__))
# load environment variables file
load_dotenv(path.join(basedir, '.env'))


class Config:
    """Base config"""
    SECRET_KEY = environ.get('SECRET_KEY') or 'HackMePleaseLol'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    QUESTIONS_PER_PAGE = 3
    FILE_UPLOADS = "./scv_file"
    CACHE_TYPE = 'redis'
    



class ProdConfig(Config):
    """ production config"""
    ENV = 'production'
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URI')
    FILE_UPLOADS = "./scv_file_prod"
    CACHE_REDIS_URL = os.environ.get('REDIS_URI')
 
class DevConfig(Config):
    """development config"""
    ENV = 'development'
    DEBUG = True
    #SQLALCHEMY_DATABASE_URI = environ.get('DEV_DATABASE_URI')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI')
    FILE_UPLOADS = "./scv_file"
    CACHE_REDIS_URL = 'redis://localhost:6379/0'

class TestConfig(DevConfig):
    """testing config"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URI')
    FILE_UPLOADS = "./scv_file_test"
    CACHE_REDIS_URL = 'redis://localhost:6379/1'
