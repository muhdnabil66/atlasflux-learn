// src/app/api/user/stats/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Helper to get or create user (returns user id)
async function getOrCreateUser(userId: string) {
  // First try by clerk_id
  let user = await sql`SELECT id, xp FROM users WHERE clerk_id = ${userId}`;
  if (user.length > 0) return user[0].id;

  // Then try by id (in case row exists but clerk_id missing)
  user = await sql`SELECT id, xp FROM users WHERE id = ${userId}`;
  if (user.length > 0) {
    // Update the row to set clerk_id
    await sql`UPDATE users SET clerk_id = ${userId} WHERE id = ${userId}`;
    return user[0].id;
  }

  // Otherwise insert new user
  const insert = await sql`
    INSERT INTO users (id, clerk_id, email, xp)
    VALUES (${userId}, ${userId}, '', 0)
    RETURNING id
  `;
  return insert[0].id;
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUserId = await getOrCreateUser(userId);

    // Get user's XP
    const xpResult = await sql`SELECT xp FROM users WHERE id = ${dbUserId}`;
    const totalXp = xpResult[0]?.xp || 0;

    // Count completed modules
    const tutorialCount = await sql`
      SELECT COUNT(*) as count FROM user_module_progress WHERE user_id = ${dbUserId}
    `;

    // Credits (optional)
    let credits = 100;
    try {
      const creditsRes = await sql`
        SELECT credits FROM user_credits WHERE user_id = ${dbUserId}
      `;
      if (creditsRes.length > 0) credits = creditsRes[0].credits;
    } catch {}

    return NextResponse.json({
      tutorials_completed: tutorialCount[0]?.count || 0,
      learning_streak: 0,
      projects_completed: 0,
      total_xp: totalXp,
      credits: credits,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
