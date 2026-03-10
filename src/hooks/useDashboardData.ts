"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export interface DashboardData {
  progress: {
    tutorials_completed: number;
    learning_streak: number;
    projects_completed: number;
    total_xp: number;
  } | null;
  credits: number;
  recentActivity: Array<{
    id: string;
    activity_type: string;
    title: string;
    description: string | null;
    created_at: string;
  }>;
}

export function useDashboardData() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<DashboardData>({
    progress: null,
    credits: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch stats (anda perlu pastikan endpoint ini wujud)
        const statsRes = await fetch("/api/user/stats");
        if (!statsRes.ok) {
          const errorData = await statsRes.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch stats");
        }
        const stats = await statsRes.json();

        // Fetch recent activity
        const activityRes = await fetch("/api/user/activity?limit=10");
        if (!activityRes.ok) {
          const errorData = await activityRes.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch activity");
        }
        const activity = await activityRes.json();

        // Pastikan activity adalah array
        const activityArray = Array.isArray(activity) ? activity : [];

        setData({
          progress: {
            tutorials_completed: stats.tutorials_completed || 0,
            learning_streak: stats.learning_streak || 0,
            projects_completed: stats.projects_completed || 0,
            total_xp: stats.total_xp || 0,
          },
          credits: stats.credits || 0,
          recentActivity: activityArray.map((act: any) => ({
            id: act.id,
            activity_type: act.activity_type, // guna field betul
            title: act.title, // guna title dari API
            description: act.description, // guna description
            created_at: act.created_at,
          })),
        });
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, user]);

  return { data, loading, error };
}
