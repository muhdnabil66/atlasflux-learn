import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const languageId = parseInt(id);
    if (isNaN(languageId))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const language =
      await sql`SELECT * FROM languages WHERE id = ${languageId}`;
    if (language.length === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Dapatkan semua tutorial dengan status selesai
    const tutorials = await sql`
      SELECT 
        t.id, t.title, t.description,
        CASE WHEN up.user_id IS NOT NULL THEN true ELSE false END as completed
      FROM tutorials t
      LEFT JOIN user_tutorial_progress up ON t.id = up.tutorial_id AND up.user_id = ${userId}
      WHERE t.language_id = ${languageId}
      ORDER BY t."order"
    `;

    // Hitung jumlah XP semua tutorial (andaikan ada lajur xp, tapi kita belum ada. Untuk sementara, kita kira jumlah XP dari tutorial)
    // Jika tiada lajur xp, kita boleh kira berdasarkan bilangan tutorial (contoh 10 XP setiap satu)
    const totalXP = tutorials.length * 10; // Gantikan dengan nilai sebenar jika ada

    const allCompleted = tutorials.every((t) => t.completed);

    return NextResponse.json({
      ...language[0],
      tutorials,
      totalXP,
      allCompleted,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
