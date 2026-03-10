// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useAI, availableModels } from "@/context/AIContext";
// import {
//   XMarkIcon,
//   PaperAirplaneIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline";
// import Image from "next/image";

// export default function AIFloatingAssistant() {
//   const {
//     isOpen,
//     toggleOpen,
//     close,
//     selectedModel,
//     setSelectedModel,
//     messages,
//     sendMessage,
//     isLoading,
//   } = useAI();
//   const [input, setInput] = useState("");
//   const [showModelSelector, setShowModelSelector] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll ke bawah apabila ada mesej baru
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;
//     const content = input;
//     setInput("");
//     await sendMessage(content);
//   };

//   // Jika tidak terbuka, hanya tunjuk butang floating
//   if (!isOpen) {
//     return (
//       <button
//         onClick={toggleOpen}
//         className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//         title="Open AI Assistant"
//       >
//         <Image
//           src={selectedModel.logo}
//           alt={selectedModel.name}
//           width={32}
//           height={32}
//           className="rounded-full"
//         />
//       </button>
//     );
//   }

//   return (
//     <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
//         <div className="flex items-center gap-2">
//           <div className="relative w-8 h-8">
//             <Image
//               src={selectedModel.logo}
//               alt={selectedModel.name}
//               fill
//               className="object-contain rounded-full"
//             />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900 dark:text-white">
//               AI Assistant
//             </h3>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               {selectedModel.name}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {/* Model selector dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setShowModelSelector(!showModelSelector)}
//               className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//             >
//               <ChevronDownIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//             </button>
//             {showModelSelector && (
//               <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
//                 {availableModels.map((model) => (
//                   <button
//                     key={model.id}
//                     onClick={() => {
//                       setSelectedModel(model);
//                       setShowModelSelector(false);
//                     }}
//                     className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <div className="relative w-5 h-5">
//                       <Image
//                         src={model.logo}
//                         alt={model.name}
//                         fill
//                         className="object-contain rounded-full"
//                       />
//                     </div>
//                     <span className="text-sm text-gray-700 dark:text-gray-300">
//                       {model.name}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             onClick={close}
//             className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//           >
//             <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//           </button>
//         </div>
//       </div>

//       {/* Mesej */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[80%] p-3 rounded-lg text-sm ${
//                 msg.role === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//               }`}
//             >
//               {msg.content}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-500 dark:text-gray-400">
//               Thinking...
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="border-t border-gray-200 dark:border-gray-700 p-3">
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Type your message..."
//             className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
//           />
//           <button
//             onClick={handleSend}
//             disabled={isLoading}
//             className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
//           >
//             <PaperAirplaneIcon className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
