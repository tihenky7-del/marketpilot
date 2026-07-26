"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, totalPrice } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [payment, setPayment] = useState("cash");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  const deliveryPrice = totalPrice >= 2000 ? 0 : 100;
  const finalPrice = totalPrice + deliveryPrice;

  async function submitOrder() {
    if (!name.trim()) {
      alert("Введите имя");
      return;
    }

    if (!phone.trim()) {
      alert("Введите номер телефона");
      return;
    }

    if (!city.trim()) {
      alert("Введите город");
      return;
    }

    if (!warehouse.trim()) {
      alert("Введите отделение или адрес доставки");
      return;
    }

    if (cart.length === 0) {
      alert("Корзина пустая");
      return;
    }

    try {
      setSending(true);

      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name,
            phone,
            email,
            city,
            warehouse,
          },
          payment,
          comment,
          products: cart,
          productsTotal: totalPrice,
          deliveryPrice,
          total: finalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Не удалось оформить заказ");
        return;
      }

      router.push(`/order-success?id=${data.order.id}`);
    } catch (error) {
      console.error(error);
      alert("Ошибка оформления заказа");
    } finally {
      setSending(false);
    }
  }

  if (cart.length === 0) {
    return (
      <main style={pageStyle}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div style={emptyStyle}>
            <div
              style={{
                fontSize: "64px",
                marginBottom: "15px",
              }}
            >
              🛒
            </div>

            <h1>Корзина пустая</h1>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "25px",
              }}
            >
              Сначала добавь товары в корзину.
            </p>

            <Link href="/products" style={catalogButtonStyle}>
              Перейти к товарам
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/cart"
          style={{
            color: "#38bdf8",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Вернуться в корзину
        </Link>

        <h1
          style={{
            fontSize: "42px",
            margin: "20px 0 30px",
          }}
        >
          📦 Оформление заказа
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.6fr) minmax(300px, 1fr)",
            gap: "25px",
            alignItems: "start",
          }}
        >
          <section style={panelStyle}>
            <h2 style={sectionTitleStyle}>
              👤 Данные покупателя
            </h2>

            <div style={formGridStyle}>
              <label>
                <span style={labelStyle}>Имя *</span>
                <input
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Введите имя"
                  style={inputStyle}
                />
              </label>

              <label>
                <span style={labelStyle}>Телефон *</span>
                <input
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="+380..."
                  style={inputStyle}
                />
              </label>

              <label>
                <span style={labelStyle}>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="example@email.com"
                  style={inputStyle}
                />
              </label>

              <label>
                <span style={labelStyle}>Город *</span>
                <input
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                  placeholder="Например: Киев"
                  style={inputStyle}
                />
              </label>

              <label>
                <span style={labelStyle}>
                  Отделение или адрес доставки *
                </span>

                <input
                  value={warehouse}
                  onChange={(event) =>
                    setWarehouse(event.target.value)
                  }
                  placeholder="Например: Новая Почта №12"
                  style={inputStyle}
                />
              </label>
            </div>

            <h2
              style={{
                ...sectionTitleStyle,
                marginTop: "35px",
              }}
            >
              💳 Способ оплаты
            </h2>

            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              <label style={paymentOptionStyle}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={payment === "cash"}
                  onChange={(event) =>
                    setPayment(event.target.value)
                  }
                />

                <span>
                  💵 Наложенный платёж
                </span>
              </label>

              <label style={paymentOptionStyle}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={(event) =>
                    setPayment(event.target.value)
                  }
                />

                <span>
                  💳 Оплата картой
                </span>
              </label>
            </div>

            <label
              style={{
                display: "block",
                marginTop: "30px",
              }}
            >
              <span style={labelStyle}>
                Комментарий к заказу
              </span>

              <textarea
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                placeholder="Дополнительная информация"
                rows={5}
                style={textareaStyle}
              />
            </label>
          </section>

          <aside style={summaryPanelStyle}>
            <h2
              style={{
                marginTop: 0,
                marginBottom: "22px",
              }}
            >
              Ваш заказ
            </h2>

            <div
              style={{
                display: "grid",
                gap: "15px",
                marginBottom: "22px",
              }}
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr auto",
                    gap: "12px",
                    alignItems: "center",
                  }}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "9px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "9px",
                        background: "#334155",
                        fontSize: "25px",
                      }}
                    >
                      📷
                    </div>
                  )}

                  <div>
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      {item.title}
                    </strong>

                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                      }}
                    >
                      {item.quantity} шт. × {item.price} грн
                    </span>
                  </div>

                  <strong>
                    {Number(item.price) * item.quantity} грн
                  </strong>
                </div>
              ))}
            </div>

            <hr style={dividerStyle} />

            <SummaryRow
              title="Товары"
              value={`${totalPrice} грн`}
            />

            <SummaryRow
              title="Доставка"
              value={
                deliveryPrice === 0
                  ? "Бесплатно"
                  : `${deliveryPrice} грн`
              }
            />

            <hr style={dividerStyle} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              <span>Итого</span>

              <span style={{ color: "#22c55e" }}>
                {finalPrice} грн
              </span>
            </div>

            <button
              type="button"
              onClick={submitOrder}
              disabled={sending}
              style={{
                marginTop: "25px",
                width: "100%",
                padding: "17px",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: sending ? "not-allowed" : "pointer",
                opacity: sending ? 0.6 : 1,
              }}
            >
              {sending
                ? "⏳ Оформляем..."
                : "✅ Подтвердить заказ"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        marginBottom: "14px",
        color: "#cbd5e1",
      }}
    >
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "40px",
};

const panelStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "18px",
  padding: "28px",
};

const summaryPanelStyle = {
  ...panelStyle,
  position: "sticky" as const,
  top: "25px",
};

const sectionTitleStyle = {
  marginTop: 0,
  marginBottom: "22px",
  fontSize: "26px",
};

const formGridStyle = {
  display: "grid",
  gap: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#cbd5e1",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "14px",
  borderRadius: "11px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  lineHeight: "1.6",
};

const paymentOptionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "15px",
  borderRadius: "11px",
  background: "#0f172a",
  border: "1px solid #334155",
  cursor: "pointer",
};

const dividerStyle = {
  border: "none",
  borderTop: "1px solid #334155",
  margin: "20px 0",
};

const emptyStyle = {
  padding: "50px",
  textAlign: "center" as const,
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "18px",
};

const catalogButtonStyle = {
  display: "inline-block",
  background: "#2563eb",
  color: "white",
  textDecoration: "none",
  padding: "13px 22px",
  borderRadius: "10px",
  fontWeight: "bold",
};