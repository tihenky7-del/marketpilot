"use client";

import { useMemo, useState } from "react";

type Customer = {
  key: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
};

export default function CustomersClient({
  customers,
}: {
  customers: Customer[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("spent");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = customers.filter((customer) => {
      if (!query) {
        return true;
      }

      return (
        customer.name.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.city.toLowerCase().includes(query)
      );
    });

    return result.sort((first, second) => {
      if (sort === "orders") {
        return second.ordersCount - first.ordersCount;
      }

      if (sort === "newest") {
        return (
          new Date(second.lastOrderDate).getTime() -
          new Date(first.lastOrderDate).getTime()
        );
      }

      if (sort === "name") {
        return first.name.localeCompare(second.name, "ru");
      }

      return second.totalSpent - first.totalSpent;
    });
  }, [customers, search, sort]);

  function resetFilters() {
    setSearch("");
    setSort("spent");
  }

  return (
    <>
      <div
        style={{
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(260px, 2fr) minmax(190px, 1fr) auto",
            gap: "14px",
            alignItems: "center",
          }}
        >
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="🔍 Имя, телефон, email или город..."
            style={controlStyle}
          />

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            style={controlStyle}
          >
            <option value="spent">
              По сумме покупок
            </option>

            <option value="orders">
              По количеству заказов
            </option>

            <option value="newest">
              По последнему заказу
            </option>

            <option value="name">
              По имени
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
          Найдено клиентов:{" "}
          <strong style={{ color: "#38bdf8" }}>
            {filteredCustomers.length}
          </strong>
        </p>
      </div>

      {filteredCustomers.length === 0 ? (
        <div
          style={{
            padding: "50px",
            textAlign: "center",
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "18px",
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

          <h2>Клиенты не найдены</h2>

          <p style={{ color: "#94a3b8" }}>
            Измени поисковый запрос.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "18px",
          }}
        >
          {filteredCustomers.map((customer) => (
            <article
              key={customer.key}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(190px, 1.2fr) minmax(180px, 1fr) minmax(160px, 1fr) minmax(130px, auto)",
                gap: "20px",
                alignItems: "center",
                padding: "22px",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "16px",
              }}
            >
              <div>
                <p style={captionStyle}>
                  Покупатель
                </p>

                <strong
                  style={{
                    display: "block",
                    color: "#38bdf8",
                    fontSize: "18px",
                  }}
                >
                  {customer.name}
                </strong>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#94a3b8",
                  }}
                >
                  📍 {customer.city}
                </p>
              </div>

              <div>
                <p style={captionStyle}>
                  Контакты
                </p>

                <p
                  style={{
                    margin: "0 0 6px",
                  }}
                >
                  📞 {customer.phone}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#94a3b8",
                    overflowWrap: "anywhere",
                  }}
                >
                  ✉️ {customer.email}
                </p>
              </div>

              <div>
                <p style={captionStyle}>
                  Активность
                </p>

                <strong>
                  📦 {customer.ordersCount} заказов
                </strong>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#94a3b8",
                  }}
                >
                  Последний заказ:{" "}
                  {formatDate(customer.lastOrderDate)}
                </p>
              </div>

              <div
                style={{
                  textAlign: "right",
                }}
              >
                <p style={captionStyle}>
                  Всего покупок
                </p>

                <strong
                  style={{
                    color: "#22c55e",
                    fontSize: "22px",
                  }}
                >
                  {customer.totalSpent} грн
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Не указана";
  }

  return date.toLocaleString("ru-RU");
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
  margin: "0 0 8px",
  color: "#94a3b8",
  fontSize: "14px",
};