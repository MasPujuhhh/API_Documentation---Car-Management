# Car Menagement API

Adalah project membuat api restfull dengan bantuan nodeJS sebagai framework, Postgree sebagai database, JWT sebagai unique token, bcrypt sebagai enkripsi password, dan Sequelize sebagai yang mengatur model database.

Yang berisi endpoint Register dan Login user dengan role member, menambah user dengan role admin (akan tetapi hanaya role superadmin yang bisa menambahkannya), dan melihat status user sesuai dengan tokennya.

Selain itu sudah menggunakan autentikasi dan autorisasi mengguankan token sehingga perlu memasukan token ke dalam header, disini saya menggunakan Bearer.

Dan juga terdapat endpoint CRUD yang dimana yang bisa menambah, mengupdate, dan mendelete data mobil adalah user dengan role admin dan superadmin, sedangkan untuk role member hanya bisa mengget data dan juga mengget data sesuai id data mobil tersebut.

Berikut adalah data superadmin:
```json
{
    "id":1,
    "role":"superadmin",
    "name":"superadmin@gmail.com",
    "password":"supersecret"
}
```

# Endpoint
Disini saya menggunakan Swagger-ui sebagai dokumentasi API. yang bisa diakses ke endpoint
```
localhost:3000/api-docs
```
## Menambahkan User dengan Role member
Endpoint :
```
localhost:3000/users/register
```

Data Example :
```json
{
  "email": "string",
  "password": "string"
}
```
Response 201 (Created) :
```json
{
  "email": "string",
  "password": "string"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## Login User
Endpoint :
```
localhost:3000/users/login
```
Data Example :
```json
{
  "email": "string",
  "password": "string"
}
```
Response 200 (OK) :
```json
{
  "token": "string"
}
```
Response 404 (Data Not Found) :
```json
{
  "message": "email or password incorrect"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## Add Admin
Endpoint :
```
localhost:3000/users/add_admin
```
Token :
```json
{
  "token": "string"
}
```
Data Example :
```json
{
  "email": "string",
  "password": "string"
}
```

Response 201 (Created) :
```json
{
  "email": "string",
  "password": "string"
}
```
Response 401 (Invalid token) :
```json
{
    "message":"Invalid token"
}
```
Response 403 (Unauthorized) :
```json
{
    "message":"Unauthorized"
}
```
Response 403 (Forbidden) :
```json
{
    "message":"Only superadmin can acces"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## User Status
Endpoint :
```
localhost:3000/users/status
```

Token :
```json
{
  "token": "string"
}
```
Response 200 (OK) :
```json
{
  "user": {
    "email": "string",
    "role": "string"
  }
}
```
Response 401 (Invalid token) :
```json
{
    "message":"Invalid token"
}
```
Response 403 (Unauthorized) :
```json
{
    "message":"Unauthorized"
}
```
Response 404 (Data Not Found) :
```json
{
  "message": "Data Not Found"
}
```
Response 403 (Forbidden) :
```json
{
    "message":"Only superadmin can acces"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## Get All Cars Data
Endpoint :
```
localhost:3000/cars
```
Token :
```json
{
  "token": "string"
}
```
Response 200 (OK) :
```json
[
  {
    "id": "int",
    "name": "string",
    "price": "int",
    "createdAt": "date",
    "updatedAt": "date",
    "userId": "int",
    "user": {
      "email": "string",
      "role": "string"
    }
  }
]
```
Response 401 (Invalid token) :
```json
{
    "message":"Invalid token"
}
```
Response 403 (Unauthorized) :
```json
{
    "message":"Unauthorized"
}
```
Response 404 (Data Not Found) :
```json
{
  "message": "Data Not Found"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## Post Data Car
Endpoint :
```
localhost:3000/car
```
Token :
```json
{
  "token": "string"
}
```
Response 201 (Created) :
```json
{
  "name": "string",
  "price": "int"
}
```
Response 401 (Invalid token) :
```json
{
    "message":"Invalid token"
}
```
Response 403 (Unauthorized) :
```json
{
    "message":"Unauthorized"
}
```
Response 403 (Forbidden) :
```json
{
    "message":"Only admin and superadmin can acces"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## Get Cars data by Id
Endpoint :
```
localhost:3000/car/:id
```
Token :
```json
{
  "token": "string"
}
```
Response 200 (OK) :
```json
{
  "id": "int",
  "name": "string",
  "price": "int",
  "createdAt": "date",
  "updatedAt": "date",
  "userId": "int",
  "user": {
    "id": "int",
    "role": "string",
    "email": "string",
    "password": "string",
    "createdAt": "date",
    "updatedAt": "int"
  }
}
```
Response 401 (Invalid token) :
```json
{
    "message":"Invalid token"
}
```
Response 403 (Unauthorized) :
```json
{
    "message":"Unauthorized"
}
```
Response 404 (Data Not Found) :
```json
{
  "message": "Data Not Found"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## Put/ Update Data Car by Id
Endpoint :
```
localhost:3000/car/:id
```
Token :
```json
{
  "token": "string"
}
```
Response 201 (Created) :
```json
{
  "message": "Data succesfully updated"
}
```
Response 401 (Invalid token) :
```json
{
    "message":"Invalid token"
}
```
Response 403 (Unauthorized) :
```json
{
    "message":"Unauthorized"
}
```
Response 403 (Forbidden) :
```json
{
    "message":"Only admin and superadmin can acces"
}
```
Response 404 (Data Not Found) :
```json
{
  "message": "Data Not Found"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```

## Delete Data Car by Id
Endpoint :
```
localhost:3000/car/:id
```
Token :
```json
{
  "token": "string"
}
```
Response 200 (OK) :
```json
{
  "message": "Data succesfully deleted"
}
```
Response 401 (Invalid token) :
```json
{
    "message":"Invalid token"
}
```
Response 403 (Unauthorized) :
```json
{
    "message":"Unauthorized"
}
```
Response 403 (Forbidden) :
```json
{
    "message":"Only admin and superadmin can acces"
}
```
Response 404 (Data Not Found) :
```json
{
  "message": "Data Not Found"
}
```
Response 500 (Internal Server Error) :
```json
{
  "message":"Internal server error"
}
```