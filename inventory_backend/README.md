**Inventory Management System (Backend)**

A minimal RESTful API built with Node.js, Express, Sequelize, and PostgreSQL for managing users, products, stock inventory, and transaction history.
This project was developed as part of a fullstack internship assessment.

**Features**

User Management
User registration with email and full name
Product Management

Create products (SKU, name, price, quantity)
View all products
Update product stock (increase or decrease)
Prevent stock from going below zero

Inventory Tracking

Records all stock changes automatically in transactions

Transaction Ledger

Paginated transaction history using page and size query parameters
Tech Stack

Node.js
Express.js
PostgreSQL
Sequelize ORM
express-validator
dotenv

**Project Structure**

src/

config/
controllers/
models/
routes/
validations/
middleware/
utils/
app.js
server.js
Environment Variables

Create a .env file:

DB_CONNECTION=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=inventory
DB_USERNAME=postgres
DB_PASSWORD=your_password

TOKEN_SECRET=your_secret
EMAIL_SECRET=your_email_secret

PORT=3000
TIMEZONE=+00:00

**Setup Instructions**
Clone the repository
git clone https://github.com/FreweyniGerezgiher/user-product-manager_Backend
cd inventory-backend
Install dependencies
npm install
Create database
CREATE DATABASE inventory;
Run the server
npm run dev

Server runs at:
http://localhost:3000

API Endpoints

**Users**
POST /api/users

**Products**
POST /api/products
GET /api/products
PATCH /api/products/:id/stock

**Transactions**
GET /api/transactions?page=1&size=10

API Response Format

Success Response
{
"success": true,
"message": "Success",
"data": {}
}

Error Response
{
"success": false,
"message": "Error message",
"data": null,
"errors": []
}

**Key Design Decisions**
Modular folder structure for scalability
Sequelize ORM for database abstraction
Transaction logging for all stock updates
Reusable pagination utility
Standardized API response format
