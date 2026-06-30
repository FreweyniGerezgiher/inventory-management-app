import { useEffect, useState } from "react";
import { getTransactions } from "../api/transaction.api";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  const load = async () => {
    try {
      const res = await getTransactions(page, 10);
      setTransactions(res.data.data.records || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 via-violet-700 to-fuchsia-500 px-8 py-10 text-white shadow-2xl shadow-violet-500/20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-100">Transactions</p>
          <h1 className="mt-4 text-4xl font-semibold">Track every movement instantly</h1>
          <p className="mt-3 max-w-2xl text-slate-100/90">View ledger entries, monitor activity, and review the latest stock updates from your inventory operations.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Current page</p>
            <p className="mt-4 text-3xl font-semibold">{page}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Entries shown</p>
            <p className="mt-4 text-3xl font-semibold">{transactions.length}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Fast review</p>
            <p className="mt-4 text-3xl font-semibold">Live feed</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Transaction ledger</h2>
            <p className="mt-2 text-slate-600">Review the most recent stock movements and transaction details.</p>
          </div>
          <div className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
            Updated live
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em]">Date</th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em]">Type</th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em]">Amount</th>
                <th className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em]">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-slate-50">
              {transactions.length ? (
                transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-slate-100">
                    <td className="px-6 py-4 text-sm text-slate-700">{transaction.date || "—"}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${transaction.type === "INCREASE" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{transaction.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{transaction.note || "Inventory update"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-sm text-slate-500">
                    No transactions available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">Page {page} showing {transactions.length} entries</div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 hover:bg-slate-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
