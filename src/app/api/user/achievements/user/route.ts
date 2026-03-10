import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userResult = await sql`
      SELECT id FROM users WHERE id = ${userId}
    `;
    if (userResult.length === 0) {
      return NextResponse.json([]);
    }
    const dbUserId = userResult[0].id;

    const userAchievements = await sql`
      SELECT ua.*, a.name, a.description, a.icon, a.xp_reward, a.type, a.reward_image, a.color, a.category
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ${dbUserId}
    `;

    return NextResponse.json(userAchievements);
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
