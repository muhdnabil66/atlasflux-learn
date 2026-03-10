// src/app/api/user/activity/route.ts
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

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUserId = await getOrCreateUser(userId);

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    let activities: any[] = [];
    try {
      activities = await sql`
        SELECT 
          id::text as id,
          activity_type,
          title,
          description,
          created_at
        FROM user_activity
        WHERE user_id = ${dbUserId}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    } catch (err) {
      console.warn("user_activity table may not exist yet:", err);
    }

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
