"use client";

import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import Card from "../common/Card";
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  TrophyIcon,
  PuzzlePieceIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const activityIcons: Record<string, React.ElementType> = {
  tutorial: BookOpenIcon,
  chat: ChatBubbleLeftRightIcon,
  editor: CodeBracketIcon,
  forum: UserGroupIcon,
  game: TrophyIcon,
  challenge: PuzzlePieceIcon,
  project: AcademicCapIcon,
  achievement: TrophyIcon,
  xp: AdjustmentsHorizontalIcon,
  default: AdjustmentsHorizontalIcon,
};

export default function RecentActivity() {
  const { data, loading, error } = useDashboardData();
  const [filter, setFilter] = useState<string>("all");

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
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  const activities = data.recentActivity || [];

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((a) => a.activity_type === filter);

  const activityTypes = [
    "all",
    ...new Set(activities.map((a) => a.activity_type)),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Your latest actions on AtlasFlux.
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {activityTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all"
                  ? "All"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredActivities.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No activity yet. Start learning to see your progress!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredActivities.map((act) => {
            const Icon =
              activityIcons[act.activity_type] || activityIcons.default;
            const date = new Date(act.created_at).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <Card key={act.id} hover>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {act.title}
                    </h3>
                    {act.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {act.description}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                    {date}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
