import { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import { getTransactions } from "../api/transaction.api";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, transactionRes] = await Promise.all([
          getProducts(),
          getTransactions(1, 5),
        ]);

        setProducts(productRes.data.data || []);
        setTransactions(transactionRes.data.data.records || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  const totalStock = products.reduce((sum, product) => sum + Number(product.quantity || 0), 0);
  const totalProducts = products.length;
  const totalTransactions = transactions.length;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Inventory overview</h1>
            <p className="mt-3 max-w-2xl text-slate-600">Keep an eye on key inventory metrics and recent activity from one central dashboard.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Products</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{totalProducts}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total stock</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{totalStock}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Recent transactions</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{totalTransactions}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.8fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Stock insights</h2>
              <p className="mt-2 text-slate-600">Recent items and current inventory health.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Updated now
            </span>
          </div>

          <div className="space-y-4">
            {products.length ? (
              products.slice(0, 5).map((product) => (
                <div key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-950">{product.name}</p>
                      <p className="text-sm text-slate-600">SKU: {product.sku}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">Stock: {product.quantity}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                No products loaded yet.
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Recent transactions</h2>
          <p className="mt-2 text-slate-600">Latest activity from your inventory movement.</p>

          <div className="mt-6 space-y-4">
            {transactions.length ? (
              transactions.map((transaction, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <p className="font-semibold text-slate-950">{transaction.type}</p>
                  <p className="mt-1 text-sm text-slate-600">Amount: {transaction.amount}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                No recent transactions yet.
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
