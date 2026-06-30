# Inventory Management System - Architecture & Technical Design

## Overview

This document details the technical architecture, design decisions, and implementation considerations for the Inventory Management System.

---

## 1. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Pages (Dashboard, Users, Products, Transactions)       │  │
│  │ Components (Forms, Tables, Navbar, etc.)               │  │
│  │ API Services (user.api.js, product.api.js, etc.)       │  │
│  └────────────────────────────────────────────────────────┘  │
│                              │                                 │
│                    HTTP/REST (Axios)                          │
│                              ▼                                 │
├─────────────────────────────────────────────────────────────┤
│              Backend API (Express.js / FastAPI)              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Route Handlers                                          │  │
│  │ Business Logic & Validation                            │  │
│  │ Database Access Layer                                  │  │
│  └────────────────────────────────────────────────────────┘  │
│                              │                                 │
│                    SQL Queries / ORM                          │
│                              ▼                                 │
├─────────────────────────────────────────────────────────────┤
│          Database (SQLite / PostgreSQL / MongoDB)            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Users Table                                             │  │
│  │ Products Table                                          │  │
│  │ Transactions Table                                      │  │
│  │ Inventory Ledger                                        │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Architecture Layers

#### 1. **Presentation Layer (Pages)**
- `DashboardPage.jsx` - Inventory overview and statistics
- `UserPage.jsx` - User registration and management
- `ProductPage.jsx` - Product registration and management
- `TransactionPage.jsx` - Transaction history with pagination

#### 2. **Component Layer**
- `Navbar.jsx` - Navigation component
- Custom form components
- Table components for data display
- Modal components for actions

#### 3. **API Service Layer**
- `axios.js` - Axios instance with base configuration
- `user.api.js` - User-related endpoints
- `product.api.js` - Product-related endpoints
- `transaction.api.js` - Transaction-related endpoints

#### 4. **Utilities Layer**
- `helper.js` - Reusable utility functions
- Date formatting, data validation, calculations

---

## 2. Database Schema Design

