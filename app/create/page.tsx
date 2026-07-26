'use client';

import { useState } from 'react';

export default function CreatePage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || 'Нічого не отримано');
    } catch (error) {
      setResult('Помилка: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Створити контент</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={4}
            placeholder="Опишіть, що потрібно згенерувати (наприклад: 'Опис для кросівок Nike Air')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Генерую...' : 'Згенерувати'}
          </button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl whitespace-pre-wrap">
            <h2 className="font-semibold mb-2">Результат:</h2>
            <p className="text-gray-800 dark:text-gray-200">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}