// src/app/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Effective Date: March 15, 2026</p>
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            At AtlasFlux Learn, we are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website and use our
            services. Please read it carefully.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you register on the platform, express an interest in
            obtaining information about us or our products, participate in
            activities, or contact us. The personal information we collect may
            include:
          </p>
          <ul>
            <li>Name and username</li>
            <li>Email address</li>
            <li>Profile picture (if you choose to upload one)</li>
            <li>
              Any messages, feedback, or content you submit (e.g., testimonials,
              forum posts)
            </li>
          </ul>
          <p>
            We also automatically collect certain information when you visit the
            website, such as your IP address, browser type, operating system,
            referring URLs, and information about your interactions with our
            site. This data is collected via cookies and similar technologies.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Provide, operate, and maintain our services</li>
            <li>Improve, personalize, and expand your learning experience</li>
            <li>
              Communicate with you, including sending updates and support
              messages
            </li>
            <li>Monitor and analyze usage trends</li>
            <li>Prevent fraudulent or illegal activity</li>
          </ul>

          <h2>3. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share information with trusted service
            providers who assist us in operating our website and delivering
            services, such as:
          </p>
          <ul>
            <li>
              <strong>Clerk</strong> – for authentication and user management.
            </li>
            <li>
              <strong>Neon (PostgreSQL)</strong> – for database hosting.
            </li>
            <li>
              <strong>EmailJS</strong> – for handling contact form submissions.
            </li>
            <li>
              <strong>Google Analytics</strong> – to analyze website traffic
              (only with your consent).
            </li>
          </ul>
          <p>
            These providers are contractually obligated to protect your data and
            use it only for the purposes we specify.
          </p>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience. Cookies are small text files stored on your device. You
            can manage your cookie preferences through our{" "}
            <Link href="/cookies" className="text-blue-600 hover:underline">
              Cookie Settings
            </Link>{" "}
            page or via your browser settings. For more details, see our{" "}
            <Link href="/cookies" className="text-blue-600 hover:underline">
              Cookie Policy
            </Link>
            .
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to
            fulfill the purposes outlined in this policy, unless a longer
            retention period is required by law. You may request deletion of
            your account and associated data at any time.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access,
            correct, update, or delete your personal information. To exercise
            these rights, please contact us at the email below. We will respond
            to your request within a reasonable timeframe.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We implement industry‑standard security measures, including
            encryption (SSL/TLS) and database access controls. However, no
            method of transmission over the internet is 100% secure, and we
            cannot guarantee absolute security.
          </p>

          <h2>8. Third‑Party Links</h2>
          <p>
            Our website may contain links to external sites that are not
            operated by us. We are not responsible for the privacy practices of
            those sites and encourage you to review their policies.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We
            do not knowingly collect personal information from children. If you
            believe we have inadvertently collected such information, please
            contact us so we can delete it.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be indicated by an updated "Effective Date". We
            encourage you to review this page periodically.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support.atlasflux@gmail.com"
              className="text-blue-600 hover:underline"
            >
              support.atlasflux@gmail.com
            </a>
          </p>
          <p>
            <strong>Postal address:</strong>
            <br />
            AtlasFlux Learn
            <br />
            Tangkak, Johor
            <br />
            Malaysia
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
