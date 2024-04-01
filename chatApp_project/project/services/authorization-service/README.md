# Authorization Service

Authorization service provides a basic RESTful API for storing user permissions.

## Quick Start

To run this service, you must have Node.js and MongoDB installed. Once you have all of them installed, copy `.env.example` to `.env` and modify the contents to suit your need.

Once you have saved your configuration file, run the following commands to start the server:

```bash
$ npm install
$ npm start
```

## API Documentation

### POST `/roles`

Create a new role.

Request Payload
* name: string - Name of the role
* permissions: string[] - List of permissions this role has

Response Body
* _id: string - ID of the role

Errors
* 400 - Bad Request

### GET `/roles/:name`

Get a role by name

Path Variables
* name: string - Name of the role

Response Body
* _id: string - ID of the role
* name: string - Name of the role
* permissions: string[] - List of permissions

Errors
* 404 - Not Found
