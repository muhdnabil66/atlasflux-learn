// src/components/DashboardModal.tsx
"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useDashboardModal } from "@/context/DashboardModalContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DashboardModal() {
  const { showDashboardModal, setShowDashboardModal } = useDashboardModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showDashboardModal) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [showDashboardModal]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        showDashboardModal ? "opacity-100" : "opacity-0"
      }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Overlay klik untuk tutup */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={() => setShowDashboardModal(false)}
      ></div>

      {/* Modal content */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${
          showDashboardModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/atlas.png"
            alt="AtlasFlux Logo"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center">
          Sign In Required
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          You need to be signed in to access the dashboard. Please sign in or
          create an account.
        </p>
        <div className="flex flex-col space-y-3">
          <SignInButton mode="modal">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition">
              Sign Up
            </button>
          </SignUpButton>
          <button
            onClick={() => setShowDashboardModal(false)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
