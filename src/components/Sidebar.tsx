// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   HomeIcon,
//   BookOpenIcon,
//   CodeBracketIcon,
//   ChatBubbleLeftRightIcon,
//   ChevronDoubleLeftIcon,
//   ChevronDoubleRightIcon,
// } from "@heroicons/react/24/outline";

// const menuItems = [
//   { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
//   { name: "Tutorials", href: "/dashboard/tutorials", icon: BookOpenIcon },
//   { name: "Editor", href: "/dashboard/editor", icon: CodeBracketIcon },
//   { name: "AI Chat", href: "/dashboard/chat", icon: ChatBubbleLeftRightIcon },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const pathname = usePathname();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <aside
//       className={`bg-gray-900 text-white transition-all duration-300 ${
//         isOpen ? "w-64" : "w-20"
//       } flex flex-col`}
//     >
//       {/* Logo & Toggle */}
//       <div className="flex items-center justify-between p-4">
//         <div
//           className={`flex items-center ${isOpen ? "justify-start" : "justify-center w-full"}`}
//         >
//           <Image
//             src="/atlas.png"
//             alt="AtlasFlux Logo"
//             width={isOpen ? 32 : 24}
//             height={isOpen ? 32 : 24}
//             className="rounded"
//           />
//           {isOpen && <span className="ml-2 font-semibold">AtlasFlux</span>}
//         </div>
//         {isOpen && (
//           <button
//             onClick={toggleSidebar}
//             className="p-1 rounded hover:bg-gray-700"
//           >
//             <ChevronDoubleLeftIcon className="h-5 w-5" />
//           </button>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2 space-y-1">
//         {menuItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center px-2 py-2 rounded-lg transition-colors ${
//                 isActive ? "bg-gray-700" : "hover:bg-gray-800"
//               }`}
//             >
//               <item.icon className="h-6 w-6" />
//               {isOpen && <span className="ml-3">{item.name}</span>}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer for open sidebar */}
//       {isOpen && (
//         <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
//           <p>© 2025 AtlasFlux Learn</p>
//           <p>Free & open-source</p>
//         </div>
//       )}

//       {/* Toggle button for closed sidebar */}
//       {!isOpen && (
//         <button
//           onClick={toggleSidebar}
//           className="m-2 p-2 rounded hover:bg-gray-800 flex justify-center"
//         >
//           <ChevronDoubleRightIcon className="h-5 w-5" />
//         </button>
//       )}
//     </aside>
//   );
// }
