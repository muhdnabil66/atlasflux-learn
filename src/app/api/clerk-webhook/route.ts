import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import sql from "@/lib/neon";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

  // headers() perlu di-await (Next.js 15)
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const userId = evt.data.id;
    try {
      await sql`
        INSERT INTO public.user_progress (user_id, tutorials_completed, learning_streak, projects_completed, total_xp)
        VALUES (${userId}, 0, 0, 0, 0)
      `;
      await sql`
        INSERT INTO public.user_credits (user_id, credits)
        VALUES (${userId}, 10)
      `;
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
