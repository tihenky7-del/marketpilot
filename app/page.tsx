import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <main className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
          MarketPilot <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI-помощник для продавцов
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Создавай карточки товаров, описания, SEO и рекламу за несколько секунд.
          Увеличь свои продажи с помощью нейросетей.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create"
            className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
          >
            Начать бесплатно
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Посмотреть возможности
          </Link>
        </div>
      </main>
    </div>
  );
}