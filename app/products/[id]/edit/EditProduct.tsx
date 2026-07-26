"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProduct({
  product,
}: {
  product: any;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(product.title || "");
  const [category, setCategory] = useState(product.category || "");
  const [price, setPrice] = useState(product.price || "");
  const [oldPrice, setOldPrice] = useState(product.oldPrice || "");
const [discount, setDiscount] = useState(product.discount || "");
  const [description, setDescription] = useState(
    product.description || ""
  );
  const [result, setResult] = useState(product.result || "");
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        alert(data.error || "Не удалось загрузить изображение");
        return;
      }

      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
      alert("Ошибка загрузки изображения");
    } finally {
      setUploading(false);
    }
  }

  async function saveProduct() {
    try {
      setSaving(true);

      const response = await fetch("/api/products/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  id: product.id,
  title,
  category,
  price,
  oldPrice,
  discount,
  description,
  result,
  imageUrl,
}),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Не удалось сохранить товар");
        return;
      }

      router.push(`/products/${product.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ошибка сохранения товара");
    } finally {
      setSaving(false);
    }
  }

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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: "36px",
            color: "#38bdf8",
          }}
        >
          ✏️ Редактирование товара
        </h1>

        <p
          style={{
            marginBottom: "30px",
            color: "#94a3b8",
          }}
        >
          Измени нужные данные и сохрани товар.
        </p>

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          <label>
            <span style={labelStyle}>Название товара</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={inputStyle}
            />
          </label>

          <label>
            <span style={labelStyle}>Категория</span>
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={inputStyle}
            />
          </label>

          <label>
  <span style={labelStyle}>Старая цена</span>
  <input
    value={oldPrice}
    onChange={(event) => setOldPrice(event.target.value)}
    placeholder="Например: 1200"
    style={inputStyle}
  />
</label>

<label>
  <span style={labelStyle}>Скидка в процентах</span>
  <input
    value={discount}
    onChange={(event) => setDiscount(event.target.value)}
    placeholder="Например: 20"
    style={inputStyle}
  />
</label>
          <label>
            <span style={labelStyle}>Короткое описание</span>
            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={4}
              style={textareaStyle}
            />
          </label>

          <label>
            <span style={labelStyle}>
              Полный AI-текст
            </span>
            <textarea
              value={result}
              onChange={(event) => setResult(event.target.value)}
              rows={12}
              style={textareaStyle}
            />
          </label>

          <label>
            <span style={labelStyle}>
              Изображение товара
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  uploadImage(file);
                }
              }}
              style={inputStyle}
            />
          </label>

          {uploading && (
            <p style={{ color: "#38bdf8" }}>
              ⏳ Загружаем изображение...
            </p>
          )}

          {imageUrl && (
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                padding: "12px",
                border: "1px solid #334155",
                borderRadius: "16px",
                background: "#1e293b",
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "420px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={saveProduct}
              disabled={saving || uploading}
              style={{
                ...saveButtonStyle,
                opacity: saving || uploading ? 0.6 : 1,
              }}
            >
              {saving ? "⏳ Сохраняем..." : "💾 Сохранить"}
            </button>

            <button
              onClick={() =>
                router.push(`/products/${product.id}`)
              }
              style={cancelButtonStyle}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

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
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  lineHeight: "1.6",
};

const saveButtonStyle = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

const cancelButtonStyle = {
  background: "#475569",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};