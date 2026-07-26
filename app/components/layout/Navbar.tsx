import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/products", label: "Товары" },
  { href: "/orders", label: "Заказы" },
  { href: "/customers", label: "Клиенты" },
  { href: "/generations", label: "AI Studio" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition"
        >
          🚀 MarketPilot
        </Link>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold transition hover:bg-blue-500"
        >
          🛒 Корзина
        </Link>
      </div>
    </header>
  );
}