import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/users", label: "Users" },
  { to: "/products", label: "Products" },
  { to: "/transactions", label: "Transactions" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-semibold text-slate-950 shadow-lg shadow-emerald-500/20">
            I
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Inventory Pro</p>
            <p className="text-sm text-slate-400">Manage products, users, and transactions</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
