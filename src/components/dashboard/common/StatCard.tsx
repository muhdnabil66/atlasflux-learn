"use client";

import { ElementType } from "react";
import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  trend?: number;
  color?: "blue" | "green" | "yellow" | "purple";
}

const colorClasses = {
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  yellow:
    "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  purple:
    "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
}: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {trend !== undefined && (
            <p
              className={`text-xs mt-1 ${trend >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {trend > 0 ? "+" : ""}
              {trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
