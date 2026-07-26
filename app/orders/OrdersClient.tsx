"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Panel from "../components/Panel";

type Order = {
  id: string | number;
  orderNumber?: string;
  status?: string;
  total?: number | string;
  createdAt?: string;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    city?: string;
  };
};

export default function OrdersClient({
  orders,
}: {
  orders: Order[];
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("Все");
  const [sort, setSort] = useState("newest");

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    const result = orders.filter((order) => {
      const matchesSearch =
        normalizedSearch === "" ||
        String(order.orderNumber || order.id)
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(order.customer?.name || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(order.customer?.phone || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(order.customer?.email || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(order.customer?.city || "")
          .toLowerCase()
          .includes(normalizedSearch);

      const currentStatus =
        order.status || "Новый";

      const matchesStatus =
        statusFilter === "Все" ||
        currentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return result.sort((first, second) => {
      const firstDate = new Date(
        first.createdAt || 0
      ).getTime();

      const secondDate = new Date(
        second.createdAt || 0
      ).getTime();

      if (sort === "oldest") {
        return firstDate - secondDate;
      }

      if (sort === "expensive") {
        return (
          Number(second.total || 0) -
          Number(first.total || 0)
        );
      }

      if (sort === "cheap") {
        return (
          Number(first.total || 0) -
          Number(second.total || 0)
        );
      }

      return secondDate - firstDate;
    });
  }, [orders, search, statusFilter, sort]);

  function resetFilters() {
    setSearch("");
    setStatusFilter("Все");
    setSort("newest");
  }

  return (
    <>
      <Panel
        style={{
          marginBottom: "25px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(240px, 2fr) minmax(180px, 1fr) minmax(180px, 1fr) auto",
            gap: "14px",
            alignItems: "center",
          }}
        >
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="🔍 Номер, имя, телефон, email или город..."
            style={controlStyle}
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            style={controlStyle}
          >
            <option value="Все">
              Все статусы
            </option>
            <option value="Новый">Новые</option>
            <option value="В обработке">
              В обработке
            </option>
            <option value="Отправлен">
              Отправленные
            </option>
            <option value="Выполнен">
              Выполненные
            </option>
            <option value="Отменен">
              Отменённые
            </option>
          </select>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            style={controlStyle}
          >
            <option value="newest">
              Сначала новые
            </option>
            <option value="oldest">
              Сначала старые
            </option>
            <option value="expensive">
              Сначала дорогие
            </option>
            <option value="cheap">
              Сначала дешёвые
            </option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            style={{
              background: "#475569",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "13px 18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Сбросить
          </button>
        </div>

        <p
          style={{
            margin: "16px 0 0",
            color: "#94a3b8",
          }}
        >
          Найдено заказов:{" "}
          <strong style={{ color: "#38bdf8" }}>
            {filteredOrders.length}
          </strong>
        </p>
      </Panel>

      {filteredOrders.length === 0 ? (
        <Panel
          style={{
            padding: "45px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              marginBottom: "15px",
            }}
          >
            🔎
          </div>

          <h2>Заказы не найдены</h2>

          <p style={{ color: "#94a3b8" }}>
            Измени поисковый запрос или фильтр.
          </p>
        </Panel>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "18px",
          }}
        >
          {filteredOrders.map((order) => (
            <Panel
              key={order.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(180px, 1fr) minmax(180px, 1fr) minmax(130px, auto) auto",
                gap: "20px",
                alignItems: "center",
                padding: "22px",
              }}
            >
              <div>
                <p style={captionStyle}>
                  Номер заказа
                </p>

                <strong
                  style={{
                    color: "#38bdf8",
                    fontSize: "18px",
                  }}
                >
                  {order.orderNumber ||
                    `#${order.id}`}
                </strong>
              </div>

              <div>
                <p style={captionStyle}>
                  Покупатель
                </p>

                <strong>
                  {order.customer?.name ||
                    "Не указано"}
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#94a3b8",
                  }}
                >
                  {order.customer?.phone || ""}
                </p>
              </div>

              <div>
                <p style={captionStyle}>
                  Сумма
                </p>

                <strong
                  style={{
                    color: "#22c55e",
                    fontSize: "20px",
                  }}
                >
                  {Number(order.total || 0)} грн
                </strong>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: getStatusColor(
                      order.status || "Новый"
                    ),
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {order.status || "Новый"}
                </span>

                <Link
                  href={`/orders/${order.id}`}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    textDecoration: "none",
                    padding: "10px 16px",
                    borderRadius: "9px",
                    fontWeight: "bold",
                  }}
                >
                  Открыть
                </Link>
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  paddingTop: "15px",
                  borderTop: "1px solid #334155",
                  color: "#94a3b8",
                  fontSize: "14px",
                }}
              >
                📅 {formatDate(order.createdAt)}
                {order.customer?.city
                  ? ` · 📍 ${order.customer.city}`
                  : ""}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </>
  );
}

function formatDate(value?: string) {
  if (!value) {
    return "Дата не указана";
  }

  return new Date(value).toLocaleString(
    "ru-RU"
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "В обработке":
      return "#f59e0b";

    case "Отправлен":
      return "#2563eb";

    case "Выполнен":
      return "#22c55e";

    case "Отменен":
      return "#dc2626";

    default:
      return "#7c3aed";
  }
}

const controlStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px 14px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  fontSize: "15px",
  outline: "none",
};

const captionStyle = {
  margin: "0 0 7px",
  color: "#94a3b8",
  fontSize: "14px",
};