"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function UserGreeting() {
  const { user } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          // Use display_name if set, otherwise username, otherwise fallback to clerk name
          const display = data.display_name || data.username;
          setUsername(display);
        }
      } catch (error) {
        console.error("Failed to fetch username", error);
      }
    };
    fetchUsername();
  }, []);

  if (!user) return null;

  // Determine what to display: username from profile, or first name from clerk
  let displayName = username;
  if (!displayName) {
    displayName =
      user.fullName ||
      user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
      "User";
  }
  const firstName = displayName.split(" ")[0];

  return (
    <button
      onClick={() => router.push("/dashboard?view=account-settings")}
      className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition"
    >
      <UserCircleIcon className="h-6 w-6" />
      <span className="text-sm font-medium">Hi, {firstName}</span>
    </button>
  );
}
