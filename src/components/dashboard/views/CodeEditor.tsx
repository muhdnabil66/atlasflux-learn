"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import Card from "../common/Card";
import Modal from "@/components/ui/Modal";
import {
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ShareIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

type Language = "html" | "css" | "javascript";

export default function CodeEditor() {
  const [language, setLanguage] = useState<Language>("html");
  const [code, setCode] = useState({
    html: `<div class="container">
  <h1>Welcome to AtlasFlux Code Editor</h1>
  <p>Start coding in HTML, CSS, and JavaScript!</p>
  <button onclick="alert('Hello!')">Click me</button>
</div>`,
    css: `.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  text-align: center;
}
h1 {
  margin-top: 0;
}
button {
  background: white;
  color: #667eea;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background: #f0f0f0;
}`,
    javascript: `// Add any JavaScript here
console.log("Editor ready!");`,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePreview = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${code.javascript}</script>
        </body>
      </html>
    `;
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "html":
        return html();
      case "css":
        return css();
      case "javascript":
        return javascript();
      default:
        return html();
    }
  };

  const handleCodeChange = (value: string) => {
    setCode((prev) => ({ ...prev, [language]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code[language]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code[language]], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    // Reset to default for current language
    const defaultCode = {
      html: `<div class="container">
  <h1>Welcome to AtlasFlux Code Editor</h1>
  <p>Start coding in HTML, CSS, and JavaScript!</p>
  <button onclick="alert('Hello!')">Click me</button>
</div>`,
      css: `.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  text-align: center;
}
h1 {
  margin-top: 0;
}
button {
  background: white;
  color: #667eea;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background: #f0f0f0;
}`,
      javascript: `// Add any JavaScript here
console.log("Editor ready!");`,
    };
    setCode((prev) => ({ ...prev, [language]: defaultCode[language] }));
  };

  const handleShare = () => {
    setModalMessage(
      "Share feature coming soon! You'll be able to share your code with others.",
    );
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Code Editor
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Write HTML, CSS, and JavaScript. See the result live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="language"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Language:
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                  title="Download code"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                  title="Reset to default"
                >
                  <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                  title="Share"
                >
                  <ShareIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <CodeMirror
              value={code[language]}
              height="350px"
              theme={oneDark}
              extensions={[getLanguageExtension()]}
              onChange={handleCodeChange}
              className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
            />
          </div>
        </Card>

        {/* Live Preview */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Live Preview
          </h2>
          <iframe
            srcDoc={generatePreview()}
            title="live-preview"
            className="w-full h-[350px] border-0 rounded-lg bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        </Card>
      </div>

      {/* Modal for share (placeholder) */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Coming Soon"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{modalMessage}</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowModal(false)}
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
