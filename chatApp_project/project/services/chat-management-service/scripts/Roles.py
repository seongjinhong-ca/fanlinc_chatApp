from pymongo import MongoClient


def import_roles():
    # new mongodb connection at localhost and port 27017.
    client = MongoClient('localhost', 27017)
    db = client['mydb']
    role_collection = db['Role']

    # Delete all previous data.
    role_collection.drop()

    # Roles to be initialized.
    role1 = {"roleId": "1",
             "description": "Moderator"}
    role2 = {"roleId": "2",
             "description": "Muted"}

    # Insert the data.
    result = role_collection.insert_many([role1, role2])
    print("Multiple roles added: " + str(result.inserted_ids))


if __name__ == "__main__":
    import_roles()
