"use client";

import Image from "next/image";
import Card from "../common/Card";

export default function ApiKeys() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          API Keys
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Securely manage your API keys for AtlasFlux services.
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
            API Key Management – Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We're building a secure and easy way for you to generate and manage
            API keys. Stay tuned for updates!
          </p>
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          What to Expect
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Generate unique API keys for different environments</li>
            <li>Revoke keys instantly if compromised</li>
            <li>Set usage limits and monitor consumption</li>
            <li>Role‑based access control for team projects</li>
            <li>Audit logs for all key activity</li>
          </ul>
          <p>
            We'll notify you as soon as API key management is ready. Thank you
            for your patience!
          </p>
        </div>
      </Card>
    </div>
  );
}
