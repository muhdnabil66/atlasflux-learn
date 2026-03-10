"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ViewType =
  | "overview"
  | "progress"
  | "recent"
  | "tutorials"
  | "learning-paths"
  | "languages"
  | "ai-ml"
  | "interview-prep"
  | "code-editor"
  | "projects"
  | "challenges"
  | "sandbox"
  | "opensource"
  | "ai-chat"
  | "api-reference"
  | "code-generator"
  | "leaderboards"
  | "forums"
  | "discord"
  | "jobs"
  | "profile"
  | "settings"
  | "subscription"
  | "transactions"
  | "help"
  | "status"
  | "docs"
  | "blog"
  | "changelog"
  | "game";

interface DashboardViewContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const DashboardViewContext = createContext<
  DashboardViewContextType | undefined
>(undefined);

export function DashboardViewProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<ViewType>("overview");
  return (
    <DashboardViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </DashboardViewContext.Provider>
  );
}

export function useDashboardView() {
  const context = useContext(DashboardViewContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardView must be used within a DashboardViewProvider",
    );
  }
  return context;
}
