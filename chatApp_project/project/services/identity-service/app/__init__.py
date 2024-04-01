from firebase_admin import credentials, initialize_app
from flask import Flask
import os
from app.controllers.user_view import UserController
from app.controllers.email_view import EmailController

app = Flask(__name__)
cred = credentials.Certificate("secret.json")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "secret.json"
initialize_app(cred)


@app.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Origin"] = "*"
    header["Access-Control-Allow-Headers"] = "*"
    return response


app.register_blueprint(UserController.user)
app.register_blueprint(EmailController.email)
