"use client";

import { useState, useEffect } from "react";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  CheckCircleIcon,
  LockClosedIcon,
  UserCircleIcon,
  PhotoIcon,
  CakeIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  GiftIcon,
  AcademicCapIcon,
  ClockIcon,
  GlobeAltIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  BeakerIcon,
  KeyIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  HeartIcon,
  BoltIcon,
  SunIcon,
  MoonIcon,
  EyeIcon,
  FingerPrintIcon,
  CursorArrowRaysIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// ------------------------------------------------------------------
// Base achievement data from database
// ------------------------------------------------------------------
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  xp_reward: number;
  type: "badge" | "avatar" | "border";
  category: string;
  reward_image: string | null;
}

// ------------------------------------------------------------------
// Achievement with user status (merged)
// ------------------------------------------------------------------
interface AchievementWithStatus extends Achievement {
  unlocked: boolean;
  claimed: boolean;
  equipped: boolean;
}

// ------------------------------------------------------------------
// User achievement response from API
// ------------------------------------------------------------------
interface UserAchievement {
  achievement_id: string;
  unlocked_at: string | null;
  claimed: boolean;
  equipped: boolean;
  progress?: number;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  type: "badge" | "avatar" | "border";
  reward_image: string | null;
  color: string;
  category: string;
}

// ------------------------------------------------------------------
// User profile response from API (now includes xp)
// ------------------------------------------------------------------
interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  equipped_border: string | null;
  settings: any;
  xp: number;
}

// ------------------------------------------------------------------
// Mapping icon string ke komponen Heroicon
// ------------------------------------------------------------------
const iconMap: Record<string, any> = {
  TrophyIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  CheckCircleIcon,
  LockClosedIcon,
  UserCircleIcon,
  PhotoIcon,
  CakeIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  GiftIcon,
  AcademicCapIcon,
  ClockIcon,
  GlobeAltIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  BeakerIcon,
  KeyIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  HeartIcon,
  BoltIcon,
  SunIcon,
  MoonIcon,
  EyeIcon,
  FingerPrintIcon,
  CursorArrowRaysIcon,
  ArrowPathIcon,
};

// ------------------------------------------------------------------
// Fungsi untuk mengira tahap berdasarkan XP
// ------------------------------------------------------------------
const levelThresholds = [
  0, 300, 700, 1200, 1700, 2200, 2700, 3200, 3700, 4200, 5200, 6200, 7200, 8200,
  9200,
];

function getLevelAndXP(xp: number): {
  level: number;
  xpForCurrent: number;
  xpForNext: number;
} {
  let level = 1;
  for (let i = 1; i < levelThresholds.length; i++) {
    if (xp >= levelThresholds[i]) level = i + 1;
    else break;
  }
  const xpForCurrent = levelThresholds[level - 1] || 0;
  const xpForNext = levelThresholds[level] || xpForCurrent + 1000;
  return { level, xpForCurrent, xpForNext };
}

// ------------------------------------------------------------------
// Warna untuk badge
// ------------------------------------------------------------------
const colorClasses: Record<string, string> = {
  yellow:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  orange:
    "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  red: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  indigo:
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  lime: "bg-lime-100 text-lime-600 dark:bg-lime-900/20 dark:text-lime-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
};

