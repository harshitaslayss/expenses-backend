# Expense Manager Backend

Spring Boot REST API for the Expense Manager application.

## Tech Stack

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Hibernate / JPA
* MySQL
* Maven

## Features

* User Registration
* User Authentication
* JWT Token Generation and Validation
* Transaction Management APIs
* Category Management APIs
* Secure REST Endpoints

## API Endpoints

### Authentication

POST /register

POST /login

### Transactions

GET /transactions

POST /transactions

PUT /transactions/{id}

DELETE /transactions/{id}

### Categories

GET /categories

POST /categories

## Frontend Repository

https://github.com/harshitaslayss/expenses-frontend.git

## Live Application

https://expenses-frontend-mptjzxhw9-harshitaslayss-projects.vercel.app/

## Environment Variables

* DB_URL
* DB_USERNAME
* DB_PASSWORD
* JWT_SECRET
* FRONTEND_URL
