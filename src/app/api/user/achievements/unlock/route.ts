import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@clerk/nextjs/server";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { achievementId } = await request.json();
    if (!achievementId) {
      return NextResponse.json(
        { error: "Missing achievementId" },
        { status: 400 },
      );
    }

    // Check if achievement exists and get its XP reward
    const achievement = await sql`
      SELECT id, xp_reward FROM achievements WHERE id = ${achievementId}
    `;
    if (achievement.length === 0) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 },
      );
    }
    const xpReward = achievement[0].xp_reward;

    // Check if already unlocked
    const existing = await sql`
      SELECT unlocked_at FROM user_achievements
      WHERE user_id = ${userId} AND achievement_id = ${achievementId}
    `;
    if (existing.length > 0 && existing[0].unlocked_at) {
      return NextResponse.json(
        { error: "Achievement already unlocked" },
        { status: 409 },
      );
    }

    // Use transaction to ensure both operations succeed or fail together
    // TypeScript may not recognize sql.begin, so we use a type assertion
    await (sql as any).begin(async (tx: any) => {
      // Insert into user_achievements (if not exists) or update unlocked_at
      await tx`
        INSERT INTO user_achievements (user_id, achievement_id, unlocked_at, claimed, equipped, progress)
        VALUES (${userId}, ${achievementId}, NOW(), false, false, 0)
        ON CONFLICT (user_id, achievement_id) DO UPDATE
        SET unlocked_at = EXCLUDED.unlocked_at
      `;

      // Add XP to user
      await tx`
        UPDATE users SET xp = xp + ${xpReward} WHERE id = ${userId}
      `;
    });

    return NextResponse.json({ success: true, xpAdded: xpReward });
  } catch (error) {
    console.error("Error unlocking achievement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
