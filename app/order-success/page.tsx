"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "22px",
          padding: "45px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "82px",
            marginBottom: "20px",
          }}
        >
          ✅
        </div>

        <h1
          style={{
            margin: "0 0 15px",
            fontSize: "40px",
            color: "#22c55e",
          }}
        >
          Спасибо за заказ!
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            lineHeight: "1.7",
            marginBottom: "25px",
          }}
        >
          Заказ успешно оформлен. Мы свяжемся с вами для
          подтверждения данных и отправки.
        </p>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "15px",
            padding: "22px",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              color: "#94a3b8",
            }}
          >
            Номер заказа
          </p>

          <strong
            style={{
              fontSize: "24px",
              color: "#38bdf8",
            }}
          >
            {orderId ? `#${orderId}` : "Не найден"}
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <Link
            href="/products"
            style={{
              display: "inline-block",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              padding: "14px 22px",
              borderRadius: "11px",
              fontWeight: "bold",
            }}
          >
            🛍 Продолжить покупки
          </Link>

          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              background: "#475569",
              color: "white",
              textDecoration: "none",
              padding: "14px 22px",
              borderRadius: "11px",
              fontWeight: "bold",
            }}
          >
            📊 В Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}