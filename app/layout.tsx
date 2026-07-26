import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

export const metadata: Metadata = {
  title: "MarketPilot",
  description: "AI Commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            {/* Верхняя панель */}
            <Navbar />

            {/* Основная область */}
            <div className="flex flex-1">
              {/* Левое меню */}
              <Sidebar />

              {/* Контент */}
              <main className="flex-1 overflow-auto bg-slate-950 p-8">
                {children}
              </main>
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}