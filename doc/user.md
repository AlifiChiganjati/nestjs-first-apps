# User API Spec

## Get All Users

Endpoint GET : /api/user/

Headers:

- Authorization: token

Response Body (Success):
json : {
"status": 200,
"message": "Success get user",
"data":[ {
"id": current,
"name": "Jhon Doe",
"email": "jhondoe@example.com",
"username": "jhondoe",
"created_at": "Date",
"updated_at": "Date"
},
{data_user_2}]
}

## Get User

Endpoint GET : /api/users/current

Headers:

- Authorization: token

Response Body (Success):
json : {
"status": 200,
"message": "Success get user",
"data": {
"id": current,
"name": "Jhon Doe",
"email": "jhondoe@example.com",
"username": "jhondoe",
"created_at": "Date",
"updated_at": "Date"
}
}

## Update User

Endpoint PATCH : /api/users/current

Headers:

- Authorization: token

Request Body:
json : {
"status": 200,
"message": "Success get user",
"data": {
"id": current,
"name": "Update Jhon Doe",
"email": "jhondoeupdate@example.com",
"username": "jhondoeUpdate",
"created_at": "Date",
"updated_at": "Date"
}
}

Response Body (Success):
json : {  
"status": 200,  
"message": "Success get user",  
"data": {  
"id": current,  
"name": "Update Jhon Doe",  
"email": "jhondoeupdate@example.com",
"username": "jhondoeUpdate",  
"created_at": "Date",  
"updated_at": "Date"  
}  
}
