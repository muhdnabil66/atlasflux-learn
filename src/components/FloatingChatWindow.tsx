"use client";

import { useAI, availableModels } from "@/context/AIContext";
import { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function FloatingChatWindow({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    messages,
    sendMessage,
    isLoading,
    selectedModel,
    setSelectedModel,
    chatCredits,
  } = useAI();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (chatCredits !== null && chatCredits <= 0) {
      alert("No credits left. Please wait for reset.");
      return;
    }
    const content = input;
    setInput("");
    await sendMessage(content);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with model selector */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Image
            src={selectedModel.logo}
            alt={selectedModel.name}
            width={24}
            height={24}
            className="object-contain"
          />
          <select
            value={selectedModel.id}
            onChange={(e) => {
              const model = availableModels.find(
                (m) => m.id === e.target.value,
              );
              if (model) setSelectedModel(model);
            }}
            className="text-sm font-medium bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white"
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg text-sm ${
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
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-sm text-gray-500">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-1 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
