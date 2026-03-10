import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Gantikan dengan API key OpenRouter anda
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat", // atau model lain
          messages: [{ role: "user", content: message }],
        }),
      },
    );

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { reply: "Error connecting to AI service." },
      { status: 500 },
    );
  }
}
