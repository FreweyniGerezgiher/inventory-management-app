import { useState } from "react";
import { createUser } from "../api/user.api";

export default function UserPage() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      alert("User created successfully");
      setForm({ name: "", email: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-700 to-cyan-600 px-8 py-10 text-white shadow-2xl shadow-cyan-500/20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">Users</p>
          <h1 className="mt-4 text-4xl font-semibold">Add a team member in seconds</h1>
          <p className="mt-3 max-w-2xl text-slate-100/90">Register new users and keep your inventory team organized with a clean registration workflow.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/10 p-6 shadow-lg shadow-slate-950/10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Invite status</p>
            <p className="mt-4 text-3xl font-semibold">Ready to onboard</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-6 shadow-lg shadow-slate-950/10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Team count</p>
            <p className="mt-4 text-3xl font-semibold">Fast growth</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-950">New user registration</h2>
            <p className="mt-2 text-slate-600">Create user accounts for inventory managers, sales staff, or admins.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                type="email"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
              Create User
            </button>
          </form>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-slate-950/5 p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-950">How it works</h2>
            <p className="mt-2 text-slate-600">Registered users can access the inventory system and begin tracking products and transactions.</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Secure access</p>
              <p className="mt-2 text-slate-700">Create accounts with email addresses for team members and control access centrally.</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Fast onboarding</p>
              <p className="mt-2 text-slate-700">Add users quickly so they can start logging inventory changes without delay.</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
