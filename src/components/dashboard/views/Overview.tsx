"use client";

import {
  BookOpenIcon,
  AcademicCapIcon,
  SparklesIcon,
  TrophyIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import StatCard from "../common/StatCard";
import ActivityItem from "../common/ActivityItem";
import Card from "../common/Card";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Overview() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          Error loading data: {error}
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Tutorials Completed",
      value: data.progress?.tutorials_completed || 0,
      icon: BookOpenIcon,
      trend: 8, // nanti boleh kira dari data sebenar
      color: "blue" as const,
    },
    {
      title: "Learning Streak",
      value: `${data.progress?.learning_streak || 0} days`,
      icon: TrophyIcon,
      trend: 15,
      color: "yellow" as const,
    },
    {
      title: "AI Credits",
      value: data.credits,
      icon: SparklesIcon,
      trend: -5,
      color: "purple" as const,
    },
    {
      title: "Projects Done",
      value: data.progress?.projects_completed || 0,
      icon: CodeBracketIcon,
      trend: 0,
      color: "green" as const,
    },
  ];

  // Format aktiviti untuk ActivityItem
  const activities = data.recentActivity.map((act) => {
    let icon = BookOpenIcon;
    if (act.activity_type === "chat") icon = ChatBubbleLeftRightIcon;
    if (act.activity_type === "editor") icon = CodeBracketIcon;
    if (act.activity_type === "forum") icon = UserGroupIcon;
    if (act.activity_type === "tutorial") icon = BookOpenIcon;

    return {
      icon,
      title: act.title,
      description: act.description || "",
      time: new Date(act.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Overview
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's your learning progress.
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            {activities.length > 0 ? (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {activities.map((activity, idx) => (
                  <ActivityItem key={idx} {...activity} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                No recent activity yet. Start learning to see your progress!
              </p>
            )}
          </Card>
        </div>

        {/* Quick Actions & Progress */}
        <div>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <p className="font-medium text-sm">Continue Last Tutorial</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {data.progress?.tutorials_completed
                    ? "JavaScript: Closures"
                    : "Start first tutorial"}
                </p>
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <p className="font-medium text-sm">Daily Challenge</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Solve a coding problem
                </p>
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <p className="font-medium text-sm">AI Assistant</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ask anything
                </p>
              </button>
            </div>
          </Card>

          {/* Total XP Card */}
          <Card className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total XP
            </h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {data.progress?.total_xp || 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Keep learning to earn more!
            </p>
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${Math.min((data.progress?.total_xp || 0) % 100, 100)}%`,
                }}
              ></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
