"use client";

import { useAI, availableModels } from "@/context/AIContext";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/ui/Modal";

export default function AIChat() {
  const {
    messages,
    sendMessage,
    isLoading,
    selectedModel,
    setSelectedModel,
    chatCredits,
    nextReset,
    fetchChatCredits,
    isFloatingEnabled,
    setIsFloatingEnabled,
  } = useAI();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchChatCredits();
  }, []);

  useEffect(() => {
    if (!nextReset) return;
    const interval = setInterval(() => {
      const now = new Date();
      const reset = new Date(nextReset);
      const diff = reset.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("Resetting...");
        fetchChatCredits();
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextReset]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (chatCredits !== null && chatCredits <= 0) {
      setShowCreditModal(true);
      return;
    }
    const content = input;
    setInput("");
    await sendMessage(content);
  };

  return (
    <div className="space-y-6">
      {/* Header dengan kredit dan togol terapung */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Chat Assistant
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Chat with multiple AI models. Your conversation is synced with the
            floating assistant.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              Credits: <span className="font-bold">{chatCredits ?? "..."}</span>
            </span>
            {timeLeft && (
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                Reset: {timeLeft}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Floating:
            </span>
            <button
              onClick={() => setIsFloatingEnabled(!isFloatingEnabled)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                isFloatingEnabled
                  ? "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                  isFloatingEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Model selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Model:
        </span>
        <div className="flex gap-2 flex-wrap">
          {availableModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                selectedModel.id === model.id
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <div className="relative w-5 h-5">
                <Image
                  src={model.logo}
                  alt={model.name}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {model.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="h-96 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-500">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal kredit habis */}
      <Modal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        title="Out of Credits"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            You've used all 20 daily chat credits. Come back tomorrow for more!
            🕛
          </p>
          {timeLeft && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Resets in: <span className="font-medium">{timeLeft}</span>
            </p>
          )}
          <div className="flex justify-end">
            <button
              onClick={() => setShowCreditModal(false)}
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
