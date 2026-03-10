"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/common/Card";
import ReactMarkdown from "react-markdown";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Tutorial {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

export default function TutorialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTutorial();
  }, [params.id]);

  const fetchTutorial = async () => {
    try {
      const res = await fetch(`/api/tutorials/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setTutorial(data);
      } else if (res.status === 404) {
        router.push("/dashboard/languages");
      } else {
        setError("Failed to load tutorial");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!tutorial || tutorial.completed) return;
    try {
      const res = await fetch(
        `/api/languages/tutorial/${tutorial.id}/complete`,
        {
          method: "POST",
        },
      );
      if (res.ok) {
        setTutorial({ ...tutorial, completed: true });
      } else {
        const data = await res.json();
        alert(data.error || "Error marking as complete");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-8">{error}</div>;
  if (!tutorial) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {tutorial.title}
      </h1>

      <Card>
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
            {tutorial.content}
          </ReactMarkdown>
        </div>
      </Card>

      {!tutorial.completed && (
        <div className="flex justify-end">
          <button
            onClick={handleComplete}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Tandai Selesai
          </button>
        </div>
      )}
    </div>
  );
}
