"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function DiscussionForums() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Discussion Forums
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Connect with the community, ask questions, and share knowledge.
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
            Forums – Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're building a space for learners to discuss coding challenges,
            share insights, and help each other grow. Stay tuned for updates!
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      {/* Teks panjang untuk memenuhi halaman */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What to Expect
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            The Discussion Forums will be a vibrant hub where learners from all
            backgrounds can interact. Whether you're stuck on a coding problem,
            want feedback on your project, or just curious about the latest
            technologies, this is the place to be.
          </p>
          <p>We plan to organize forums into categories such as:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>JavaScript & Frontend</li>
            <li>Backend & Databases</li>
            <li>AI & Machine Learning</li>
            <li>Career Advice & Interview Prep</li>
            <li>General Discussion</li>
          </ul>
          <p>
            You'll be able to create threads, reply to others, and even upvote
            helpful answers. Your reputation points from achievements may also
            give you special privileges.
          </p>
          <p>
            We're working hard to bring you this feature soon. In the meantime,
            keep learning and earning XP!
          </p>
        </div>
      </Card>
    </div>
  );
}
