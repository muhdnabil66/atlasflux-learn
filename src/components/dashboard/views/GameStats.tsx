"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function GameStats() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Game Stats
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Track your performance and achievements in coding games.
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
            Game Stats – Under Construction!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're building detailed statistics for your gaming activity. Soon
            you'll be able to see your scores, win rates, and progress over
            time.
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What's Coming
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>The Game Stats page will feature:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Total games played and scores</li>
            <li>Win/loss ratios and accuracy</li>
            <li>Best streaks and highest scores</li>
            <li>Charts showing your progress over time</li>
            <li>Comparison with other players</li>
          </ul>
          <p>
            While we put the finishing touches on this feature, keep playing and
            earning XP – your stats will be waiting for you!
          </p>
        </div>
      </Card>
    </div>
  );
}
