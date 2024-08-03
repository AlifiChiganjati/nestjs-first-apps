# Auth API Spec

## Register User

Endpoint POST : /api/auth/register

Request Body:
json : {
"name" : "John Doe"
"email" : "jhondoe@example.com",
"username" : "johndoe",
"password" : "user123",
}

Response Body (Success):
json : {
"status": 201,
"message": "Success Create User",
"data": {
"name": "Jhon Doe",
"email": "jhondoe@example.com",
"username": "jhondoe",
"password": "Hash_Password",
"id": 1,
"created_at": "2024-08-03T03:02:21.653Z",
"updated_at": "2024-08-03T03:02:21.653Z"
}
}

## Login User

Endpoint POST : /api/auth/login

Request Body:
json : {
"username" : "jhondoe",
"password" : "user123",
}

Response Body (Success):
json : {
"Status": 200,
"message": "Login successfully",
"token" : {
"token" : "session_id_generated"
}
}
