# Inventory Management Application

A fullstack inventory management app built for the Ellatech take-home exercise. The project includes a responsive React frontend and a RESTful Node.js backend for managing users, products, stock updates, and transaction history.

## Overview

This application demonstrates:
- User registration with name and email
- Product registration with SKU, name, price, and initial quantity
- Stock adjustments with a non-negative stock constraint
- A product dashboard showing current inventory and last update time
- A paginated transaction ledger for historical stock changes

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Express Validator

## Project Structure

```text
inventory-management-app/
├── inventory_backend/          # Express + Sequelize API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validations/
│   │   └── middleware/
│   └── package.json
├── inventory_frontend/         # React + Vite UI
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── routes/
│   └── package.json
└── README.md                   # Root documentation
```

## Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- npm installed
- PostgreSQL running locally
- A database created for the app

## Backend Setup

### 1. Navigate to the backend folder

```bash
cd inventory_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a environment file

Create a `.env` file inside the backend folder with the following values:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory
DB_USERNAME=postgres
DB_PASSWORD=your_password
PORT=3000
```

### 4. Create the PostgreSQL database

Example:

```sql
CREATE DATABASE inventory;
```

### 5. Start the backend server

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:3000
```

### Backend API Endpoints

- `GET /` - Health check
- `POST /api/users` - Create a user
- `POST /api/products` - Create a product
- `GET /api/products` - List products
- `PATCH /api/products/:id/stock` - Update stock
- `GET /api/transactions?page=1&size=10` - Get transaction history

## Frontend Setup

### 1. Navigate to the frontend folder

```bash
cd inventory_frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Create a `.env.local` file inside the frontend folder:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Start the frontend app

```bash
npm run dev
```

The app will run at:

```text
http://localhost:5173
```

## Architecture Notes

### API Design
The backend follows a modular REST structure with separate routes for users, products, and transactions. The API is designed to keep business logic separated from request handling and to return consistent JSON responses.

### Database Schema
The app uses PostgreSQL with Sequelize models for:
- `users` - stores user name and email
- `products` - stores SKU, name, price, and quantity
- `transactions` - logs stock changes and maintains inventory history

### Technical Trade-offs
- Sequelize was chosen to simplify database access and schema management.
- PostgreSQL was selected for reliability and structured relational data.
- The frontend uses component-level state and API service modules for a lightweight and maintainable setup.

## Validation and Error Handling

- Server-side validation is implemented for user and product input.
- The frontend uses Axios interceptors and form-level feedback for clearer error handling.
- Stock updates prevent inventory from falling below zero.

## Development Notes

To build the frontend for production:

```bash
cd inventory_frontend
npm run build
```

To lint the frontend:

```bash
cd inventory_frontend
npm run lint
```

## Summary

This repository satisfies the core requirements of the assignment by providing:
- a responsive frontend interface
- a functional backend API
- persistent storage with PostgreSQL
- validation and inventory tracking
- documentation for local setup and execution
