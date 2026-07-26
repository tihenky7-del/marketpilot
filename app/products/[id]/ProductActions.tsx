"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function ProductActions({
  product,
}: {
  product: any;
}) {
  const router = useRouter();
  const { addToCart } = useCart();

  const text = product.result || "";
  const id = String(product.id);

  function copyText() {
    navigator.clipboard.writeText(text);
    alert("Описание скопировано!");
  }

  function downloadTxt() {
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "product-description.txt";
    a.click();

    URL.revokeObjectURL(url);
  }

  function buyProduct() {
    addToCart({
      id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl || "",
    });

    alert("Товар добавлен в корзину!");
  }

  async function deleteProduct() {
    const ok = confirm("Удалить этот товар?");
    if (!ok) return;

    const response = await fetch("/api/products/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      alert(data.error || "Не удалось удалить товар");
      return;
    }

    router.push("/products");
    router.refresh();
  }

  return (
    <div
      style={{
        marginTop: "25px",
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <button onClick={buyProduct} style={buttonGreen}>
        🛒 Добавить в корзину
      </button>

      <button onClick={copyText} style={buttonGreen}>
        📋 Скопировать описание
      </button>

      <button onClick={downloadTxt} style={buttonBlue}>
        📄 Скачать TXT
      </button>

      <button
        onClick={() => router.push(`/products/${id}/edit`)}
        style={buttonOrange}
      >
        ✏️ Редактировать
      </button>

      <button onClick={deleteProduct} style={buttonRed}>
        🗑️ Удалить
      </button>
    </div>
  );
}

const buttonGreen = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonBlue = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonOrange = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonRed = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};