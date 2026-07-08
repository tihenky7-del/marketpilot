import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { title, category, price, description } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: false,
        description: "API ключ OpenAI не найден. Проверь файл .env.local",
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `Создай продающее описание товара:

Название: ${title}
Категория: ${category}
Цена: ${price}
Описание: ${description}

Дай:
1. Описание
2. SEO ключи
3. Рекламный текст`,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      description: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("OPENAI ERROR:", error);

    return NextResponse.json({
      success: false,
      description: "Ошибка OpenAI. Проверь ключ, баланс или интернет.",
    });
  }
}