"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AppearanceSettings = {
  theme: "light" | "dark" | "system";
  accentColor: string;
  fontSize: "small" | "medium" | "large";
  animations: boolean;
  density: "compact" | "comfortable";
  cardStyle: "shadow" | "border" | "minimal";
  sidebarDisplay: "icons-only" | "icons-text" | "auto-collapse";
};

type AppearanceContextType = {
  settings: AppearanceSettings;
  updateSetting: <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K],
  ) => void;
};

const defaultSettings: AppearanceSettings = {
  theme: "system",
  accentColor: "blue",
  fontSize: "medium",
  animations: true,
  density: "comfortable",
  cardStyle: "shadow",
  sidebarDisplay: "icons-text",
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(
  undefined,
);

export function AppearanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<AppearanceSettings>(defaultSettings);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("appearance");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse appearance settings", e);
      }
    }
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem("appearance", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const updateSetting = <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppearanceContext.Provider value={{ settings, updateSetting }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context)
    throw new Error("useAppearance must be used within AppearanceProvider");
  return context;
}

// Helper to apply settings to document root
function applySettings(settings: AppearanceSettings) {
  const root = document.documentElement;

  // Theme
  if (settings.theme === "system") {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    root.classList.toggle("dark", systemDark);
  } else {
    root.classList.toggle("dark", settings.theme === "dark");
  }

  // Accent color – set CSS variables
  const accentColors: Record<string, { base: string; soft: string }> = {
    blue: { base: "#3b82f6", soft: "#eff6ff" },
    purple: { base: "#8b5cf6", soft: "#f5f3ff" },
    green: { base: "#10b981", soft: "#d1fae5" },
    red: { base: "#ef4444", soft: "#fee2e2" },
    orange: { base: "#f97316", soft: "#ffedd5" },
    pink: { base: "#ec4899", soft: "#fce7f3" },
  };
  const color = accentColors[settings.accentColor] || accentColors.blue;
  root.style.setProperty("--accent-base", color.base);
  root.style.setProperty("--accent-soft", color.soft);

  // Font size
  const fontSizeMap = {
    small: "14px",
    medium: "16px",
    large: "18px",
  };
  root.style.fontSize = fontSizeMap[settings.fontSize];

  // Animations
  root.classList.toggle("reduce-motion", !settings.animations);

  // Density – set spacing multiplier
  const densityMultiplier = settings.density === "compact" ? "0.75" : "1";
  root.style.setProperty("--density", densityMultiplier);

  // Card style – set data attribute
  root.dataset.cardStyle = settings.cardStyle;

  // Sidebar display – set data attribute for sidebar component
  root.dataset.sidebarDisplay = settings.sidebarDisplay;
}
