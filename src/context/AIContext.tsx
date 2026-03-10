"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Model {
  id: string;
  name: string;
  logo: string;
}

export const availableModels: Model[] = [
  { id: "deepseek-r1", name: "DeepSeek R1", logo: "/logos/deepseekai.png" },
  { id: "claude-4.6", name: "Claude 4.6", logo: "/logos/claudeai.svg" },
  { id: "gpt-5.3", name: "GPT-5.3", logo: "/logos/chatgpt.png" },
  { id: "atlas-3", name: "Atlas 3", logo: "/logos/atlasm3.jpg" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
  chatCredits: number | null;
  nextReset: string | null;
  fetchChatCredits: () => Promise<void>;
  isFloatingEnabled: boolean;
  setIsFloatingEnabled: (enabled: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(availableModels[0]);
  const [chatCredits, setChatCredits] = useState<number | null>(null);
  const [nextReset, setNextReset] = useState<string | null>(null);
  const [isFloatingEnabled, setIsFloatingEnabled] = useState(false);

  const fetchChatCredits = async () => {
    try {
      const res = await fetch("/api/user/chat-credits");
      if (res.ok) {
        const data = await res.json();
        setChatCredits(data.credits);
        setNextReset(data.nextReset);
      }
    } catch (err) {
      console.error("Failed to fetch chat credits");
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    if (chatCredits !== null && chatCredits <= 0) return;

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.reply,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        await fetchChatCredits();
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider
      value={{
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
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) throw new Error("useAI must be used within AIProvider");
  return context;
}
