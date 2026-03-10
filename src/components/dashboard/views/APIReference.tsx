"use client";

import { useState } from "react";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

// Dummy API endpoints data
const endpointsData = [
  {
    id: 1,
    method: "GET",
    endpoint: "/api/tutorials",
    description: "Retrieve a list of all tutorials.",
    category: "Tutorials",
    auth: "Bearer token",
    parameters: [
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Number of tutorials to return (default 10).",
      },
      {
        name: "offset",
        type: "integer",
        required: false,
        description: "Pagination offset.",
      },
    ],
    requestExample:
      "curl -X GET 'https://api.atlasflux.com/api/tutorials?limit=5' -H 'Authorization: Bearer YOUR_TOKEN'",
    responseExample: `{
  "tutorials": [
    { "id": 1, "title": "JavaScript Basics", "language": "JavaScript" }
  ],
  "total": 42
}`,
    errorResponse: `{ "error": "Invalid token", "status": 401 }`,
  },
  {
    id: 2,
    method: "POST",
    endpoint: "/api/tutorials",
    description: "Create a new tutorial.",
    category: "Tutorials",
    auth: "Bearer token",
    parameters: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Tutorial title.",
      },
      {
        name: "description",
        type: "string",
        required: true,
        description: "Tutorial description.",
      },
      {
        name: "language",
        type: "string",
        required: true,
        description: "Programming language.",
      },
    ],
    requestExample: `curl -X POST 'https://api.atlasflux.com/api/tutorials' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{"title": "React Hooks", "description": "Learn useState and useEffect", "language": "JavaScript"}'`,
    responseExample: `{ "id": 123, "title": "React Hooks", "language": "JavaScript", "createdAt": "2026-03-06T12:00:00Z" }`,
    errorResponse: `{ "error": "Title is required", "status": 400 }`,
  },
  {
    id: 3,
    method: "GET",
    endpoint: "/api/tutorials/{id}",
    description: "Get a single tutorial by ID.",
    category: "Tutorials",
    auth: "Bearer token",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "Tutorial ID (in path).",
      },
    ],
    requestExample:
      "curl -X GET 'https://api.atlasflux.com/api/tutorials/123' -H 'Authorization: Bearer YOUR_TOKEN'",
    responseExample: `{ "id": 123, "title": "React Hooks", "language": "JavaScript", "createdAt": "2026-03-06T12:00:00Z" }`,
    errorResponse: `{ "error": "Tutorial not found", "status": 404 }`,
  },
  {
    id: 4,
    method: "PUT",
    endpoint: "/api/tutorials/{id}",
    description: "Update an existing tutorial.",
    category: "Tutorials",
    auth: "Bearer token",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "Tutorial ID (in path).",
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "New title.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "New description.",
      },
      {
        name: "language",
        type: "string",
        required: false,
        description: "New language.",
      },
    ],
    requestExample: `curl -X PUT 'https://api.atlasflux.com/api/tutorials/123' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{"title": "Advanced React"}'`,
    responseExample: `{ "id": 123, "title": "Advanced React", "language": "JavaScript", "updatedAt": "2026-03-06T12:30:00Z" }`,
    errorResponse: `{ "error": "Tutorial not found", "status": 404 }`,
  },
  {
    id: 5,
    method: "DELETE",
    endpoint: "/api/tutorials/{id}",
    description: "Delete a tutorial.",
    category: "Tutorials",
    auth: "Bearer token",
    parameters: [
      {
        name: "id",
        type: "integer",
        required: true,
        description: "Tutorial ID (in path).",
      },
    ],
    requestExample:
      "curl -X DELETE 'https://api.atlasflux.com/api/tutorials/123' -H 'Authorization: Bearer YOUR_TOKEN'",
    responseExample: `{ "message": "Tutorial deleted successfully" }`,
    errorResponse: `{ "error": "Tutorial not found", "status": 404 }`,
  },
  {
    id: 6,
    method: "GET",
    endpoint: "/api/user/profile",
    description: "Get authenticated user's profile.",
    category: "User",
    auth: "Bearer token",
    parameters: [],
    requestExample:
      "curl -X GET 'https://api.atlasflux.com/api/user/profile' -H 'Authorization: Bearer YOUR_TOKEN'",
    responseExample: `{ "id": "user_123", "name": "John Doe", "email": "john@example.com", "credits": 120 }`,
    errorResponse: `{ "error": "Unauthorized", "status": 401 }`,
  },
  {
    id: 7,
    method: "POST",
    endpoint: "/api/ai/chat",
    description: "Send a message to the AI assistant.",
    category: "AI",
    auth: "Bearer token",
    parameters: [
      {
        name: "model",
        type: "string",
        required: true,
        description: "Model ID (e.g., deepseek-r1, claude-4.6).",
      },
      {
        name: "messages",
        type: "array",
        required: true,
        description: "List of message objects with role and content.",
      },
    ],
    requestExample: `curl -X POST 'https://api.atlasflux.com/api/ai/chat' \\
  -H 'Authorization: Bearer YOUR_TOKEN' \\
  -H 'Content-Type: application/json' \\
  -d '{"model": "deepseek-r1", "messages": [{"role": "user", "content": "Hello"}]}'`,
    responseExample: `{ "reply": "Hello! How can I help you?" }`,
    errorResponse: `{ "error": "Insufficient credits", "status": 402 }`,
  },
];

