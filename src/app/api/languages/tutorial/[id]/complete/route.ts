import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const tutorialId = parseInt(id);
    if (isNaN(tutorialId))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    // Cek tutorial
    const tutorial =
      await sql`SELECT * FROM tutorials WHERE id = ${tutorialId}`;
    if (tutorial.length === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const languageId = tutorial[0].language_id;

    // Cek sama ada sudah pernah diselesaikan
    const existing = await sql`
      SELECT * FROM user_tutorial_progress 
      WHERE user_id = ${userId} AND tutorial_id = ${tutorialId}
    `;
    if (existing.length > 0) {
      return NextResponse.json({ error: "Already completed" }, { status: 409 });
    }

    // Rekod penyelesaian (tanpa XP)
    await sql`
      INSERT INTO user_tutorial_progress (user_id, tutorial_id, completed_at, xp_earned)
      VALUES (${userId}, ${tutorialId}, NOW(), 0)
    `;

    // Hitung jumlah tutorial yang telah diselesaikan untuk bahasa ini
    const completedCount = await sql`
      SELECT COUNT(*) as count
      FROM user_tutorial_progress up
      JOIN tutorials t ON up.tutorial_id = t.id
      WHERE up.user_id = ${userId} AND t.language_id = ${languageId}
    `;

    // Hitung jumlah keseluruhan tutorial untuk bahasa ini
    const totalTutorials = await sql`
      SELECT COUNT(*) as count FROM tutorials WHERE language_id = ${languageId}
    `;

    if (completedCount[0].count === totalTutorials[0].count) {
      // Semua tutorial telah selesai – beri XP (jumlah XP semua tutorial)
      const xpTotal = await sql`
        SELECT SUM(xp) as total FROM tutorials WHERE language_id = ${languageId}
      `;
      const totalXP = xpTotal[0].total || 0;

      // Tambah XP ke pengguna
      await sql`UPDATE users SET xp = xp + ${totalXP} WHERE id = ${userId}`;

      // Rekod aktiviti
      await sql`
        INSERT INTO user_activities (user_id, type, description, xp_earned)
        VALUES (${userId}, 'language_complete', ${"Completed all " + tutorial[0].language_name + " tutorials"}, ${totalXP})
      `;

      // Buka kunci achievement (contoh)
      await sql`
        INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
        VALUES (${userId}, ${"lang-master-" + languageId}, NOW())
        ON CONFLICT DO NOTHING
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
