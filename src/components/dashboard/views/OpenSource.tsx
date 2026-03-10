"use client";

import { useState } from "react";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import {
  MagnifyingGlassIcon,
  CodeBracketIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  ClipboardIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// Dummy open source projects data
const projectsData = [
  {
    id: 1,
    name: "AtlasFlux Core",
    description:
      "The main learning platform engine. Built with Next.js and TypeScript.",
    language: "TypeScript",
    stars: 234,
    forks: 56,
    issues: 12,
    difficulty: "Beginner-friendly",
    repo: "https://github.com/atlasflux/core",
    goodFirstIssues: true,
  },
  {
    id: 2,
    name: "React Component Library",
    description: "Reusable UI components for the AtlasFlux dashboard.",
    language: "React",
    stars: 89,
    forks: 23,
    issues: 5,
    difficulty: "Intermediate",
    repo: "https://github.com/atlasflux/components",
    goodFirstIssues: true,
  },
  {
    id: 3,
    name: "API Client SDK",
    description: "JavaScript SDK for interacting with AtlasFlux APIs.",
    language: "JavaScript",
    stars: 45,
    forks: 12,
    issues: 3,
    difficulty: "Advanced",
    repo: "https://github.com/atlasflux/sdk",
    goodFirstIssues: false,
  },
  {
    id: 4,
    name: "Documentation Website",
    description: "Official documentation for AtlasFlux Learn.",
    language: "MDX",
    stars: 67,
    forks: 34,
    issues: 8,
    difficulty: "Beginner-friendly",
    repo: "https://github.com/atlasflux/docs",
    goodFirstIssues: true,
  },
  {
    id: 5,
    name: "Mobile App (React Native)",
    description: "Cross-platform mobile app for learning on the go.",
    language: "React Native",
    stars: 112,
    forks: 28,
    issues: 15,
    difficulty: "Intermediate",
    repo: "https://github.com/atlasflux/mobile",
    goodFirstIssues: true,
  },
  {
    id: 6,
    name: "CLI Tool",
    description: "Command-line interface for managing learning paths.",
    language: "Python",
    stars: 34,
    forks: 8,
    issues: 4,
    difficulty: "Advanced",
    repo: "https://github.com/atlasflux/cli",
    goodFirstIssues: false,
  },
];

// Git command tutorials data
const gitTutorials = [
  {
    id: "git1",
    title: "Clone a Repository",
    command: "git clone https://github.com/username/repo.git",
    description: "Copy a repository from GitHub to your local machine.",
    steps: [
      "Navigate to the repository on GitHub",
      "Click the green 'Code' button",
      "Copy the HTTPS or SSH URL",
      "Run `git clone <url>` in your terminal",
    ],
  },
  {
    id: "git2",
    title: "Create a New Branch",
    command: "git checkout -b feature/your-feature-name",
    description: "Create and switch to a new branch for your changes.",
    steps: [
      "Ensure you're on the main branch: `git checkout main`",
      "Pull latest changes: `git pull origin main`",
      "Create and switch: `git checkout -b your-branch-name`",
    ],
  },
  {
    id: "git3",
    title: "Stage and Commit Changes",
    command: "git add . && git commit -m 'Your commit message'",
    description: "Save your changes locally with a descriptive message.",
    steps: [
      "Check status: `git status` to see changed files",
      "Stage files: `git add <filename>` or `git add .` for all",
      "Commit: `git commit -m 'Your message'`",
    ],
  },
  {
    id: "git4",
    title: "Push to GitHub",
    command: "git push origin your-branch-name",
    description: "Upload your local commits to GitHub.",
    steps: [
      "First push: `git push -u origin your-branch-name`",
      "Subsequent pushes: `git push`",
      "Then create a Pull Request on GitHub",
    ],
  },
  {
    id: "git5",
    title: "Sync with Main Branch",
    command: "git pull origin main",
    description: "Update your local branch with latest changes from main.",
    steps: [
      "Switch to main: `git checkout main`",
      "Pull updates: `git pull origin main`",
      "Switch back: `git checkout your-branch`",
      "Merge: `git merge main`",
    ],
  },
];

// Comprehensive Dev Commands data (grouped by category)
const devCommandsData = [
  // Node.js / npm
  {
    id: "dev-node1",
    category: "Node.js & npm",
    title: "Initialize a Node.js Project",
    command: "npm init -y",
    description: "Create a new package.json with default settings.",
    steps: [
      "Navigate to your project folder",
      "Run `npm init -y` to generate package.json",
    ],
  },
  {
    id: "dev-node2",
    category: "Node.js & npm",
    title: "Install a Package Locally",
    command: "npm install <package-name>",
    description: "Install a package and add it to dependencies.",
    steps: [
      "Run `npm install <package-name>` in your project root",
      "The package will be added to node_modules and package.json",
    ],
  },
  {
    id: "dev-node3",
    category: "Node.js & npm",
    title: "Install a Package Globally",
    command: "npm install -g <package-name>",
    description: "Install a package globally (e.g., a CLI tool).",
    steps: [
      "Run `npm install -g <package-name>`",
      "The package will be available system‑wide",
    ],
  },
  {
    id: "dev-node4",
    category: "Node.js & npm",
    title: "Run an npm Script",
    command: "npm run <script-name>",
    description: "Execute a script defined in package.json.",
    steps: [
      "Check the 'scripts' section in package.json",
      "Run `npm run <script-name>` (e.g., `npm run dev`)",
    ],
  },
  {
    id: "dev-node5",
    category: "Node.js & npm",
    title: "Execute a Package with npx",
    command: "npx <package-name>",
    description: "Run a package without installing it permanently.",
    steps: [
      "Example: `npx create-react-app my-app`",
      "npx downloads and runs the latest version",
    ],
  },

  // Python
  {
    id: "dev-python1",
    category: "Python",
    title: "Create a Virtual Environment",
    command: "python -m venv venv",
    description: "Create an isolated Python environment.",
    steps: [
      "Navigate to your project folder",
      "Run `python -m venv venv` to create a folder named 'venv'",
    ],
  },
  {
    id: "dev-python2",
    category: "Python",
    title: "Activate Virtual Environment (macOS/Linux)",
    command: "source venv/bin/activate",
    description: "Activate the virtual environment on Unix systems.",
    steps: [
      "Run `source venv/bin/activate` from your project root",
      "Your prompt should change to indicate the active environment",
    ],
  },
  {
    id: "dev-python3",
    category: "Python",
    title: "Activate Virtual Environment (Windows)",
    command: "venv\\Scripts\\activate",
    description: "Activate the virtual environment on Windows.",
    steps: [
      "Run `venv\\Scripts\\activate` in Command Prompt or PowerShell",
      "The environment name should appear",
    ],
  },
  {
    id: "dev-python4",
    category: "Python",
    title: "Install a Python Package",
    command: "pip install <package-name>",
    description: "Install a package using pip.",
    steps: [
      "Ensure your virtual environment is active",
      "Run `pip install <package-name>`",
    ],
  },
  {
    id: "dev-python5",
    category: "Python",
    title: "Export Installed Packages",
    command: "pip freeze > requirements.txt",
    description: "Save all installed packages to a file.",
    steps: [
      "Run `pip freeze > requirements.txt`",
      "This file can be used to recreate the environment",
    ],
  },
  {
    id: "dev-python6",
    category: "Python",
    title: "Install from requirements.txt",
    command: "pip install -r requirements.txt",
    description: "Install all dependencies listed in requirements.txt.",
    steps: [
      "Make sure you have a requirements.txt file",
      "Run `pip install -r requirements.txt`",
    ],
  },

  // Supabase CLI
  {
    id: "dev-supabase1",
    category: "Supabase CLI",
    title: "Initialize a Supabase Project",
    command: "supabase init",
    description: "Create a new Supabase configuration in your project.",
    steps: [
      "Navigate to your project root",
      "Run `supabase init` – it creates a `supabase` folder",
    ],
  },
  {
    id: "dev-supabase2",
    category: "Supabase CLI",
    title: "Login to Supabase",
    command: "supabase login",
    description: "Authenticate with your Supabase account.",
    steps: [
      "Run `supabase login`",
      "Follow the prompts to complete authentication",
    ],
  },
  {
    id: "dev-supabase3",
    category: "Supabase CLI",
    title: "Link Local Project to Remote",
    command: "supabase link --project-ref <ref>",
    description: "Connect your local project to an existing Supabase project.",
    steps: [
      "Get your project reference from the Supabase dashboard",
      "Run `supabase link --project-ref <ref>`",
    ],
  },
  {
    id: "dev-supabase4",
    category: "Supabase CLI",
    title: "Create a New Migration",
    command: "supabase migration new <migration-name>",
    description: "Generate a new migration file for database changes.",
    steps: [
      "Run `supabase migration new add_users_table`",
      "Edit the generated SQL file in `supabase/migrations`",
    ],
  },
  {
    id: "dev-supabase5",
    category: "Supabase CLI",
    title: "Apply Migrations",
    command: "supabase migration up",
    description: "Apply pending migrations to your local database.",
    steps: [
      "Make sure your local database is running (use `supabase start`)",
      "Run `supabase migration up`",
    ],
  },

  // Neon CLI
  {
    id: "dev-neon1",
    category: "Neon CLI",
    title: "Authenticate with Neon",
    command: "neonctl auth",
    description: "Log in to your Neon account via the CLI.",
    steps: [
      "Run `neonctl auth`",
      "A browser window will open for you to confirm access",
    ],
  },
  {
    id: "dev-neon2",
    category: "Neon CLI",
    title: "List Projects",
    command: "neonctl projects list",
    description: "Show all Neon projects you have access to.",
    steps: [
      "After authentication, run `neonctl projects list`",
      "The output will show project names and IDs",
    ],
  },
  {
    id: "dev-neon3",
    category: "Neon CLI",
    title: "Get Connection String",
    command: "neonctl connection-string --project-name <name>",
    description: "Retrieve the PostgreSQL connection string for a project.",
    steps: [
      "Replace `<name>` with your actual project name",
      "The command outputs the connection string you can use in your app",
    ],
  },
  {
    id: "dev-neon4",
    category: "Neon CLI",
    title: "Create a Branch",
    command: "neonctl branches create --project-name <name>",
    description: "Create a new database branch (like Git branches).",
    steps: [
      "Specify the project name and optionally a branch name",
      "Example: `neonctl branches create --project-name myproj --branch-name dev`",
    ],
  },

  // Clerk (authentication)
  {
    id: "dev-clerk1",
    category: "Clerk",
    title: "Install Clerk for Next.js",
    command: "npm install @clerk/nextjs",
    description: "Add Clerk authentication to your Next.js app.",
    steps: [
      "Run `npm install @clerk/nextjs`",
      "Set up environment variables: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY",
    ],
  },
  {
    id: "dev-clerk2",
    category: "Clerk",
    title: "Wrap Your App with ClerkProvider",
    command: "import { ClerkProvider } from '@clerk/nextjs'",
    description: "Add the provider to your root layout.",
    steps: [
      "In `app/layout.tsx`, import and wrap children with `<ClerkProvider>`",
      "See the documentation for complete setup",
    ],
  },

  // ngrok
  {
    id: "dev-ngrok1",
    category: "ngrok",
    title: "Expose Local Server",
    command: "ngrok http 3000",
    description: "Create a public URL for your localhost:3000.",
    steps: [
      "Make sure your local server is running on port 3000",
      "Run `ngrok http 3000` – a forwarding URL will appear",
    ],
  },
  {
    id: "dev-ngrok2",
    category: "ngrok",
    title: "Add Authtoken",
    command: "ngrok config add-authtoken <token>",
    description: "Authenticate your ngrok account for extended features.",
    steps: [
      "Get your token from the ngrok dashboard",
      "Run `ngrok config add-authtoken <token>`",
    ],
  },
  {
    id: "dev-ngrok3",
    category: "ngrok",
    title: "Check ngrok Version",
    command: "ngrok version",
    description: "Display the installed ngrok version.",
    steps: ["Simply run `ngrok version` to verify installation"],
  },

  // VS Code
  {
    id: "dev-vscode1",
    category: "VS Code",
    title: "Open Current Folder in VS Code",
    command: "code .",
    description: "Launch VS Code in the current directory.",
    steps: [
      "Navigate to your project folder in terminal",
      "Run `code .` – VS Code will open with that folder",
    ],
  },
  {
    id: "dev-vscode2",
    category: "VS Code",
    title: "Install an Extension",
    command: "code --install-extension <extension-id>",
    description: "Install a VS Code extension from the command line.",
    steps: [
      "Find the extension ID (e.g., `ms-python.python`)",
      "Run `code --install-extension ms-python.python`",
    ],
  },
  {
    id: "dev-vscode3",
    category: "VS Code",
    title: "List Installed Extensions",
    command: "code --list-extensions",
    description: "Show all extensions currently installed.",
    steps: ["Run `code --list-extensions` to see the list"],
  },

  // Docker
  {
    id: "dev-docker1",
    category: "Docker",
    title: "Build an Image",
    command: "docker build -t <image-name> .",
    description:
      "Build a Docker image from a Dockerfile in the current directory.",
    steps: ["Make sure you have a Dockerfile", "Run `docker build -t myapp .`"],
  },
  {
    id: "dev-docker2",
    category: "Docker",
    title: "Run a Container",
    command: "docker run -p 8080:80 <image-name>",
    description:
      "Start a container and map host port 8080 to container port 80.",
    steps: [
      "Example: `docker run -p 8080:80 myapp`",
      "Access the app at http://localhost:8080",
    ],
  },
  {
    id: "dev-docker3",
    category: "Docker",
    title: "List Running Containers",
    command: "docker ps",
    description: "Show all currently running containers.",
    steps: ["Run `docker ps` to see container IDs and names"],
  },
  {
    id: "dev-docker4",
    category: "Docker",
    title: "Start Services with Docker Compose",
    command: "docker-compose up",
    description: "Start all services defined in docker-compose.yml.",
    steps: [
      "Ensure you have a docker-compose.yml file",
      "Run `docker-compose up` to start services",
    ],
  },

  // General terminal
  {
    id: "dev-general1",
    category: "General Terminal",
    title: "Change Directory",
    command: "cd <folder-name>",
    description: "Navigate to a folder.",
    steps: [
      "Use `cd foldername` to enter a folder",
      "Use `cd ..` to go up one level",
    ],
  },
  {
    id: "dev-general2",
    category: "General Terminal",
    title: "List Files (macOS/Linux)",
    command: "ls",
    description: "Display contents of the current directory.",
    steps: ["Run `ls` to see files and folders"],
  },
  {
    id: "dev-general3",
    category: "General Terminal",
    title: "List Files (Windows)",
    command: "dir",
    description: "Display directory contents on Windows.",
    steps: ["Run `dir` in Command Prompt or PowerShell"],
  },
  {
    id: "dev-general4",
    category: "General Terminal",
    title: "Create a Directory",
    command: "mkdir <folder-name>",
    description: "Make a new folder.",
    steps: ["Run `mkdir newfolder` to create a folder named 'newfolder'"],
  },
  {
    id: "dev-general5",
    category: "General Terminal",
    title: "Remove a File",
    command: "rm <filename>",
    description: "Delete a file (use with caution).",
    steps: [
      "On macOS/Linux: `rm file.txt`",
      "On Windows (PowerShell): `del file.txt`",
    ],
  },
  {
    id: "dev-general6",
    category: "General Terminal",
    title: "Remove a Folder (macOS/Linux)",
    command: "rm -rf <folder-name>",
    description: "Force delete a folder and its contents.",
    steps: ["Run `rm -rf folder` – be absolutely sure you want to delete it!"],
  },
  {
    id: "dev-general7",
    category: "General Terminal",
    title: "Remove a Folder (Windows)",
    command: "rmdir /s <folder-name>",
    description: "Delete a folder and all subfolders.",
    steps: ["In Command Prompt: `rmdir /s foldername`"],
  },
];

// GitHub hosting tutorials data
const hostingTutorials = [
  {
    id: "host1",
    title: "Deploy to GitHub Pages",
    steps: [
      "Create a repository on GitHub",
      "Push your code to the repository",
      "Go to repository Settings → Pages",
      "Select branch 'main' and folder '/root' or '/docs'",
      "Your site will be published at username.github.io/repo-name",
    ],
    link: "https://pages.github.com/",
    icon: "🚀",
  },
  {
    id: "host2",
    title: "Deploy a React App to GitHub Pages",
    steps: [
      "Install gh-pages: `npm install gh-pages --save-dev`",
      'Add to package.json: `"homepage": "https://username.github.io/repo-name"`',
      'Add scripts: `"predeploy": "npm run build"`, `"deploy": "gh-pages -d build"`',
      "Run: `npm run deploy`",
    ],
    link: "https://create-react-app.dev/docs/deployment/#github-pages",
    icon: "⚛️",
  },
  {
    id: "host3",
    title: "Set Up a Custom Domain",
    steps: [
      "Buy a domain from a registrar",
      "Add a CNAME file to your repository with your domain",
      "Configure DNS: Point your domain to GitHub Pages IPs",
      "Wait for DNS propagation (up to 24 hours)",
    ],
    link: "https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site",
    icon: "🌐",
  },
];

// Languages for filter (projects only)
const languages = ["All", ...new Set(projectsData.map((p) => p.language))];
const difficulties = ["All", "Beginner-friendly", "Intermediate", "Advanced"];

// Group dev commands by category
const groupedDevCommands = devCommandsData.reduce(
  (acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  },
  {} as Record<string, typeof devCommandsData>,
);

export default function OpenSource() {
  const [activeTab, setActiveTab] = useState<
    "projects" | "git" | "dev" | "hosting"
  >("projects");
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showGitModal, setShowGitModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [showHostingModal, setShowHostingModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedGit, setSelectedGit] = useState<any>(null);
  const [selectedDev, setSelectedDev] = useState<any>(null);
  const [selectedHosting, setSelectedHosting] = useState<any>(null);
  const [copiedCommandId, setCopiedCommandId] = useState<string | null>(null);

  // Filter projects
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage =
      selectedLanguage === "All" || project.language === selectedLanguage;
    const matchesDifficulty =
      selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
    return matchesSearch && matchesLanguage && matchesDifficulty;
  });

  // Copy to clipboard function
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommandId(id);
    setTimeout(() => setCopiedCommandId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Open Source
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Contribute to projects, learn Git, master essential commands, and host
          your creations.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "projects"
              ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <CodeBracketIcon className="h-4 w-4 inline mr-2" />
          Projects
        </button>
        <button
          onClick={() => setActiveTab("git")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "git"
              ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <CommandLineIcon className="h-4 w-4 inline mr-2" />
          Git Tutorials
        </button>
        <button
          onClick={() => setActiveTab("dev")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "dev"
              ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <CommandLineIcon className="h-4 w-4 inline mr-2" />
          Dev Commands
        </button>
        <button
          onClick={() => setActiveTab("hosting")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "hosting"
              ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <RocketLaunchIcon className="h-4 w-4 inline mr-2" />
          GitHub Hosting
        </button>
      </div>

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-4">
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
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
            >
              {difficulties.map((diff) => (
                <option key={diff}>{diff}</option>
              ))}
            </select>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <Card>
              <p className="text-center py-8 text-gray-500">
                No projects found.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project);
                    setShowProjectModal(true);
                  }}
                  className="cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <Card hover>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                          {project.language}
                        </span>
                        {project.goodFirstIssues && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-xs">
                            Good First Issues
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>⭐ {project.stars}</span>
                        <span>⑂ {project.forks}</span>
                        <span>⚠️ {project.issues}</span>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          View Project →
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Git Tutorials Tab */}
      {activeTab === "git" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gitTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              onClick={() => {
                setSelectedGit(tutorial);
                setShowGitModal(true);
              }}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <Card hover>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                    <span className="truncate">{tutorial.command}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(tutorial.command, tutorial.id);
                      }}
                      className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                      title="Copy command"
                    >
                      {copiedCommandId === tutorial.id ? (
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <ClipboardIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Steps →
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Dev Commands Tab */}
      {activeTab === "dev" && (
        <div className="space-y-8">
          {Object.entries(groupedDevCommands).map(([category, commands]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commands.map((cmd) => (
                  <div
                    key={cmd.id}
                    onClick={() => {
                      setSelectedDev(cmd);
                      setShowDevModal(true);
                    }}
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                  >
                    <Card hover>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {cmd.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {cmd.description}
                        </p>
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                          <span className="truncate">{cmd.command}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(cmd.command, cmd.id);
                            }}
                            className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                            title="Copy command"
                          >
                            {copiedCommandId === cmd.id ? (
                              <CheckIcon className="h-4 w-4 text-green-600" />
                            ) : (
                              <ClipboardIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                            )}
                          </button>
                        </div>
                        <div className="flex justify-end">
                          <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GitHub Hosting Tab */}
      {activeTab === "hosting" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostingTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              onClick={() => {
                setSelectedHosting(tutorial);
                setShowHostingModal(true);
              }}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <Card hover>
                <div className="space-y-3">
                  <div className="text-4xl">{tutorial.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {tutorial.steps.join(" • ")}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Full Guide →
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title={selectedProject?.name || "Project Details"}
        maxWidth="lg"
      >
        {selectedProject && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500">Language:</span>
                <p className="font-medium">{selectedProject.language}</p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500">Difficulty:</span>
                <p className="font-medium">{selectedProject.difficulty}</p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500">Stars / Forks:</span>
                <p className="font-medium">
                  {selectedProject.stars} ⭐ / {selectedProject.forks} ⑂
                </p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-gray-500">Issues:</span>
                <p className="font-medium">{selectedProject.issues} ⚠️</p>
              </div>
            </div>

            {selectedProject.goodFirstIssues && (
              <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded">
                <p className="text-green-600 dark:text-green-400 text-sm">
                  🎯 This project has issues labeled "good first issue" –
                  perfect for beginners!
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <a
                href={selectedProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View on GitHub →
              </a>
              <button
                onClick={() => setShowProjectModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Git Tutorial Modal */}
      <Modal
        isOpen={showGitModal}
        onClose={() => setShowGitModal(false)}
        title={selectedGit?.title || "Git Tutorial"}
        maxWidth="lg"
      >
        {selectedGit && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {selectedGit.description}
            </p>

            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm">
              <span>{selectedGit.command}</span>
              <button
                onClick={() =>
                  copyToClipboard(selectedGit.command, selectedGit.id)
                }
                className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                title="Copy command"
              >
                {copiedCommandId === selectedGit.id ? (
                  <CheckIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <ClipboardIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {selectedGit.steps.map((step: string, idx: number) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 Tip: Practice these commands in your terminal with a test
                repository first!
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowGitModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Dev Command Modal */}
      <Modal
        isOpen={showDevModal}
        onClose={() => setShowDevModal(false)}
        title={selectedDev?.title || "Command Details"}
        maxWidth="lg"
      >
        {selectedDev && (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              {selectedDev.description}
            </p>

            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm">
              <span>{selectedDev.command}</span>
              <button
                onClick={() =>
                  copyToClipboard(selectedDev.command, selectedDev.id)
                }
                className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
                title="Copy command"
              >
                {copiedCommandId === selectedDev.id ? (
                  <CheckIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <ClipboardIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {selectedDev.steps.map((step: string, idx: number) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 Tip: Use these commands frequently to speed up your workflow!
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowDevModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Hosting Tutorial Modal */}
      <Modal
        isOpen={showHostingModal}
        onClose={() => setShowHostingModal(false)}
        title={selectedHosting?.title || "Hosting Guide"}
        maxWidth="lg"
      >
        {selectedHosting && (
          <div className="space-y-4">
            <div className="text-5xl text-center mb-2">
              {selectedHosting.icon}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Step-by-Step Guide:</h4>
              <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700 dark:text-gray-300">
                {selectedHosting.steps.map((step: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex justify-between items-center mt-4">
              <a
                href={selectedHosting.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Official Documentation →
              </a>
              <button
                onClick={() => setShowHostingModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
