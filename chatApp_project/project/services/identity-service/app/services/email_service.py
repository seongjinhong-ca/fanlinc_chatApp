from firebase_admin import auth
from firebase_admin.auth import UserRecord, UserNotFoundError
from flask import jsonify
from sendgrid import Mail

from app.templates import email as email_template
from app.utils.util import send_grid_client


class EmailService:
    @staticmethod
    def verified(email):
        try:
            user: UserRecord = auth.get_user_by_email(email=email)
            return jsonify({"emailVerified": user.email_verified}), 200
        except UserNotFoundError:
            return jsonify(f"User with email {email} does not exists"), 404

    @staticmethod
    def exists(email):
        try:
            auth.get_user_by_email(email=email)
            return jsonify({"userExists": True})
        except UserNotFoundError:
            return jsonify({"userExists": False})

    @staticmethod
    def verification(email):
        try:
            user: UserRecord = auth.get_user_by_email(email=email)
            if user.email_verified:
                return jsonify(f"{email} is already verified"), 200
            message = Mail(
                from_email="no-reply@fanlinc.com",
                to_emails=email,
                subject="Email Verification for Fanlinc Account",
                plain_text_content=email_template.verification_email_body.format(
                    username=user.display_name,
                    verification_link=auth.generate_email_verification_link(email),
                ),
            )
            response = send_grid_client.send(message)
            if response.status_code not in [200, 201, 202]:
                return jsonify(f"Failed to send email"), 500
            else:
                return jsonify(f"Email verification link sent for {email}"), 200
        except UserNotFoundError:
            return jsonify(f"User with email {email} does not exists"), 404
        except Exception as e:
            return jsonify(f"Error occurred {str(e)}"), 500

    @staticmethod
    def password_reset(email):
        try:
            auth.get_user_by_email(email=email)
            message = Mail(
                from_email="no-reply@fanlinc.com",
                to_emails=email,
                subject="Password Reset for Fanlinc Account",
                plain_text_content=email_template.password_reset.format(
                    email=email,
                    password_reset_link=auth.generate_password_reset_link(email),
                ),
            )
            response = send_grid_client.send(message)
            if response.status_code not in [200, 201, 202]:
                return jsonify(f"Failed to send email"), 500
            else:
                return jsonify(f"Password Reset link sent for {email}"), 200
        except UserNotFoundError:
            return jsonify(f"User with email {email} does not exists"), 404
        except Exception as e:
            return jsonify(f"Error occurred {str(e)}"), 500
