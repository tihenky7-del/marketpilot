import fs from "fs";
import path from "path";
import Link from "next/link";
import ProductActions from "./ProductActions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const filePath = path.join(
    process.cwd(),
    "data",
    "generations.json"
  );

  const products = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  const product = products.find(
    (item: any) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main style={pageStyle}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1>❌ Товар не найден</h1>

          <Link href="/products" style={backLinkStyle}>
            ← Назад к товарам
          </Link>
        </div>
      </main>
    );
  }

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);
  const discount = Number(product.discount || 0);
  const rating = Number(product.rating || 5);
  const views = Number(product.views || 0);
  const stock = Number(product.stock ?? 1);

  const hasOldPrice = oldPrice > price;
  const hasDiscount = discount > 0;
  const inStock = stock > 0;

  return (
    <main style={pageStyle}>
      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        <Link href="/products" style={backLinkStyle}>
          ← Назад к товарам
        </Link>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Фотография */}
          <div
            style={{
              position: "relative",
              minHeight: "480px",
              borderRadius: "22px",
              overflow: "hidden",
              border: "1px solid #334155",
              background: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            {hasDiscount && (
              <div
                style={{
                  position: "absolute",
                  top: "25px",
                  left: "25px",
                  zIndex: 2,
                  background: "#dc2626",
                  color: "white",
                  padding: "9px 14px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                🔥 -{discount}%
              </div>
            )}

            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "580px",
                  objectFit: "contain",
                  borderRadius: "16px",
                }}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "72px",
                    marginBottom: "12px",
                  }}
                >
                  📷
                </div>

                Изображение отсутствует
              </div>
            )}
          </div>

          {/* Информация */}
          <div>
            <p
              style={{
                display: "inline-block",
                margin: "0 0 16px",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#1e3a8a",
                color: "#bfdbfe",
                fontWeight: "bold",
              }}
            >
              🏷️ {product.category || "Без категории"}
            </p>

            <h1
              style={{
                margin: "0 0 18px",
                color: "#38bdf8",
                fontSize: "42px",
                lineHeight: "1.15",
              }}
            >
              📦 {product.title}
            </h1>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "24px",
                color: "#cbd5e1",
              }}
            >
              <span style={{ color: "#facc15" }}>
                ⭐ {rating.toFixed(1)}
              </span>

              <span>👁️ {views} просмотров</span>

              <span
                style={{
                  color: inStock ? "#22c55e" : "#ef4444",
                }}
              >
                {inStock
                  ? `🛒 В наличии: ${stock} шт.`
                  : "❌ Нет в наличии"}
              </span>
            </div>

            <div
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "18px",
                padding: "24px",
                marginBottom: "25px",
              }}
            >
              {hasOldPrice && (
                <p
                  style={{
                    margin: "0 0 5px",
                    color: "#94a3b8",
                    textDecoration: "line-through",
                    fontSize: "20px",
                  }}
                >
                  {oldPrice} грн
                </p>
              )}

              <p
                style={{
                  margin: 0,
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#22c55e",
                }}
              >
                {price} грн
              </p>

              {hasDiscount && (
                <p
                  style={{
                    color: "#fca5a5",
                    margin: "8px 0 0",
                    fontWeight: "bold",
                  }}
                >
                  Вы экономите {Math.max(oldPrice - price, 0)} грн
                </p>
              )}
            </div>
            <p
              style={{
                color: "#94a3b8",
                marginBottom: "24px",
              }}
            >
              📅 Добавлен:{" "}
              {new Date(product.createdAt).toLocaleString("ru-RU")}
            </p>

            <ProductActions product={product} />
          </div>
        </section>

        {/* Сервисные блоки */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <InfoCard
            icon="🚚"
            title="Доставка"
            lines={[
              "Новая Почта",
              "Укрпочта",
              "Самовывоз",
            ]}
          />

          <InfoCard
            icon="💳"
            title="Оплата"
            lines={[
              "Оплата картой",
              "Apple Pay и Google Pay",
              "Наложенный платёж",
            ]}
          />

          <InfoCard
            icon="🛡️"
            title="Гарантия"
            lines={[
              "Проверка перед отправкой",
              "14 дней на возврат",
              "Поддержка покупателя",
            ]}
          />
        </section>

        {/* Описание */}
        <section style={contentPanelStyle}>
          <h2 style={sectionTitleStyle}>
            🤖 AI-описание товара
          </h2>

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
              fontSize: "17px",
              color: "#e2e8f0",
            }}
          >
            {product.result || "Описание пока отсутствует."}
          </div>
        </section>

        {/* Короткое описание */}
        {product.description && (
          <section style={contentPanelStyle}>
            <h2 style={sectionTitleStyle}>
              📋 Краткие характеристики
            </h2>

            <p
              style={{
                margin: 0,
                color: "#e2e8f0",
                lineHeight: "1.8",
                fontSize: "17px",
              }}
            >
              {product.description}
            </p>
          </section>
        )}

        {/* Отзывы */}
        <section style={contentPanelStyle}>
          <h2 style={sectionTitleStyle}>
            ⭐ Отзывы покупателей
          </h2>

          <div
            style={{
              padding: "22px",
              borderRadius: "14px",
              background: "#0f172a",
              border: "1px solid #334155",
            }}
          >
            <p
              style={{
                color: "#facc15",
                fontSize: "22px",
                margin: "0 0 10px",
              }}
            >
              ⭐⭐⭐⭐⭐
            </p>

            <p
              style={{
                color: "#94a3b8",
                margin: 0,
              }}
            >
              Отзывов пока нет. Здесь позже появятся отзывы
              покупателей.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: string;
  title: string;
  lines: string[];
}) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "18px",
        background: "#1e293b",
        border: "1px solid #334155",
      }}
    >
      <div
        style={{
          fontSize: "38px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: "0 0 14px",
          fontSize: "22px",
          color: "#38bdf8",
        }}
      >
        {title}
      </h3>

      {lines.map((line) => (
        <p
          key={line}
          style={{
            margin: "8px 0",
            color: "#cbd5e1",
          }}
        >
          ✓ {line}
        </p>
      ))}
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "40px",
};

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "25px",
  color: "#38bdf8",
  textDecoration: "none",
  fontWeight: "bold",
};

const contentPanelStyle = {
  marginTop: "30px",
  padding: "30px",
  borderRadius: "20px",
  background: "#1e293b",
  border: "1px solid #334155",
};

const sectionTitleStyle = {
  marginTop: 0,
  marginBottom: "20px",
  fontSize: "28px",
};