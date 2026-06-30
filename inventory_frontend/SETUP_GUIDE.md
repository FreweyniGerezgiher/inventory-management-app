# Frontend Setup & Getting Started Guide

## Quick Start (5 minutes)

### Prerequisites
- Node.js v16+ installed
- npm or yarn package manager
- Backend API running on `http://localhost:3000` (configurable)

### Installation
```bash
cd inventory_frontend
npm install
```

### Start Development Server
```bash
npm run dev
```

Open browser to `http://localhost:5173`

---

## Configuration

### Environment Setup
Create or update `.env.local` in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Inventory Management System
VITE_ITEMS_PER_PAGE=10
VITE_ENABLE_DEBUG_MODE=false
```

**If your backend runs on a different port or server:**
```env
VITE_API_BASE_URL=http://your-backend-url:port/api
```

### Common Port Configurations
- **Local Development**: `http://localhost:3000/api`
- **Different Machine**: `http://192.168.x.x:3000/api`
- **Production**: `https://api.yourdomain.com/api`

---

## Available Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Check code quality
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## Project Structure Quick Reference

```
src/
├── api/                    # API service layer
│   ├── axios.js           # Axios configuration
│   ├── user.api.js        # User endpoints
│   ├── product.api.js     # Product endpoints
│   └── transaction.api.js # Transaction endpoints
├── pages/                 # Page components (routes)
│   ├── DashboardPage.jsx     # Dashboard
│   ├── UserPage.jsx          # User management
│   ├── ProductPage.jsx       # Product management
│   └── TransactionPage.jsx   # Transaction history
├── components/            # Reusable components
│   └── Navbar.jsx         # Navigation
├── utils/                 # Helper functions
│   └── helper.js
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

---

## Using the API Service Layer

### Example: Creating a User

```javascript
// In UserPage.jsx
import { createUser } from '../api/user.api';

const handleRegister = async (email, fullName) => {
  try {
    const response = await createUser({ email, fullName });
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data?.message);
  }
};
```

### Example: Updating Product Stock

```javascript
// In ProductPage.jsx
import { updateStock } from '../api/product.api';

const handleStockChange = async (productId, quantity, action) => {
  try {
    const response = await updateStock(productId, { quantity, action });
    console.log('Stock updated:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data?.message);
  }
};
```

### Example: Getting Paginated Transactions

```javascript
// In TransactionPage.jsx
import { getTransactions } from '../api/transaction.api';

const handlePageChange = async (page, limit) => {
  try {
    const response = await getTransactions(page, limit);
    setTransactions(response.data.data.records);
    setTotal(response.data.data.total);
  } catch (error) {
    console.error('Error:', error.response?.data?.message);
  }
};
```

---

## Backend API Requirements

### User Endpoints Required

```
POST /api/users/register
  Input: { email, fullName }
  Output: { id, email, fullName, createdAt }
  Status: 201 on success, 409 if email exists, 400 if invalid

GET /api/users
  Output: [{ id, email, fullName, createdAt }, ...]
  Status: 200

GET /api/users/:id
  Output: { id, email, fullName, createdAt }
  Status: 200 or 404
```

### Product Endpoints Required

```
POST /api/products/register
  Input: { sku, name, price, quantity }
  Output: { id, sku, name, price, quantity, createdAt }
  Status: 201 on success, 409 if SKU exists, 400 if invalid

GET /api/products
  Output: [{ id, sku, name, price, quantity, lastUpdated }, ...]
  Status: 200

GET /api/products/:id
  Output: { id, sku, name, price, quantity, lastUpdated }
  Status: 200 or 404

PATCH /api/products/:id/stock
  Input: { quantity, action } // action: 'increase' or 'decrease'
  Output: { id, sku, quantity, lastUpdated }
  Status: 200 on success, 409 if insufficient stock, 400 if invalid
```

### Transaction Endpoints Required

```
GET /api/transactions?page=1&limit=10
  Output: { 
    transactions: [
      { id, sku, action, quantityChanged, newQuantity, timestamp },
      ...
    ],
    total: number,
    page: number,
    limit: number,
    pages: number
  }
  Status: 200
```

---

## Troubleshooting

### "Cannot connect to API" Error
- Check if backend is running on `http://localhost:3000`
- Verify `VITE_API_BASE_URL` in `.env.local`
- Check browser console for CORS errors
- Ensure backend has CORS enabled

### "Module not found" Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working
- Check if Vite server is running
- Try refreshing the page (F5)
- Restart the dev server: `npm run dev`

### Port 5173 Already in Use
```bash
# Use a different port
npm run dev -- --port 5174
```

---

## Development Tips

### Adding a New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navbar link in `src/components/Navbar.jsx`

### Adding an API Module
1. Create `src/api/new.api.js`
2. Export functions for API calls
3. Use Axios instance from `axios.js`

### State Management
- Use `useState` for local component state
- Lift state up to parent components for sharing
- Consider Redux/Zustand for complex state later

### Styling
- Use Tailwind CSS utility classes
- Avoid custom CSS when possible
- Refer to `tailwind.config.js` for customization

---

## Building for Production

### Create Optimized Build
```bash
npm run build
```

### Output
- Generated in `dist/` folder
- Ready to deploy to any static hosting

### Deployment Options
- **Vercel**: `git push` and auto-deploy
- **Netlify**: Connect GitHub repo
- **AWS S3 + CloudFront**: Upload `dist/` folder
- **Traditional Server**: Serve files with web server

### Pre-deployment Checklist
- [ ] Update `VITE_API_BASE_URL` for production backend
- [ ] Run `npm run lint` to check code quality
- [ ] Test all pages and features
- [ ] Check responsive design on mobile
- [ ] Verify error handling works

---

## Additional Resources

- **React Documentation**: https://react.dev
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Router Docs**: https://reactrouter.com
- **Axios Docs**: https://axios-http.com

---

## Architecture & Design

For detailed information about:
- System architecture
- Database schema recommendations
- API design patterns
- Technical trade-offs
- Scalability considerations

See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Support & Questions

1. Check README.md for overview
2. Review ARCHITECTURE.md for technical details
3. Check API endpoint specs in this guide
4. Review component structure in `src/`
5. Refer to browser console for errors

---

**Last Updated**: June 30, 2026
**Frontend Version**: 1.0.0