// Unique methods for filter
const methods = ["All", ...new Set(endpointsData.map((e) => e.method))];

export default function APIReference() {
  const [search, setSearch] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null);

  // Filter endpoints
  const filteredEndpoints = endpointsData.filter((e) => {
    const matchesSearch =
      e.endpoint.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    const matchesMethod =
      selectedMethod === "All" || e.method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  const handleCardClick = (ep: any) => {
    setSelectedEndpoint(ep);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          API Reference
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Explore all available API endpoints, parameters, and examples.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search endpoints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {/* Method Filter */}
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {methods.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Endpoints Grid */}
      {filteredEndpoints.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-gray-500">No endpoints found.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEndpoints.map((ep) => (
            <div
              key={ep.id}
              onClick={() => handleCardClick(ep)}
              className="cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
            >
              <Card hover>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold w-16 text-center ${
                      ep.method === "GET"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : ep.method === "POST"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : ep.method === "PUT"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : ep.method === "DELETE"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <code className="text-sm font-mono text-gray-700 dark:text-gray-300 flex-1">
                    {ep.endpoint}
                  </code>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {ep.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {ep.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Endpoint Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedEndpoint?.endpoint || "Endpoint Details"}
        maxWidth="2xl"
      >
        {selectedEndpoint && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {/* Method badge */}
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedEndpoint.method === "GET"
                    ? "bg-green-100 text-green-600"
                    : selectedEndpoint.method === "POST"
                      ? "bg-blue-100 text-blue-600"
                      : selectedEndpoint.method === "PUT"
                        ? "bg-yellow-100 text-yellow-600"
                        : selectedEndpoint.method === "DELETE"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                }`}
              >
                {selectedEndpoint.method}
              </span>
              <code className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {selectedEndpoint.endpoint}
              </code>
            </div>

            <p className="text-gray-600 dark:text-gray-400">
              {selectedEndpoint.description}
            </p>

            {/* Authentication */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <span className="text-sm font-medium">Authentication:</span>{" "}
              <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {selectedEndpoint.auth}
              </code>
            </div>

            {/* Parameters */}
            {selectedEndpoint.parameters.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Parameters
                </h4>
                <div className="space-y-2 text-sm">
                  {selectedEndpoint.parameters.map((p: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 border-b border-gray-100 dark:border-gray-700 pb-2"
                    >
                      <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded w-24">
                        {p.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-16">
                        {p.type}
                      </span>
                      <span
                        className={`text-xs w-16 ${p.required ? "text-red-600" : "text-gray-500"}`}
                      >
                        {p.required ? "required" : "optional"}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex-1">
                        {p.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Example */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Example Request
              </h4>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                {selectedEndpoint.requestExample}
              </pre>
            </div>

            {/* Response Example */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Successful Response
              </h4>
              <pre className="bg-gray-900 text-green-300 p-3 rounded text-xs overflow-x-auto">
                {selectedEndpoint.responseExample}
              </pre>
            </div>

            {/* Error Response */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Error Response
              </h4>
              <pre className="bg-gray-900 text-red-300 p-3 rounded text-xs overflow-x-auto">
                {selectedEndpoint.errorResponse}
              </pre>
            </div>

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
