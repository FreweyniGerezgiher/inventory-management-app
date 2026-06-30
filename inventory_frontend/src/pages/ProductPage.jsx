import { useEffect, useState } from "react";
import {
  createProduct,
  getProducts,
  updateStock,
} from "../api/product.api";

const getProductId = (product) => product._id || product.id;
const getProductKey = (product, index) => product._id || product.id || `${product.sku}-${index}`;

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ sku: "", name: "", price: "", quantity: "" });

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    try {
      await createProduct(payload);
      await loadProducts();
      setForm({ sku: "", name: "", price: "", quantity: "" });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to create product");
    }
  };

  const changeStock = async (id, type) => {
    if (!id) {
      console.warn("Product id is missing, cannot update stock.");
      return;
    }

    try {
      await updateStock(id, { type, amount: 1 });
      await loadProducts();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to update stock");
    }
  };

  const totalStock = products.reduce((sum, product) => sum + Number(product.quantity || 0), 0);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-emerald-600 via-cyan-500 to-slate-900 px-8 py-10 text-white shadow-2xl shadow-emerald-500/20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">Products</p>
          <h1 className="mt-4 text-4xl font-bold">Manage your inventory with style</h1>
          <p className="mt-3 max-w-2xl text-slate-100/90">Add new items, monitor stock levels, and update inventory quantities from a clean product dashboard.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-950/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Total products</p>
            <p className="mt-4 text-3xl font-semibold">{products.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Total stock</p>
            <p className="mt-4 text-3xl font-semibold">{totalStock}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Max quantity</p>
            <p className="mt-4 text-3xl font-semibold text-emerald-200">
              {products.length ? Math.max(...products.map((product) => Number(product.quantity || 0))) : 0}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Add a product</h2>
              <p className="mt-2 text-slate-600">Capture SKU, price, and stock quantity before saving.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Quick entry
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                placeholder="SKU"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                type="number"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Add Product
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-slate-950/5 p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-950">Stock insights</h2>
            <p className="mt-2 text-slate-600">Adjust inventory levels directly from the product list.</p>
          </div>

          {products.length ? (
            <div className="space-y-4">
              {products.map((product, index) => {
                const productId = getProductId(product);

                return (
                  <div key={getProductKey(product, index)} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-slate-950">{product.name}</p>
                        <p className="text-sm text-slate-500">SKU {product.sku}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Qty {product.quantity}</span>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">${product.price}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={!productId}
                        onClick={() => changeStock(productId, "INCREASE")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition ${productId ? "bg-emerald-500 hover:bg-emerald-400" : "cursor-not-allowed bg-slate-300 text-slate-600"}`}
                      >
                        Increase
                      </button>
                      <button
                        type="button"
                        disabled={!productId}
                        onClick={() => changeStock(productId, "DECREASE")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition ${productId ? "bg-rose-500 hover:bg-rose-400" : "cursor-not-allowed bg-slate-300 text-slate-600"}`}
                      >
                        Decrease
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              No products available yet. Add your first product above.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
