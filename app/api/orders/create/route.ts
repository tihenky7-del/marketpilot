import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    if (
      !orderData.customer?.name ||
      !orderData.customer?.phone ||
      !orderData.customer?.city ||
      !orderData.customer?.warehouse
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Заполнены не все обязательные поля",
        },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(orderData.products) ||
      orderData.products.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Корзина пустая",
        },
        { status: 400 }
      );
    }

    const dataDirectory = path.join(process.cwd(), "data");
    const ordersPath = path.join(
      dataDirectory,
      "orders.json"
    );

    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, {
        recursive: true,
      });
    }

    let orders: any[] = [];

    if (fs.existsSync(ordersPath)) {
      const content = fs
        .readFileSync(ordersPath, "utf8")
        .trim();

      if (content) {
        const parsed = JSON.parse(content);

        orders = Array.isArray(parsed) ? parsed : [];
      }
    }

    const timestamp = Date.now();

    const order = {
      ...orderData,
      id: timestamp,
      orderNumber: `MP-${timestamp}`,
      status: "Новый",
      createdAt: new Date().toISOString(),
    };

    orders.unshift(order);

    fs.writeFileSync(
      ordersPath,
      JSON.stringify(orders, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Ошибка создания заказа",
      },
      { status: 500 }
    );
  }
}