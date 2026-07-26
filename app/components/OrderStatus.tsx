"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = [
  "Новый",
  "В обработке",
  "Отправлен",
  "Выполнен",
  "Отменен",
];

export default function OrderStatus({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();

  const [status, setStatus] = useState(
    currentStatus || "Новый"
  );

  const [saving, setSaving] = useState(false);

  async function saveStatus() {
    try {
      setSaving(true);

      const response = await fetch(
        "/api/orders/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: orderId,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.error || "Не удалось обновить статус"
        );
        return;
      }

      alert("Статус заказа обновлён!");
      router.refresh();
    } catch (error) {
      console.error(
        "Ошибка обновления статуса:",
        error
      );

      alert("Ошибка обновления статуса");
    } finally {
      setSaving(false);
    }
  }

  const statusChanged = status !== currentStatus;

  return (
    <section
      style={{
        marginTop: "30px",
        padding: "24px",
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "18px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "18px",
        }}
      >
        📋 Управление статусом
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          style={{
            minWidth: "220px",
            padding: "13px 15px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={saveStatus}
          disabled={saving || !statusChanged}
          style={{
            padding: "13px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#22c55e",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor:
              saving || !statusChanged
                ? "not-allowed"
                : "pointer",
            opacity:
              saving || !statusChanged
                ? 0.55
                : 1,
          }}
        >
          {saving
            ? "⏳ Сохраняем..."
            : "💾 Сохранить статус"}
        </button>
      </div>

      <p
        style={{
          marginBottom: 0,
          marginTop: "15px",
          color: "#94a3b8",
        }}
      >
        Выбранный статус:{" "}
        <strong
          style={{
            color: getStatusColor(status),
          }}
        >
          {status}
        </strong>
      </p>
    </section>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "В обработке":
      return "#f59e0b";

    case "Отправлен":
      return "#38bdf8";

    case "Выполнен":
      return "#22c55e";

    case "Отменен":
      return "#ef4444";

    default:
      return "#a78bfa";
  }
}