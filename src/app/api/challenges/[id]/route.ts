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
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const challengeId = parseInt(id);
    if (isNaN(challengeId)) {
      return NextResponse.json(
        { error: "Invalid challenge ID" },
        { status: 400 },
      );
    }

    const challenge = await sql`
      SELECT c.*, 
        CASE WHEN up.user_id IS NOT NULL THEN true ELSE false END as completed
      FROM challenges c
      LEFT JOIN user_challenge_progress up ON c.id = up.challenge_id AND up.user_id = ${userId}
      WHERE c.id = ${challengeId}
    `;

    if (challenge.length === 0) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(challenge[0]);
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
