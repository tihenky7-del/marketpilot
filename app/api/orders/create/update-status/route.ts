import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    const filePath = path.join(
      process.cwd(),
      "data",
      "orders.json"
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          success: false,
          error: "orders.json не найден",
        },
        { status: 404 }
      );
    }

    const orders = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    const index = orders.findIndex(
      (order: any) => String(order.id) === String(id)
    );

    if (index === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Заказ не найден",
        },
        { status: 404 }
      );
    }

    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();

    fs.writeFileSync(
      filePath,
      JSON.stringify(orders, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      order: orders[index],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Ошибка обновления статуса",
      },
      { status: 500 }
    );
  }
}