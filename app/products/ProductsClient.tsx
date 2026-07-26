"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ProductsClient({
  products,
}: {
  products: any[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("marketpilot-favorites");

    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem(
        "marketpilot-favorites",
        JSON.stringify(next)
      );

      return next;
    });
  }

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((item) => item.category?.trim())
          .filter(Boolean)
      )
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((item) => {
      const id = String(item.id);
      const title = String(item.title || "").toLowerCase();
      const itemCategory = String(item.category || "");

      const matchesSearch = title.includes(
        search.toLowerCase().trim()
      );

      const matchesCategory =
        category === "all" || itemCategory === category;

      const matchesFavorite =
        !favoritesOnly || favorites.includes(id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFavorite
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") {
        return Number(a.price || 0) - Number(b.price || 0);
      }

      if (sort === "price-high") {
        return Number(b.price || 0) - Number(a.price || 0);
      }

      if (sort === "oldest") {
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
  }, [
    products,
    search,
    category,
    sort,
    favoritesOnly,
    favorites,
  ]);

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setSort("newest");
    setFavoritesOnly(false);
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(240px, 2fr) minmax(180px, 1fr) minmax(190px, 1fr) auto auto",
          gap: "12px",
          marginBottom: "18px",
          alignItems: "center",
        }}
      >
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="🔍 Поиск товара..."
          style={controlStyle}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          style={controlStyle}
        >
          <option value="all">Все категории</option>

          {categories.map((item) => (
            <option key={String(item)} value={String(item)}>
              {String(item)}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          style={controlStyle}
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="price-low">Цена: по возрастанию</option>
          <option value="price-high">Цена: по убыванию</option>
        </select>

        <button
          type="button"
          onClick={() => setFavoritesOnly((value) => !value)}
          style={{
            ...buttonStyle,
            background: favoritesOnly ? "#be123c" : "#475569",
          }}
        >
          {favoritesOnly ? "❤️ Избранные" : "🤍 Избранное"}
        </button>

        <button
          type="button"
          onClick={resetFilters}
          style={buttonStyle}
        >
          Сбросить
        </button>
      </div>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "25px",
        }}
      >
        Найдено товаров:{" "}
        <strong style={{ color: "white" }}>
          {filteredProducts.length}
        </strong>
      </p>

      {filteredProducts.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "16px",
            color: "#94a3b8",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>
            🔍
          </div>

          Товары по заданным фильтрам не найдены.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((item: any) => {
            const id = String(item.id);
            const isFavorite = favorites.includes(id);

            return (
              <article
  className="product-card"
                key={item.id}
                style={{
                  position: "relative",
                  background: "#1e293b",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #334155",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFavorite(id)}
                  title={
                    isFavorite
                      ? "Убрать из избранного"
                      : "Добавить в избранное"
                  }
                  style={{
                    position: "absolute",
                    top: "30px",
                    right: "30px",
                    zIndex: 2,
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(15, 23, 42, 0.85)",
                    color: "white",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                >
                  {isFavorite ? "❤️" : "🤍"}
                </button>

                {item.imageUrl ? (
                  <img
                    className="product-image"
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "15px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      borderRadius: "12px",
                      marginBottom: "15px",
                      background: "#334155",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "54px",
                    }}
                  >
                    📷
                  </div>
                )}

                <h2
                  style={{
                    color: "#38bdf8",
                    marginTop: 0,
                    marginBottom: "12px",
                  }}
                >
                  📦 {item.title}
                </h2>

                <p style={{ margin: "5px 0" }}>
                  🏷️ {item.category || "Без категории"}
                </p>

                <div
  style={{
    margin: "8px 0",
  }}
>
  {Number(item.discount || 0) > 0 && (
    <span
      style={{
        display: "inline-block",
        marginBottom: "8px",
        background: "#dc2626",
        color: "white",
        padding: "5px 10px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      🔥 -{item.discount}%
    </span>
  )}

  {Number(item.oldPrice || 0) > Number(item.price || 0) && (
    <p
      style={{
        margin: "0 0 4px",
        color: "#94a3b8",
        textDecoration: "line-through",
        fontSize: "16px",
      }}
    >
      {item.oldPrice} грн
    </p>
  )}

  <p
    style={{
      margin: 0,
      color: "#22c55e",
      fontSize: "24px",
      fontWeight: "bold",
    }}
  >
    💰 {item.price} грн
  </p>
</div>
                <p
                  style={{
                    color: "#94a3b8",
                    margin: "5px 0",
                  }}
                
                >
                  📅{" "}
                  {new Date(item.createdAt).toLocaleString("ru-RU")}
                </p>
                <div
  style={{
    marginTop: "14px",
    paddingTop: "14px",
    borderTop: "1px solid #334155",
    display: "grid",
    gap: "8px",
  }}
>
  <p style={{ margin: 0, color: "#facc15" }}>
    ⭐ {Number(item.rating || 5).toFixed(1)}
  </p>

  <p style={{ margin: 0, color: "#94a3b8" }}>
    👁️ {Number(item.views || 0)} просмотров
  </p>

  <p
    style={{
      margin: 0,
      color:
        Number(item.stock ?? 1) > 0
          ? "#22c55e"
          : "#ef4444",
    }}
  >
    {Number(item.stock ?? 1) > 0
      ? `🛒 В наличии: ${Number(item.stock ?? 1)} шт.`
      : "❌ Нет в наличии"}
  </p>
</div>

                <Link
  className="product-open-button"
href={`/products/${item.id}`}
style={{ display: 'inline-block',
   alignSelf: 'flex-start',
    marginTop: '20px', background: '#2563eb', 
    color: 'white', 
    textDecoration: 'none', 
    padding: '11px 20px', 
    borderRadius: '9px', 
    fontWeight: 'bold' 
  }}
                >
                  Открыть
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

const controlStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const buttonStyle = {
  background: "#475569",
  color: "white",
  border: "none",
  padding: "14px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  whiteSpace: "nowrap" as const,
};