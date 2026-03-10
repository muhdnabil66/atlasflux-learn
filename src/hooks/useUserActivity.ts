"use client";

import { useEffect, useState, useRef } from "react";

export function useUserActivity(reminderInterval = 30 * 60 * 1000) {
  // 30 minit default
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [showReminder, setShowReminder] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const reminderTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Track masa
    timerRef.current = setInterval(() => {
      setTimeOnSite((prev) => prev + 1);
    }, 1000);

    // Reminder rehat
    reminderTimerRef.current = setInterval(() => {
      setShowReminder(true);
    }, reminderInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (reminderTimerRef.current) clearInterval(reminderTimerRef.current);
    };
  }, [reminderInterval]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    timeOnSite,
    formattedTime: formatTime(timeOnSite),
    showReminder,
    dismissReminder: () => setShowReminder(false),
  };
}
