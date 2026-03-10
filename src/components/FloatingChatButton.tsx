"use client";

import { useState } from "react";
import { useAI } from "@/context/AIContext";
import { useChallenge } from "@/context/ChallengeContext";
import Image from "next/image";
import FloatingChatWindow from "./FloatingChatWindow";

export default function FloatingChatButton() {
  const { isFloatingEnabled, selectedModel } = useAI();
  const { isActive } = useChallenge();
  const [isOpen, setIsOpen] = useState(false);

  // Sembunyikan butang sepenuhnya jika cabaran aktif
  if (!isFloatingEnabled || isActive) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition z-50 overflow-hidden"
      >
        <Image
          src={selectedModel.logo}
          alt={selectedModel.name}
          width={32}
          height={32}
          className="object-contain"
        />
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <FloatingChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
