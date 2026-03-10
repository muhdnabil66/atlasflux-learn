"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../../common/Card";
import Modal from "@/components/ui/Modal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Data dummy bahasa pengaturcaraan (aktif)
const activeLanguages = [
  {
    id: 1,
    name: "JavaScript",
    description:
      "The language of the web. Build interactive websites and applications.",
    tutorials: 24,
    level: "Beginner to Advanced",
    color: "yellow",
    disabled: false,
  },
  {
    id: 2,
    name: "Python",
    description:
      "Versatile language for data science, AI, and backend development.",
    tutorials: 18,
    level: "Beginner to Advanced",
    color: "blue",
    disabled: false,
  },
  {
    id: 3,
    name: "TypeScript",
    description:
      "JavaScript with syntax for types. Scale your projects with confidence.",
    tutorials: 12,
    level: "Intermediate to Advanced",
    color: "blue",
    disabled: false,
  },
  {
    id: 4,
    name: "HTML/CSS",
    description:
      "The foundation of web development. Structure and style your pages.",
    tutorials: 10,
    level: "Beginner",
    color: "orange",
    disabled: false,
  },
  {
    id: 5,
    name: "React",
    description:
      "Library for building user interfaces. Component-based architecture.",
    tutorials: 15,
    level: "Intermediate",
    color: "cyan",
    disabled: false,
  },
  {
    id: 6,
    name: "Node.js",
    description:
      "JavaScript runtime for server-side programming. Build scalable networks.",
    tutorials: 9,
    level: "Intermediate",
    color: "green",
    disabled: false,
  },
];

// Data bahasa yang akan datang (coming soon)
const comingSoonLanguages = [
  {
    id: 101,
    name: "Rust",
    description:
      "Systems programming language focused on safety and performance.",
    tutorials: 0,
    level: "Advanced",
    color: "orange",
    disabled: true,
  },
  {
    id: 102,
    name: "Go",
    description:
      "Statically typed, compiled language for building efficient software.",
    tutorials: 0,
    level: "Intermediate",
    color: "cyan",
    disabled: true,
  },
  {
    id: 103,
    name: "Swift",
    description:
      "Powerful and intuitive language for iOS, iPadOS, and macOS apps.",
    tutorials: 0,
    level: "Beginner",
    color: "orange",
    disabled: true,
  },
  {
    id: 104,
    name: "Kotlin",
    description: "Modern language for Android development, concise and safe.",
    tutorials: 0,
    level: "Intermediate",
    color: "purple",
    disabled: true,
  },
  {
    id: 105,
    name: "PHP",
    description: "Popular server-side scripting language for web development.",
    tutorials: 0,
    level: "Beginner",
    color: "purple",
    disabled: true,
  },
  {
    id: 106,
    name: "C#",
    description: "Modern, object-oriented language for .NET applications.",
    tutorials: 0,
    level: "Intermediate",
    color: "green",
    disabled: true,
  },
  {
    id: 107,
    name: "Ruby",
    description:
      "Dynamic, open-source language focused on simplicity and productivity.",
    tutorials: 0,
    level: "Beginner",
    color: "red",
    disabled: true,
  },
  {
    id: 108,
    name: "Dart",
    description:
      "Client-optimized language for fast apps on any platform (Flutter).",
    tutorials: 0,
    level: "Intermediate",
    color: "blue",
    disabled: true,
  },
  {
    id: 109,
    name: "SQL",
    description:
      "Standard language for managing and querying relational databases.",
    tutorials: 0,
    level: "Beginner",
    color: "gray",
    disabled: true,
  },
];

const allLanguages = [...activeLanguages, ...comingSoonLanguages];

const colorClasses: Record<string, string> = {
  yellow:
    "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  orange:
    "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  cyan: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
  green: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  purple:
    "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  red: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
  gray: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
};

export default function CodingLanguages() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);

  const filteredLanguages = allLanguages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCardClick = (lang: any) => {
    if (lang.disabled) {
      setSelectedLanguage(lang);
      setShowComingSoonModal(true);
    } else {
      router.push(`/dashboard/languages/${lang.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Coding Languages
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Explore tutorials organized by programming language.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search languages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Languages Grid */}
      {filteredLanguages.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No languages found.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((lang) => (
            <div
              key={lang.id}
              onClick={() => handleCardClick(lang)}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                lang.disabled ? "opacity-50" : ""
              }`}
            >
              <Card hover={!lang.disabled}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        colorClasses[lang.color] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {lang.name}
                    </span>
                    {lang.disabled && (
                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {lang.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {lang.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {lang.tutorials > 0
                        ? `${lang.tutorials} tutorials`
                        : "No tutorials yet"}
                    </span>
                    <span>{lang.level}</span>
                  </div>

                  {!lang.disabled && (
                    <button className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition">
                      View Tutorials
                    </button>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Modal Coming Soon */}
      <Modal
        isOpen={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
        title={selectedLanguage?.name || "Coming Soon"}
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Tutorials for <strong>{selectedLanguage?.name}</strong> are not yet
            available. We're working hard to bring you this content. Stay tuned!
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