// ------------------------------------------------------------------
// Komponen Utama
// ------------------------------------------------------------------
export default function MyAchievements() {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(
    [],
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [showChestModal, setShowChestModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementWithStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gabungkan semua achievement dengan status pengguna
  const [achievements, setAchievements] = useState<AchievementWithStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch semua achievements
        const achRes = await fetch("/api/achievements");
        if (!achRes.ok) throw new Error("Failed to fetch achievements");
        const allAch: Achievement[] = await achRes.json();

        // Fetch user achievements (status)
        const userAchRes = await fetch("/api/user/achievements");
        if (!userAchRes.ok)
          throw new Error("Failed to fetch user achievements");
        const userAch: UserAchievement[] = await userAchRes.json();

        // Fetch user profile (now includes xp)
        const profileRes = await fetch("/api/user/profile");
        if (!profileRes.ok) throw new Error("Failed to fetch user profile");
        const profile: UserProfile = await profileRes.json();

        // Gabung data
        const merged: AchievementWithStatus[] = allAch.map((ach) => {
          const user = userAch.find((ua) => ua.achievement_id === ach.id);
          return {
            ...ach,
            unlocked: !!user?.unlocked_at,
            claimed: user?.claimed || false,
            equipped: user?.equipped || false,
          };
        });

        setAllAchievements(allAch);
        setUserAchievements(userAch);
        setUserProfile(profile);
        setAchievements(merged);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Penapis
  const filteredAchievements = achievements.filter((ach) => {
    if (filter === "all") return true;
    if (filter === "daily") return ach.category === "daily";
    if (filter === "badges") return ach.type === "badge";
    if (filter === "avatars") return ach.type === "avatar";
    if (filter === "borders") return ach.type === "border";
    if (filter === "locked") return !ach.unlocked;
    return true;
  });

  const unlocked = filteredAchievements.filter((a) => a.unlocked);
  const locked = filteredAchievements.filter((a) => !a.unlocked);

  const handleClaim = (ach: AchievementWithStatus) => {
    setSelectedAchievement(ach);
    setShowDetailModal(true);
  };

  const confirmClaim = async () => {
    if (!selectedAchievement) return;

    try {
      const res = await fetch("/api/user/achievements/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          achievementId: selectedAchievement.id,
          equip: true,
        }),
      });
      if (!res.ok) throw new Error("Failed to claim");

      // Kemaskini state tempatan
      setAchievements((prev) =>
        prev.map((a) =>
          a.id === selectedAchievement.id
            ? { ...a, claimed: true, equipped: true }
            : a.type === selectedAchievement.type && a.equipped
              ? { ...a, equipped: false } // unequip other same type
              : a,
        ),
      );

      // Jika border, update userProfile equipped_border
      if (
        selectedAchievement.type === "border" &&
        selectedAchievement.reward_image
      ) {
        setUserProfile((prev) =>
          prev
            ? { ...prev, equipped_border: selectedAchievement.reward_image! }
            : prev,
        );
      }
    } catch (err: any) {
      alert("Error claiming achievement: " + err.message);
    } finally {
      setShowDetailModal(false);
      setSelectedAchievement(null);
    }
  };

  // Koleksi untuk chest modal
  const earnedAvatars = achievements.filter(
    (a) => a.unlocked && a.type === "avatar",
  );
  const earnedBorders = achievements.filter(
    (a) => a.unlocked && a.type === "border",
  );
  const earnedBadges = achievements.filter(
    (a) => a.unlocked && a.type === "badge",
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Error Loading Achievements</h3>
        <p className="mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Gunakan XP sebenar dari profil
  const userXP = userProfile?.xp || 0;
  const { level, xpForCurrent, xpForNext } = getLevelAndXP(userXP);
  const xpProgress =
    ((userXP - xpForCurrent) / (xpForNext - xpForCurrent)) * 100;

  return (
    <div className="space-y-6">
      {/* Header dengan butang peti dan profil pengguna */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Achievements
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track your progress and unlock special rewards.
          </p>
        </div>
        <button
          onClick={() => setShowChestModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-lg transition"
          title="View your collection"
        >
          <GiftIcon className="h-5 w-5" />
          <span>Collection</span>
        </button>
      </div>

      {/* Paparan Tahap Pengguna dengan XP sebenar */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {userProfile?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Level {level}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userXP} XP / {xpForNext} XP
              </p>
            </div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Butang Penapis */}
      <div className="flex flex-wrap gap-2">
        {["all", "daily", "badges", "avatars", "borders", "locked"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Senarai Achievement – Unlocked */}
      {unlocked.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Unlocked</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unlocked.map((ach) => {
              const IconComponent = iconMap[ach.icon] || GiftIcon;
              const isClaimable =
                (ach.type === "avatar" || ach.type === "border") &&
                !ach.claimed;
              return (
                <div
                  key={ach.id}
                  onClick={() => handleClaim(ach)}
                  className={`cursor-pointer transition-transform duration-200 hover:scale-105 ${
                    ach.claimed
                      ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                      : ""
                  }`}
                >
                  <Card hover>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${colorClasses[ach.color] || "bg-gray-100"}`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {ach.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {ach.description}
                          </p>
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                            +{ach.xp_reward} XP
                          </div>
                          {isClaimable && (
                            <div className="mt-2">
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                                Claim Reward
                              </span>
                            </div>
                          )}
                          {ach.claimed && (
                            <div className="mt-2 flex items-center gap-1 text-green-600">
                              <CheckCircleIcon className="h-4 w-4" />
                              <span className="text-xs">Equipped</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Locked</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 opacity-70">
            {locked.map((ach) => {
              const IconComponent = iconMap[ach.icon] || GiftIcon;
              return (
                <div
                  key={ach.id}
                  onClick={() => handleClaim(ach)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-400">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-500 dark:text-gray-400 truncate">
                          {ach.name}
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
                          {ach.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          +{ach.xp_reward} XP
                        </p>
                      </div>
                      <LockClosedIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredAchievements.length === 0 && (
        <Card>
          <p className="text-center py-4">No achievements match your filter.</p>
        </Card>
      )}

      {/* Modal Butiran Achievement (juga untuk claim) */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={selectedAchievement?.name || "Achievement Details"}
        maxWidth="sm"
      >
        {selectedAchievement && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-lg ${colorClasses[selectedAchievement.color]}`}
              >
                {iconMap[selectedAchievement.icon] &&
                  (() => {
                    const Icon = iconMap[selectedAchievement.icon];
                    return <Icon className="h-8 w-8" />;
                  })()}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedAchievement.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedAchievement.description}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Reward:{" "}
                <span className="font-bold">
                  {selectedAchievement.xp_reward} XP
                </span>
              </p>
              {selectedAchievement.type !== "badge" && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Special reward:{" "}
                  {selectedAchievement.type === "avatar" ? "Avatar" : "Border"}
                </p>
              )}
            </div>
            {/* Show Claim button only if unlocked AND not claimed */}
            {selectedAchievement.type !== "badge" &&
              selectedAchievement.unlocked &&
              !selectedAchievement.claimed && (
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={confirmClaim}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                  >
                    Claim & Equip
                  </button>
                </div>
              )}
            {selectedAchievement.claimed && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal Koleksi (Peti) */}
      <Modal
        isOpen={showChestModal}
        onClose={() => setShowChestModal(false)}
        title="Your Collection"
        maxWidth="2xl"
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Avatars */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <PhotoIcon className="h-5 w-5" /> Avatars
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {earnedAvatars.length === 0 ? (
                <p className="text-sm text-gray-500 col-span-full">
                  No avatars yet.
                </p>
              ) : (
                earnedAvatars.map((a) => {
                  const Icon = iconMap[a.icon] || PhotoIcon;
                  return (
                    <div
                      key={a.id}
                      className="text-center p-2 border rounded-lg"
                    >
                      <div
                        className={`w-12 h-12 mx-auto rounded-full ${colorClasses[a.color]} flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs mt-1 font-medium truncate">
                        {a.name}
                      </p>
                      {a.claimed && (
                        <span className="text-[10px] text-green-600">
                          Equipped
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Borders */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <UserCircleIcon className="h-5 w-5" /> Borders
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {earnedBorders.length === 0 ? (
                <p className="text-sm text-gray-500 col-span-full">
                  No borders yet.
                </p>
              ) : (
                earnedBorders.map((a) => {
                  const Icon = iconMap[a.icon] || UserCircleIcon;
                  return (
                    <div
                      key={a.id}
                      className="text-center p-2 border rounded-lg"
                    >
                      <div
                        className={`w-12 h-12 mx-auto rounded-full border-4 ${
                          a.claimed ? "border-yellow-500" : "border-gray-300"
                        } flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <p className="text-xs mt-1 font-medium truncate">
                        {a.name}
                      </p>
                      {a.claimed && (
                        <span className="text-[10px] text-green-600">
                          Equipped
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {/* Badges (just count) */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <TrophyIcon className="h-5 w-5" /> Badges
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You have earned{" "}
              <span className="font-bold text-green-600">
                {earnedBadges.length}
              </span>{" "}
              badges.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
