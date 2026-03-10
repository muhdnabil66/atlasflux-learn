import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { achievementId, equip } = await request.json();
    if (!achievementId) {
      return NextResponse.json(
        { error: "achievementId required" },
        { status: 400 },
      );
    }

    const userResult = await sql`
      SELECT id FROM users WHERE id = ${userId}
    `;
    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const dbUserId = userResult[0].id;

    const achResult = await sql`
      SELECT xp_reward, type FROM achievements WHERE id = ${achievementId}
    `;
    if (achResult.length === 0) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 },
      );
    }
    const xpReward = achResult[0].xp_reward;
    const achType = achResult[0].type;

    // Update user_achievements
    await sql`
      UPDATE user_achievements
      SET claimed = true, equipped = ${equip ? true : false}
      WHERE user_id = ${dbUserId} AND achievement_id = ${achievementId}
    `;

    // Add XP
    await sql`
      UPDATE users SET xp = xp + ${xpReward} WHERE id = ${dbUserId}
    `;

    // Record activity
    await sql`
      INSERT INTO user_activity (user_id, activity_type, title, description, created_at)
      VALUES (
        ${dbUserId}, 
        'achievement', 
        'Achievement Claimed', 
        ${"Claimed achievement: " + achievementId + " (+" + xpReward + " XP)"}, 
        NOW()
      )
    `;

    // If equipping, unequip others of same type
    if (equip && achType !== "badge") {
      await sql`
        UPDATE user_achievements
        SET equipped = false
        WHERE user_id = ${dbUserId} AND achievement_id != ${achievementId} AND type = ${achType}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error claiming achievement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
