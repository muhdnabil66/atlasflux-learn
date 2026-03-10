import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);
  const result =
    await sql`SELECT count FROM public.visitor_count WHERE id = 1 LIMIT 1`;
  return NextResponse.json({ count: result[0]?.count ?? 0 });
}
