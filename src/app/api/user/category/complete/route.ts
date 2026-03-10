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

    const { categoryName, xpEarned } = await request.json();
    if (!categoryName || !xpEarned) {
      return NextResponse.json(
        { error: "categoryName and xpEarned required" },
        { status: 400 },
      );
    }

    const userResult = await sql`
      SELECT id FROM users WHERE id = ${userId}
    `;
    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const dbUserId = userResult[0].id;

    // Award XP for completing category
    await sql`
      UPDATE users SET xp = xp + ${xpEarned} WHERE id = ${dbUserId}
    `;

    // Record activity
    await sql`
      INSERT INTO user_activity (user_id, activity_type, title, description, created_at)
      VALUES (
        ${dbUserId}, 
        'category', 
        'Category Completed', 
        ${"Completed category: " + categoryName + " (+" + xpEarned + " XP)"}, 
        NOW()
      )
    `;

    // Trigger achievement check (panggil endpoint check secara dalaman)
    // Nota: Anda perlu pastikan NEXTAUTH_URL di-set dalam env
    await fetch(`${process.env.NEXTAUTH_URL}/api/user/achievements/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch((err) =>
      console.error("Failed to trigger achievement check:", err),
    );

    return NextResponse.json({ success: true, xpEarned });
  } catch (error) {
    console.error("Error in category/complete:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
