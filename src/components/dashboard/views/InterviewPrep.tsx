"use client";

import { useState } from "react";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Dummy interview questions data
const interviewQuestions = [
  {
    id: 1,
    role: "Frontend",
    question:
      "What is the difference between `null` and `undefined` in JavaScript?",
    difficulty: "Beginner",
    answer:
      '`undefined` means a variable has been declared but not assigned a value. `null` is an intentional assignment representing "no value".',
    hint: "Think about data types and variable states.",
  },
  {
    id: 2,
    role: "Frontend",
    question: "Explain the concept of 'closures' in JavaScript.",
    difficulty: "Intermediate",
    answer:
      "A closure is a function that remembers the environment in which it was created, even after the outer function has finished executing. It allows access to outer scope variables.",
    hint: "Combination of function and lexical scope.",
  },
  {
    id: 3,
    role: "Backend",
    question: "What is the difference between SQL and NoSQL databases?",
    difficulty: "Beginner",
    answer:
      "SQL is a relational database with a fixed schema, while NoSQL is a non-relational database with a flexible schema, suitable for unstructured data.",
    hint: "Relationships vs documents.",
  },
  {
    id: 4,
    role: "Backend",
    question: "Explain the concept of RESTful API.",
    difficulty: "Intermediate",
    answer:
      "A RESTful API is an interface that uses HTTP methods (GET, POST, PUT, DELETE) to interact with resources, based on REST principles.",
    hint: "Resources, representations, and HTTP methods.",
  },
  {
    id: 5,
    role: "Data Science",
    question: "What is overfitting in machine learning?",
    difficulty: "Advanced",
    answer:
      "Overfitting occurs when a model fits the training data too closely, performing poorly on new, unseen data.",
    hint: "Model is too complex.",
  },
  {
    id: 6,
    role: "Data Science",
    question:
      "Explain the difference between supervised and unsupervised learning.",
    difficulty: "Intermediate",
    answer:
      "Supervised learning uses labeled data, while unsupervised learning uses unlabeled data to find patterns.",
    hint: "Labeled vs unlabeled.",
  },
  {
    id: 7,
    role: "Frontend",
    question: "What is the purpose of the `useEffect` hook in React?",
    difficulty: "Intermediate",
    answer:
      "`useEffect` is used to perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.",
    hint: "Component lifecycle.",
  },
  {
    id: 8,
    role: "Backend",
    question:
      "What is the difference between authentication and authorization?",
    difficulty: "Beginner",
    answer:
      "Authentication is the process of verifying a user's identity, while authorization determines what an authenticated user is allowed to do.",
    hint: "Who vs what.",
  },
];

// Unique roles and difficulty levels
const roles = ["All", ...new Set(interviewQuestions.map((q) => q.role))];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function InterviewPrep() {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  // Filter questions
  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.role.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === "All" || q.role === selectedRole;
    const matchesDifficulty =
      selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return matchesSearch && matchesRole && matchesDifficulty;
  });

  const handleCardClick = (q: any) => {
    setSelectedQuestion(q);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Interview Prep
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Practice common interview questions and ace your next technical
          interview.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {/* Role Filter */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Questions Grid */}
      {filteredQuestions.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No questions found.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => handleCardClick(q)}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <Card hover>
                <div className="space-y-3">
                  {/* Header with badges */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs">
                      {q.role}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        q.difficulty === "Beginner"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                          : q.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-3">
                    {q.question}
                  </h3>
                  <div className="flex justify-end">
                    <span className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                      View Answer →
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Question Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedQuestion?.question || "Interview Question"}
        maxWidth="lg"
      >
        {selectedQuestion && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                {selectedQuestion.role}
              </span>
              <span
                className={`px-2 py-1 rounded ${
                  selectedQuestion.difficulty === "Beginner"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                    : selectedQuestion.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Answer:
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {selectedQuestion.answer}
              </p>
            </div>

            {selectedQuestion.hint && (
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Hint:
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  {selectedQuestion.hint}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
