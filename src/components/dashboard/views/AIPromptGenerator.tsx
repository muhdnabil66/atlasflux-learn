"use client";

import { useState, useEffect, useRef } from "react";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  ClipboardIcon,
  CheckIcon,
  SparklesIcon,
  StopIcon,
} from "@heroicons/react/24/outline";

// Expanded sample prompts
const samplePrompts = [
  "Create a React component that displays a counter with buttons",
  "Write a Python function to check if a string is a palindrome",
  "Generate a SQL query to get users who signed up last week",
  "Build a JavaScript function to shuffle an array",
  "Create a CSS animation for a loading spinner",
  "Write a Node.js Express API with JWT authentication",
  "Create a TypeScript interface for a User object",
  "Generate a Dockerfile for a Next.js app",
  "Write a recursive function to compute Fibonacci numbers",
  "Create a Tailwind CSS utility class for a gradient",
  "Build a React hook to fetch data from an API",
  "Write a Python script to scrape a website",
  "Generate a PostgreSQL query to find duplicate emails",
  "Create a bash script to backup a directory",
  "Write a C++ program to reverse a linked list",
];

// Expanded language options
const languages = [
  "None",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "SQL",
  "HTML",
  "CSS",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Bash",
  "Dockerfile",
  "YAML",
  "JSON",
  "Markdown",
];

// Model AI options (latest and most capable from OpenRouter)
const modelOptions = [
  { value: "openai/gpt-4o", label: "OpenAI GPT-4o (latest)" },
  { value: "openai/gpt-4-turbo", label: "OpenAI GPT-4 Turbo" },
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
  { value: "anthropic/claude-3-opus", label: "Claude 3 Opus" },
  { value: "google/gemini-pro-1.5", label: "Google Gemini Pro 1.5" },
  { value: "meta-llama/llama-3-70b-instruct", label: "Llama 3 70B Instruct" },
  { value: "mistralai/mistral-large", label: "Mistral Large" },
  { value: "cohere/command-r-plus", label: "Cohere Command R+" },
  { value: "deepseek/deepseek-r1", label: "DeepSeek R1" },
];

export default function AIPromptGenerator() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("None");
  const [model, setModel] = useState(modelOptions[0].value); // default GPT-4o
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Credit state
  const [credits, setCredits] = useState<number | null>(null);
  const [nextReset, setNextReset] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [showCreditModal, setShowCreditModal] = useState(false);

  // Modal states for various errors
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [showCancelledModal, setShowCancelledModal] = useState(false);

  // AbortController ref for stop button
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch credits on mount
  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const res = await fetch("/api/user/credits");
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
        setNextReset(data.nextReset);
      }
    } catch (err) {
      console.error("Failed to fetch credits");
    }
  };

  // Update countdown timer every second
  useEffect(() => {
    if (!nextReset) return;
    const interval = setInterval(() => {
      const now = new Date();
      const reset = new Date(nextReset);
      const diff = reset.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("Resetting...");
        fetchCredits(); // refresh credits when reset happens
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextReset]);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
      setShowCancelledModal(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (credits !== null && credits <= 0) {
      setShowCreditModal(true);
      return;
    }
    setIsGenerating(true);
    setError("");
    setGeneratedCode("");

    // Prepare the prompt to send to AI – instruct to output only code
    let fullPrompt = prompt;
    if (language !== "None") {
      fullPrompt = `Generate code in ${language}. Output only the code, no explanations.\n${prompt}`;
    } else {
      fullPrompt = `Generate code. Output only the code, no explanations.\n${prompt}`;
    }

    // Use AbortController for timeout (45 seconds) and stop button
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch("/api/ai-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          model: model, // hantar model yang dipilih
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      if (response.ok) {
        setGeneratedCode(data.result);
        // Refresh credits after successful generation
        fetchCredits();
      } else {
        // Show error modal, credit not deducted
        setErrorModalMessage(data.error || "Failed to generate code");
        setShowErrorModal(true);
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        // Request was aborted by stop button or timeout
        if (abortControllerRef.current === null) {
          // Stopped by user
          setShowCancelledModal(true);
        } else {
          // Timeout
          setShowTimeoutModal(true);
        }
      } else {
        setErrorModalMessage("Network error. Please try again.");
        setShowErrorModal(true);
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleClear = () => {
    setPrompt("");
    setGeneratedCode("");
    setError("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with credit info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Prompt Generator
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Describe the code you need and let AI generate it for you.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <SparklesIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Credits: <span className="font-bold">{credits ?? "..."}</span>
            </span>
          </div>
          {timeLeft && (
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              Reset in: {timeLeft}
            </div>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel – Input */}
        <Card>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Prompt
            </h2>
            <textarea
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Write a React component that fetches and displays a list of users..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />

            {/* Language selector */}
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Target Language (optional – select "None" for auto)
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Model selector */}
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                AI Model
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {modelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sample prompts */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Try an example:
              </p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {samplePrompts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(sample)}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
                  >
                    {sample.length > 30
                      ? sample.substring(0, 30) + "…"
                      : sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (credits !== null && credits <= 0)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>
              {isGenerating && (
                <button
                  onClick={handleStop}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                >
                  <StopIcon className="h-5 w-5" />
                  Stop
                </button>
              )}
              <button
                onClick={handleClear}
                disabled={isGenerating}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
              >
                Clear
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        </Card>

        {/* Right panel – Output */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Generated Code
              </h2>
              {generatedCode && (
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              )}
            </div>

            {generatedCode ? (
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language={
                    language.toLowerCase() === "none"
                      ? "text"
                      : language.toLowerCase()
                  }
                  style={vs2015}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    fontSize: "0.875rem",
                  }}
                >
                  {generatedCode}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-400">
                {isGenerating ? (
                  <div className="animate-pulse">Thinking...</div>
                ) : (
                  "Your generated code will appear here"
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Modals (sama seperti sebelum) */}
      <Modal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        title="Out of Credits"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            You've used all 8 daily credits. Come back tomorrow for more! 🕛
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

      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            {errorModalMessage ||
              "An unexpected error occurred. Please try again."}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowErrorModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showTimeoutModal}
        onClose={() => setShowTimeoutModal(false)}
        title="Request Timeout"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            The AI took too long to respond. Your credit has not been deducted.
            Please try again later.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowTimeoutModal(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showCancelledModal}
        onClose={() => setShowCancelledModal(false)}
        title="Generation Cancelled"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            The generation was stopped. No credit was used.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowCancelledModal(false)}
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
