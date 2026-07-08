"use client";

import { useState } from "react";

export default function CreatePage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold">📦 Создание карточки товара</h1>

      <p className="mt-3 text-slate-400">
        Заполни данные товара, а MarketPilot подготовит описание, SEO и рекламу.
      </p>

      <div className="mt-10 max-w-2xl space-y-5">
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Название товара"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Категория"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Цена"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Короткое описание товара"
          rows={6}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
        />

        <button
  onClick={async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: productName,
        category,
        price,
        description,
      }),
    });

    const data = await res.json();

    setResult(data.description);
  }}
  className="rounded-xl bg-blue-600 px-8 py-4 font-bold hover:bg-blue-700"
>
  ✨ Сгенерировать
</button>
      </div>
      {result && (
  <div className="mt-8 w-full max-w-2xl rounded-2xl border border-green-500 bg-slate-900 p-6">
    <h2 className="mb-4 text-2xl font-bold text-green-400">
      ✨ Результат генерации
    </h2>
    <pre className="whitespace-pre-wrap text-white">{result}</pre>
    <button
  onClick={() => navigator.clipboard.writeText(result)}
  className="mt-4 rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-700"
>
  📋 Скопировать
</button>
  </div>
)}
    </main>
  );
}