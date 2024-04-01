## Requirements

- Java 1.8 SDK
- Python 3.6+
- Maven
- MongoDB (Running at the default port)

## Initialize MongoDB

In the command line start mongoDB using `sudo service mongod start` in the terminal

To stop running mongoDB, use `sudo service mongod stop`

The status of mongoDB can be checked by using `service mongod status`

Note that the default port for mongoDB is 27017

## Run the python script to populate the essential data for the db

The scripts are made in Python. Follow the following instructions using the terminal.

- Navigate to the directory `chat-management-service/scripts`

- Create a virtual environment named `venv-roles` using the command `python3 -m venv venv-roles`

- Activate the virtual environment with `source venv-roles/bin/activate`

- Install the required dependencies with `pip install -r requirements.txt`

- Now execute the python script by using `python3 Roles.py`

- The default roles should be initialized within the `Roles` collection in the database

- Deactivate the virtual environment with `deactivate` 

## Running the project

In the terminal, navigate to the directory containing this `README.md` file

Compile the project using `mvn compile`

Run the project using `mvn spring-boot:run`

The application should be running on the default port of 8080