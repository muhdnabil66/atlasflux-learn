"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardModalContextType {
  showDashboardModal: boolean;
  setShowDashboardModal: (show: boolean) => void;
}

const DashboardModalContext = createContext<
  DashboardModalContextType | undefined
>(undefined);

export function DashboardModalProvider({ children }: { children: ReactNode }) {
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  return (
    <DashboardModalContext.Provider
      value={{ showDashboardModal, setShowDashboardModal }}
    >
      {children}
    </DashboardModalContext.Provider>
  );
}

export function useDashboardModal() {
  const context = useContext(DashboardModalContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardModal must be used within a DashboardModalProvider",
    );
  }
  return context;
}
