"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import {
  TrophyIcon,
  SparklesIcon,
  UserCircleIcon,
  AcademicCapIcon,
  StarIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

interface LeaderboardUser {
  rank: number;
  userId: string;
  username: string;
  avatar: string | null;
  weeklyXP: number;
}

interface CurrentUserStats {
  username: string;
  avatar: string | null;
  weeklyXP: number;
  rank: number;
  level: number;
  totalXP: number;
  achievements: number;
  gamesPlayed: number;
  winRate: number;
}

export default function Leaderboard() {
  const { user } = useUser();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [currentUserStats, setCurrentUserStats] =
    useState<CurrentUserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/leaderboard/weekly?limit=50");
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
        setCurrentUserStats(data.currentUser || null);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const handleUserClick = (selected: LeaderboardUser) => {
    setSelectedUser(selected);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  // Paparkan top 10 (hanya yang mempunyai XP > 0)
  const topTen = leaderboard.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Leaderboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Top learners this week. Resets every Monday.
        </p>
      </div>

      {/* Leaderboard table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Weekly XP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reward
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topTen.map((userItem) => (
                <tr
                  key={userItem.rank}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleUserClick(userItem)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {userItem.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {userItem.avatar ? (
                        <img
                          src={userItem.avatar}
                          alt={userItem.username}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <UserCircleIcon className="w-full h-full text-gray-400" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {userItem.username}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {userItem.weeklyXP}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getRankBadge(userItem.rank) && (
                      <span className="inline-flex items-center gap-1">
                        <TrophyIcon className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Top 3
                        </span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Current user's rank (only if not in top 10) - including users with 0 XP */}
      {currentUserStats &&
        (currentUserStats.weeklyXP === 0 || currentUserStats.rank > 10) && (
          <Card>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {currentUserStats.avatar ? (
                    <img
                      src={currentUserStats.avatar}
                      alt={currentUserStats.username}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-full h-full text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentUserStats.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your current rank
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Rank
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    #{currentUserStats.rank}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Weekly XP
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {currentUserStats.weeklyXP}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleUserClick({
                      rank: currentUserStats.rank,
                      userId: user?.id || "",
                      username: currentUserStats.username,
                      avatar: currentUserStats.avatar,
                      weeklyXP: currentUserStats.weeklyXP,
                    })
                  }
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                >
                  View Profile
                </button>
              </div>
            </div>
          </Card>
        )}

      {/* Info about rewards */}
      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 flex-shrink-0" />
        <p>
          🏆 Top 3 each week receive exclusive badges and avatar borders!
          Leaderboard resets every Monday at 00:00 UTC.
        </p>
      </div>

      {/* User Profile Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedUser?.username || "User Profile"}
        maxWidth="lg"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {selectedUser.avatar ? (
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.username}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <UserCircleIcon className="w-full h-full text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedUser.username}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <AcademicCapIcon className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Level{" "}
                    {selectedUser.userId === user?.id
                      ? currentUserStats?.level || 1
                      : 1}
                  </span>
                  <StarIcon className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedUser.userId === user?.id
                      ? currentUserStats?.achievements || 0
                      : 0}{" "}
                    badges
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Total XP</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedUser.userId === user?.id
                    ? currentUserStats?.totalXP || 0
                    : 0}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Games Played</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedUser.userId === user?.id
                    ? currentUserStats?.gamesPlayed || 0
                    : 0}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Win Rate</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {selectedUser.userId === user?.id
                    ? currentUserStats?.winRate || 0
                    : 0}
                  %
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Weekly XP</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {selectedUser.weeklyXP}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
