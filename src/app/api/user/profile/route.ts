// src/app/api/user/profile/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function getOrCreateUser(userId: string) {
  // First try by clerk_id
  let user =
    await sql`SELECT id, username, display_name, email, avatar_url, equipped_border, settings, xp FROM users WHERE clerk_id = ${userId}`;
  if (user.length > 0) return user[0];

  // Then try by id (in case row exists but clerk_id missing)
  user =
    await sql`SELECT id, username, display_name, email, avatar_url, equipped_border, settings, xp FROM users WHERE id = ${userId}`;
  if (user.length > 0) {
    // Update the row to set clerk_id
    await sql`UPDATE users SET clerk_id = ${userId} WHERE id = ${userId}`;
    return user[0];
  }

  // Otherwise insert new user
  const insert = await sql`
    INSERT INTO users (id, clerk_id, email, username, display_name, avatar_url, equipped_border, settings, xp)
    VALUES (${userId}, ${userId}, '', ${userId}, NULL, NULL, NULL, '{}', 0)
    RETURNING id, username, display_name, email, avatar_url, equipped_border, settings, xp
  `;
  return insert[0];
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser(userId);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { username, display_name, equipped_border, settings, avatar_url } =
      body;

    // Ensure user exists (optional, but good practice)
    await getOrCreateUser(userId);

    if (username !== undefined) {
      await sql`UPDATE users SET username = ${username} WHERE id = ${userId}`;
    }
    if (display_name !== undefined) {
      await sql`UPDATE users SET display_name = ${display_name} WHERE id = ${userId}`;
    }
    if (equipped_border !== undefined) {
      await sql`UPDATE users SET equipped_border = ${equipped_border} WHERE id = ${userId}`;
    }
    if (settings !== undefined) {
      await sql`UPDATE users SET settings = ${JSON.stringify(settings)} WHERE id = ${userId}`;
    }
    if (avatar_url !== undefined) {
      await sql`UPDATE users SET avatar_url = ${avatar_url} WHERE id = ${userId}`;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
