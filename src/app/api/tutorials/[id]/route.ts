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
    const tutorialId = parseInt(id);
    if (isNaN(tutorialId))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const tutorial = await sql`
      SELECT t.*,
        CASE WHEN up.user_id IS NOT NULL THEN true ELSE false END as completed
      FROM tutorials t
      LEFT JOIN user_tutorial_progress up ON t.id = up.tutorial_id AND up.user_id = ${userId}
      WHERE t.id = ${tutorialId}
    `;
    if (tutorial.length === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(tutorial[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
