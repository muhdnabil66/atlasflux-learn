"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/common/Card";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface LanguageData {
  id: number;
  name: string;
  description: string;
  tutorials: Tutorial[];
  totalXP: number;
  allCompleted: boolean;
}

export default function LanguageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [language, setLanguage] = useState<LanguageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/languages/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setLanguage(data);
      } else if (res.status === 404) {
        router.push("/dashboard/languages");
      } else {
        setError("Failed to load language data");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleTutorialClick = (tutorialId: number) => {
    router.push(`/dashboard/tutorials/${tutorialId}`);
  };

  const progress = language
    ? Math.round(
        (language.tutorials.filter((t) => t.completed).length /
          language.tutorials.length) *
          100,
      )
    : 0;

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-8">{error}</div>;
  if (!language) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Languages
      </button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language.name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language.description}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total XP:{" "}
            <span className="font-bold text-yellow-600">
              {language.totalXP}
            </span>
          </div>
          {language.allCompleted && (
            <div className="mt-2 flex items-center gap-1 text-green-600">
              <CheckCircleIcon className="h-5 w-5" />
              <span>Completed!</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tutorials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {language.tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            onClick={() => handleTutorialClick(tutorial.id)}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <Card hover>
              <div className="flex items-start gap-3">
                {tutorial.completed ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {tutorial.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {tutorial.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {language.allCompleted && (
        <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
          <p className="text-green-800 dark:text-green-300">
            🎉 Congratulations! You've completed all tutorials for{" "}
            {language.name}. You earned {language.totalXP} XP!
          </p>
        </Card>
      )}
    </div>
  );
}
