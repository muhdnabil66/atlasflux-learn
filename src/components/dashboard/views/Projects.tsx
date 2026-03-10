"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../../common/Card";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  xp_reward: number;
}

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        // Ekstrak semua teknologi unik
        const techs = Array.from(
          new Set(data.flatMap((p: Project) => p.technologies)),
        ) as string[];
        setAllTechnologies(techs.sort());
      }
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());
    const matchesTech =
      selectedTech === "All" || project.technologies.includes(selectedTech);
    const matchesLevel =
      selectedLevel === "All" || project.level === selectedLevel;
    return matchesSearch && matchesTech && matchesLevel;
  });

  if (loading) {
    return <div className="text-center p-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Build real-world projects and add them to your portfolio.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Technologies</option>
          {allTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No projects found.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => router.push(`/dashboard/projects/${project.id}`)}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <Card hover>
                <div className="space-y-3">
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                    {project.title[0]}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        project.level === "Beginner"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                          : project.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {project.level}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {project.xp_reward} XP
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
