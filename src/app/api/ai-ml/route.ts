import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { premiumModels } from "@/lib/ai-models";
import { checkAndResetCodingChatCredits } from "@/lib/credits";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, model, prompt, messages } = await request.json();

    if (!model) {
      return NextResponse.json({ error: "Model is required" }, { status: 400 });
    }

    // Check credits for chat action
    if (action === "chat") {
      const credits = await checkAndResetCodingChatCredits(userId);
      if (credits <= 0) {
        return NextResponse.json(
          { error: "No credits remaining" },
          { status: 403 },
        );
      }
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    let finalMessages: { role: string; content: string }[] = [];

    if (action === "sentiment") {
      if (!prompt) {
        return NextResponse.json(
          { error: "Prompt is required for sentiment analysis" },
          { status: 400 },
        );
      }
      finalMessages = [
        {
          role: "user",
          content: `Analyze the sentiment of the following text. Respond with only "positive", "negative", or "neutral".\n\nText: "${prompt}"`,
        },
      ];
    } else if (action === "chat") {
      if (!messages || !Array.isArray(messages)) {
        return NextResponse.json(
          { error: "Messages array is required for chat" },
          { status: 400 },
        );
      }
      // Enforce coding focus
      finalMessages = [
        {
          role: "system",
          content:
            "You are a helpful coding assistant. Answer only coding-related questions. If the question is not about coding, politely decline.",
        },
        ...messages,
      ];
    } else if (action === "playground") {
      if (!prompt) {
        return NextResponse.json(
          { error: "Prompt is required for playground" },
          { status: 400 },
        );
      }
      finalMessages = [{ role: "user", content: prompt }];
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "AtlasFlux Learn",
        },
        body: JSON.stringify({
          model: model,
          messages: finalMessages,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter error:", errorData);
      return NextResponse.json(
        { error: "AI service error" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "No response";

    // Deduct credit only for successful chat
    if (action === "chat") {
      await sql`
        UPDATE users SET coding_chat_credits_remaining = coding_chat_credits_remaining - 1 WHERE id = ${userId}
      `;
    }

    return NextResponse.json({ result: aiMessage });
  } catch (error) {
    console.error("Error in AI/ML API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
