import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { checkAndResetCredits, getMidnightMYT } from "@/lib/credits";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const credits = await checkAndResetCredits(userId);
    const midnight = getMidnightMYT();

    return NextResponse.json({
      credits,
      nextReset: midnight.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
