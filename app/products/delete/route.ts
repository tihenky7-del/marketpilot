import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const filePath = path.join(process.cwd(), "data", "generations.json");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false });
    }

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const filtered = products.filter(
      (item: any) => String(item.id) !== String(id)
    );

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Ошибка удаления товара",
    });
  }
}