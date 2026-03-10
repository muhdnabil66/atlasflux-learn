import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userResult = await sql`
      SELECT id FROM users WHERE id = ${userId}
    `;
    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const dbUserId = userResult[0].id;

    // Ambil semua achievements
    const allAchievements = await sql`
      SELECT * FROM achievements
    `;

    // Ambil achievements yang sudah di-unlock
    const unlockedAchievements = await sql`
      SELECT achievement_id FROM user_achievements WHERE user_id = ${dbUserId}
    `;
    const unlockedIds = new Set(
      unlockedAchievements.map((row: any) => row.achievement_id),
    );

    // Kira jumlah modul selesai (contoh syarat achievement)
    const moduleCount = await sql`
      SELECT COUNT(*) as count FROM user_module_progress WHERE user_id = ${dbUserId}
    `;
    const modulesDone = moduleCount[0]?.count || 0;

    // Kira jumlah kategori selesai (contoh)
    // (Anda perlu definisi kategori – mungkin dengan menghitung modul unik per kategori)
    // Untuk ringkas, kita guna modul sahaja.

    const newlyUnlocked = [];

    for (const ach of allAchievements) {
      if (unlockedIds.has(ach.id)) continue;

      let conditionMet = false;
      // Contoh syarat: achievement "complete-3-paths" -> selesai 3 modul? (ganti dengan logik sebenar)
      if (ach.id === "complete-3-paths" && modulesDone >= 3) {
        conditionMet = true;
      }
      // Tambah syarat lain di sini

      if (conditionMet) {
        await sql`
          INSERT INTO user_achievements (user_id, achievement_id, unlocked_at, claimed, equipped)
          VALUES (${dbUserId}, ${ach.id}, NOW(), false, false)
        `;
        newlyUnlocked.push(ach.id);
      }
    }

    return NextResponse.json({ unlocked: newlyUnlocked });
  } catch (error) {
    console.error("Error checking achievements:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
