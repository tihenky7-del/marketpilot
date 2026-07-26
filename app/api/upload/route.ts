import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не найден" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = Date.now() + "-" + file.name;

    fs.writeFileSync(
      path.join(uploadDir, fileName),
      buffer
    );

    return NextResponse.json({
      url: "/uploads/" + fileName,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Ошибка загрузки" },
      { status: 500 }
    );
  }
}