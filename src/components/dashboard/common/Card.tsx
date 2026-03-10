"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6
        ${hover ? "hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
