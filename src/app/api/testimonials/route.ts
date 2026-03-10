import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);
  const testimonials =
    await sql`SELECT * FROM public.testimonials ORDER BY created_at DESC`;
  return NextResponse.json(testimonials);
}
