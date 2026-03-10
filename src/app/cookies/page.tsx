// src/app/cookies/page.tsx
import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Cookie Settings</h1>
        <p className="text-gray-600 mb-6">Effective Date: March 15, 2026</p>
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            This page explains how we use cookies and similar technologies on
            AtlasFlux. You can manage your preferences below.
          </p>

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device when you visit a
            website. They help us remember your preferences, understand how you
            interact with our site, and improve your experience. Some cookies
            are strictly necessary for the website to function, while others
            (e.g., analytics cookies) require your consent.
          </p>

          <h2>Types of Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the platform to work. They enable
            core functionalities such as user authentication and account
            security. Without these cookies, the service cannot be provided.
            Examples: session cookies set by Clerk and our backend.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            We use analytics cookies (e.g., Google Analytics) to collect
            information about how visitors use our site – which pages are
            visited most often, how users navigate, etc. This data helps us
            improve the platform and your learning experience. These cookies are
            only placed if you give your consent.
          </p>

          <h3>Marketing Cookies</h3>
          <p>
            Currently, we do not use marketing cookies. If we ever start
            displaying ads or using third‑party advertising services, we will
            update this page and request your consent accordingly.
          </p>

          <h2>How to Manage Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete
            all cookies that are already on your device and set most browsers to
            block them. However, if you do this, you may have to manually adjust
            some preferences every time you visit and some features may not work
            properly.
          </p>
          <p>
            We also provide a cookie consent banner that allows you to accept or
            reject non‑essential cookies. You can change your preferences at any
            time by clicking the "Cookie Settings" link in the footer or by
            using the button below.
          </p>

          {/* Button to reopen cookie banner (if using CookieScript) */}
          <div className="my-6">
            <button
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  (window as any).CookieScript
                ) {
                  (window as any).CookieScript.showSettings();
                } else {
                  alert("Cookie settings panel is not available right now.");
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
            >
              Open Cookie Preferences
            </button>
          </div>

          <h2>Third‑Party Cookies</h2>
          <p>
            Some third‑party services we use (such as Clerk for authentication)
            may set their own cookies. These are subject to the respective
            privacy policies of those services. We do not control these cookies.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will
            be reflected on this page with an updated effective date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at{" "}
            <a
              href="mailto:support.atlasflux@gmail.com"
              className="text-blue-600 hover:underline"
            >
              support.atlasflux@gmail.com
            </a>
            .
          </p>
        </div>
        <div className="mt-10">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
