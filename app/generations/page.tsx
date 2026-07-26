import fs from "fs";
import path from "path";
export default function GenerationsPage() {
  const filePath = path.join(process.cwd(), "data", "generations.json");

  const history = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  return (
    <div
  style={{
  maxWidth: "900px",
  margin: "20px auto",
  padding: "30px",
  borderRadius: "18px",
  background: "#1e293b",
  border: "1px solid #334155",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  color: "white",
}}
>
      <h1>AI-генерации</h1>
      {history.map((item: any) => (
  <div
    key={item.id}
    style={{
      border: "1px solid #444",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "10px",
      color: "white",
      background: "#1e293b",
    }}
  >
    <h2
  style={{
    fontSize: "28px",
    marginBottom: "15px",
    color: "#38bdf8",
  }}
>
  📦 {item.title}
</h2>

    <p>💰 <b>Цена:</b> {item.price} грн</p>

<p>📅 <b>Дата:</b> {new Date(item.createdAt).toLocaleString()}</p>
    <pre style={{ whiteSpace: "pre-wrap" }}>{item.result}</pre>
  </div>
))}

      {history.map((item: any) => (
  <div
    key={item.id}
    style={{
      border: "1px solid #444",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "10px",
    }}
  >
    <h2>{item.title}</h2>

    <p>
      <b>Цена:</b> {item.price} грн
    </p>

    <p>
      <b>Дата:</b> {new Date(item.createdAt).toLocaleString()}
    </p>

    <pre style={{ whiteSpace: "pre-wrap" }}>
      {item.result}
    </pre>
  </div>
))}
    </div>
  );
}