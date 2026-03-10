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

    const body = await request.json();
    const { score, correct, wrong, xpEarned, creditsEarned } = body;

    // Pastikan nilai integer
    const scoreInt = Math.floor(score) || 0;
    const correctInt = Math.floor(correct) || 0;
    const wrongInt = Math.floor(wrong) || 0;
    const xpInt = Math.floor(xpEarned) || 0;
    const creditsInt = Math.floor(creditsEarned) || 0;

    // Simpan sesi permainan
    await sql`
      INSERT INTO game_sessions (user_id, score, correct, wrong, xp_earned, credits_earned)
      VALUES (${userId}, ${scoreInt}, ${correctInt}, ${wrongInt}, ${xpInt}, ${creditsInt})
    `;

    // Update user_progress: tambah total_xp, games_played (jika lajur wujud)
    // Kita akan cuba update, dan jika gagal kerana lajur tidak wujud, kita abaikan.
    try {
      await sql`
        UPDATE user_progress
        SET 
          total_xp = total_xp + ${xpInt},
          games_played = COALESCE(games_played, 0) + 1
        WHERE user_id = ${userId}
      `;
    } catch (progressError) {
      console.warn(
        "Could not update user_progress (maybe missing column games_played):",
        progressError,
      );
      // Cuba update total_xp sahaja
      await sql`
        UPDATE user_progress
        SET total_xp = total_xp + ${xpInt}
        WHERE user_id = ${userId}
      `;
    }

    // Update user_credits jika ada
    if (creditsInt > 0) {
      await sql`
        UPDATE user_credits
        SET credits = credits + ${creditsInt}
        WHERE user_id = ${userId}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving game session:", error);
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (error instanceof Error ? error.message : "Unknown"),
      },
      { status: 500 },
    );
  }
}
