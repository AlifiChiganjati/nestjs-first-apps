# Book Api Spec

## Get All Books

Endpoint GET : /api/book/list

Headers:

- Authorization: token

Response Body (Success):  
json : {  
"status": 200,  
"message": "Success get user",  
"data":[ {data_book_1},
{data_user_2},
{data_book...}]  
}

## Get Book

Endpoint GET : /api/book/current

Headers:

- Authorization: token

Response Body (Success):  
json :{
"status": 200,
"message": "Success Get Book",
"data": {
"id": current,
"title": "Harry Potter",
"author": "J.K. Rolling",
"release_date": 1997,
"page": 571,
"summary": "this book Haryy Potter",
"created_at": "2024-08-03T03:37:12.894Z",
"updated_at": "2024-08-03T03:37:12.894Z"
}
}

## Create Book

Headers:

- Authorization: token

Response Body (Success):
json:{
"title":"Harry Potter",
"author":"J.K. Rolling",
"release_date":1997,
"page":"571",
"summary":"this book Haryy Potter"
}

Response Body (Success):  
json:{
"status": 201,
"message": "Success Book successfully",
"data": {
"title": "Harry Potter",
"author": "J.K. Rolling",
"release_date": 1997,
"page": 571,
"summary": "this book Haryy Potter",
"id": 1,
"created_at": "Date.Now()",
"updated_at": "Date.Now()"
}
}

## Update Book

Headers:

- Authorization: token

Response Body (Success):
json:{
"title":"Update Harry Potter",
"author":"J.K. Rolling",
"release_date":2000,
"page":"571",
"summary":"Update this book Haryy Potter"
}

Response Body (Success):  
json:{
"status": 201,
"message": "Success Book successfully",
"data": {
"title": "Update Harry Potter",
"author": "J.K. Rolling",
"release_date": 2000,
"page": 571,
"summary": "Update this book Haryy Potter",
"id": 1,
"created_at": "Date",
"updated_at": "Date.Now()"
}
}

## Delete Book

Headers:

-Authorization: token
Response Body (Success):
json:{
"status": 200,
"message": "Delete book successfully"
}
