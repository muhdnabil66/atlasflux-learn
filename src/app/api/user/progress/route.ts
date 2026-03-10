// src/app/api/user/progress/route.ts
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

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUserId = await getOrCreateUser(userId);

    const progressResult = await sql`
      SELECT module_id FROM user_module_progress WHERE user_id = ${dbUserId}
    `;
    const completedModules = progressResult.map((row) => row.module_id);

    return NextResponse.json({ completedModules });
  } catch (error) {
    console.error("Progress error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
