// src/app/system-updates/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Define the update item type
interface UpdateItem {
  id: string;
  date: string; // ISO string
  title: string;
  description: string;
  category: "feature" | "improvement" | "fix" | "removal";
}

// Helper to format date nicely
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Category badge styles
const categoryStyles = {
  feature:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  improvement:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  fix: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  removal: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

// Mock data – each category is typed with 'as const' to satisfy TypeScript
const updates: UpdateItem[] = [
  {
    id: "1",
    date: "2026-03-10T14:30:00Z",
    title: "Contact page live with EmailJS auto‑reply",
    description:
      "The /contact page is now fully functional. Users can send messages and receive an automatic confirmation email. The page features a glass‑morphism design, TikTok/Instagram links, and a success modal with redirect.",
    category: "feature" as const,
  },
  {
    id: "2",
    date: "2026-03-10T10:15:00Z",
    title: "Fixed 404 errors after adding new pages",
    description:
      "Cleared Next.js build cache (.next folder) and reinstalled dependencies to resolve chunk loading failures. All static assets now serve correctly.",
    category: "fix" as const,
  },
  {
    id: "3",
    date: "2026-03-09T18:45:00Z",
    title: "Added EmailJS contact form",
    description:
      "Integrated EmailJS with service_xkpkpeg and template_2klhh0g. The form collects name, email, and message; success modal appears after sending.",
    category: "feature" as const,
  },
  {
    id: "4",
    date: "2026-03-09T09:20:00Z",
    title: "System Updates page created",
    description:
      "This very page! A public changelog showing all notable improvements, fixes, and feature additions. Each entry can be expanded to see full details.",
    category: "feature" as const,
  },
  {
    id: "5",
    date: "2026-03-08T16:10:00Z",
    title: "Cookie consent banner (CookieScript) prepared",
    description:
      "CookieScript script added to layout.tsx (commented out until deployment). Configuration for categories (essential, statistics, marketing) and Google Consent Mode v2 ready.",
    category: "improvement" as const,
  },
  {
    id: "6",
    date: "2026-03-08T11:30:00Z",
    title: "Legal pages finalised",
    description:
      "Privacy Policy, Terms of Service, Cookie Settings, and Legal & Compliance pages are now complete with consistent design and placeholders for real legal text.",
    category: "feature" as const,
  },
  {
    id: "7",
    date: "2026-03-07T15:20:00Z",
    title: "Statistics section toned down",
    description:
      "Replaced overclaimed stats with realistic numbers: '5,000+ Active Learners', '100+ Free Tutorials', '24/7 AI Assistance', '100% Free Forever'.",
    category: "improvement" as const,
  },
  {
    id: "8",
    date: "2026-03-07T09:45:00Z",
    title: "FAQ updated with platform‑specific questions",
    description:
      "Expanded FAQ to cover topics like Learning Paths, SDK docs, achievements, and mobile friendliness. All answers now accurately reflect the platform.",
    category: "improvement" as const,
  },
  {
    id: "9",
    date: "2026-03-06T13:10:00Z",
    title: "Removed misleading 'Learn more' buttons",
    description:
      "Deleted all 'Learn more' links from InfiniteCards and LearningPaths to avoid confusion (functionality not yet implemented).",
    category: "removal" as const,
  },
  {
    id: "10",
    date: "2026-03-06T10:00:00Z",
    title: "Navbar auth buttons repositioned",
    description:
      "Sign In / Sign Up buttons moved to the far right (ml-auto) and changed to a 'Dashboard' button for logged‑in users, both desktop and mobile.",
    category: "improvement" as const,
  },
  {
    id: "11",
    date: "2026-03-05T17:30:00Z",
    title: "CTA moved directly below hero slider",
    description:
      "The 'Ready to start coding?' section now appears immediately after the hero slider, improving visibility and user engagement.",
    category: "improvement" as const,
  },
  {
    id: "12",
    date: "2026-03-05T14:15:00Z",
    title: "API Reference view fixed",
    description:
      "Added missing case for 'api' in dashboard page and uncommented import of APIReference component. Now accessible via sidebar.",
    category: "fix" as const,
  },
  {
    id: "13",
    date: "2026-03-04T16:45:00Z",
    title: "User profile API unified (getOrCreateUser)",
    description:
      "All user‑related endpoints (stats, progress, activity, profile) now use a consistent getOrCreateUser helper that first looks up by clerk_id, then by id, preventing duplicate key errors.",
    category: "improvement" as const,
  },
  {
    id: "14",
    date: "2026-03-04T11:20:00Z",
    title: "Fixed duplicate key error for new users",
    description:
      "Resolved the 'duplicate key violates unique constraint users_pkey' that affected some accounts. Now endpoints correctly handle existing rows missing clerk_id.",
    category: "fix" as const,
  },
  {
    id: "15",
    date: "2026-03-03T09:30:00Z",
    title: "SectionPlaceholder messages personalised",
    description:
      "All under‑construction sections (Leaderboards, Coding Languages, etc.) now display relevant teaser messages instead of generic placeholders.",
    category: "improvement" as const,
  },
  {
    id: "16",
    date: "2026-03-02T14:50:00Z",
    title: "Dashboard sidebar grouped and enhanced",
    description:
      "Sidebar items reorganised into collapsible groups (Dashboard, Learning, Practice, AI Tools, SDK, Achievements, Community, Settings, Resources).",
    category: "improvement" as const,
  },
  {
    id: "17",
    date: "2026-03-02T10:00:00Z",
    title: "Footer now includes Contact link",
    description:
      "Added 'Contact us' to the Legal section of the footer, linking to /contact.",
    category: "improvement" as const,
  },
  {
    id: "18",
    date: "2026-03-01T18:30:00Z",
    title: "Navbar dropdowns adjusted",
    description:
      "Removed commented‑out items (Transaction History, Manage Subscription) to keep dropdowns clean.",
    category: "removal" as const,
  },
  {
    id: "19",
    date: "2026-03-01T15:10:00Z",
    title: "Initial deployment to Vercel",
    description:
      "First production deployment. All core pages (home, dashboard, tutorials) are live.",
    category: "feature" as const,
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function SystemUpdatesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            System Updates
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            A chronological log of improvements, fixes, and feature additions.
          </p>

          <div className="space-y-4">
            {updates.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                {/* Header – clickable */}
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                        {formatDate(item.date)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyles[item.category]}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                      {item.title}
                    </h2>
                  </div>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      openId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown description */}
                {openId === item.id && (
                  <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
