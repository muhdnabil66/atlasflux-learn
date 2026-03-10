"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function Game() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Game
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Challenge yourself and earn rewards.
        </p>
      </div>

      <Card>
        <div className="flex flex-col items-center text-center py-12 px-4">
          <div className="relative w-32 h-32 mb-6">
            <Image
              src="/atlas.png"
              alt="AtlasFlux Logo"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Game – Under Construction!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're building exciting coding challenges and mini‑games to help you
            learn while having fun. Stay tuned for updates!
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What's Coming
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>The Games section will feature:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Coding quizzes with multiple choice</li>
            <li>Timed challenges to test your speed</li>
            <li>Daily puzzles and brain teasers</li>
            <li>Leaderboards to compete with friends</li>
            <li>Rewards (XP, credits, badges) for top performers</li>
          </ul>
          <p>
            While we put the finishing touches on this feature, keep learning
            and completing tutorials – your skills will pay off!
          </p>
        </div>
      </Card>
    </div>
  );
}
