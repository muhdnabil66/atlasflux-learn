"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/common/Card";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  xp: number;
  level: string;
  completed: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        } else if (res.status === 404) {
          router.push("/dashboard/languages");
        } else {
          setError("Failed to load project");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id, router]);

  const handleComplete = async () => {
    if (!project) return;
    try {
      const res = await fetch(`/api/languages/project/${project.id}/complete`, {
        method: "POST",
      });
      if (res.ok) {
        setProject((prev) => (prev ? { ...prev, completed: true } : prev));
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
  if (!project) return null;

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
            {project.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.level} • {project.xp} XP
          </p>
        </div>
        {project.completed ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircleIcon className="h-6 w-6" />
            <span>Completed</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Mark Complete
          </button>
        )}
      </div>

      <Card>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {project.content}
        </div>
      </Card>

      {/* Placeholder for submission – can be expanded later */}
      <Card>
        <h2 className="text-lg font-semibold mb-2">Submission</h2>
        <p className="text-gray-600 dark:text-gray-400">
          When you finish, paste a link to your repository or deployed project
          below.
        </p>
        <input
          type="url"
          placeholder="https://github.com/your-repo"
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 mt-2"
        />
      </Card>
    </div>
  );
}
