import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  title?: string;
  children: React.ReactNode;
}

export default function Card({
  hover,
  title,
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden ${
        hover ? "transition-transform hover:scale-105 hover:shadow-lg" : ""
      } ${className}`}
      {...props}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
