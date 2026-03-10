// src/app/legal/page.tsx
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Legal & Compliance</h1>
        <p className="text-gray-600 mb-6">Effective Date: March 15, 2026</p>
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            This page contains important legal information about AtlasFlux
            Learn, including copyright, licensing, and regulatory compliance.
          </p>

          <h2>Copyright and Content Ownership</h2>
          <p>
            Unless otherwise noted, all content on AtlasFlux – including
            tutorials, documentation, code snippets, images, logos, and software
            – is the property of AtlasFlux or its content suppliers and is
            protected by international copyright laws. You may use this content
            for personal, non‑commercial learning purposes only. You may not
            reproduce, distribute, modify, or create derivative works without
            prior written permission, except as expressly permitted under open
            source licenses.
          </p>

          <h2>Open Source Licenses</h2>
          <p>
            Our platform is built using various open source libraries. Where
            applicable, we comply with the terms of the following licenses:
          </p>
          <ul>
            <li>
              <strong>MIT License</strong> – Used by many of our frontend and
              backend components. A copy of the MIT license is available{" "}
              <a
                href="https://opensource.org/licenses/MIT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                here
              </a>
              .
            </li>
            <li>
              <strong>Apache License 2.0</strong> – May apply to certain
              dependencies.
            </li>
            <li>
              <strong>BSD Licenses</strong> – May apply to certain components.
            </li>
          </ul>
          <p>Full attribution and license texts are available upon request.</p>

          <h2>User-Generated Content</h2>
          <p>
            Users may post content such as forum messages, code snippets, and
            testimonials. By submitting content, you grant AtlasFlux a
            non‑exclusive, royalty‑free license to use, display, and distribute
            that content for the purpose of operating and promoting the
            platform. You retain ownership of your original content. We reserve
            the right to remove any user content that violates our Terms of
            Service.
          </p>

          <h2>Data Protection and GDPR</h2>
          <p>
            AtlasFlux is committed to protecting your personal data in
            accordance with the General Data Protection Regulation (GDPR) and
            other applicable privacy laws. For detailed information on how we
            collect, use, and safeguard your data, please review our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            If you are a resident of the European Economic Area (EEA), you have
            certain rights under the GDPR, including the right to access,
            rectify, or erase your personal data. To exercise these rights,
            contact us at the email below.
          </p>

          <h2>Accessibility</h2>
          <p>
            We strive to make our platform accessible to all users, including
            those with disabilities. We follow the Web Content Accessibility
            Guidelines (WCAG) 2.1 Level AA as best practice. If you encounter
            any accessibility barriers, please let us know.
          </p>

          <h2>Compliance with Malaysian Laws</h2>
          <p>
            AtlasFlux operates in compliance with the laws of Malaysia,
            including the Personal Data Protection Act 2010 (PDPA). Our services
            are intended for users worldwide, but we adhere to the legal
            requirements of our home jurisdiction. By using our platform, you
            consent to the transfer of your data to Malaysia and its processing
            in accordance with this policy.
          </p>

          <h2>Reporting Infringements</h2>
          <p>
            If you believe that any content on AtlasFlux infringes your
            copyright or other intellectual property rights, please notify us
            with sufficient information (a description of the work, its location
            on our site, and your contact details). We will investigate and take
            appropriate action.
          </p>

          <h2>Contact Information</h2>
          <p>
            For all legal inquiries, including copyright claims, data protection
            questions, or any other compliance matters, please contact us at:
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
