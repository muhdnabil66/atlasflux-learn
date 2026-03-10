// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Card from "../../../components/common/Card";
// import {
//   MagnifyingGlassIcon,
//   ClipboardIcon,
//   CheckIcon,
// } from "@heroicons/react/24/outline";
// import { sdkSummaryList, SDKSummary } from "../../../lib/sdkData";

// // Ekstrak kategori dan tag unik
// const allCategories = [
//   "All",
//   ...Array.from(new Set(sdkSummaryList.map((s) => s.category))),
// ];
// const allTags = ["All", ...new Set(sdkSummaryList.flatMap((s) => s.tags))];

// export default function SDK() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [selectedTag, setSelectedTag] = useState("All");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [copiedId, setCopiedId] = useState<string | null>(null);

//   const filteredSDKs = sdkSummaryList.filter((sdk) => {
//     const matchesSearch =
//       sdk.name.toLowerCase().includes(search.toLowerCase()) ||
//       sdk.description.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "All" || sdk.category === selectedCategory;
//     const matchesTag = selectedTag === "All" || sdk.tags.includes(selectedTag);
//     return matchesSearch && matchesCategory && matchesTag;
//   });

//   const copyToClipboard = (text: string, id: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   const goToDetail = (slug: string) => {
//     router.push(`/dashboard/sdk/${slug}`);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           SDK Documentation
//         </h1>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//           A curated collection of useful SDKs and libraries for your projects.
//         </p>
//       </div>

//       {/* Butang Kategori */}
//       <div className="flex flex-wrap gap-2">
//         {allCategories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//               selectedCategory === cat
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Carian dan Penapis Tag */}
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="Search SDKs..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//           />
//           <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>
//         <select
//           value={selectedTag}
//           onChange={(e) => setSelectedTag(e.target.value)}
//           className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
//         >
//           {allTags.map((tag) => (
//             <option key={tag}>{tag}</option>
//           ))}
//         </select>
//       </div>

//       {/* Grid SDK */}
//       {filteredSDKs.length === 0 ? (
//         <Card>
//           <p className="text-center py-8 text-gray-500">No SDKs found.</p>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredSDKs.map((sdk) => {
//             const uniqueId = `sdk-${sdk.name.replace(/\s+/g, "-")}`;
//             return (
//               <div
//                 key={sdk.slug}
//                 onClick={() => goToDetail(sdk.slug)}
//                 className="cursor-pointer transition-transform duration-200 hover:scale-105"
//               >
//                 <Card hover>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
//                         {sdk.name}
//                       </h3>
//                       <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
//                         {sdk.language}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {sdk.description}
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {sdk.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
//                       <code className="text-xs truncate flex-1">
//                         {sdk.install}
//                       </code>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           copyToClipboard(sdk.install, uniqueId);
//                         }}
//                         className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
//                         title="Copy install command"
//                       >
//                         {copiedId === uniqueId ? (
//                           <CheckIcon className="h-4 w-4 text-green-600" />
//                         ) : (
//                           <ClipboardIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                         )}
//                       </button>
//                     </div>
//                     <div className="flex justify-end">
//                       <span className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
//                         View Details →
//                       </span>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
// src/app/dashboard/sdk/page.tsx
export default function SDKPage() {
  return (
    <div>
      <h1>SDK Documentation</h1>
      <p>This page is under construction.</p>
    </div>
  );
}
