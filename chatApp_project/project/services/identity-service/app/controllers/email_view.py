from flask import Blueprint
from app.services.email_service import EmailService

email_service = EmailService()


class EmailController:
    email = Blueprint("email", __name__, url_prefix="/email")

    @staticmethod
    @email.route("/verified/<email>")
    def email_verified(email):
        return email_service.verified(email)

    @staticmethod
    @email.route("/exists/<email>")
    def email_exists(email):
        """Returns True iff no other user has given email address.
        :return: boolean: user-exists
        """
        return email_service.exists(email)

    @staticmethod
    @email.route("/verification/<email>")
    def email_verification(email):
        return email_service.verification(email)

    @staticmethod
    @email.route("/password-reset/<email>")
    def password_reset(email):
        return email_service.password_reset(email)
