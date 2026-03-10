import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function POST() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE public.visitor_count SET count = count + 1 WHERE id = 1`;
  const result = await sql`SELECT count FROM public.visitor_count WHERE id = 1`;
  return NextResponse.json({ count: result[0]?.count ?? 0 });
}
