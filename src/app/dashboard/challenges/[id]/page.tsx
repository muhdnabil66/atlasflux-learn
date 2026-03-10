"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/common/Card";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Challenge {
  id: number;
  title: string;
  description: string;
  content: string; // full description with examples
  starterCode?: string;
  xp: number;
  difficulty: string;
  completed: boolean;
}

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`/api/challenges/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setChallenge(data);
          setCode(data.starterCode || "");
        } else if (res.status === 404) {
          router.push("/dashboard/languages");
        } else {
          setError("Failed to load challenge");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [params.id, router]);

  const handleComplete = async () => {
    if (!challenge) return;
    // In a real implementation, you might want to test the code here
    // For now, we simply mark it as complete.
    try {
      const res = await fetch(
        `/api/languages/challenge/${challenge.id}/complete`,
        {
          method: "POST",
        },
      );
      if (res.ok) {
        setChallenge((prev) => (prev ? { ...prev, completed: true } : prev));
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
  if (!challenge) return null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {challenge.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {challenge.difficulty} • {challenge.xp} XP
          </p>
        </div>
        {challenge.completed ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircleIcon className="h-6 w-6" />
            <span>Completed</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Submit & Complete
          </button>
        )}
      </div>

      <Card>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {challenge.content}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-2">Your Solution</h2>
        <CodeMirror
          value={code}
          height="300px"
          theme={oneDark}
          extensions={[javascript()]}
          onChange={(val) => setCode(val)}
          className="border rounded-lg overflow-hidden"
        />
      </Card>
    </div>
  );
}
