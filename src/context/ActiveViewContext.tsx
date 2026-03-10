"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ActiveViewContextType {
  activeView: string;
  setActiveView: (view: string) => void;
}

const ActiveViewContext = createContext<ActiveViewContextType | undefined>(
  undefined,
);

export function ActiveViewProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState("overview"); // default ke overview
  return (
    <ActiveViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </ActiveViewContext.Provider>
  );
}

export function useActiveView() {
  const context = useContext(ActiveViewContext);
  if (!context)
    throw new Error("useActiveView must be used within ActiveViewProvider");
  return context;
}
