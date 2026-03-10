import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Fetch progress
    const progressResult = await sql`
      SELECT * FROM public.user_progress WHERE user_id = ${userId} LIMIT 1
    `;
    const progress = progressResult[0] || null;

    // Fetch credits
    const creditsResult = await sql`
      SELECT credits FROM public.user_credits WHERE user_id = ${userId} LIMIT 1
    `;
    const creditsData = creditsResult[0] || null;

    // Fetch recent activity
    const activity = await sql`
      SELECT id, activity_type, title, description, created_at 
      FROM public.user_activity 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC 
      LIMIT 10
    `;

    return NextResponse.json({
      progress,
      credits: creditsData?.credits ?? 10,
      recentActivity: activity,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
