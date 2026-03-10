"use client";

import { useState, useEffect, useRef } from "react";
import { useChallenge } from "@/context/ChallengeContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import * as Icons from "@heroicons/react/24/outline"; // untuk ikon dinamik

// Data pencarian dengan ikon
const searchItems = [
  { name: "Overview", view: "overview", icon: "HomeIcon" },
  { name: "Progress", view: "progress", icon: "TrophyIcon" },
  { name: "Recent Activity", view: "recent", icon: "DocumentTextIcon" },
  { name: "Tutorials", view: "tutorials", icon: "BookOpenIcon" },
  { name: "Learning Paths", view: "paths", icon: "RocketLaunchIcon" },
  { name: "Coding Languages", view: "languages", icon: "CodeBracketIcon" },
  {
    name: "AI & Machine Learning",
    view: "ai",
    icon: "ChatBubbleLeftRightIcon",
  },
  { name: "Interview Prep", view: "interview", icon: "PuzzlePieceIcon" },
  { name: "Code Editor", view: "editor", icon: "CodeBracketIcon" },
  { name: "Projects", view: "projects", icon: "DocumentTextIcon" },
  { name: "Challenges", view: "challenges", icon: "TrophyIcon" },
  { name: "Open Source", view: "opensource", icon: "CodeBracketIcon" },
  { name: "AI Chat Assistant", view: "chat", icon: "ChatBubbleLeftRightIcon" },
  { name: "API Reference", view: "api", icon: "DocumentTextIcon" },
  {
    name: "AI Coding Prompt Generator",
    view: "ai-prompt",
    icon: "CommandLineIcon",
  },
  { name: "Game", view: "game", icon: "PuzzlePieceIcon" },
  { name: "SDK Documentation", view: "sdk-docs", icon: "DocumentTextIcon" },
  { name: "API Keys", view: "api-keys", icon: "KeyIcon" },
  { name: "SDK Examples", view: "sdk-examples", icon: "BeakerIcon" },
  { name: "My Achievements", view: "my-achievements", icon: "TrophyIcon" },
  { name: "Game Stats", view: "game-stats", icon: "StarIcon" },
  { name: "Leaderboards", view: "leaderboards", icon: "TrophyIcon" },
  {
    name: "Discussion Forums",
    view: "forums",
    icon: "ChatBubbleLeftRightIcon",
  },
  { name: "Job Board", view: "jobs", icon: "RocketLaunchIcon" },
  { name: "Account Settings", view: "account-settings", icon: "Cog6ToothIcon" },
  {
    name: "Dashboard Settings",
    view: "dashboard-settings",
    icon: "Cog6ToothIcon",
  },
  { name: "Appearance", view: "appearance", icon: "SunIcon" },
  { name: "Profile", view: "profile", icon: "UserGroupIcon" },
  { name: "Subscription", view: "subscription", icon: "DocumentTextIcon" },
  { name: "Help Center", view: "help", icon: "ChatBubbleLeftRightIcon" },
  { name: "Documentation", view: "docs", icon: "DocumentTextIcon" },
  { name: "Blog", view: "blog", icon: "DocumentTextIcon" },
  { name: "Changelog", view: "changelog", icon: "DocumentTextIcon" },
];

interface SearchBarProps {
  onViewChange: (view: string) => void;
}

export default function SearchBar({ onViewChange }: SearchBarProps) {
  const { isActive } = useChallenge(); // true jika cabaran sedang berjalan
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchItems>([]);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isActive || query.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = searchItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
  }, [query, isActive]);

  const handleSelect = (view: string) => {
    onViewChange(view);
    setQuery("");
    setShowResults(false);
  };

  // Fungsi untuk mendapatkan komponen ikon berdasarkan nama
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? (
      <IconComponent className="h-4 w-4 mr-3 text-gray-500" />
    ) : null;
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          disabled={isActive}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {!isActive && showResults && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((item) => (
            <button
              key={item.view}
              onClick={() => handleSelect(item.view)}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {getIcon(item.icon)}
              <span className="text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
