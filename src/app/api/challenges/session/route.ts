import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const FOUR_HOURS = 4 * 60 * 60 * 1000;

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get existing session
    let session = await sql`
      SELECT * FROM user_challenge_sessions WHERE user_id = ${userId}
    `;

    const now = new Date();

    if (session.length === 0) {
      // No session – create a new one
      const allChallenges = await sql`SELECT id FROM challenges`;
      const ids = allChallenges.map((c) => c.id);
      // Shuffle and pick 10
      const shuffled = ids.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      await sql`
        INSERT INTO user_challenge_sessions (user_id, session_start, challenges, answers)
        VALUES (${userId}, ${now.toISOString()}, ${JSON.stringify(selected)}, ${JSON.stringify({})})
      `;
      session = await sql`
        SELECT * FROM user_challenge_sessions WHERE user_id = ${userId}
      `;
    } else {
      const sessionStart = new Date(session[0].session_start);
      const expiry = new Date(sessionStart.getTime() + FOUR_HOURS);
      if (now > expiry) {
        // Session expired – create a new one
        const allChallenges = await sql`SELECT id FROM challenges`;
        const ids = allChallenges.map((c) => c.id);
        const shuffled = ids.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        await sql`
          UPDATE user_challenge_sessions
          SET session_start = ${now.toISOString()}, challenges = ${JSON.stringify(selected)}, answers = ${JSON.stringify({})}
          WHERE user_id = ${userId}
        `;
        session = await sql`
          SELECT * FROM user_challenge_sessions WHERE user_id = ${userId}
        `;
      }
    }

    // Fetch challenge details
    const challengeIds = session[0].challenges;
    const challenges = await sql`
      SELECT * FROM challenges WHERE id = ANY(${challengeIds}::int[])
    `;

    const answers = session[0].answers || {};

    // Determine if session is completed (all 10 answered)
    const completed = Object.keys(answers).length === 10;

    return NextResponse.json({
      sessionStart: session[0].session_start,
      challenges: challenges.map((c) => ({
        ...c,
        userAnswer: answers[c.id] || null,
      })),
      answers,
      completed,
    });
  } catch (error) {
    console.error("Error in challenges session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
