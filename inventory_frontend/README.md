# Inventory Management System - Frontend

A modern, responsive React-based frontend for managing inventory, products, transactions, and user data. Built with React 19, Vite, Tailwind CSS, and React Router for seamless navigation and data management.

## ✨ Features

### Core Requirements
- **User Registration**: Capture user email and full name with validation
- **Product Registration**: Create products with SKU, name, price, and initial quantity
- **Inventory Management**: Increase/decrease product stock with zero-floor constraint
- **Product Dashboard**: Display SKU, current quantity, and last update timestamp
- **Transaction Ledger**: Paginated historical log of all stock changes
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS

### Additional Features
- **User Management**: Manage user accounts and permissions
- **Product Management**: View and manage products in your inventory
- **Transaction Tracking**: Monitor all inventory transactions and movements
- **Fast Development**: Hot Module Replacement (HMR) with Vite for instant feedback
- **Code Quality**: ESLint configuration for maintaining code standards
- **Error Handling**: Comprehensive client-side validation and error feedback

## 🛠 Tech Stack

- **React 19.2.7** - UI library
- **Vite 8.1.0** - Build tool and dev server
- **React Router 7.18.0** - Client-side routing
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Axios 1.18.1** - HTTP client for API calls
- **ESLint 10.5.0** - Code linting and quality assurance
- **PostCSS 8.5.16** - CSS transformation

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Backend API** running on `http://localhost:3000` (or configure in `.env.local`)

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` to match your backend:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Start Development Server
```bash
npm run dev
```
Open browser to `http://localhost:5173`

### ⚠️ Important: Backend API Setup Required

Before running the frontend, ensure your backend API is running with the required endpoints:

**Required User Endpoints:**
- `POST /api/users/register` - Register new user (email, fullName)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details

**Required Product Endpoints:**
- `POST /api/products/register` - Register product (SKU, name, price, quantity)
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `PATCH /api/products/:id/stock` - Update stock quantity (with zero-floor constraint)

**Required Transaction Endpoints:**
- `GET /api/transactions?page=X&limit=Y` - Paginated transaction ledger

---

## 📚 Setup & Configuration Guide

For detailed setup instructions, configuration options, and troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

**Key topics:**
- Environment configuration
- Backend API requirements
- Using the API service layer
- Common issues and solutions
- Production deployment

## 📁 Project Structure

```
src/
├── api/
│   ├── axios.js              # Axios configuration and setup
│   ├── product.api.js        # Product API endpoints
│   ├── transaction.api.js    # Transaction API endpoints
│   └── user.api.js           # User API endpoints
├── components/
│   └── Navbar.jsx            # Navigation component
├── pages/
│   ├── DashboardPage.jsx     # Dashboard view
│   ├── ProductPage.jsx       # Product management view
│   ├── TransactionPage.jsx   # Transaction tracking view
│   └── UserPage.jsx          # User management view
├── routes/                   # Route configuration
├── utils/
│   └── helper.js             # Utility helper functions
├── App.jsx                   # Main App component
├── App.css                   # App-level styles
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## 🎯 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with HMR. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally before deployment.

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality and identify issues.

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided local URL (typically `http://localhost:5173`)

4. Navigate through the application using the navbar:
   - **Dashboard** - View inventory overview
   - **Products** - Manage product inventory
   - **Transactions** - Track inventory movements
   - **Users** - Manage system users

## 🔌 API Integration

The application communicates with the backend API through dedicated modules:

- **axios.js** - Base configuration for HTTP requests
  - Base URL configured via environment variables
  - Default headers and error handling

- **user.api.js** - User registration and management
  - Register new users with email and full name
  - Fetch user list and details

- **product.api.js** - Product management and inventory
  - Register products with SKU, name, price, and quantity
  - Update product stock with inventory constraints
  - Fetch product listings and details

- **transaction.api.js** - Transaction logging and history
  - Retrieve transaction history with pagination
  - Log all stock changes with timestamps

### Example API Call:
```javascript
import api from './api/axios.js';

// Create a user
const response = await api.post('/users/register', {
  email: 'user@example.com',
  fullName: 'John Doe'
});

// Update product stock
await api.patch('/products/SKU123/stock', {
  quantity: 50,
  action: 'increase' // or 'decrease'
});
```

## 🏗️ Architecture & Design

### Frontend Architecture

**Component Structure:**
- **Pages** - Main route-level components (Dashboard, Users, Products, Transactions)
- **Components** - Reusable UI components (Navbar, Forms, Tables, etc.)
- **API Layer** - Dedicated API service modules for backend communication
- **Utils** - Helper functions and utilities

