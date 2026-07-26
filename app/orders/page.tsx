import fs from "fs";
import path from "path";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import OrdersClient from "./OrdersClient";

export default function OrdersPage() {
  const filePath = path.join(
    process.cwd(),
    "data",
    "orders.json"
  );

  let orders = [];

  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(
        filePath,
        "utf8"
      );

      const parsed = JSON.parse(content);

      orders = Array.isArray(parsed)
        ? parsed
        : [];
    }
  } catch (error) {
    console.error(
      "Ошибка чтения orders.json:",
      error
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <PageHeader
          title="📦 Заказы"
          description="Поиск, фильтрация и управление заказами MarketPilot"
          action={
            <Link
              href="/dashboard"
              style={{
                background: "#2563eb",
                color: "white",
                textDecoration: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              ← В Dashboard
            </Link>
          }
        />

        <OrdersClient orders={orders} />
      </div>
    </main>
  );
}