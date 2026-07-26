"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const deliveryPrice = totalPrice >= 2000 ? 0 : 100;
  const finalPrice = totalPrice + deliveryPrice;

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
          href="/products"
          style={{
            color: "#38bdf8",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Продолжить покупки
        </Link>

        <h1
          style={{
            marginTop: "20px",
            marginBottom: "30px",
            fontSize: "42px",
          }}
        >
          🛒 Корзина
        </h1>

        {cart.length === 0 ? (
          <div
            style={{
              padding: "45px",
              textAlign: "center",
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "18px",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "15px",
              }}
            >
              🛒
            </div>

            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              Корзина пока пустая
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "25px",
              }}
            >
              Добавь товары из каталога.
            </p>

            <Link
              href="/products"
              style={{
                display: "inline-block",
                background: "#2563eb",
                color: "white",
                textDecoration: "none",
                padding: "13px 22px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Перейти к товарам
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(0, 2fr) minmax(280px, 1fr)",
              gap: "25px",
              alignItems: "start",
            }}
          >
            <section>
              {cart.map((item) => (
                <article
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "120px minmax(0, 1fr) auto",
                    gap: "20px",
                    alignItems: "center",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    padding: "20px",
                    borderRadius: "16px",
                    marginBottom: "15px",
                  }}
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "1px solid #334155",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        background: "#334155",
                        fontSize: "42px",
                      }}
                    >
                      📷
                    </div>
                  )}

                  <div>
                    <Link
                      href={`/products/${item.id}`}
                      style={{
                        color: "#38bdf8",
                        textDecoration: "none",
                      }}
                    >
                      <h2
                        style={{
                          margin: "0 0 10px",
                          fontSize: "22px",
                        }}
                      >
                        {item.title}
                      </h2>
                    </Link>

                    <p
                      style={{
                        margin: "0 0 14px",
                        color: "#22c55e",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.price} грн
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        style={quantityButtonStyle}
                      >
                        −
                      </button>

                      <strong
                        style={{
                          minWidth: "30px",
                          textAlign: "center",
                          fontSize: "18px",
                        }}
                      >
                        {item.quantity}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        style={quantityButtonStyle}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 18px",
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      {Number(item.price) * item.quantity} грн
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside
              style={{
                position: "sticky",
                top: "25px",
                background: "#1e293b",
                border: "1px solid #334155",
                padding: "25px",
                borderRadius: "18px",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: "22px",
                }}
              >
                Итоги заказа
              </h2>

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

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #334155",
                  margin: "20px 0",
                }}
              />

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

              {deliveryPrice > 0 && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "#94a3b8",
                    lineHeight: "1.5",
                  }}
                >
                  До бесплатной доставки осталось{" "}
                  <strong style={{ color: "white" }}>
                    {2000 - totalPrice} грн
                  </strong>
                </p>
              )}

              <button
                type="button"
                onClick={() => router.push("/checkout")}
                style={{
                  marginTop: "24px",
                  width: "100%",
                  padding: "17px",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "19px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                💳 Оформить заказ
              </button>
            </aside>
          </div>
        )}
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

const quantityButtonStyle = {
  width: "38px",
  height: "38px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "22px",
  fontWeight: "bold",
};