## Setup

`pip install -r requirements.txt`

Copy application.template and generate application.yaml file inside config folder and add the values.  

Firebase api_key found under Settings &rarr; General &rarr; Web API Key on firebase project console.  

**secret.json** file needs to be created which one can get from Settings &rarr; Service accounts &rarr; Firebase Admin SDK &rarr; Select Python &rarr; Generate new private key
## Run

`flask run`

The application will run under `localhost:5000`

## Create User

#### `POST` /user/create

#### Request Body

```
{
    "email": "username@domain.com",
    "password": "********",
    "username": "username"
}
```

#### Response Body

```
{
    "token": "************",
    "emailVerified": false
}
```
## User Identity

#### `GET` /user/identity/`<uid>`

#### Response Body

```
{
    "email": "username@domain.com",
    "username": "username",
    "emailVerified": true
}
```
## Email Exists

#### `GET` /email/exists/`<email>`

#### Response Body

```
{
  "userExists": true
}
```
## Email Verified

#### `GET` /email/verified/`<email>`

#### Response Body

```
{
  "emailVerified": false
}
```
## Email Verification Link

#### `GET` /email/verification/`<email>`

## Password Reset Link

#### `GET` /email/password-reset/`<email>`

## User Login

#### `POST` /user/sign-in

#### Request Body

```
{
    "email": "username@domain.com",
    "password": "********"
}
```

#### Response Body

```
{
    "token": "************",
    "emailVerified": true
}
```

## JWT Token &rarr; UID

#### `GET` /user/uid/`<jwt>`

#### Response Body

```
{
    "uid": "123456789",
    "emailVerified": false
}
```
## Email &rarr; UID

#### `GET` /user/get/uid/`<email>`

#### Response Body

```
{
    "uid": "123456789",
    "emailVerified": false
}
```
## Image Upload

#### `POST` /user/image/upload/`<email>`
Provide form data with key as 'file' and value as the file to be stored.

#### Response Body

```
{
    "image": "https://storage.googleapis.com/..."
}
```