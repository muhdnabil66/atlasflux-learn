"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useChallenge } from "@/context/ChallengeContext";
import Modal from "@/components/ui/Modal";
import {
  HomeIcon,
  BookOpenIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  AcademicCapIcon,
  UserGroupIcon,
  WrenchIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  TrophyIcon,
  PuzzlePieceIcon,
  SunIcon,
  DocumentDuplicateIcon,
  KeyIcon,
  BeakerIcon,
  StarIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

// Kumpulan sidebar dengan sub-item
const sidebarGroups = [
  {
    name: "Dashboard",
    icon: HomeIcon,
    items: [
      { name: "Overview", view: "overview", icon: HomeIcon },
      { name: "Progress", view: "progress", icon: TrophyIcon },
      { name: "Recent Activity", view: "recent", icon: DocumentTextIcon },
    ],
  },
  {
    name: "Learning",
    icon: AcademicCapIcon,
    items: [
      { name: "Tutorials", view: "tutorials", icon: BookOpenIcon },
      { name: "Learning Paths", view: "paths", icon: RocketLaunchIcon },
      // { name: "Coding Languages", view: "languages", icon: CodeBracketIcon }, // commented out
      {
        name: "AI & Machine Learning",
        view: "ai",
        icon: ChatBubbleLeftRightIcon,
      },
      { name: "Interview Prep", view: "interview", icon: PuzzlePieceIcon },
    ],
  },
  {
    name: "Practice",
    icon: WrenchIcon,
    items: [
      { name: "Code Editor", view: "editor", icon: CodeBracketIcon },
      // { name: "Projects", view: "projects", icon: DocumentTextIcon }, // commented out
      // { name: "Challenges", view: "challenges", icon: TrophyIcon }, // commented out
      { name: "Open Source", view: "opensource", icon: CodeBracketIcon },
    ],
  },
  {
    name: "AI Tools",
    icon: ChatBubbleLeftRightIcon,
    items: [
      {
        name: "AI Chat Assistant",
        view: "chat",
        icon: ChatBubbleLeftRightIcon,
      },
      { name: "API Reference", view: "api", icon: DocumentTextIcon },
      {
        name: "AI Code Prompt",
        view: "ai-prompt",
        icon: CommandLineIcon,
      },
      // { name: "Game", view: "game", icon: PuzzlePieceIcon }, // commented out
    ],
  },
  {
    name: "SDK",
    icon: DocumentDuplicateIcon,
    items: [
      { name: "Browse SDKs", view: "sdk", icon: DocumentDuplicateIcon },
      { name: "SDK Documentation", view: "sdk-docs", icon: DocumentTextIcon },
      { name: "API Keys", view: "api-keys", icon: KeyIcon },
      { name: "Examples", view: "sdk-examples", icon: BeakerIcon },
    ],
  },
  {
    name: "Achievements",
    icon: StarIcon,
    items: [
      { name: "My Achievements", view: "my-achievements", icon: TrophyIcon },
      { name: "Game Stats", view: "game-stats", icon: StarIcon },
      { name: "Leaderboards", view: "leaderboards", icon: TrophyIcon },
    ],
  },
  {
    name: "Community",
    icon: UserGroupIcon,
    items: [
      {
        name: "Discussion Forums",
        view: "forums",
        icon: ChatBubbleLeftRightIcon,
      },
      { name: "Job Board", view: "jobs", icon: RocketLaunchIcon },
    ],
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    items: [
      {
        name: "Account Settings",
        view: "account-settings",
        icon: Cog6ToothIcon,
      },
      {
        name: "Dashboard Settings",
        view: "dashboard-settings",
        icon: Cog6ToothIcon,
      },
      { name: "Appearance", view: "appearance", icon: SunIcon },
    ],
  },
  {
    name: "Resources",
    icon: DocumentTextIcon,
    items: [
      { name: "Documentation", view: "docs", icon: DocumentTextIcon },
      { name: "Blog", view: "blog", icon: DocumentTextIcon },
      { name: "Changelog", view: "changelog", icon: DocumentTextIcon },
    ],
  },
];

interface SidebarProps {
  onViewChange: (view: string) => void;
  activeView: string;
}

export default function Sidebar({ onViewChange, activeView }: SidebarProps) {
  const { user } = useUser();
  const { isActive } = useChallenge(); // true jika cabaran sedang berjalan
  const [isOpen, setIsOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState<string[]>(
    sidebarGroups.map((g) => g.name),
  );
  const [showChallengeConfirm, setShowChallengeConfirm] = useState(false);
  const [pendingView, setPendingView] = useState<string | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName],
    );
  };

  const handleViewChange = (view: string) => {
    if (view === "challenges") {
      // Jika sudah dalam sesi aktif, terus tukar view tanpa modal
      if (isActive) {
        onViewChange(view);
      } else {
        setPendingView(view);
        setShowChallengeConfirm(true);
      }
    } else {
      onViewChange(view);
    }
  };

  const confirmChallenge = () => {
    setShowChallengeConfirm(false);
    if (pendingView) {
      onViewChange(pendingView);
      setPendingView(null);
    }
  };

  const cancelChallenge = () => {
    setShowChallengeConfirm(false);
    setPendingView(null);
  };

  return (
    <>
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col h-screen sticky top-0`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4">
          <div
            className={`flex items-center ${isOpen ? "justify-start" : "justify-center w-full"}`}
          >
            <Image
              src="/atlas.png"
              alt="AtlasFlux Logo"
              width={isOpen ? 32 : 24}
              height={isOpen ? 32 : 24}
              className="rounded"
            />
            {isOpen && <span className="ml-2 font-semibold">AtlasFlux</span>}
          </div>
          {isOpen && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded hover:bg-gray-700"
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            </button>
          )}
          {!isOpen && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded hover:bg-gray-800 flex justify-center w-full"
            >
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Sidebar content - scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
          {sidebarGroups.map((group) => (
            <div key={group.name} className="mb-2">
              {/* Group header */}
              <button
                onClick={() => toggleGroup(group.name)}
                className={`flex items-center w-full px-2 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
                  isOpen ? "justify-between" : "justify-center"
                }`}
              >
                <div className="flex items-center">
                  <group.icon className="h-5 w-5" />
                  {isOpen && (
                    <span className="ml-3 text-sm font-medium">
                      {group.name}
                    </span>
                  )}
                </div>
                {isOpen && (
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      openGroups.includes(group.name) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {/* Sub-items (only if group is open) */}
              {openGroups.includes(group.name) && isOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {group.items.map((item) => {
                    const isDisabled = isActive && item.view !== "challenges";
                    return (
                      <button
                        key={item.view}
                        onClick={() =>
                          !isDisabled && handleViewChange(item.view)
                        }
                        disabled={isDisabled}
                        className={`flex items-center w-full px-2 py-2 rounded-lg text-sm transition-colors ${
                          activeView === item.view
                            ? "bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User profile section */}
        {user && (
          <div
            className={`border-t border-gray-700 p-4 ${isOpen ? "" : "flex justify-center"}`}
          >
            {isOpen ? (
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white bg-blue-600">
                      {user.fullName?.charAt(0) ||
                        user.emailAddresses[0]?.emailAddress
                          .charAt(0)
                          .toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium truncate">
                    {user.fullName || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <button
                  onClick={() => handleViewChange("account-settings")}
                  className="text-gray-400 hover:text-white"
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleViewChange("account-settings")}
                className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700"
              >
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white bg-blue-600">
                    {user.fullName?.charAt(0) ||
                      user.emailAddresses[0]?.emailAddress
                        .charAt(0)
                        .toUpperCase()}
                  </div>
                )}
              </button>
            )}
          </div>
        )}

        {/* Copyright footer (only when open) */}
        {isOpen && (
          <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
            <p>© 2025 AtlasFlux Learn</p>
            <p>Free & open-source</p>
          </div>
        )}
      </aside>

      {/* Modal Konfirmasi untuk Challenges */}
      <Modal
        isOpen={showChallengeConfirm}
        onClose={cancelChallenge}
        title="Start Challenge"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            You are about to start a 10-question challenge. You cannot leave
            until all questions are answered. Each question has a 10-second
            timer.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The session will expire after 4 hours. Are you ready?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={cancelChallenge}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={confirmChallenge}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
