import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAndResetCodingChatCredits, getMidnightMYT } from "@/lib/credits";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const credits = await checkAndResetCodingChatCredits(userId);
    const midnight = getMidnightMYT();
    return NextResponse.json({ credits, nextReset: midnight.toISOString() });
  } catch (error) {
    console.error("Error fetching coding chat credits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
