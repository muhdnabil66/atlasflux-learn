"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function Blog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Blog
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Insights, tutorials, and news from the AtlasFlux team.
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
            Blog – Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're working on articles about coding, career advice, and platform
            updates. Stay tuned for valuable content!
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Topics We'll Cover
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Web development trends and best practices</li>
            <li>Deep dives into AI and machine learning</li>
            <li>Interviews with industry experts</li>
            <li>Case studies from successful learners</li>
            <li>Behind‑the‑scenes of building AtlasFlux</li>
          </ul>
          <p>
            Subscribe to our newsletter to be notified when the blog launches!
          </p>
        </div>
      </Card>
    </div>
  );
}
