"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function Changelog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Changelog
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Track the latest updates, improvements, and bug fixes.
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
            Changelog – Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We'll keep you informed about every new feature, improvement, and
            bug fix. Transparency is key to our community.
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What You'll Find Here
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            The changelog will document all notable changes to AtlasFlux,
            including:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>New features and enhancements</li>
            <li>Bug fixes and performance improvements</li>
            <li>Deprecations and breaking changes</li>
            <li>Security updates</li>
          </ul>
          <p>
            Each entry will include the version number, release date, and a
            detailed description of the change.
          </p>
        </div>
      </Card>
    </div>
  );
}
