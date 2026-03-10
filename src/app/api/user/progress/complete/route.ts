// src/app/api/user/progress/complete/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function getOrCreateUser(userId: string) {
  let user = await sql`SELECT id FROM users WHERE clerk_id = ${userId}`;
  if (user.length > 0) return user[0].id;

  user = await sql`SELECT id FROM users WHERE id = ${userId}`;
  if (user.length > 0) {
    await sql`UPDATE users SET clerk_id = ${userId} WHERE id = ${userId}`;
    return user[0].id;
  }

  const insert = await sql`
    INSERT INTO users (id, clerk_id, email) 
    VALUES (${userId}, ${userId}, '')
    RETURNING id
  `;
  return insert[0].id;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { moduleId } = await request.json();
    if (!moduleId) {
      return NextResponse.json({ error: "moduleId required" }, { status: 400 });
    }

    const dbUserId = await getOrCreateUser(userId);

    const existing = await sql`
      SELECT 1 FROM user_module_progress 
      WHERE user_id = ${dbUserId} AND module_id = ${moduleId}
    `;
    if (existing.length > 0) {
      return NextResponse.json({ message: "Already completed" });
    }

    await sql`
      INSERT INTO user_module_progress (user_id, module_id, completed_at)
      VALUES (${dbUserId}, ${moduleId}, NOW())
    `;

    await sql`
      INSERT INTO user_activity (user_id, activity_type, title, description, created_at)
      VALUES (
        ${dbUserId}, 
        'tutorial', 
        'Module Completed', 
        ${"Completed module: " + moduleId}, 
        NOW()
      )
    `;

    return NextResponse.json({ success: true, xpEarned: 0 });
  } catch (error) {
    console.error("Error in progress/complete:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
