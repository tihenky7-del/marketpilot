import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-8 py-20">

        <h1 className="text-6xl font-bold">
          🚀 MarketPilot
        </h1>

        <p className="text-xl text-gray-400 mt-6 max-w-2xl">
          AI-помощник для продавцов.
          Создавай карточки товаров, описания,
          SEO и рекламу за несколько секунд.
        </p>

        <div className="mt-10 flex gap-4">

          <Link
  href="/dashboard"
  className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
>
  Начать бесплатно
</Link>

          <button className="border border-gray-700 px-8 py-4 rounded-xl text-lg">
            Посмотреть возможности
          </button>

        </div>

      </div>
    </main>
  );
}