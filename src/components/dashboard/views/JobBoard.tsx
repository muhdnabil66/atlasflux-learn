"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function JobBoard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Job Board
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Discover job opportunities tailored for developers.
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
            Job Board – Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're curating the best entry‑level and remote developer jobs.
            Prepare your portfolio and get ready to apply!
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What We're Planning
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            The Job Board will connect talented learners with companies looking
            for junior developers, interns, and remote freelancers. We'll
            feature roles that match the skills you can learn on AtlasFlux.
          </p>
          <p>Planned features include:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Job listings with filters (tech stack, location, remote)</li>
            <li>Salary expectations and company reviews</li>
            <li>Direct application links or application via your profile</li>
            <li>Notifications when new relevant jobs are posted</li>
          </ul>
          <p>
            We're partnering with companies who value open‑source contributions
            and practical project experience. Your achievements on AtlasFlux
            could become a part of your application.
          </p>
          <p>
            While we build this section, focus on completing tutorials and
            projects – it will pay off!
          </p>
        </div>
      </Card>
    </div>
  );
}
