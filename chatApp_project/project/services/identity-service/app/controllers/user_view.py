from flask import Blueprint, request, jsonify

from app.services.user_service import UserService

user_service = UserService()


class UserController:
    user = Blueprint("user", __name__, url_prefix="/user")

    @staticmethod
    @user.route("/create", methods=["POST"])
    def create():
        """Creates new user and adds to firebase database.
        JSON body should contain email and password keys.
        :return: uid of the user
        """
        user_info = request.get_json()
        for key in ["email", "password", "username"]:
            if key not in user_info:
                return jsonify(f"{key} missing in body"), 400
        return user_service.create_user(user_info)

    @staticmethod
    @user.route("/identity/<uid>")
    def user_identity(uid):
        """Returns user information of the user with uid.
        :return: email address
        """
        return user_service.identity(uid)

    @staticmethod
    @user.route("/uid/<jwt>")
    def get_uid(jwt):
        return user_service.jwt_to_uid(jwt)

    @staticmethod
    @user.route("/sign-in", methods=["POST"])
    def sign_in():
        user_info = request.get_json()
        for key in ["email", "password"]:
            if key not in user_info:
                return jsonify(f"{key} missing in body"), 400
        return user_service.sign_in_user(user_info)

    @staticmethod
    @user.route("/add/profile-picture/<uid>", methods=["POST"])
    def set_profile_picture(uid):
        return user_service.set_profile_picture(
            files=request.files, uid=uid
        )

    @staticmethod
    @user.route("/get/profile-picture/<email>")
    def get_profile_picture(email):
        return user_service.get_profile_picture(email_address=email)

    @staticmethod
    @user.route("/set/username", methods=["POST"])
    def set_username():
        body = request.get_json()
        for field in ["uid", "username"]:
            if field not in body:
                return jsonify(f"Field {field} missing in body"), 400
        return user_service.set_username(body)

    @staticmethod
    @user.route("/get/username/<email>")
    def get_username(email):
        return user_service.get_username(email)

    @staticmethod
    @user.route("/set/name", methods=["POST"])
    def set_name():
        body = request.get_json()
        for field in ["name", "uid"]:
            if field not in body:
                return jsonify(f"Field {field} missing in body"), 400
        return user_service.set_name(body)

    @staticmethod
    @user.route("/get/name/<email>")
    def get_name(email):
        return user_service.get_name(email)

    @staticmethod
    @user.route("/get/uid/<email>")
    def get_uid_from_email(email):
        return user_service.get_uid(email)

    @staticmethod
    @user.route("/image/upload/<email>", methods=["POST"])
    def image_upload(email):
        return user_service.image_upload(request.files, email)

    @staticmethod
    @user.route("/set/isPro", methods=["PUT"])
    def set_pro_status():
        body = request.get_json()
        for field in ["uid", "isPro"]:
            if field not in body:
                return jsonify(f"Field {field} missing in body"), 400
        return user_service.set_is_pro(body)

    @staticmethod
    @user.route("/get/isPro/<uid>")
    def get_is_pro(uid):
        return user_service.get_is_pro(uid)

    @staticmethod
    @user.route("/set/private", methods=["POST"])
    def set_private():
        body = request.get_json()
        for field in ["uid", "fields"]:
            if field not in body:
                return jsonify(f"Field {field} is missing from request body"), 400
        return user_service.set_private(body)

    @staticmethod
    @user.route("/public-info/<uid>")
    def get_public_info(uid):
        return user_service.get_public_info(uid)

    @staticmethod
    @user.route("/info/<uid>")
    def get_info(uid):
        return user_service.get_user_info(uid)
