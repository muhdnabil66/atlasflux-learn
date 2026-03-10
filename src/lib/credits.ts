// lib/credits.ts
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

/**
 * Get midnight Malaysia time (UTC+8) for today.
 * Returns a Date object set to 00:00:00 Malaysia time.
 */
export function getMidnightMYT(): Date {
  const now = new Date();
  // Convert to Malaysia time (Asia/Kuala_Lumpur)
  const malaysiaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }),
  );
  malaysiaTime.setHours(0, 0, 0, 0);
  return malaysiaTime;
}

/**
 * Check and reset user credits if last reset was before today's midnight.
 * Returns the current credits after possible reset.
 */
export async function checkAndResetCredits(userId: string): Promise<number> {
  const user = await sql`
    SELECT credits_remaining, last_credit_reset FROM users WHERE id = ${userId}
  `;
  if (user.length === 0) return 0;

  const lastReset = user[0].last_credit_reset;
  const midnight = getMidnightMYT();

  if (!lastReset || new Date(lastReset) < midnight) {
    // Reset credits to 8 and update last_reset
    await sql`
      UPDATE users
      SET credits_remaining = 8, last_credit_reset = ${midnight.toISOString()}
      WHERE id = ${userId}
    `;
    return 8;
  }
  return user[0].credits_remaining;
}

/**
 * Check and reset chat credits if last reset was before today's midnight.
 * Returns the current chat credits after possible reset.
 */
export async function checkAndResetChatCredits(
  userId: string,
): Promise<number> {
  const user = await sql`
    SELECT chat_credits_remaining, chat_last_reset FROM users WHERE id = ${userId}
  `;
  if (user.length === 0) return 0;

  const lastReset = user[0].chat_last_reset;
  const midnight = getMidnightMYT();

  if (!lastReset || new Date(lastReset) < midnight) {
    // Reset chat credits to 20 and update last_reset
    await sql`
      UPDATE users
      SET chat_credits_remaining = 20, chat_last_reset = ${midnight.toISOString()}
      WHERE id = ${userId}
    `;
    return 20;
  }
  return user[0].chat_credits_remaining;
}

/**
 * Check and reset coding chat credits if last reset was before today's midnight.
 * Returns the current coding chat credits after possible reset.
 */
export async function checkAndResetCodingChatCredits(
  userId: string,
): Promise<number> {
  const user = await sql`
    SELECT coding_chat_credits_remaining, coding_chat_last_reset FROM users WHERE id = ${userId}
  `;
  if (user.length === 0) return 0;

  const lastReset = user[0].coding_chat_last_reset;
  const midnight = getMidnightMYT();

  if (!lastReset || new Date(lastReset) < midnight) {
    // Reset coding chat credits to 5 and update last_reset
    await sql`
      UPDATE users
      SET coding_chat_credits_remaining = 5, coding_chat_last_reset = ${midnight.toISOString()}
      WHERE id = ${userId}
    `;
    return 5;
  }
  return user[0].coding_chat_credits_remaining;
}
