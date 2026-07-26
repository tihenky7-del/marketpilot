import fs from "fs";
import path from "path";
import Link from "next/link";
import OrderStatus from "../../components/OrderStatus";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const filePath = path.join(
    process.cwd(),
    "data",
    "orders.json"
  );

  const orders = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  const order = orders.find(
    (item: any) => String(item.id) === String(id)
  );

  if (!order) {
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
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h1>❌ Заказ не найден</h1>

          <Link
            href="/orders"
            style={{
              display: "inline-block",
              marginTop: "20px",
              color: "#38bdf8",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ← Назад к заказам
          </Link>
        </div>
      </main>
    );
  }

  const paymentLabel =
    order.payment === "card"
      ? "Оплата картой"
      : "Наложенный платёж";

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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/orders"
          style={{
            color: "#38bdf8",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Все заказы
        </Link>

        <h1
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            fontSize: "42px",
          }}
        >
          📦 Заказ{" "}
          {order.orderNumber || `#${order.id}`}
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: "30px",
            color: "#94a3b8",
          }}
        >
          Создан:{" "}
          {new Date(order.createdAt).toLocaleString("ru-RU")}
        </p>

        <OrderStatus
          orderId={String(order.id)}
          currentStatus={order.status || "Новый"}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          <InfoCard
            title="👤 Покупатель"
            items={[
              ["Имя", order.customer?.name || "Не указано"],
              [
                "Телефон",
                order.customer?.phone || "Не указано",
              ],
              [
                "Email",
                order.customer?.email || "Не указано",
              ],
            ]}
          />

          <InfoCard
            title="🚚 Доставка"
            items={[
              [
                "Город",
                order.customer?.city || "Не указано",
              ],
              [
                "Отделение",
                order.customer?.warehouse || "Не указано",
              ],
              ["Оплата", paymentLabel],
            ]}
          />

          <InfoCard
            title="💰 Стоимость"
            items={[
              [
                "Товары",
                `${Number(order.productsTotal || 0)} грн`,
              ],
              [
                "Доставка",
                `${Number(order.deliveryPrice || 0)} грн`,
              ],
              [
                "Итого",
                `${Number(order.total || 0)} грн`,
              ],
            ]}
          />

          <InfoCard
            title="📋 Информация"
            items={[
              ["Статус", order.status || "Новый"],
              [
                "Комментарий",
                order.comment || "Без комментария",
              ],
            ]}
          />
        </div>

        <section
          style={{
            marginTop: "35px",
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "22px",
            }}
          >
            🛒 Товары в заказе
          </h2>

          {Array.isArray(order.products) &&
          order.products.length > 0 ? (
            order.products.map((product: any) => (
              <div
                key={product.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "80px minmax(0, 1fr) auto",
                  gap: "18px",
                  alignItems: "center",
                  padding: "18px 0",
                  borderBottom: "1px solid #334155",
                }}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid #334155",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#334155",
                      borderRadius: "10px",
                      fontSize: "30px",
                    }}
                  >
                    📷
                  </div>
                )}

                <div>
                  <strong
                    style={{
                      display: "block",
                      marginBottom: "7px",
                      color: "#38bdf8",
                      fontSize: "18px",
                    }}
                  >
                    {product.title}
                  </strong>

                  <span
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    {Number(product.quantity || 0)} ×{" "}
                    {Number(product.price || 0)} грн
                  </span>
                </div>

                <strong
                  style={{
                    color: "#22c55e",
                    fontSize: "19px",
                  }}
                >
                  {Number(product.quantity || 0) *
                    Number(product.price || 0)}{" "}
                  грн
                </strong>
              </div>
            ))
          ) : (
            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Товары в заказе не найдены.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      {items.map(([name, value]) => (
        <div
          key={name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            margin: "14px 0",
            borderBottom: "1px solid #334155",
            paddingBottom: "10px",
          }}
        >
          <span
            style={{
              color: "#94a3b8",
            }}
          >
            {name}
          </span>

          <strong
            style={{
              textAlign: "right",
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </strong>
        </div>
      ))}
    </div>
  );
}