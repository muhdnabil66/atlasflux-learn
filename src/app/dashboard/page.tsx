// src/app/dashboard/page.tsx
"use client";

import { useActiveView } from "@/context/ActiveViewContext";
import Overview from "@/components/dashboard/views/Overview";
import Progress from "@/components/dashboard/views/Progress";
import RecentActivity from "@/components/dashboard/views/RecentActivity";
import CodeEditor from "@/components/dashboard/views/CodeEditor";
import AIChat from "@/components/dashboard/views/AIChat";
import Game from "@/components/dashboard/views/Game";
import Tutorials from "@/components/dashboard/views/Tutorials";
import LearningPaths from "@/components/dashboard/views/LearningPaths";
import CodingLanguages from "@/components/dashboard/views/CodingLanguages";
import AIMachineLearning from "@/components/dashboard/views/AIMachineLearning";
import InterviewPrep from "@/components/dashboard/views/InterviewPrep";
import Projects from "@/components/dashboard/views/Projects";
import Challenges from "@/components/dashboard/views/Challenges";
import OpenSource from "@/components/dashboard/views/OpenSource";
import AccountSettings from "@/components/dashboard/views/AccountSettings";
import DashboardSettings from "@/components/dashboard/views/DashboardSettings";
import Appearance from "@/components/dashboard/views/Appearance";
import Templates from "@/components/dashboard/views/Templates";
import SDK from "@/components/dashboard/views/SDK";
import SdkDocs from "@/components/dashboard/views/SdkDocs";
import ApiKeys from "@/components/dashboard/views/ApiKeys";
import Badges from "@/components/dashboard/views/Badges";
import AIPromptGenerator from "@/components/dashboard/views/AIPromptGenerator";
import Examples from "@/components/dashboard/views/Examples";
import MyAchievements from "@/components/dashboard/views/MyAchievements";
import GameStats from "@/components/dashboard/views/GameStats";
import Leaderboard from "@/components/dashboard/views/Leaderboard";
import DiscussionForums from "@/components/dashboard/views/DiscussionForums";
import JobBoard from "@/components/dashboard/views/JobBoard";
import Documentation from "@/components/dashboard/views/Documentation";
import Blog from "@/components/dashboard/views/Blog";
import Changelog from "@/components/dashboard/views/Changelog";
import APIReference from "@/components/dashboard/views/APIReference"; // <-- tambah import

export default function DashboardPage() {
  const { activeView } = useActiveView();

  // Log untuk debug
  console.log("DashboardPage: activeView =", activeView);

  const renderView = () => {
    switch (activeView) {
      case "overview":
        return <Overview />;
      case "progress":
        return <Progress />;
      case "recent":
        return <RecentActivity />;
      case "editor":
        return <CodeEditor />;
      case "chat":
        return <AIChat />;
      case "game":
        return <Game />;
      case "tutorials":
        return <Tutorials />;
      case "paths":
        return <LearningPaths />;
      case "languages":
        return <CodingLanguages />;
      case "ai":
        return <AIMachineLearning />;
      case "interview":
        return <InterviewPrep />;
      case "projects":
        return <Projects />;
      case "challenges":
        return <Challenges />;
      case "opensource":
        return <OpenSource />;
      case "account-settings":
        return <AccountSettings />;
      case "dashboard-settings":
        return <DashboardSettings />;
      case "appearance":
        return <Appearance />;
      case "templates":
        return <Templates />;
      case "sdk":
        return <SDK />;
      case "sdk-docs":
        return <SdkDocs />;
      case "api-keys":
        return <ApiKeys />;
      case "badges":
        return <Badges />;
      case "ai-prompt":
        return <AIPromptGenerator />;
      case "sdk-examples":
        return <Examples />;
      case "my-achievements":
        return <MyAchievements />;
      case "game-stats":
        return <GameStats />;
      case "leaderboards":
        return <Leaderboard />;
      case "forums":
        return <DiscussionForums />;
      case "jobs":
        return <JobBoard />;
      case "docs":
        return <Documentation />;
      case "blog":
        return <Blog />;
      case "changelog":
        return <Changelog />;
      case "api": // <-- tambah case untuk API Reference
        return <APIReference />;
      default:
        // Jika tidak ada view yang dikenal pasti, boleh return null atau komponen fallback
        return (
          <div className="p-4 text-gray-500">
            View "{activeView}" is under construction.
          </div>
        );
    }
  };

  return renderView();
}
