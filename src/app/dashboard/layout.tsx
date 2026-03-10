"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import SearchBar from "@/components/dashboard/SearchBar";
import UserGreeting from "@/components/dashboard/UserGreeting";
import { ThemeProvider } from "@/context/ThemeContext";
import { ActiveViewProvider, useActiveView } from "@/context/ActiveViewContext";
import { AIProvider } from "@/context/AIContext";
import { ChallengeProvider } from "@/context/ChallengeContext";
import FloatingChatButton from "@/components/FloatingChatButton";
import Modal from "@/components/ui/Modal";
import { useUserActivity } from "@/hooks/useUserActivity";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { activeView, setActiveView } = useActiveView();
  const { showReminder, dismissReminder } = useUserActivity();
  const [showBreakModal, setShowBreakModal] = useState(false);
  const pathname = usePathname();

  // Sembunyikan sidebar pada halaman detail bahasa
  const isLanguageDetail = pathname?.match(/^\/dashboard\/languages\/\d+$/);

  useEffect(() => {
    if (showReminder) {
      setShowBreakModal(true);
      dismissReminder();
    }
  }, [showReminder, dismissReminder]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {!isLanguageDetail && (
        <Sidebar onViewChange={setActiveView} activeView={activeView} />
      )}
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between gap-4">
            <SearchBar onViewChange={setActiveView} />
            <UserGreeting />
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
      <FloatingChatButton />

      {/* Modal peringatan rehat */}
      <Modal
        isOpen={showBreakModal}
        onClose={() => setShowBreakModal(false)}
        title="Time to take a break"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Stretch your eyes and relax for a few minutes.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowBreakModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ActiveViewProvider>
        <AIProvider>
          <ChallengeProvider>
            <DashboardContent>{children}</DashboardContent>
          </ChallengeProvider>
        </AIProvider>
      </ActiveViewProvider>
    </ThemeProvider>
  );
}
