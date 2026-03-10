import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, type, title, description, metadata } = await request.json();

  if (!userId || !type || !title) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO public.user_activity (user_id, activity_type, title, description, metadata)
      VALUES (${userId}, ${type}, ${title}, ${description}, ${metadata ? JSON.stringify(metadata) : null})
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
