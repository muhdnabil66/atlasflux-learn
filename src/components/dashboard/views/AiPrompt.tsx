// "use client";

// import { useState } from "react";

// export default function AiPrompt() {
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");

//   const generate = async () => {
//     // Panggil API AI di sini
//     setResult("Sample generated code...");
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">AI Coding Prompt Generator</h1>
//       <textarea
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter your coding prompt..."
//         className="w-full border rounded p-2 h-32"
//       />
//       <button
//         onClick={generate}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Generate
//       </button>
//       {result && (
//         <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
//           {result}
//         </pre>
//       )}
//     </div>
//   );
// }
