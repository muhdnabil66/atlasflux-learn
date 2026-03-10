"use client";

import { useEffect, useState } from "react";
import Card from "../common/Card";
import { useAppearance } from "@/context/AppearanceContext";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const accentColors = [
  { name: "Blue", value: "blue" },
  { name: "Purple", value: "purple" },
  { name: "Green", value: "green" },
  { name: "Red", value: "red" },
  { name: "Orange", value: "orange" },
  { name: "Pink", value: "pink" },
];

export default function Appearance() {
  const { settings, updateSetting } = useAppearance();
  const [showSuccess, setShowSuccess] = useState(false);

  // Tunjukkan popup kejayaan apabila sebarang tetapan berubah
  useEffect(() => {
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 2000);
    return () => clearTimeout(timer);
  }, [settings]);

  const PreviewCard = () => (
    <div
      className={`p-4 rounded-lg ${
        settings.cardStyle === "shadow"
          ? "shadow-lg"
          : settings.cardStyle === "border"
            ? "border border-gray-300 dark:border-gray-600"
            : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: "var(--accent-base)" }}
        />
        <div>
          <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600" />
          <div className="h-3 w-16 rounded mt-1 bg-gray-200 dark:bg-gray-500" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Appearance
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Customize the look and feel of your dashboard.
        </p>
      </div>

      {/* Theme */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Theme</h2>
        <div className="grid grid-cols-3 gap-4">
          {["light", "dark", "system"].map((theme) => (
            <button
              key={theme}
              onClick={() => updateSetting("theme", theme as any)}
              className={`p-4 rounded-lg border-2 transition ${
                settings.theme === theme
                  ? "border-accent bg-accent-soft dark:bg-accent-soft/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {theme === "light" && (
                <SunIcon className="h-6 w-6 mx-auto mb-2" />
              )}
              {theme === "dark" && (
                <MoonIcon className="h-6 w-6 mx-auto mb-2" />
              )}
              {theme === "system" && (
                <ComputerDesktopIcon className="h-6 w-6 mx-auto mb-2" />
              )}
              <span className="text-sm font-medium capitalize">{theme}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Accent Color */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Accent Color</h2>
        <div className="flex flex-wrap gap-4">
          {accentColors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateSetting("accentColor", color.value)}
              className={`w-10 h-10 rounded-full border-2 transition ${
                settings.accentColor === color.value
                  ? "border-gray-800 dark:border-white scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: `var(--color-${color.value}-500)` }}
              title={color.name}
            />
          ))}
        </div>
      </Card>

      {/* Font Size */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Font Size</h2>
        <div className="grid grid-cols-3 gap-4">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              onClick={() => updateSetting("fontSize", size as any)}
              className={`p-4 rounded-lg border-2 transition ${
                settings.fontSize === size
                  ? "border-accent bg-accent-soft dark:bg-accent-soft/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <span
                className={`block text-center font-medium ${
                  size === "small"
                    ? "text-sm"
                    : size === "medium"
                      ? "text-base"
                      : "text-lg"
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Animations */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Animations</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Reduce motion
          </span>
          <button
            onClick={() => updateSetting("animations", !settings.animations)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              settings.animations
                ? "bg-blue-600"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                settings.animations ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Density */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Density</h2>
        <div className="grid grid-cols-2 gap-4">
          {["compact", "comfortable"].map((density) => (
            <button
              key={density}
              onClick={() => updateSetting("density", density as any)}
              className={`p-4 rounded-lg border-2 transition ${
                settings.density === density
                  ? "border-accent bg-accent-soft dark:bg-accent-soft/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <span className="text-sm font-medium capitalize">{density}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Card Style */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Card Style</h2>
        <div className="grid grid-cols-3 gap-4">
          {["shadow", "border", "minimal"].map((style) => (
            <button
              key={style}
              onClick={() => updateSetting("cardStyle", style as any)}
              className={`p-4 rounded-lg border-2 transition ${
                settings.cardStyle === style
                  ? "border-accent bg-accent-soft dark:bg-accent-soft/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <span className="text-sm font-medium capitalize">{style}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Sidebar Display */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Sidebar Display</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "icons-only", label: "Icons Only" },
            { value: "icons-text", label: "Icons + Text" },
            { value: "auto-collapse", label: "Auto Collapse" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                updateSetting("sidebarDisplay", option.value as any)
              }
              className={`p-4 rounded-lg border-2 transition ${
                settings.sidebarDisplay === option.value
                  ? "border-accent bg-accent-soft dark:bg-accent-soft/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Live Preview */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
        <div
          className="p-6 rounded-lg border-2"
          style={{ borderColor: "var(--accent-base)" }}
        >
          <PreviewCard />
        </div>
      </Card>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircleIcon className="h-5 w-5" />
          Settings saved!
        </div>
      )}
    </div>
  );
}
