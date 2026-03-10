import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { checkAndResetChatCredits } from "@/lib/credits";

const sql = neon(process.env.DATABASE_URL!);

const modelMap: Record<string, string> = {
  "deepseek-r1": "deepseek/deepseek-r1",
  "claude-4.6": "anthropic/claude-4.6-opus",
  "gpt-5.4": "openai/gpt-5.4",
  "atlas-3": "google/gemini-3.1-pro",
};

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages, model } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 },
      );
    }

    const credits = await checkAndResetChatCredits(userId);
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

    const openRouterModel = modelMap[model] || "deepseek/deepseek-r1";

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
          model: openRouterModel,
          messages: messages,
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

    // Tolak satu kredit
    await sql`
      UPDATE users SET chat_credits_remaining = chat_credits_remaining - 1 WHERE id = ${userId}
    `;

    // Rekod aktiviti
    await sql`
      INSERT INTO user_activities (user_id, type, description, xp_earned)
      VALUES (${userId}, 'ai_chat', ${"Chat with " + model}, 0)
    `;

    // Semak pencapaian
    const usageCount = await sql`
      SELECT COUNT(*) as count FROM user_activities
      WHERE user_id = ${userId} AND type = 'ai_chat'
    `;
    const count = usageCount[0].count;

    const milestones = [
      { threshold: 1, achievementId: "ai-chat-1" },
      { threshold: 10, achievementId: "ai-chat-10" },
      { threshold: 50, achievementId: "ai-chat-50" },
      { threshold: 100, achievementId: "ai-chat-100" },
    ];

    for (const { threshold, achievementId } of milestones) {
      if (count === threshold) {
        const existing = await sql`
          SELECT 1 FROM user_achievements
          WHERE user_id = ${userId} AND achievement_id = ${achievementId}
        `;
        if (existing.length === 0) {
          const achievementData = await sql`
            SELECT xp_reward FROM achievements WHERE id = ${achievementId}
          `;
          const xpReward = achievementData[0]?.xp_reward || 0;

          await sql`
            INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
            VALUES (${userId}, ${achievementId}, NOW())
          `;

          if (xpReward > 0) {
            await sql`
              UPDATE users SET xp = xp + ${xpReward} WHERE id = ${userId}
            `;
          }
        }
      }
    }

    return NextResponse.json({ reply: aiMessage });
  } catch (error) {
    console.error("Error in AI chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
