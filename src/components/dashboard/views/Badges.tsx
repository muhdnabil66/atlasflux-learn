"use client";

import Card from "../common/Card";
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// Dummy badges data
const badgesData = [
  {
    id: 1,
    name: "First Login",
    description: "Logged in for the first time",
    icon: StarIcon,
    color: "yellow",
    earned: true,
  },
  {
    id: 2,
    name: "5-Day Streak",
    description: "Logged in 5 days in a row",
    icon: FireIcon,
    color: "orange",
    earned: true,
  },
  {
    id: 3,
    name: "Code Master",
    description: "Completed 10 tutorials",
    icon: TrophyIcon,
    color: "blue",
    earned: false,
  },
  {
    id: 4,
    name: "AI Explorer",
    description: "Used AI chat 20 times",
    icon: SparklesIcon,
    color: "purple",
    earned: true,
  },
  {
    id: 5,
    name: "Project Builder",
    description: "Finished 3 projects",
    icon: TrophyIcon,
    color: "green",
    earned: false,
  },
  {
    id: 6,
    name: "Open Source Contributor",
    description: "Submitted a pull request",
    icon: StarIcon,
    color: "red",
    earned: false,
  },
  {
    id: 7,
    name: "Game Champion",
    description: "Won the daily challenge",
    icon: TrophyIcon,
    color: "purple",
    earned: true,
  },
  {
    id: 8,
    name: "Feedback Guru",
    description: "Provided feedback on 5 tutorials",
    icon: StarIcon,
    color: "blue",
    earned: false,
  },
];

const colorClasses = {
  yellow:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  orange:
    "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  red: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

export default function Badges() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Achievements
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Badges you've earned by learning and contributing.
        </p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Badges
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            4 / 8
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Earned</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            4
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Locked</p>
          <p className="text-2xl font-bold text-gray-400 dark:text-gray-500">
            4
          </p>
        </Card>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badgesData.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`relative p-4 rounded-lg border ${
                badge.earned
                  ? "border-gray-200 dark:border-gray-700"
                  : "border-gray-200 dark:border-gray-700 opacity-40 grayscale"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg ${colorClasses[badge.color as keyof typeof colorClasses]} flex items-center justify-center mb-3`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {badge.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {badge.description}
              </p>
              {!badge.earned && (
                <span className="absolute top-2 right-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  Locked
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
