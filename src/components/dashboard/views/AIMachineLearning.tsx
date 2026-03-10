"use client";

import { useState, useEffect } from "react";
import Card from "../../common/Card";
import Modal from "@/components/ui/Modal";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  SparklesIcon,
  ArrowPathIcon,
  ClipboardIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { premiumModels } from "@/lib/ai-models";

// DeepSeek model ID (fixed for sentiment and playground)
const DEEPSEEK_MODEL = "deepseek/deepseek-r1";

// Example prompts for Sentiment Analyzer
const sentimentExamples = [
  "I absolutely love this new feature! It's amazing.",
  "The service was terrible and I'm very disappointed.",
  "The package arrived on time, nothing special.",
  "This product exceeded all my expectations!",
  "Worst experience ever, will never come back.",
  "It's okay, I guess. Could be better.",
];

// Example prompts for Model Playground
const playgroundExamples = [
  "Explain the concept of neural networks in simple terms.",
  "Write a Python function to reverse a linked list.",
  "What are the differences between supervised and unsupervised learning?",
  "Generate a SQL query to find duplicate emails.",
  "Explain how attention works in transformers.",
  "Write a React component that fetches and displays data.",
];

// ------------------------------------------------------------------
// Sentiment Analyzer Widget (fixed to DeepSeek R1)
// ------------------------------------------------------------------
const SentimentAnalyzer = ({
  onShowModal,
}: {
  onShowModal: (title: string, message: string) => void;
}) => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<
    "positive" | "negative" | "neutral" | null
  >(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSentiment(null);

    try {
      const res = await fetch("/api/ai-ml", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sentiment",
          model: DEEPSEEK_MODEL,
          prompt: text,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const result = data.result.trim().toLowerCase();
        if (result.includes("positive")) setSentiment("positive");
        else if (result.includes("negative")) setSentiment("negative");
        else setSentiment("neutral");
      } else {
        onShowModal("Error", data.error || "Failed to analyze sentiment");
      }
    } catch (error) {
      onShowModal("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-blue-500" />
        Sentiment Analyzer (DeepSeek R1)
      </h3>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a sentence..."
        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={analyze}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Try:</span>
          {sentimentExamples.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setText(ex)}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              Example {idx + 1}
            </button>
          ))}
        </div>
      </div>
      {sentiment && (
        <div className="mt-3 flex items-center gap-2">
          {sentiment === "positive" && (
            <>
              <FaceSmileIcon className="h-6 w-6 text-green-500" />
              <span className="text-green-600 dark:text-green-400">
                Positive sentiment
              </span>
            </>
          )}
          {sentiment === "negative" && (
            <>
              <FaceFrownIcon className="h-6 w-6 text-red-500" />
              <span className="text-red-600 dark:text-red-400">
                Negative sentiment
              </span>
            </>
          )}
          {sentiment === "neutral" && (
            <>
              <FaceFrownIcon className="h-6 w-6 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                Neutral sentiment
              </span>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

// ------------------------------------------------------------------
// AI Chat Widget – coding focused, with credit limit
// ------------------------------------------------------------------
const ChatWidget = ({
  selectedModel,
  credits,
  nextReset,
  onShowModal,
  onCreditUsed,
}: {
  selectedModel: string;
  credits: number | null;
  nextReset: string | null;
  onShowModal: (title: string, message: string) => void;
  onCreditUsed: () => void;
}) => {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: "Hello! I'm your coding assistant. Ask me anything about programming, algorithms, debugging, or tech.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!nextReset) return;
    const interval = setInterval(() => {
      const now = new Date();
      const reset = new Date(nextReset);
      const diff = reset.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("Resetting...");
        onCreditUsed();
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextReset, onCreditUsed]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (credits !== null && credits <= 0) {
      onShowModal(
        "Daily Limit Reached",
        "You've used all 5 daily coding credits. Come back tomorrow for more!",
      );
      return;
    }

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-ml", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          model: selectedModel,
          messages: [...messages, { role: "user", text: userMsg }].map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "ai", text: data.result }]);
        onCreditUsed(); // refresh credits after successful send
      } else {
        if (res.status === 403) {
          onShowModal(
            "Daily Limit Reached",
            "You've used all 5 daily coding credits. Come back tomorrow for more!",
          );
        } else {
          onShowModal("Error", data.error || "Failed to get response");
        }
      }
    } catch (error) {
      onShowModal("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <PaperAirplaneIcon className="h-5 w-5 text-blue-500" />
          Coding Chat (using{" "}
          {premiumModels.find((m) => m.id === selectedModel)?.name || "AI"})
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Credits: <span className="font-bold">{credits ?? "..."}</span>
          </span>
          {timeLeft && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              Reset: {timeLeft}
            </span>
          )}
        </div>
      </div>

      <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-3 dark:bg-gray-800/50 dark:border-gray-700">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg text-gray-500">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a coding question..."
          className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </Card>
  );
};

