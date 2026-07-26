import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-6">
        {/* Логотип */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-cyan-400"
        >
          🚀 MarketPilot
        </Link>

        {/* Поиск */}
        <div className="hidden w-full max-w-md px-8 lg:block">
          <input
            type="text"
            placeholder="Поиск товаров, заказов, клиентов..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-4">
          <button className="rounded-xl bg-slate-800 px-3 py-2 hover:bg-slate-700">
            🔔
          </button>

          <Link
            href="/cart"
            className="rounded-xl bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
          >
            🛒 Корзина
          </Link>

          <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
              A
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-slate-400">Owner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}