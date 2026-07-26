import Link from "next/link";

const menu = [
  { href: "/dashboard", label: "📊 Dashboard" },
  { href: "/products", label: "📦 Products" },
  { href: "/orders", label: "🛒 Orders" },
  { href: "/customers", label: "👥 Customers" },
  { href: "/generations", label: "🤖 AI Studio" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-8 text-2xl font-bold text-cyan-400">
        MarketPilot
      </h2>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}