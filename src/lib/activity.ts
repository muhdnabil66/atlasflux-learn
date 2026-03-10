// src/lib/activity.ts
export async function logActivity(
  userId: string,
  type: string,
  title: string,
  description?: string,
  metadata?: any,
) {
  try {
    const res = await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, type, title, description, metadata }),
    });
    if (!res.ok) throw new Error("Failed to log activity");
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
