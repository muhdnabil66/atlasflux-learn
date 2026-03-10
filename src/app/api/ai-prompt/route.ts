import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { checkAndResetCredits } from "@/lib/credits";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // Check and possibly reset credits
    const credits = await checkAndResetCredits(userId);
    if (credits <= 0) {
      return NextResponse.json(
        { error: "No credits remaining" },
        { status: 403 },
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    // Call OpenRouter
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "AtlasFlux Learn",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1", // or any model
          messages: [{ role: "user", content: prompt }],
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

    // Deduct one credit
    await sql`
      UPDATE users SET credits_remaining = credits_remaining - 1 WHERE id = ${userId}
    `;

    // Record activity
    await sql`
      INSERT INTO user_activities (user_id, type, description, xp_earned)
      VALUES (${userId}, 'ai_prompt', ${"Generated code for: " + prompt.substring(0, 50)}, 0)
    `;

    // Check and unlock achievement for first use
    const usageCount = await sql`
      SELECT COUNT(*) as count FROM user_activities
      WHERE user_id = ${userId} AND type = 'ai_prompt'
    `;
    if (usageCount[0].count === 1) {
      // First time – unlock 'ai-prompt-1' achievement
      await sql`
        INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
        VALUES (${userId}, 'ai-prompt-1', NOW())
        ON CONFLICT (user_id, achievement_id) DO NOTHING
      `;
      // Also award XP? (If achievement has XP, handle elsewhere)
    }

    return NextResponse.json({ result: aiMessage });
  } catch (error) {
    console.error("Error in AI prompt API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
