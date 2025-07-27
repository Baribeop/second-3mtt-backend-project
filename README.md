# User Management API

A simple RESTful API for managing users using Node.js, Express, and PostgreSQL.

## 📦 Features

- Create, read, update, and delete users (CRUD)
- Connects to PostgreSQL using `pg` client
- Input validation and error handling

## 🔧 Technologies

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL


1. Clone the repository

```bash
git clone https://github.com/Baribeop/second-3mtt-backend-project.git
```
cd second-3mtt-backend-project

2. Install dependencies 
    npm install 
    npm intall express dotenv nodemon pg


3. Create a .env file

    POSTGRES_DATABASE_URL = Postgresql://postgres:DB_PASSWORD@localhost:5432/DB_NAME
    PORT = 3000

4. Update  Script in package.json as shown below

    ````bash

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node index.js",
        "dev": "nodemon index.js"
    },
    
    ````


5. Start the server

    npm run dev


# API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/users`     | Get all users     |
| POST   | `/users`     | Create a new user |
| GET    | `/users/:id` | Get user by ID    |
| PUT    | `/users/:id` | Update user       |
| DELETE | `/users/:id` | Delete user       |




- POST /users

```bash
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

![alt text](post.png)

- GET/users

```bash
{
        "name": "mary jane",
        "email": "maryjane@gmail.com"
    }

```
![alt text](image.png)


- GET/users/id

sample 

```bash
{
    "id": 4,
    "name": "mary jane",
    "email": "maryjane@gmail.com"
}
```

![alt text](image-1.png)


- Update/users/id

Request 
```bash 
{
        "name": "kath jane",
        "email": "maryjane@gmail.com"
    }

```
Response
```bash
{
    "id": 4,
    "name": "kath jane",
    "email": "maryjane@gmail.com"
}
```


![alt text](image-2.png)

- DELETE/users/id

```bash
{
    "message": "User deleted succesfully",
    "user": {
        "id": 3,
        "name": "james bond",
        "email": "jamesbondb@gmail.com"
    }
```
![alt text](image-3.png)