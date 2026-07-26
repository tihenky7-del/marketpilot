import fs from "fs";
import path from "path";
import Link from "next/link";

import StatCard from "../components/ui/StatCard";
import StatusRow from "../components/ui/StatusRow";
import SalesChart from "../components/ui/charts/SalesChart";
import OrdersPieChart from "../components/ui/charts/OrdersPieChart";

const panelStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "18px",
  padding: "25px",
};

const fourColumnsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

export default function DashboardPage() {
  const productsPath = path.join(
    process.cwd(),
    "data",
    "generations.json"
  );

  const ordersPath = path.join(
    process.cwd(),
    "data",
    "orders.json"
  );

  const products = readJsonFile(productsPath);
  const orders = readJsonFile(ordersPath);

  const revenue = orders.reduce(
    (sum: number, order: any) =>
      sum + Number(order.total || 0),
    0
  );

  const newOrders = orders.filter(
    (o: any) =>
      !o.status || o.status === "Новый"
  ).length;

  const processing = orders.filter(
    (o: any) =>
      o.status === "В обработке"
  ).length;

  const shipped = orders.filter(
    (o: any) =>
      o.status === "Отправлен"
  ).length;

  const completed = orders.filter(
    (o: any) =>
      o.status === "Выполнен"
  ).length;

  const cancelled = orders.filter(
    (o: any) =>
      o.status === "Отменен"
  ).length;

  const averageOrder =
    orders.length > 0
      ? Math.round(revenue / orders.length)
      : 0;

  const customers = new Set(
    orders.map(
      (o: any) =>
        o.customer?.phone ||
        o.customer?.email ||
        o.customer?.name ||
        o.id
    )
  ).size;

  const salesByDay =
    getSalesByLastSevenDays(orders);

  const popularProducts =
    getPopularProducts(orders);
    console.log("orders:", orders);
console.log("popularProducts:", popularProducts);

  const latestOrders = [...orders]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const ordersChartData = [
    {
      name: "Новые",
      value: newOrders,
    },
    {
      name: "В обработке",
      value: processing,
    },
    {
      name: "Отправлено",
      value: shipped,
    },
    {
      name: "Выполнено",
      value: completed,
    },
    {
      name: "Отменено",
      value: cancelled,
    },
  ];

  return (    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "42px",
                marginBottom: "8px",
              }}
            >
              📊 Dashboard
            </h1>

            <p style={{ color: "#94a3b8" }}>
              Аналитика магазина MarketPilot
            </p>
          </div>

          <Link
            href="/orders"
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            📦 Управление заказами
          </Link>
        </div>

        <section style={fourColumnsStyle}>
          <StatCard
            title="📦 Заказы"
            value={orders.length}
          />

          <StatCard
            title="🛒 Товары"
            value={products.length}
            color="#22c55e"
          />

          <StatCard
            title="💰 Выручка"
            value={`${revenue} грн`}
            color="#f59e0b"
          />

          <StatCard
            title="🧾 Средний чек"
            value={`${averageOrder} грн`}
            color="#a78bfa"
          />
        </section>

        <section
          style={{
            ...fourColumnsStyle,
            marginTop: 20,
          }}
        >
          <StatCard
            title="🟣 Новые"
            value={newOrders}
            color="#a78bfa"
          />

          <StatCard
            title="🟡 В обработке"
            value={processing}
            color="#f59e0b"
          />

          <StatCard
            title="🔵 Отправлено"
            value={shipped}
            color="#38bdf8"
          />

          <StatCard
            title="👥 Покупатели"
            value={customers}
            color="#22c55e"
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={panelStyle}>
            <h2>📈 Продажи за 7 дней</h2>

            <SalesChart
              data={salesByDay}
            />
          </div>

          <div style={panelStyle}>
            <h2>🥧 Статусы заказов</h2>

            <OrdersPieChart
              data={ordersChartData}
            />

            <div style={{ marginTop: 20 }}>
              <StatusRow
                title="Новые"
                value={newOrders}
                total={orders.length}
                color="#a78bfa"
              />

              <StatusRow
                title="В обработке"
                value={processing}
                total={orders.length}
                color="#f59e0b"
              />

              <StatusRow
                title="Отправлено"
                value={shipped}
                total={orders.length}
                color="#38bdf8"
              />

              <StatusRow
                title="Выполнено"
                value={completed}
                total={orders.length}
                color="#22c55e"
              />

              <StatusRow
                title="Отменено"
                value={cancelled}
                total={orders.length}
                color="#ef4444"
              />
            </div>
          </div>
        </section>        <section
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={panelStyle}>
            <h2>🕒 Последние заказы</h2>

            {latestOrders.length === 0 ? (
              <p>Заказов пока нет.</p>
            ) : (
              latestOrders.map((order: any) => (
                <div
                  key={order.id}
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid #334155",
                  }}
                >
                  <strong>
                    {order.orderNumber || order.id}
                  </strong>

                  <div>
                    {order.customer?.name || "Без имени"}
                  </div>

                  <div>
                    {Number(order.total || 0)} грн
                  </div>

                  <div>
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={panelStyle}>
            <h2>🔥 Популярные товары</h2>

            {popularProducts.length === 0 ? (
              <p>Нет данных</p>
            ) : (
              popularProducts.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #334155",
                  }}
                >
                  <strong>{item.title}</strong>

                  <div>
                    Продано: {item.quantity}
                  </div>

                  <div>
                    {item.revenue} грн
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}function readJsonFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function formatDate(date: string) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("ru-RU");
}

function getSalesByLastSevenDays(orders: any[]) {
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);

    const key = day.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });

    const total = orders
      .filter((o: any) => {
        if (!o.createdAt) return false;

        return (
          new Date(o.createdAt).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
          }) === key
        );
      })
      .reduce(
        (sum: number, o: any) => sum + Number(o.total || 0),
        0
      );

    result.push({
      label: key,
      total,
    });
  }

  return result;
}

function getPopularProducts(orders: any[]) {
  const map = new Map();

  orders.forEach((order: any) => {
    (order.products || []).forEach((item: any) => {
      if (!map.has(item.id)) {
        map.set(item.id, {
          id: item.id,
          title: item.title,
          quantity: 0,
          revenue: 0,
        });
      }

      const p = map.get(item.id);

      p.quantity += Number(item.quantity || 1);
      p.revenue +=
        Number(item.price || 0) *
        Number(item.quantity || 1);
    });
  });

  return [...map.values()]
    .sort((a: any, b: any) => b.quantity - a.quantity)
    .slice(0, 5);
}