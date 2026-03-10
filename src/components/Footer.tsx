// src/components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useDashboardModal } from "@/context/DashboardModalContext";

const footerSections = [
  {
    title: "Curriculum & Paths",
    links: [
      { name: "All Courses", href: "#courses" },
      { name: "Learning Paths", href: "#learning-paths" },
      { name: "Coding Languages", href: "#languages" },
      { name: "AI & Machine Learning", href: "#ai" },
      { name: "Interview Prep", href: "#interview-prep" },
    ],
  },
  {
    title: "Practice & Tools",
    links: [
      { name: "Online Compiler", href: "#compiler" },
      { name: "Projects", href: "#projects" },
      { name: "Cloud Sandbox", href: "#sandbox" },
      { name: "API Reference", href: "#api" },
      { name: "Open Source", href: "#opensource" },
    ],
  },
  {
    title: "Community & Career",
    links: [
      { name: "Leaderboards", href: "#leaderboards" },
      { name: "Discussion Forums", href: "#forums" },
      { name: "Discord / Slack", href: "#discord" },
      { name: "Job Board", href: "#jobs" },
    ],
  },
  {
    title: "Support & Account",
    links: [
      { name: "My Dashboard", href: "/dashboard", protected: true },
      // { name: "Transaction History", href: "#transactions" },
      // { name: "Manage Subscription", href: "#subscription" },
      { name: "Help Center", href: "#help" },
      { name: "System Status", href: "#status" },
      { name: "System Updates", href: "/system-updates" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Settings", href: "/cookies" },
      { name: "Legal & Compliance", href: "/legal" },
      { name: "FAQ", href: "#faq" },
      { name: "Contact us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const { isSignedIn } = useUser();
  const { setShowDashboardModal } = useDashboardModal();

  const handleProtectedLink = (e: React.MouseEvent, href: string) => {
    if (href === "/dashboard" && !isSignedIn) {
      e.preventDefault();
      setShowDashboardModal(true);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-400">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleProtectedLink(e, link.href)}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image src="/atlas.png" alt="AtlasFlux" width={24} height={24} />
            <span className="ml-2 text-sm text-gray-400">
              © {new Date().getFullYear()} AtlasFlux. All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookie Settings
            </Link>
            <Link href="/legal" className="hover:text-white">
              Legal & Compliance
            </Link>
            <Link href="#faq" className="hover:text-white">
              FAQ
            </Link>
            <span className="text-gray-600">|</span>
            <span>Malaysia | English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
