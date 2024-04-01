import jwt
from sendgrid import SendGridAPIClient
from yaml import Loader, load

config = load(open("app/config/application.yaml"), Loader=Loader)
send_grid_client = SendGridAPIClient(config.get("mailer").get("api_key"))


def generate_token(payload):
    return jwt.encode(payload=payload, key=config.get("jwt").get("password")).decode()


def get_payload_from_token(token):
    return jwt.decode(jwt=token, key=config.get("jwt").get("password"))
