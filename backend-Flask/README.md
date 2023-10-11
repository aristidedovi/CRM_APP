<!-- omit in toc -->
# Full Stack Trivia API Backend
<!-- omit in toc -->
## Table of Contents
- [1. Getting Started](#1-getting-started)
  - [1.1. Installing Dependencies](#11-installing-dependencies)
    - [1.1.1. Python 3.8](#111-python-38)
    - [1.1.2. Virtual Environment](#112-virtual-environment)
    - [1.1.3. PIP Dependencies](#113-pip-dependencies)
    - [1.1.4. Project Key Dependencies](#114-project-key-dependencies)
- [2. setting up](#2-setting-up)
  - [2.1. setting up the environment variables](#21-setting-up-the-environment-variables)
  - [2.2. Database Setup](#22-database-setup)
- [3. Running the server](#3-running-the-server)
- [4. API Reference](#4-api-reference)
  - [4.1. General](#41-general)
  - [4.2. error Handlers](#42-error-handlers)
  - [4.3. Endpoints](#43-endpoints)
    - [4.3.1. GET `/upload_data`](#431-get-upload_data)
    - [4.3.2. GET `/product_histories`](#432-get-product_histories)
    - [4.3.3. GET `/products`](#433-get-products)
    - [4.3.4. GET `/product_update_list`](#434-get-product_update_list)
- [5. Testing](#5-testing)

## 1. Getting Started

### 1.1. Installing Dependencies


#### 1.1.1. Python 3.8

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)


#### 1.1.2. Virtual Environment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized. Instructions for setting up a virtual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)
also, checkout [pipenv](https://pypi.org/project/pipenv/), as it's a great package to manage virtual environments.


#### 1.1.3. PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by navigating to the `/backend` directory and running:

```
bash
pip install -r requirements.txt
```
or
```
bash
pipenv install -r requirements.txt
```

This will install all the required packages we selected within the `requirements.txt` file.


#### 1.1.4. Project Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server. 

## 2. setting up

Follow these setup instructions to get the project up and running

### 2.1. setting up the environment variables
Before running the project, you should set some environment variables, preferably in your ```.env``` file.
Below are the environment variables for the project. You can put them in a `.env` file in the root of your virtual environment, or set the variables in the terminal as follows:
```
bash
export FLASK_CONFIG=development
```

Setting Up Your Firebase Application
We need to do four things so that we can create users, sign them in, and validate them within our API:

- Add a web application - Just click on the </> button in the screen above and add a name for your project and continue through its questions
- Save the web application script configuration to a JSON file. To find it go to Project Overview -> General and scroll to the bottom


- `FLASK_CONFIG`: Specifies a configuration class for the app. possible choices are development, testing, or production. If not set, the app will run in the development environment by default.  
E.G: `FLASK_CONFIG = 'development'`
    - `development`: Start the app in the development environment. `FLASK_ENV` will be set to `development`. which detects file changes and restarts the server automatically.
    - `testing`: Same as development, but with `testing` set to `True`. This helps in automated testing.
    - `production`: Start the app in the production environment, with `FLASK_ENV` set to `production`, and `debug` and `testing` set to `False`.
- `SECRET_KEY`: Set your secret_key which is your data's encryption key. This key should be random. Ideally, you shouldn't even know what it is.  
E.g.: `SECRET_KEY = 'asogfkbir159hjrigjsq109487glrk54b2j5a'  
If not set, `SECRET_KEY` will fall back to the string `HackMePleaseLol`.
- `PROD_DATABASE_URI`, `DEV_DATABASE_URI`, and `TEST_DATABASE_URI`: Set the database uri for SQLAlchemy for the different configuration classes  
```
# Production DB URI
PROD_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/crm'
# development DB URI 
DEV_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/crm_dev'
# testing DB URI
TEST_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/crm_test'
```

### 2.2. Database Setup
With Postgres running and our crm_dev database created.

notice that I've used the `crm_dev` database, as I want to run the app in the development environment. For more information, checkout the [PostgreSQL Docs](https://www.postgresql.org/docs/9.1/backup-dump.html)

## 3. Running the server

From within the `backend-flask` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```
bash
python wsgi.py
```

## 4. API Reference

### 4.1. General
- Base URL: this app is hosted locally under the port 5000. The API base URL is `http://localhost:5000/api/v1`
- Authentication: this app doesn't require any authentication or API tokens.
- You must set the header: `Content-Type: application/json` with every request.

### 4.2. error Handlers

if any errors accured, the API will return a json object in the following format:

```
{
    "success": False,
    "error": 404,
    "message": "resource not found"
}
```

The following errors will be reported:

- 400: `bad request`
- 404: `resource not found`
- 405: `method not allowed`
- 422: `unprocessible`

### 4.3. Endpoints

#### 4.3.1. GET `/upload_data`
- Loading the csv file of the products with a header>. AR_Ref,FA_CodeFamille,AR_Design,Colonne1, AR_PrixVen, Stock TOTAL
- Request body type : file `uploaded-file`
- Returns an objet with 2 key
  - bol `success`: True
  - str `message`: 'Import data success'

#### 4.3.2. GET `/product_histories`
- Fetches a upload historique of paginated product csv file, as well as a list of csv file uploaded dictionaries, in which the keys are the csv name, csv date uploades, size, url.
- Request Arguments:
    - optional URL queries:
        - `page`: an optional integer for a page number, which is used to fetch 3 questions for the corresponding page.
        - default: `1`
- Returns: An object with 5 keys:
    - `csv history`: a list that contains paginated csv file objects, that coorespond to the `page` query
        - bol `success`: True,
        - dic `product_history`: product_history_dict,
        - int `has_next`: product_histories.has_next,
        - int `pages` : product_histories.pages,
        - int `current_page`: product_histories.page,

#### 4.3.3. GET `/products`
- Fetches an array of all products.
- Returns: An object with 4 keys
  - bol `success`: True,
  - array `products`: products
  - int `products_size`: len(products)
  - int `last_date_import`: import_day_difference.days

#### 4.3.4. GET `/product_update_list`
- Fetches an array of all products update.
- Returns: An object with 4 keys
  - bol `success`: True,
  - array `products`: products
  - int `products_size`: len(products)
  - int `last_date_import`: import_day_difference.days


## 5. Testing

The app uses `unittest` for testing all functionalities. Create a testing database and store the URI in the `TEST_DATABASE_URI` environment.
To run the tests, run
```
bash
# if exists, drop the testing database and create it again
dropdb crm_test
createdb crm_test

# finally, from the `backend` directory, run
python test_flaskr.py
```

