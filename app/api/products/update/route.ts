import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const {
      id,
      title,
      category,
      price,
      oldPrice,
      discount,
      description,
      imageUrl,
      result,
    } = await req.json();

    const filePath = path.join(
      process.cwd(),
      "data",
      "generations.json"
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          success: false,
          error: "Файл с товарами не найден",
        },
        { status: 404 }
      );
    }

    const products = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    const productIndex = products.findIndex(
      (item: any) => String(item.id) === String(id)
    );

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Товар не найден",
        },
        { status: 404 }
      );
    }

    products[productIndex] = {
      ...products[productIndex],
      title,
      category,
      price,
      oldPrice,
      discount,
      description,
      imageUrl,
      result,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      filePath,
      JSON.stringify(products, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      product: products[productIndex],
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Ошибка обновления товара",
      },
      { status: 500 }
    );
  }
}