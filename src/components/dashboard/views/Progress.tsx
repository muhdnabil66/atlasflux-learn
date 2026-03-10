"use client";

import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import {
  ChartBarIcon,
  AcademicCapIcon,
  FireIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Progress() {
  const { data, loading, error } = useDashboardData();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

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

  const progressItems = [
    {
      title: "Tutorials Completed",
      value: data.progress?.tutorials_completed || 0,
      icon: AcademicCapIcon,
      color: "blue",
      details: "You have completed this many tutorials. Keep going!",
    },
    {
      title: "Learning Streak",
      value: `${data.progress?.learning_streak || 0} days`,
      icon: FireIcon,
      color: "orange",
      details: "Your current streak. Don't break it!",
    },
    {
      title: "Projects Completed",
      value: data.progress?.projects_completed || 0,
      icon: ChartBarIcon,
      color: "green",
      details: "Projects you've built. Add more to your portfolio.",
    },
    {
      title: "Total XP",
      value: data.progress?.total_xp || 0,
      icon: ClockIcon,
      color: "purple",
      details: "Experience points earned. Level up by learning!",
    },
  ];

  const handleCardClick = (title: string) => {
    setSelectedMetric(title);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Progress
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Track your learning achievements and streaks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} hover>
              <button
                onClick={() => handleCardClick(item.title)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.title}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
                  {item.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Click for details
                </p>
              </button>
            </Card>
          );
        })}
      </div>

      {/* Modal untuk detail */}
      <Modal
        isOpen={!!selectedMetric}
        onClose={() => setSelectedMetric(null)}
        title={selectedMetric || ""}
        maxWidth="md"
      >
        <div className="space-y-4">
          {selectedMetric && (
            <p className="text-gray-700 dark:text-gray-300">
              {progressItems.find((i) => i.title === selectedMetric)?.details}
            </p>
          )}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Recommendation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedMetric === "Tutorials Completed" &&
                "Try completing one more tutorial today."}
              {selectedMetric === "Learning Streak" &&
                "Keep learning daily to maintain your streak!"}
              {selectedMetric === "Projects Completed" &&
                "Build a new project to showcase your skills."}
              {selectedMetric === "Total XP" &&
                "Earn more XP by completing challenges and tutorials."}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setSelectedMetric(null)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