**State Management:**
- React component-level state with `useState`
- Lift state up for shared data between components
- Consider Redux/Zustand for complex state in production

**Validation Strategy:**
- Frontend validation for user experience
- Server-side validation for security (backend responsibility)
- Clear error messages displayed to users

### Data Flow:
1. User interacts with UI component
2. Component submits data to API module
3. API module sends HTTP request to backend
4. Backend validates and persists data
5. Response is handled and UI is updated

### Key Design Decisions:
- **Vite over CRA**: Faster build and dev server, better HMR
- **Tailwind CSS**: Utility-first for rapid responsive design
- **React Router v7**: Lightweight client-side routing
- **Axios**: Simplified HTTP client with interceptor support
- **Modular API Layer**: Easy to test and maintain API calls

### Scalability Considerations:
- Implement Redux or Zustand for complex state management
- Add TypeScript for type safety
- Implement error boundary components
- Add comprehensive logging and monitoring
- Implement caching strategies for API responses
- Add offline support with service workers

## ✅ Validation & Error Handling

### Frontend Validation:
- Email format validation
- Required field validation
- Numeric input validation for prices and quantities
- Stock constraints (prevent negative quantities)
- Real-time form feedback

### Error Handling:
- API error interceptors
- User-friendly error messages
- Loading states during API calls
- Success/failure notifications
- Graceful fallbacks for network failures

### Example Error Handling:
```javascript
try {
  await registerUser({ email, fullName });
  // Show success message
} catch (error) {
  if (error.response?.status === 409) {
    setError('Email already registered');
  } else if (error.response?.status === 400) {
    setError('Invalid input data');
  } else {
    setError('Server error, please try again');
  }
}
```

## 🎨 Styling & UI

The project uses **Tailwind CSS** for styling and responsiveness:
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind
- `src/index.css` - Global styles
- `src/App.css` - Application-level styles

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Tailwind utilities are used for responsive design (e.g., `sm:`, `md:`, `lg:` prefixes)

## 📝 Development Guidelines

- **Code Quality**: Run `npm run lint` to check for code issues
- **Naming Conventions**: Follow React and JavaScript best practices
- **Component Structure**: Keep components modular and reusable
- **API Calls**: Use the dedicated API modules for backend communication
- **Error Handling**: Always wrap API calls with try-catch and provide user feedback

## 📊 Architecture Documentation

For detailed information about the system architecture, API design, database schema, and technical trade-offs, refer to [ARCHITECTURE.md](./ARCHITECTURE.md).

Key topics covered:
- High-level system architecture
- Frontend architecture layers
- Recommended database schema
- RESTful API design and endpoints
- Data flow diagrams
- State management strategy
- Validation and error handling
- Security considerations
- Scalability roadmap

## 🔄 Future Enhancements

- Add TypeScript support for improved type safety
- Implement comprehensive error handling and user feedback
- Add unit and integration testing (Jest, React Testing Library)
- Implement state management (Redux, Zustand, or Context API)
- Add authentication and authorization features
- Create detailed component documentation
- Implement real-time notifications with WebSockets
- Add data export functionality (CSV, PDF)

## 📦 Project Deliverables

This project fulfills the Ellatech Fullstack Developer Internship assignment with:

### ✅ Required Features Implemented
- [x] User registration (email, full name)
- [x] Product registration (SKU, name, price, quantity)
- [x] Inventory management (increase/decrease stock with zero-floor constraint)
- [x] Product dashboard (SKU, quantity, last update timestamp)
- [x] Transaction ledger (paginated historical log)
- [x] Responsive design (Tailwind CSS)

### ✅ Technical Stack
- [x] Frontend: React 19 + Tailwind CSS
- [x] Build Tool: Vite
- [x] Routing: React Router v7
- [x] HTTP Client: Axios
- [x] Code Quality: ESLint

### ✅ Documentation
- [x] README with setup instructions
- [x] Environment configuration (.env.example)
- [x] API documentation in README
- [x] Architecture documentation (ARCHITECTURE.md)
- [x] Database schema recommendations
- [x] Technical design and trade-offs

### ✅ Code Quality
- [x] Modular API layer
- [x] Component-based architecture
- [x] Error handling with user feedback
- [x] Frontend validation
- [x] Clean code structure

## 📞 Support

For issues or questions:
1. Check the README for setup instructions
2. Refer to ARCHITECTURE.md for technical details
3. Review API documentation in ARCHITECTURE.md for endpoint specifications
4. Contact the development team for support

## 📄 License

This project is part of the Inventory Management System - Ellatech Internship Assignment.
