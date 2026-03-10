"use client";

import { useState } from "react";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
  BellIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  ArrowPathIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function DashboardSettings() {
  // State untuk tetapan
  const [defaultView, setDefaultView] = useState("overview");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [showSidebarLabels, setShowSidebarLabels] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [showRecentActivity, setShowRecentActivity] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  // State untuk modal reset
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = () => {
    // Dalam aplikasi sebenar, simpan ke database melalui API
    setSuccessMessage("Preferences saved successfully!");
    setShowSuccessModal(true);
  };

  const handleReset = () => {
    // Kembalikan ke default
    setDefaultView("overview");
    setItemsPerPage("10");
    setShowSidebarLabels(true);
    setEnableNotifications(true);
    setShowRecentActivity(true);
    setShowQuickActions(true);
    setSessionTimeout("30");
    setShowResetModal(false);
    setSuccessMessage("Preferences reset to default.");
    setShowSuccessModal(true);
  };

  const handleExport = () => {
    // Data mock – dalam aplikasi sebenar, ambil data dari API
    const data = {
      defaultView,
      itemsPerPage,
      showSidebarLabels,
      enableNotifications,
      showRecentActivity,
      showQuickActions,
      sessionTimeout,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-preferences.json";
    a.click();
    URL.revokeObjectURL(url);
    setSuccessMessage("Preferences exported!");
    setShowSuccessModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Settings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Customize your dashboard layout and behavior.
        </p>
      </div>

      {/* Default Dashboard View */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5" /> Default Dashboard
          View
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Choose the first page you see when logging in
          </span>
          <select
            value={defaultView}
            onChange={(e) => setDefaultView(e.target.value)}
            className="border rounded-lg px-3 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="overview">Overview</option>
            <option value="progress">Progress</option>
            <option value="tutorials">Tutorials</option>
            <option value="editor">Code Editor</option>
            <option value="game">Game</option>
          </select>
        </div>
      </Card>

      {/* Items per Page */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowsUpDownIcon className="h-5 w-5" /> Items per Page
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Number of items in lists (tutorials, projects, etc.)
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="border rounded-lg px-3 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </Card>

      {/* Sidebar Labels */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5" /> Sidebar
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Show sidebar labels (when sidebar is expanded)
          </span>
          <input
            type="checkbox"
            checked={showSidebarLabels}
            onChange={(e) => setShowSidebarLabels(e.target.checked)}
            className="toggle"
          />
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BellIcon className="h-5 w-5" /> Notifications
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Enable dashboard notifications (achievements, reminders)
          </span>
          <input
            type="checkbox"
            checked={enableNotifications}
            onChange={(e) => setEnableNotifications(e.target.checked)}
            className="toggle"
          />
        </div>
      </Card>

      {/* Overview Widgets */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <EyeIcon className="h-5 w-5" /> Overview Widgets
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Show Recent Activity
            </span>
            <input
              type="checkbox"
              checked={showRecentActivity}
              onChange={(e) => setShowRecentActivity(e.target.checked)}
              className="toggle"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Show Quick Actions
            </span>
            <input
              type="checkbox"
              checked={showQuickActions}
              onChange={(e) => setShowQuickActions(e.target.checked)}
              className="toggle"
            />
          </div>
        </div>
      </Card>

      {/* Session Timeout */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ClockIcon className="h-5 w-5" /> Session Timeout
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Automatically log out after inactivity (minutes)
          </span>
          <select
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            className="border rounded-lg px-3 py-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="0">Never</option>
          </select>
        </div>
      </Card>

      {/* Data Export */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DocumentArrowDownIcon className="h-5 w-5" /> Data Export
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Download your dashboard preferences as a JSON file.
        </p>
        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Export Preferences
        </button>
      </Card>

      {/* Reset to Default */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowPathIcon className="h-5 w-5" /> Reset
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Restore all dashboard settings to their default values.
        </p>
        <button
          onClick={() => setShowResetModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Reset to Default
        </button>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm"
        >
          Save All Preferences
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleReset}
        title="Reset Settings"
        message="Are you sure you want to reset all dashboard settings to default? This action cannot be undone."
        confirmText="Reset"
        cancelText="Cancel"
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{successMessage}</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
