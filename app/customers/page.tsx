import fs from "fs";
import path from "path";
import Link from "next/link";
import CustomersClient from "./CustomersClient";

type CustomerData = {
  key: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
};

export default function CustomersPage() {
  const ordersPath = path.join(
    process.cwd(),
    "data",
    "orders.json"
  );

  const orders = readOrders(ordersPath);
  const customers = collectCustomers(orders);

  const totalRevenue = orders.reduce(
    (sum: number, order: any) =>
      sum + Number(order.total || 0),
    0
  );

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
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "42px",
              }}
            >
              👥 Клиенты
            </h1>

            <p
              style={{
                margin: 0,
                color: "#94a3b8",
              }}
            >
              Клиентская база MarketPilot
            </p>
          </div>

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
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <StatCard
            title="👥 Всего клиентов"
            value={customers.length}
            color="#38bdf8"
          />

          <StatCard
            title="📦 Всего заказов"
            value={orders.length}
            color="#a78bfa"
          />

          <StatCard
            title="💰 Общая выручка"
            value={`${totalRevenue} грн`}
            color="#22c55e"
          />

          <StatCard
            title="🧾 Средний клиент"
            value={`${getAverageCustomerValue(
              customers
            )} грн`}
            color="#f59e0b"
          />
        </section>

        <CustomersClient customers={customers} />
      </div>
    </main>
  );
}

function readOrders(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const content = fs.readFileSync(
      filePath,
      "utf8"
    );

    const data = JSON.parse(content);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(
      "Ошибка чтения orders.json:",
      error
    );

    return [];
  }
}

function collectCustomers(
  orders: any[]
): CustomerData[] {
  const customerMap = new Map<
    string,
    CustomerData
  >();

  orders.forEach((order: any) => {
    const customer = order.customer || {};

    const key = String(
      customer.phone ||
        customer.email ||
        customer.name ||
        order.id
    )
      .trim()
      .toLowerCase();

    const orderDate =
      order.createdAt ||
      new Date(0).toISOString();

    const existing = customerMap.get(key);

    if (existing) {
      existing.ordersCount += 1;
      existing.totalSpent += Number(
        order.total || 0
      );

      if (
        new Date(orderDate).getTime() >
        new Date(
          existing.lastOrderDate
        ).getTime()
      ) {
        existing.lastOrderDate = orderDate;
      }

      return;
    }

    customerMap.set(key, {
      key,
      name:
        customer.name || "Имя не указано",
      phone:
        customer.phone ||
        "Телефон не указан",
      email:
        customer.email ||
        "Email не указан",
      city:
        customer.city ||
        "Город не указан",
      ordersCount: 1,
      totalSpent: Number(order.total || 0),
      lastOrderDate: orderDate,
    });
  });

  return Array.from(
    customerMap.values()
  ).sort(
    (first, second) =>
      second.totalSpent - first.totalSpent
  );
}

function getAverageCustomerValue(
  customers: CustomerData[]
) {
  if (customers.length === 0) {
    return 0;
  }

  const total = customers.reduce(
    (sum, customer) =>
      sum + customer.totalSpent,
    0
  );

  return Math.round(
    total / customers.length
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "16px",
        padding: "22px",
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          color: "#94a3b8",
        }}
      >
        {title}
      </p>

      <strong
        style={{
          display: "block",
          color,
          fontSize: "30px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}