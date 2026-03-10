// src/components/dashboard/views/Tutorials.tsx
"use client";

import { useState, useMemo, Children, isValidElement } from "react";
import Card from "../../common/Card";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import { tutorialsData } from "@/data/tutorials";

// Code block component with copy button
const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group my-4">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ClipboardIcon className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

// Custom renderers for ReactMarkdown
const markdownComponents = {
  // Perbaiki fungsi p dengan parameter any
  p({ children, ...props }: any) {
    const hasBlockChild = Children.toArray(children).some(
      (child) => isValidElement(child) && child.type === CodeBlock,
    );
    if (hasBlockChild) {
      return <>{children}</>;
    }
    return (
      <p className="my-2" {...props}>
        {children}
      </p>
    );
  },
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const codeString = String(children).replace(/\n$/, "");
    if (inline) {
      return (
        <code
          className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm"
          {...props}
        >
          {children}
        </code>
      );
    }
    return <CodeBlock language={language} code={codeString} />;
  },
};

export default function Tutorials() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("html");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("html-intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeLanguage = tutorialsData.find(
    (lang) => lang.id === selectedLanguage,
  );
  const activeTopic = activeLanguage?.topics.find(
    (topic) => topic.id === selectedTopicId,
  );

  const filteredTopics = useMemo(() => {
    if (!activeLanguage) return [];
    if (!searchQuery.trim()) return activeLanguage.topics;
    const q = searchQuery.toLowerCase();
    return activeLanguage.topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(q) ||
        topic.content.toLowerCase().includes(q),
    );
  }, [activeLanguage, searchQuery]);

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId);
    const newLang = tutorialsData.find((l) => l.id === langId);
    if (newLang && newLang.topics.length > 0) {
      setSelectedTopicId(newLang.topics[0].id);
    }
    setSearchQuery("");
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with language tabs and search */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="inline-flex space-x-1">
            {tutorialsData.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedLanguage === lang.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          {sidebarOpen ? (
            <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (topics list) */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block absolute md:relative z-10 w-64 md:w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto p-4`}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Topics {searchQuery && `(${filteredTopics.length})`}
          </h3>
          <div className="space-y-1">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedTopicId === topic.id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {topic.title}
              </button>
            ))}
            {filteredTopics.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
                No topics found.
              </p>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 p-6">
          {activeTopic ? (
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown components={markdownComponents}>
                {activeTopic.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Select a topic to start learning.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
