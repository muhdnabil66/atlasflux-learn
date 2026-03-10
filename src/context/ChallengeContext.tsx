"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ChallengeContextType {
  isActive: boolean;
  setActive: (active: boolean) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined,
);

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [isActive, setActive] = useState(false);

  return (
    <ChallengeContext.Provider value={{ isActive, setActive }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenge() {
  const context = useContext(ChallengeContext);
  if (!context)
    throw new Error("useChallenge must be used within ChallengeProvider");
  return context;
}