// ------------------------------------------------------------------
// Model Playground Widget (fixed to DeepSeek R1) with copy button
// ------------------------------------------------------------------
const ModelPlayground = ({
  onShowModal,
}: {
  onShowModal: (title: string, message: string) => void;
}) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    setCopied(false);

    try {
      const res = await fetch("/api/ai-ml", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "playground",
          model: DEEPSEEK_MODEL,
          prompt,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.result);
      } else {
        onShowModal("Error", data.error || "Failed to generate response");
      }
    } catch (error) {
      onShowModal("Error", "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-purple-500" />
        Model Playground (DeepSeek R1)
      </h3>
      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={generate}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="h-4 w-4 animate-spin inline mr-2" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Try:</span>
          {playgroundExamples.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(ex)}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              Example {idx + 1}
            </button>
          ))}
        </div>
      </div>
      {response && (
        <div className="mt-3 relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={copyToClipboard}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckIcon className="h-5 w-5 text-green-600" />
              ) : (
                <ClipboardIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg whitespace-pre-wrap text-sm pr-10">
            {response}
          </div>
        </div>
      )}
    </Card>
  );
};

// ------------------------------------------------------------------
// Tutorial Card Component
// ------------------------------------------------------------------
const AITutorialCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <Card hover>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {description}
          </p>
          <span className="text-xs text-blue-600 dark:text-blue-400 mt-2 inline-block">
            Learn more →
          </span>
        </Card>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This tutorial will be available soon with detailed steps and code
            examples.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
export default function AIMachineLearning() {
  const [selectedModel, setSelectedModel] = useState(premiumModels[0].id);
  const [chatCredits, setChatCredits] = useState<number | null>(null);
  const [nextReset, setNextReset] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const res = await fetch("/api/user/coding-chat-credits");
      if (res.ok) {
        const data = await res.json();
        setChatCredits(data.credits);
        setNextReset(data.nextReset);
      }
    } catch (err) {
      console.error("Failed to fetch coding chat credits");
    }
  };

  const showModal = (title: string, message: string) => {
    setModalState({ isOpen: true, title, message });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: "", message: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI & Machine Learning
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Experiment with the latest AI models. Coding chat uses 1 credit per
          message (5 free daily). Sentiment & Playground use DeepSeek R1.
        </p>
      </div>

      {/* Model Selection (only for coding chat) */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Coding Chat Model:
        </span>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {premiumModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.provider})
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          (Sentiment & Playground use DeepSeek R1)
        </span>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentAnalyzer onShowModal={showModal} />
        <ChatWidget
          selectedModel={selectedModel}
          credits={chatCredits}
          nextReset={nextReset}
          onShowModal={showModal}
          onCreditUsed={fetchCredits}
        />
      </div>

      {/* Full‑width Playground */}
      <ModelPlayground onShowModal={showModal} />

      {/* Tutorial Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          ML Learning Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AITutorialCard
            title="Introduction to Neural Networks"
            description="Learn the basics of neural networks, perceptrons, and activation functions."
          />
          <AITutorialCard
            title="Convolutional Neural Networks (CNN)"
            description="Understand how CNNs work for image recognition and computer vision tasks."
          />
          <AITutorialCard
            title="Transformers and Attention"
            description="Dive into the architecture that powers modern LLMs like GPT and BERT."
          />
          <AITutorialCard
            title="Reinforcement Learning"
            description="Explore how agents learn through rewards and interactions with environments."
          />
          <AITutorialCard
            title="Natural Language Processing"
            description="Learn techniques for text classification, sentiment analysis, and language generation."
          />
          <AITutorialCard
            title="Model Deployment"
            description="How to deploy machine learning models as APIs and integrate them into applications."
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300">
        <SparklesIcon className="h-5 w-5 inline mr-2" />
        AI can make mistakes. Double‑check important responses.
      </div>

      {/* Credit Limit Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            {modalState.message}
          </p>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
