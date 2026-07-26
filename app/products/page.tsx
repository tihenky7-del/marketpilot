import fs from "fs";
import path from "path";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  const filePath = path.join(process.cwd(), "data", "generations.json");

  let products = [];

  if (fs.existsSync(filePath)) {
    products = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "34px", marginBottom: "30px" }}>
        📦 Мои товары
      </h1>

      <ProductsClient products={products} />
    </div>
  );
}
function getPopularProducts(orders: any[]) {
  const map = new Map();

  for (const order of orders) {
    for (const product of order.products || []) {
      const id = product.id;

      if (!map.has(id)) {
        map.set(id, {
          id,
          title: product.title,
          quantity: 0,
          revenue: 0,
        });
      }

      const item = map.get(id);

      item.quantity += Number(product.quantity || 1);

      item.revenue +=
        Number(product.price || 0) *
        Number(product.quantity || 1);
    }
  }

  return [...map.values()]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
}