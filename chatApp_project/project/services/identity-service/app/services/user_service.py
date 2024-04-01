import datetime

import requests
from firebase_admin import auth, firestore, storage
from firebase_admin.auth import UserRecord, UserNotFoundError
from firebase_admin.exceptions import InvalidArgumentError
from flask import jsonify, Response
from google.cloud.firestore_v1.client import Client
from jwt import InvalidSignatureError
import uuid

from app.utils.util import generate_token, get_payload_from_token, config


class UserService:
    @staticmethod
    def create_user(user_info: dict):
        try:
            user: UserRecord = auth.create_user(
                email=user_info.get("email"), password=user_info.get("password")
            )
            UserService.set_username(user_info)

            resp = UserService.create_community_service_user(user.uid)
            if resp.status_code != 200:
                return (
                    jsonify("[ERROR] User created but not added to community service."),
                    500,
                )

            token = generate_token(payload={"uid": user.uid})
            return jsonify({"token": token, "emailVerified": user.email_verified}), 200
        except InvalidArgumentError as E:
            return (
                jsonify(f"Bad arguments the user may already exists. Error: {str(E)}"),
                500,
            )

    @staticmethod
    def create_community_service_user(uid: str):
        community_service_url = "http://localhost:8081"
        if config.get("community-service") and config.get("community-service").get(
            "url"
        ):
            community_service_url = config.get("community-service").get("url")
        return requests.post(
            url=f"{community_service_url}/rest/fanlinc/users", json={"uid": uid}
        )

    @staticmethod
    def identity(uid):
        try:
            user: UserRecord = auth.get_user(uid=uid)
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            user_info = doc_ref.get().to_dict()
            return (
                jsonify(
                    {
                        "email": user.email,
                        "username": user_info.get('username'),
                        "emailVerified": user.email_verified,
                        "profileImage": user_info.get('profile-picture')
                    }
                ),
                200,
            )
        except UserNotFoundError:
            return jsonify(f"User with uid: {uid} not found"), 404

    @staticmethod
    def jwt_to_uid(jwt):
        try:
            payload = get_payload_from_token(jwt)
            user: UserRecord = auth.get_user(uid=payload.get("uid"))
            return jsonify({"uid": user.uid, "emailVerified": user.email_verified}), 200
        except InvalidSignatureError:
            return jsonify("Bad token provided"), 400
        except UserNotFoundError:
            return jsonify("User not found"), 404

    @staticmethod
    def sign_in_user(user_info):
        try:
            user: UserRecord = auth.get_user_by_email(email=user_info.get("email"))
            key = config.get("firebase").get("api_key")
            resp = requests.post(
                url=f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={key}",
                json={
                    "email": user_info.get("email"),
                    "password": user_info.get("password"),
                    "returnSecureToken": False,
                },
            )
            if resp.status_code == 200:
                try:
                    UserService.create_community_service_user(user.uid)
                except Exception:
                    print(
                        "[WARNING] Failed to create user on community service. UID="
                        + user.uid
                    )
                return jsonify(
                    {
                        "token": generate_token(payload={"uid": user.uid}),
                        "emailVerified": user.email_verified,
                    }
                )
            elif resp.status_code == 400:
                return jsonify("INVALID PASSWORD"), 400
            else:
                return jsonify("Error occurred while signing in"), 500
        except UserNotFoundError:
            return jsonify(f"User with email {user_info.get('email')} not found"), 404
        except Exception as E:
            return jsonify(f"Error occurred while signing in {str(E)}"), 500

    @staticmethod
    def set_profile_picture(files, uid):
        try:
            user: UserRecord = auth.get_user(uid)
            file = files["file"]
            bucket = storage.bucket(config.get("firebase").get("bucket"))
            image_blob = bucket.blob(f"profile_pictures/{user.uid}.jpg")
            image_blob.upload_from_file(file_obj=file, content_type=file.content_type)
            image_download_link = bucket.get_blob(
                f"profile_pictures/{user.uid}.jpg"
            ).generate_signed_url(datetime.timedelta(days=365))

            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None:
                doc.update({"profile-picture": image_download_link})
            else:
                doc = {"profile-picture": image_download_link}
            doc_ref.set(doc)
            return jsonify({"image": image_download_link}), 200
        except UserNotFoundError:
            return jsonify("User with given email does not exists"), 404

    @staticmethod
    def get_profile_picture(email_address):
        try:
            user: UserRecord = auth.get_user_by_email(email=email_address)
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if "profile-picture" not in doc:
                return jsonify("Profile picture not set yet!"), 404
            return jsonify({"image": doc.get("profile-picture")}), 200
        except UserNotFoundError:
            return jsonify("User with given email does not exists"), 404

    @staticmethod
    def set_username(body):
        try:
            user: UserRecord = auth.get_user(body.get("uid"))
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None:
                doc.update({"username": body.get("username")})
            else:
                doc = {"username": body.get("username")}
            doc_ref.set(doc)
            return jsonify("Username updated"), 200
        except UserNotFoundError:
            return jsonify("User with the given email could not be found"), 404

    @staticmethod
    def get_username(email):
        try:
            user: UserRecord = auth.get_user_by_email(email)
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None and "username" in doc:
                return jsonify({"username": doc.get("username")})
            else:
                return jsonify("Username is not set yet for this user"), 404
        except UserNotFoundError:
            return jsonify("User with given email could not be found"), 404

    @staticmethod
    def set_name(body):
        try:
            user: UserRecord = auth.get_user(body.get("uid"))
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            doc.update({"name": body.get("name")})
            doc_ref.set(doc)
            return jsonify("Name updated"), 200
        except UserNotFoundError:
            return jsonify("User with the given email could not be found"), 404

    @staticmethod
    def get_name(email):
        try:
            user: UserRecord = auth.get_user_by_email(email)
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None and "name" in doc:
                return jsonify({"name": doc.get("name")})
            else:
                return jsonify("Name is not set yet for this user"), 404
        except UserNotFoundError:
            return jsonify("User with given email could not be found"), 404

    @staticmethod
    def get_uid(email):
        try:
            user: UserRecord = auth.get_user_by_email(email)
            return (
                jsonify({"uid": str(user.uid), "emailVerified": user.email_verified}),
                200,
            )
        except UserNotFoundError:
            return jsonify(f"User with email {email} not found"), 404

    @staticmethod
    def image_upload(files, email):
        try:
            user: UserRecord = auth.get_user_by_email(email)
            file = files["file"]
            bucket = storage.bucket(config.get("firebase").get("bucket"))
            image_path = f"{user.uid}/{str(uuid.uuid4())}.jpg"
            image_blob = bucket.blob(image_path)
            image_blob.upload_from_file(file_obj=file, content_type=file.content_type)
            image_download_link = bucket.get_blob(image_path).generate_signed_url(
                datetime.timedelta(days=365)
            )
            return jsonify({"image": image_download_link}), 200
        except UserNotFoundError:
            return jsonify(f"User with email {email} not found"), 404

    @staticmethod
    def set_is_pro(body):
        try:
            user: UserRecord = auth.get_user(body.get("uid"))
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None:
                doc.update({"isPro": body.get("isPro")})
            else:
                doc = {"isPro": body.get("isPro")}
            doc_ref.set(doc)
            return jsonify("User Pro status updated"), 200
        except UserNotFoundError:
            return jsonify("User with the given email could not be found"), 404

    @staticmethod
    def get_is_pro(uid):
        try:
            user: UserRecord = auth.get_user(uid=uid)
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None and "isPro" in doc:
                return jsonify({"isPro": doc.get("isPro")})
            elif doc is not None:
                doc.update({"isPro": False})
                return jsonify({"isPro": doc.get("isPro")})
            else:
                return jsonify("Pro status is not set yet for this user"), 404
        except UserNotFoundError:
            return jsonify("User with given email could not be found"), 404

    @staticmethod
    def set_private(body):
        try:
            user: UserRecord = auth.get_user(body.get("uid"))
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None:
                doc.update({"private_fields": body.get("fields")})
            else:
                doc = {"private_fields": body.get("fields")}
            doc_ref.set(doc)
            return jsonify("User privacy settings updated"), 200
        except UserNotFoundError:
            return jsonify("User with the given email could not be found"), 404

    @staticmethod
    def get_public_info(uid):
        try:
            user: UserRecord = auth.get_user(uid=uid)
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            doc = doc_ref.get().to_dict()
            if doc is not None and "private_fields" in doc:
                public_user_info = {}
                for (field, access) in doc.get('private_fields').items():
                    if access:
                        public_user_info.update({field: doc.get(field)})
                return jsonify(public_user_info)
            else:
                return jsonify("Privacy settings not set yet"), 404
        except UserNotFoundError:
            return jsonify("User with given email could not be found"), 404

    @staticmethod
    def get_user_info(uid):
        try:
            user: UserRecord = auth.get_user(uid=uid)
            db: Client = firestore.client()
            doc_ref = db.collection("users").document(str(user.uid))
            return jsonify(doc_ref.get().to_dict())
        except UserNotFoundError:
            return jsonify("User with given email could not be found"), 404