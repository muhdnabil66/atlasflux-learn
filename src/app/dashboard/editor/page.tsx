"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

export default function EditorPage() {
  const [code, setCode] = useState(
    `// Write your code here\nconsole.log('Hello, AtlasFlux!');`,
  );
  const [language, setLanguage] = useState<"javascript" | "html" | "css">(
    "javascript",
  );
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [preview, setPreview] = useState("");

  // Load saved code from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("atlasflux-editor-code");
    if (saved) {
      setCode(saved);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("atlasflux-editor-code", code);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [code]);

  const handleRun = () => {
    // Simple error checking (syntax errors)
    try {
      if (language === "javascript") {
        new Function(code); // This will throw if syntax error
      }
      // For HTML/CSS we can't easily check syntax, so skip
      setError(null);
      setShowPopup(false);
      // Generate live preview (for HTML/JS)
      if (language === "html") {
        setPreview(code);
      } else if (language === "javascript") {
        // For JS, we can create a simple preview
        setPreview(`<script>${code}<\/script>`);
      } else {
        setPreview("");
      }
    } catch (err: any) {
      setError(err.message);
      setShowPopup(true);
    }
  };

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript();
      case "html":
        return html();
      case "css":
        return css();
      default:
        return javascript();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Code Editor</h1>
      <div className="flex gap-4 mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="border rounded px-3 py-2"
        >
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <button
          onClick={handleRun}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Run Code
        </button>
      </div>

      {/* Error Popup */}
      {showPopup && error && (
        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <strong>Error:</strong> {error}
          <button
            onClick={() => setShowPopup(false)}
            className="ml-4 text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Editor */}
        <div className="border rounded overflow-hidden">
          <CodeMirror
            value={code}
            height="100%"
            theme={oneDark}
            extensions={[getLanguageExtension()]}
            onChange={(value) => setCode(value)}
          />
        </div>

        {/* Live Preview */}
        <div className="border rounded p-4 bg-white">
          <h2 className="font-semibold mb-2">Live Preview</h2>
          {language === "html" ? (
            <iframe
              srcDoc={preview}
              title="preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          ) : language === "javascript" ? (
            <div>
              <p>Output (check console):</p>
              <pre className="bg-gray-100 p-2 rounded">{code}</pre>
            </div>
          ) : (
            <p>Preview not available for this language.</p>
          )}
        </div>
      </div>
    </div>
  );
}
