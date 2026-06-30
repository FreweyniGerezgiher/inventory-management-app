import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import ProductPage from "./pages/ProductPage";
import TransactionPage from "./pages/TransactionPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <BrowserRouter>
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/transactions" element={<TransactionPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}