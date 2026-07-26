import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const {
  title,
  category,
  price,
  description,
  imageUrl,
} = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `
Создай карточку товара на русском языке.

Название товара: ${title}
Категория: ${category}
Цена: ${price}
Краткое описание: ${description}

Сделай ответ в таком формате:

1. Описание
Напиши продающее описание товара.

2. SEO ключи
Подбери SEO ключи через запятую.

3. Рекламный текст
Напиши короткий рекламный текст для соцсетей.
          `,
        },
      ],
    });

    const result = response.choices[0].message.content || "";

    const filePath = path.join(process.cwd(), "data", "generations.json");

    let history = [];

    if (fs.existsSync(filePath)) {
      history = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    history.unshift({
  id: Date.now(),
  createdAt: new Date().toISOString(),
  title,
  category,
  price,
  description,
  imageUrl,
  result,
});

    fs.writeFileSync(filePath, JSON.stringify(history, null, 2));

    return NextResponse.json({
      success: true,
      description: result,
    });
  } catch (error: any) {
    console.error("OPENAI ERROR:", error);

    return NextResponse.json({
      success: false,
      description: error?.message || "Ошибка OpenAI",
    });
  }
}