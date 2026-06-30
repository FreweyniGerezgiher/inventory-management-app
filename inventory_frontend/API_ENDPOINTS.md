# API Endpoints Reference

This document specifies all API endpoints required for the Inventory Management System frontend to work correctly.

---

## Base URL
```
http://localhost:3000/api
```

**Configurable via `.env.local`:**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 1. User Management Endpoints

### Register User
```
POST /api/users/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe"
}
```

**Success Response (201):**
```json
{
  "id": "uuid-1234",
  "email": "user@example.com",
  "fullName": "John Doe",
  "createdAt": "2024-06-30T12:00:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - Missing fields or invalid data
  ```json
  { "error": "Email is required" }
  ```
- `409 Conflict` - Email already registered
  ```json
  { "error": "Email already registered" }
  ```

---

### Get All Users
```
GET /api/users
```

**Success Response (200):**
```json
[
  {
    "id": "uuid-1",
    "email": "user1@example.com",
    "fullName": "John Doe",
    "createdAt": "2024-06-30T12:00:00Z"
  },
  {
    "id": "uuid-2",
    "email": "user2@example.com",
    "fullName": "Jane Smith",
    "createdAt": "2024-06-30T12:05:00Z"
  }
]
```

**Error Response (500):**
```json
{ "error": "Server error" }
```

---

### Get User by ID
```
GET /api/users/:id
```

**Path Parameter:**
- `id` (string, required) - User ID

**Success Response (200):**
```json
{
  "id": "uuid-1234",
  "email": "user@example.com",
  "fullName": "John Doe",
  "createdAt": "2024-06-30T12:00:00Z"
}
```

**Error Responses:**
- `404 Not Found` - User doesn't exist
  ```json
  { "error": "User not found" }
  ```

---

## 2. Product Management Endpoints

### Register Product
```
POST /api/products/register
```

**Request Body:**
```json
{
  "sku": "PROD-001",
  "name": "Product Name",
  "price": 29.99,
  "quantity": 100
}
```

**Success Response (201):**
```json
{
  "id": "uuid-1234",
  "sku": "PROD-001",
  "name": "Product Name",
  "price": 29.99,
  "quantity": 100,
  "createdAt": "2024-06-30T12:00:00Z",
  "lastUpdated": "2024-06-30T12:00:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid data
  ```json
  { "error": "Price must be a positive number" }
  ```
- `409 Conflict` - SKU already exists
  ```json
  { "error": "SKU already registered" }
  ```

---

### Get All Products
```
GET /api/products
```

**Success Response (200):**
```json
[
  {
    "id": "uuid-1",
    "sku": "PROD-001",
    "name": "Product 1",
    "price": 29.99,
    "quantity": 100,
    "lastUpdated": "2024-06-30T12:00:00Z"
  },
  {
    "id": "uuid-2",
    "sku": "PROD-002",
    "name": "Product 2",
    "price": 49.99,
    "quantity": 50,
    "lastUpdated": "2024-06-30T12:05:00Z"
  }
]
```

---

### Get Product by ID
```
GET /api/products/:id
```

**Path Parameter:**
- `id` (string, required) - Product ID

**Success Response (200):**
```json
{
  "id": "uuid-1234",
  "sku": "PROD-001",
  "name": "Product Name",
  "price": 29.99,
  "quantity": 100,
  "lastUpdated": "2024-06-30T12:00:00Z"
}
```

**Error Response (404):**
```json
{ "error": "Product not found" }
```

---

### Update Product Stock
```
PATCH /api/products/:id/stock
```

**Path Parameter:**
- `id` (string, required) - Product ID

**Request Body:**
```json
{
  "quantity": 10,
  "action": "increase"
}
```

**Query Parameters (alternative):**
```
?quantity=10&action=increase
```

**Action Types:**
- `"increase"` - Add to stock
- `"decrease"` - Remove from stock

**Success Response (200):**
```json
{
  "id": "uuid-1234",
  "sku": "PROD-001",
  "quantity": 110,
  "lastUpdated": "2024-06-30T12:10:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid action or quantity
  ```json
  { "error": "Action must be 'increase' or 'decrease'" }
  ```
- `409 Conflict` - Stock would go below zero
  ```json
  { "error": "Insufficient stock. Current: 5, Requested: 10" }
  ```

**Important:** Always prevent stock from going below zero. Return `409` if operation would result in negative quantity.

---

## 3. Transaction Endpoints

### Get Transactions (Paginated)
```
GET /api/transactions?page=1&limit=10
```

**Query Parameters:**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)

**Success Response (200):**
```json
{
  "transactions": [
    {
      "id": "trans-1",
      "productId": "uuid-prod-1",
      "sku": "PROD-001",
      "action": "increase",
      "quantityChanged": 50,
      "previousQuantity": 100,
      "newQuantity": 150,
      "timestamp": "2024-06-30T12:00:00Z"
    },
    {
      "id": "trans-2",
      "productId": "uuid-prod-1",
      "sku": "PROD-001",
      "action": "decrease",
      "quantityChanged": 10,
      "previousQuantity": 150,
      "newQuantity": 140,
      "timestamp": "2024-06-30T12:05:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

**Alternative Response Format:**
```json
{
  "data": {
    "records": [
      { ... transaction ... },
      { ... transaction ... }
    ],
    "total": 45,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

### Create Transaction (Internal)
```
POST /api/transactions
```

**Note:** This is typically called internally when stock is updated. The frontend does not directly call this endpoint.

**Request Body:**
```json
{
  "productId": "uuid-1234",
  "sku": "PROD-001",
  "action": "increase",
  "quantityChanged": 50,
  "previousQuantity": 100,
  "newQuantity": 150
}
```

**Success Response (201):**
```json
{
  "id": "trans-123",
  "timestamp": "2024-06-30T12:00:00Z"
}
```

---

## Response Format Standards

### Success Response
```json
{
  "status": "success",
  "data": { ... },
  "message": "Operation completed successfully"
}
```

or

```json
{
  "data": { ... }
}
```

### Error Response
```json
{
  "status": "error",
  "error": "Error message",
  "message": "Error message"
}
```

or

```json
{
  "error": "Error message"
}
```

---

## HTTP Status Codes

| Code | Meaning | Used For |
|------|---------|----------|
| 200 | OK | Successful GET/PATCH request |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Invalid input data |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry or constraint violation |
| 500 | Server Error | Unexpected server error |

---

## CORS Configuration

Ensure your backend has CORS enabled:

```javascript
// Express.js example
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
```

---

## Rate Limiting (Recommended)

Consider implementing rate limiting:
- 100 requests per minute per IP
- 10 requests per second per endpoint

---

## Authentication (Future Enhancement)

For future versions, consider adding:
- JWT authentication
- Authorization headers
- User role-based access control

---

## Validation Rules

### Email Validation
- Must be valid email format
- Should be unique in users table
- Case-insensitive uniqueness

### SKU Validation
- Must be unique
- Alphanumeric characters
- Length: 3-20 characters

### Name Validation
- Required field
- Length: 2-100 characters

### Price Validation
- Must be positive number
- Decimal precision: 2 places (e.g., 29.99)
- Not allowed to be zero or negative

### Quantity Validation
- Must be non-negative integer
- Cannot drop below zero on decrease
- Initial quantity can be zero

---

## Example Request/Response Workflow

### 1. Register User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "fullName": "John Doe"}'
```

### 2. Register Product
```bash
curl -X POST http://localhost:3000/api/products/register \
  -H "Content-Type: application/json" \
  -d '{"sku": "PROD-001", "name": "Widget", "price": 29.99, "quantity": 100}'
```

### 3. Update Stock
```bash
curl -X PATCH http://localhost:3000/api/products/{id}/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 10, "action": "decrease"}'
```

### 4. Get Transactions
```bash
curl -X GET "http://localhost:3000/api/transactions?page=1&limit=10"
```

---

## Testing Endpoints

### Using Postman/Insomnia
1. Import these endpoint specifications
2. Set base URL to `http://localhost:3000/api`
3. Test each endpoint with sample data
4. Verify response codes and formats

### Using cURL
See examples above or use shell scripts for batch testing

### Using Frontend
The frontend will automatically test these endpoints when you:
- Fill out registration forms
- Navigate between pages
- Perform inventory operations

---

## Troubleshooting

### CORS Errors
- Verify backend CORS is enabled
- Check frontend URL matches backend CORS config
- Ensure credentials are properly configured

### 404 Errors
- Verify endpoint path spelling
- Check HTTP method (GET vs POST vs PATCH)
- Confirm product/user ID exists

### 409 Conflict Errors
- Email or SKU already exists
- Check for duplicate entries
- May need to use different email/SKU

### Stock Constraint Errors
- Verify quantity doesn't go below zero
- Check current stock before decrease
- May need to request "increase" instead

---

**Last Updated**: June 30, 2026
**API Version**: 1.0.0
