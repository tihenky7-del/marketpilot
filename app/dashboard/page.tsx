import Link from "next/link";
export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">🚀 MarketPilot</h2>

          <nav className="mt-10 space-y-3 text-slate-300">
            <div className="rounded-xl bg-slate-800 px-4 py-3 text-white">📊 Dashboard</div>
            <div className="rounded-xl px-4 py-3 hover:bg-slate-800">📦 Товары</div>
            <div className="rounded-xl px-4 py-3 hover:bg-slate-800">🤖 AI-помощник</div>
            <div className="rounded-xl px-4 py-3 hover:bg-slate-800">⚙️ Настройки</div>
          </nav>
        </aside>

        <section className="flex-1 p-10">
          <h1 className="text-4xl font-bold">Панель управления</h1>
          <p className="mt-3 text-slate-400">
            Добро пожаловать в MarketPilot. Начни с создания первой карточки товара.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold">📦 Создать товар</h3>
              <p className="mt-3 text-slate-400">
                Добавь товар и получи описание, SEO и рекламный текст.
              </p>
              <Link
  href="/create"
  className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
>
  <Link
  href="/create"
  className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
>
  Создать карточку
</Link>
</Link>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold">🤖 AI-генерации</h3>
              <p className="mt-3 text-slate-400">
                Здесь будет история созданных описаний и рекламных текстов.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold">📈 SEO</h3>
              <p className="mt-3 text-slate-400">
                Подбирай ключевые слова для OLX, Prom и Instagram.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}