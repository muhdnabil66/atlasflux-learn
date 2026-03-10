// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  useUser,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import { useDashboardModal } from "@/context/DashboardModalContext";

const navItems = [
  {
    name: "Tutorials",
    href: "#tutorials",
    dropdown: [
      { name: "All Courses", href: "#courses" },
      { name: "Learning Paths", href: "#learning-paths" },
      { name: "Coding Languages", href: "#languages" },
      { name: "AI & Machine Learning", href: "#ai" },
      { name: "Interview Prep", href: "#interview-prep" },
    ],
  },
  {
    name: "Build",
    href: "#build",
    dropdown: [
      { name: "Online Compiler", href: "#compiler" },
      { name: "Projects", href: "#projects" },
      { name: "Cloud Sandbox", href: "#sandbox" },
      { name: "API Reference", href: "#api" },
      { name: "Open Source", href: "#opensource" },
    ],
  },
  {
    name: "Community",
    href: "#community",
    dropdown: [
      { name: "Leaderboards", href: "#leaderboards" },
      { name: "Discussion Forums", href: "#forums" },
      { name: "Discord / Slack", href: "#discord" },
      { name: "Job Board", href: "#jobs" },
    ],
  },
  {
    name: "Account",
    href: "#account",
    dropdown: [
      { name: "My Dashboard", href: "/dashboard", protected: true },
      // { name: "Transaction History", href: "#transactions" },
      // { name: "Manage Subscription", href: "#subscription" },
      { name: "Help Center", href: "#help" },
      { name: "System Status", href: "#status" },
      { name: "Contact Us", href: "/contact" },
      { name: "System Updates", href: "/system-updates" },
    ],
  },
];

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const { setShowDashboardModal } = useDashboardModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDashboardClick = (e: React.MouseEvent, href: string) => {
    if (href === "/dashboard" && !isSignedIn) {
      e.preventDefault();
      setShowDashboardModal(true);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - disesuaikan saiznya */}
          <Link href="/" className="flex items-center">
            <Image
              src="/atlaslong1.png"
              alt="AtlasFlux Logo"
              width={0}
              height={0}
              className="h-14 w-auto" // Tinggi 56px (3.5rem), lebar automatik ikut nisbah
              sizes="100vw"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 font-medium py-2 inline-flex items-center"
                >
                  {item.name}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                {/* Dropdown */}
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      onClick={(e) => handleDashboardClick(e, subItem.href)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Auth Buttons (Desktop) - dengan Sign Out jika sudah login */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoaded ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            ) : !isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="text-gray-700 hover:text-gray-900 font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <SignOutButton>
                <button className="text-gray-700 hover:text-gray-900 font-medium">
                  Sign Out
                </button>
              </SignOutButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4">
            {navItems.map((item) => (
              <div key={item.name} className="mb-2">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.name ? null : item.name,
                    )
                  }
                  className="flex justify-between items-center w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  {item.name}
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openDropdown === item.name && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={(e) => {
                          handleDashboardClick(e, subItem.href);
                          setMobileMenuOpen(false);
                        }}
                        className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col space-y-2">
              {!isLoaded ? (
                <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
              ) : !isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="w-full text-center text-gray-700 hover:text-gray-900 font-medium py-2 border rounded-lg">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <SignOutButton>
                  <button className="w-full text-center text-gray-700 hover:text-gray-900 font-medium py-2 border rounded-lg">
                    Sign Out
                  </button>
                </SignOutButton>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
