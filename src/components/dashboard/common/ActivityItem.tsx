"use client";

import { ElementType } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

interface ActivityItemProps {
  icon: ElementType;
  title: string;
  description: string;
  time: string;
}

export default function ActivityItem({
  icon: Icon,
  title,
  description,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex-shrink-0">
        {" "}
        {/* tukar ke shrink-0 jika nak ikut cadangan */}
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
        <ClockIcon className="h-3 w-3 mr-1 shrink-0" />
        {time}
      </div>
    </div>
  );
}
