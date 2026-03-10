import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { challengeId, answer, timeSpent } = await request.json(); // timeSpent in seconds (optional)
    if (!challengeId || answer === undefined) {
      return NextResponse.json(
        { error: "Missing challengeId or answer" },
        { status: 400 },
      );
    }

    // Get session
    const session = await sql`
      SELECT * FROM user_challenge_sessions WHERE user_id = ${userId}
    `;
    if (session.length === 0) {
      return NextResponse.json({ error: "No active session" }, { status: 400 });
    }

    const challengeIds = session[0].challenges;
    if (!challengeIds.includes(challengeId)) {
      return NextResponse.json(
        { error: "Challenge not in current session" },
        { status: 400 },
      );
    }

    // Check if already answered
    const currentAnswers = session[0].answers || {};
    if (currentAnswers[challengeId] !== undefined) {
      return NextResponse.json({ error: "Already answered" }, { status: 400 });
    }

    // Get challenge details
    const challenge = await sql`
      SELECT * FROM challenges WHERE id = ${challengeId}
    `;
    if (challenge.length === 0) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 },
      );
    }

    const isCorrect =
      answer.toString().toLowerCase().trim() ===
      challenge[0].correct_answer.toLowerCase().trim();
    const xpEarned = isCorrect ? 200 : 30;

    // Update session answers
    currentAnswers[challengeId] = answer;
    await sql`
      UPDATE user_challenge_sessions
      SET answers = ${JSON.stringify(currentAnswers)}
      WHERE user_id = ${userId}
    `;

    // Update user XP
    await sql`
      UPDATE users SET xp = xp + ${xpEarned} WHERE id = ${userId}
    `;

    // Record activity
    await sql`
      INSERT INTO user_activities (user_id, type, description, xp_earned)
      VALUES (${userId}, 'challenge', ${"Answered: " + challenge[0].question.substring(0, 50)}, ${xpEarned})
    `;

    // Check if session is now completed (all 10 answered)
    const answeredCount = Object.keys(currentAnswers).length;
    const sessionCompleted = answeredCount === 10;

    // If completed, we might record overall session result, but not needed for now.

    // Check achievements based on total correct answers
    if (isCorrect) {
      const correctCount = await sql`
        SELECT COUNT(*) as count FROM user_activities
        WHERE user_id = ${userId} AND type = 'challenge' AND xp_earned = 200
      `;
      const totalCorrect = correctCount[0].count;

      const achievementMilestones = [
        { threshold: 1, id: "challenge-1" },
        { threshold: 10, id: "challenge-10" },
        { threshold: 50, id: "challenge-50" },
        { threshold: 100, id: "challenge-100" },
      ];

      for (const { threshold, id } of achievementMilestones) {
        if (totalCorrect === threshold) {
          const existing = await sql`
            SELECT 1 FROM user_achievements
            WHERE user_id = ${userId} AND achievement_id = ${id}
          `;
          if (existing.length === 0) {
            const ach =
              await sql`SELECT xp_reward FROM achievements WHERE id = ${id}`;
            const xpReward = ach[0]?.xp_reward || 0;

            await sql`
              INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
              VALUES (${userId}, ${id}, NOW())
            `;
            if (xpReward > 0) {
              await sql`UPDATE users SET xp = xp + ${xpReward} WHERE id = ${userId}`;
            }
          }
        }
      }
    }

    return NextResponse.json({
      correct: isCorrect,
      xpEarned,
      sessionCompleted,
    });
  } catch (error) {
    console.error("Error submitting challenge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
