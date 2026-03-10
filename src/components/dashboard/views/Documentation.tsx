"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function Documentation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Documentation
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Comprehensive guides and API references.
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
            Documentation – Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're preparing detailed documentation to help you make the most of
            AtlasFlux. You'll find API references, SDK guides, and best
            practices.
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What to Expect
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            Our documentation will cover everything you need to integrate with
            AtlasFlux, including:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Getting started guides for beginners</li>
            <li>In‑depth API reference for all endpoints</li>
            <li>SDK documentation for JavaScript, Python, and more</li>
            <li>Authentication and security best practices</li>
            <li>Examples and tutorials for common use cases</li>
          </ul>
          <p>
            Whether you're building your own applications or contributing to our
            open‑source projects, the documentation will be your go‑to resource.
          </p>
        </div>
      </Card>
    </div>
  );
}
