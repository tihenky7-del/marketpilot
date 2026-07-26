import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import EditProduct from "./EditProduct";

export default async function EditPage({
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
    notFound();
  }

  return <EditProduct product={product} />;
}