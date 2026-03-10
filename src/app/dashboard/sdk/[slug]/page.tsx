"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "../../../../components/common/Card";
import ReactMarkdown from "react-markdown";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { sdkFullList, SDKDetail } from "../../../../lib/sdkData";

export default function SDKDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [selectedSdk, setSelectedSdk] = useState<SDKDetail | null>(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sdk = sdkFullList.find((s) => s.id === slug);
    if (sdk) {
      setSelectedSdk(sdk);
      setSelectedSectionIndex(0);
    } else {
      router.push("/dashboard/sdk");
    }
    setLoading(false);
  }, [slug, router]);

  const goToPreviousSection = () => {
    if (!selectedSdk) return;
    setSelectedSectionIndex((prev) =>
      prev === 0 ? selectedSdk.docSections.length - 1 : prev - 1,
    );
  };

  const goToNextSection = () => {
    if (!selectedSdk) return;
    setSelectedSectionIndex((prev) =>
      prev === selectedSdk.docSections.length - 1 ? 0 : prev + 1,
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!selectedSdk) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        ← Back to SDK List
      </button>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {selectedSdk.name}
        </h1>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-sm">
          {selectedSdk.language}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <span className="text-gray-500 dark:text-gray-400">Version</span>
          <p className="font-medium text-gray-900 dark:text-white">
            {selectedSdk.version}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <span className="text-gray-500 dark:text-gray-400">License</span>
          <p className="font-medium text-gray-900 dark:text-white">
            {selectedSdk.license}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <span className="text-gray-500 dark:text-gray-400">Website</span>
          <a
            href={selectedSdk.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {selectedSdk.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <span className="text-gray-500 dark:text-gray-400">Category</span>
          <p className="font-medium text-gray-900 dark:text-white">
            {selectedSdk.category}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </h3>
        <div className="flex flex-wrap gap-1">
          {selectedSdk.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Card>
        <p className="text-gray-700 dark:text-gray-300">
          {selectedSdk.description}
        </p>
      </Card>

      <Card title="Installation">
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded">
          <code className="text-sm font-mono">{selectedSdk.install}</code>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedSdk.docSections[selectedSectionIndex].title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousSection}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Previous section"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedSectionIndex + 1} / {selectedSdk.docSections.length}
            </span>
            <button
              onClick={goToNextSection}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Next section"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <pre
                    className={`language-${match[1]} bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm`}
                  >
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code
                    className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {selectedSdk.docSections[selectedSectionIndex].content}
          </ReactMarkdown>
        </div>
      </Card>

      <div className="flex justify-end">
        <a
          href={selectedSdk.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Official Documentation →
        </a>
      </div>
    </div>
  );
}