### Recommended Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  fullName VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Products Table
```sql
CREATE TABLE products (
  id VARCHAR(36) PRIMARY KEY,
  sku VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Transactions Table
```sql
CREATE TABLE transactions (
  id VARCHAR(36) PRIMARY KEY,
  productId VARCHAR(36) NOT NULL,
  sku VARCHAR(100) NOT NULL,
  action VARCHAR(20) NOT NULL, -- 'increase' or 'decrease'
  quantityChanged INT NOT NULL,
  previousQuantity INT NOT NULL,
  newQuantity INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_product_timestamp ON transactions(productId, timestamp);
```

### Database Choice Considerations

**SQLite (Lightweight, Development)**
- ✅ Pros: Zero setup, single file, no server needed
- ❌ Cons: Limited concurrency, not suitable for production at scale
- **Best for**: Development, prototyping, small deployments

**PostgreSQL (Production-Ready)**
- ✅ Pros: Robust, concurrent access, ACID compliance, scalable
- ❌ Cons: Requires setup and maintenance
- **Best for**: Production, multi-user systems

**MongoDB (Document-Based)**
- ✅ Pros: Flexible schema, horizontal scaling
- ❌ Cons: More complex validation, higher storage overhead
- **Best for**: Complex, nested data structures

---

## 3. API Design & Endpoints

### RESTful API Principles
- **Resource-based URLs**: `/api/resource`
- **HTTP methods**: GET (read), POST (create), PATCH (update), DELETE (remove)
- **Consistent response format**: All responses include status, data, and error messages
- **Proper HTTP status codes**: 200, 201, 400, 404, 409, 500

### User Endpoints

```
POST   /api/users/register
Request:  { email, fullName }
Response: { id, email, fullName, createdAt }
Errors:   400 (Invalid input), 409 (Email exists)

GET    /api/users
Response: [{ id, email, fullName, createdAt }, ...]
Errors:   500 (Server error)

GET    /api/users/:id
Response: { id, email, fullName, createdAt }
Errors:   404 (User not found)
```

### Product Endpoints

```
POST   /api/products/register
Request:  { sku, name, price, quantity }
Response: { id, sku, name, price, quantity, createdAt }
Errors:   400 (Invalid input), 409 (SKU exists)

GET    /api/products
Response: [{ id, sku, name, price, quantity, lastUpdated }, ...]

GET    /api/products/:id
Response: { id, sku, name, price, quantity, lastUpdated }
Errors:   404 (Product not found)

PATCH  /api/products/:id/stock
Request:  { quantity, action }  // action: 'increase' | 'decrease'
Response: { id, sku, quantity, lastUpdated }
Errors:   400 (Invalid action), 409 (Insufficient stock)
```

### Transaction Endpoints

```
GET    /api/transactions?page=1&limit=10
Response: { 
  transactions: [
    { id, sku, action, quantityChanged, newQuantity, timestamp },
    ...
  ],
  total: 45,
  page: 1,
  limit: 10,
  pages: 5
}

POST   /api/transactions
(Internal endpoint - called by product stock update)
Request:  { productId, sku, action, quantityChanged, previousQuantity, newQuantity }
Response: { id, timestamp }
```

---

## 4. Frontend Data Flow

### User Registration Flow
```
UserPage Component
    ↓
User fills registration form
    ↓
Form submission
    ↓
user.api.registerUser(email, fullName)
    ↓
POST /api/users/register
    ↓
Backend validation & DB insert
    ↓
Response with user ID
    ↓
Display success message & reset form
```

### Product Stock Update Flow
```
ProductPage Component
    ↓
User clicks increase/decrease stock button
    ↓
Confirm stock change
    ↓
product.api.updateStock(productId, quantity, action)
    ↓
PATCH /api/products/:id/stock
    ↓
Backend validates stock change
    ↓
If valid:
  - Update product quantity
  - Create transaction log entry
  - Return updated product
↓
Display updated quantity
```

### Transaction Ledger Flow
```
TransactionPage Component (on mount)
    ↓
transaction.api.getTransactions(page, limit)
    ↓
GET /api/transactions?page=1&limit=10
    ↓
Backend queries paginated results
    ↓
Return paginated transaction data
    ↓
Render table with pagination controls
```

---

## 5. State Management Strategy

### Current Approach (Component-Level)
- Uses React `useState` for local component state
- Props drilling for sharing data between components
- **Suitable for**: Small applications, prototyping

### Recommended for Scaling
```javascript
// Option 1: Context API with Hooks
// Option 2: Redux Toolkit
// Option 3: Zustand (lightweight alternative)

// Example with Context API:
const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  
  return (
    <InventoryContext.Provider value={{ products, users }}>
      {children}
    </InventoryContext.Provider>
  );
}
```

---

## 6. Validation Strategy

### Frontend Validation (User Experience)
```javascript
// Example: User registration form validation
const validateUserForm = (email, fullName) => {
  const errors = {};
  
  if (!email) errors.email = 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!fullName) errors.fullName = 'Full name is required';
  if (fullName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters';
  }
  
  return errors;
};
```

### Backend Validation (Security)
```javascript
// Express example
app.post('/api/users/register', async (req, res) => {
  const { email, fullName } = req.body;
  
  // Server-side validation
  if (!email || !fullName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Check uniqueness
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  
  // Save to database
  const user = await User.create({ email, fullName });
  res.status(201).json(user);
});
```

---

## 7. Error Handling

### Frontend Error Handling
```javascript
try {
  const response = await api.post('/users/register', { email, fullName });
  setSuccess('User registered successfully');
} catch (error) {
  if (error.response?.status === 409) {
    setError('Email already registered');
  } else if (error.response?.status === 400) {
    setError(error.response.data.error || 'Invalid input');
  } else if (!error.response) {
    setError('Network error - check backend connection');
  } else {
    setError('Server error - please try again');
  }
}
```

### HTTP Status Codes Used
- `200 OK` - Successful GET/PATCH request
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Duplicate email, insufficient stock
- `500 Internal Server Error` - Server-side error

---

## 8. Technical Trade-offs & Decisions

### Decision: Vite vs Create React App
```
CHOSEN: Vite
✅ Faster dev server startup (~50ms vs ~5000ms)
✅ Better HMR (Hot Module Replacement)
✅ Smaller bundle size
✅ Native ES6 module support
```

### Decision: Tailwind CSS vs CSS Modules/Styled Components
```
CHOSEN: Tailwind CSS
✅ Rapid UI development
✅ Consistent design system
✅ Smaller CSS output with PurgeCSS
✅ Utility-first approach prevents naming conflicts
```

### Decision: React Router v7
```
CHOSEN: React Router v7
✅ Lightweight and performant
✅ Simple API for common use cases
✅ No complex setup required
Note: For complex routing, consider v6 features or alternative routers
```

### Decision: Axios vs Fetch API
```
CHOSEN: Axios
✅ Automatic JSON transformation
✅ Request/response interceptors
✅ Better error handling
✅ Request cancellation support
```

### Decision: Component State vs Redux
```
CHOSEN: Component-Level State (for MVP)
Reasoning: Project is small enough for prop drilling
Migration Path: Easy to migrate to Redux/Zustand when needed
```

---

## 9. Security Considerations

### Current Implementation
- ✅ Server-side validation (backend responsibility)
- ✅ CORS configuration (backend responsibility)
- ✅ Input sanitization (backend responsibility)

### Recommended Enhancements
1. **Authentication**: Implement JWT tokens or session-based auth
2. **Authorization**: Role-based access control (RBAC)
3. **HTTPS**: Use HTTPS in production
4. **Rate Limiting**: Prevent API abuse
5. **CSRF Protection**: Cross-Site Request Forgery tokens
6. **SQL Injection Prevention**: Use parameterized queries (backend)
7. **XSS Prevention**: Sanitize and escape user input

---

## 10. Scalability Roadmap

### Phase 1: MVP (Current)
- Single-page inventory management
- Basic CRUD operations
- SQLite database

### Phase 2: Enhancement (7-8 hours extension)
- User authentication & authorization
- Advanced filtering and search
- Real-time notifications (WebSockets)
- Data export functionality (CSV, PDF)

### Phase 3: Production Ready (Future)
- Multi-tenant support
- Caching layer (Redis)
- Message queue (RabbitMQ/Kafka) for async operations
- Full-text search (Elasticsearch)
- Analytics and reporting dashboard
- Mobile app (React Native)
- Microservices architecture

---

## 11. Environment Configuration

### Frontend Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Inventory Management System
VITE_ITEMS_PER_PAGE=10
VITE_ENABLE_DEBUG_MODE=false
```

### Backend Environment Variables (Example)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=sqlite:///inventory.db
DATABASE_DIALECT=sqlite

# Production
DATABASE_URL=postgresql://user:pass@localhost:5432/inventory_prod
```

---

## 12. Deployment Considerations

### Frontend Deployment
```bash
# Build
npm run build

# Output in dist/ folder
# Deploy to: Vercel, Netlify, AWS S3 + CloudFront, GitHub Pages
```

### Backend Deployment
- Deploy Express/FastAPI server to: Heroku, AWS EC2, DigitalOcean, Railway
- Ensure environment variables are properly configured
- Use a production-grade database

### CI/CD Pipeline
```yaml
- Lint code
- Run tests
- Build frontend
- Build/test backend
- Deploy to staging
- Deploy to production
```

---

## 13. Testing Strategy

### Frontend Testing
```javascript
// Unit tests for utility functions
import { calculateTotalStock } from '../utils/helper';
test('calculateTotalStock should sum quantities', () => {
  expect(calculateTotalStock([{ quantity: 10 }, { quantity: 20 }])).toBe(30);
});

// Component tests with React Testing Library
import { render, screen } from '@testing-library/react';
test('DashboardPage renders correctly', () => {
  render(<DashboardPage />);
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
```

### Backend Testing
- Unit tests for validation functions
- Integration tests for API endpoints
- Database tests for queries

---

## 14. Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization
- CSS minification (Vite)
- Bundle analysis with Vite plugins

### Backend
- Database indexing on frequently queried columns
- Pagination for large datasets
- Caching headers for static assets
- Query optimization

---

## Conclusion

This inventory management system demonstrates core web development principles including:
- RESTful API design
- Modern frontend framework usage (React)
- Database schema design
- State management
- Error handling and validation
- Responsive UI design

The architecture is designed to be simple for MVP development while providing a clear path for scaling and adding features.
