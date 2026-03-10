// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { DashboardModalProvider } from "@/context/DashboardModalContext";
import { AppearanceProvider } from "@/context/AppearanceContext";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AtlasFlux Learn - Free Coding Platform",
  description:
    "Learn to code for free with tutorials, live editor, and AI assistance.",
  icons: { icon: "/atlasicon.png", apple: "/apple-touch-icon.png" },
  manifest: "/manifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AtlasFlux",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <DashboardModalProvider>
        <AppearanceProvider>
          <html lang="en">
            <head>
              {/* Pautan ikon manual untuk memastikan ikon dipaparkan */}
              <link rel="icon" href="/atlasicon.png" type="image/png" />
              <link
                rel="shortcut icon"
                href="/atlasicon.png"
                type="image/png"
              />
              {/* Cookie Script – dimuat sebelum interaktif */}
              <Script
                id="cookiescript"
                src="//cdn.cookie-script.com/s/813143df5e0a23a24ce81fb18ffb4dc5.js"
                strategy="beforeInteractive"
              />
            </head>
            <body className={inter.className}>{children}</body>
          </html>
        </AppearanceProvider>
      </DashboardModalProvider>
    </ClerkProvider>
  );
}
