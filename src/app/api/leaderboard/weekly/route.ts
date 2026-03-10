import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@clerk/nextjs/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    // Kira minggu semasa (bermula hari Isnin)
    const now = new Date();
    const day = now.getDay(); // 0 = Ahad, 1 = Isnin, ...
    const diffToMonday = day === 0 ? 6 : day - 1; // hari ke Isnin lepas
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);
    const mondayStr = monday.toISOString();

    // Dapatkan jumlah XP mingguan untuk semua pengguna yang > 0
    const weeklyXPs = await sql`
      SELECT 
        xp.user_id,
        COALESCE(u.username, xp.user_id) as username,
        u.avatar_url,
        SUM(xp.amount) as weekly_xp
      FROM xp_transactions xp
      LEFT JOIN users u ON xp.user_id = u.id
      WHERE xp.created_at >= ${mondayStr}
      GROUP BY xp.user_id, u.username, u.avatar_url
      HAVING SUM(xp.amount) > 0
      ORDER BY weekly_xp DESC
    `;

    // Tambah rank
    const leaderboard = weeklyXPs.map((row, index) => ({
      rank: index + 1,
      userId: row.user_id,
      username: row.username || row.user_id,
      avatar: row.avatar_url,
      weeklyXP: row.weekly_xp,
    }));

    // Ambil data pengguna semasa dari users dan user_progress
    const userData = await sql`
      SELECT 
        u.username,
        u.avatar_url,
        up.total_xp,
        up.level,
        (SELECT COUNT(*) FROM user_achievements WHERE user_id = ${userId}) as achievements,
        (SELECT COUNT(*) FROM game_sessions WHERE user_id = ${userId}) as games_played
      FROM users u
      LEFT JOIN user_progress up ON u.id = up.user_id
      WHERE u.id = ${userId}
    `;

    let currentUser = null;
    if (userData.length > 0) {
      const data = userData[0];
      const weeklyXP = await sql`
        SELECT COALESCE(SUM(amount), 0) as total
        FROM xp_transactions
        WHERE user_id = ${userId} AND created_at >= ${mondayStr}
      `;
      const weeklyXPAmount = weeklyXP[0]?.total || 0;

      // Kira rank pengguna semasa
      let rank: number;
      if (weeklyXPAmount > 0) {
        // Cari berapa orang yang mempunyai XP > weeklyXPAmount
        const rankRes = await sql`
          SELECT COUNT(*) + 1 as rank
          FROM (
            SELECT user_id, SUM(amount) as total
            FROM xp_transactions
            WHERE created_at >= ${mondayStr}
            GROUP BY user_id
            HAVING SUM(amount) > ${weeklyXPAmount}
          ) as sub
        `;
        rank = rankRes[0]?.rank || 1;
      } else {
        // Jika XP 0, rank = jumlah orang yang mempunyai XP > 0 + 1
        const countRes = await sql`
          SELECT COUNT(DISTINCT user_id) as count
          FROM xp_transactions
          WHERE created_at >= ${mondayStr}
        `;
        rank = (countRes[0]?.count || 0) + 1;
      }

      currentUser = {
        username: data.username || userId,
        avatar: data.avatar_url,
        weeklyXP: weeklyXPAmount,
        rank: rank,
        level: data.level || 1,
        totalXP: data.total_xp || 0,
        achievements: data.achievements || 0,
        gamesPlayed: data.games_played || 0,
        winRate: 0, // boleh dikira kemudian
      };
    }

    return NextResponse.json({ leaderboard, currentUser });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
