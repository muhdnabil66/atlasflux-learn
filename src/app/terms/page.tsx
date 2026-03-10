// src/app/terms/page.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-600 mb-6">Effective Date: March 15, 2026</p>
        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Welcome to AtlasFlux Learn. These Terms of Service govern your use
            of our website and services. By accessing or using AtlasFlux, you
            agree to be bound by these terms. If you do not agree, please do not
            use our services.
          </p>

          <h2>1. Account Registration</h2>
          <p>
            To access certain features, you must create an account. You agree to
            provide accurate, current, and complete information. You are solely
            responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
            Notify us immediately of any unauthorized use.
          </p>

          <h2>2. User Content</h2>
          <p>
            You retain ownership of any content you post, upload, or submit
            (e.g., code snippets, forum posts, testimonials). By submitting
            content, you grant AtlasFlux a non‑exclusive, worldwide,
            royalty‑free license to use, reproduce, modify, and display such
            content solely for the purpose of operating and improving our
            services.
          </p>
          <p>
            You represent and warrant that your content does not violate any
            third‑party rights (including copyright, trademark, or privacy) and
            that it complies with all applicable laws. We reserve the right to
            remove any content that we deem inappropriate or harmful.
          </p>

          <h2>3. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal purpose.</li>
            <li>
              Upload or transmit viruses, malware, or any code designed to
              disrupt the platform.
            </li>
            <li>
              Attempt to gain unauthorized access to other users' accounts.
            </li>
            <li>Harass, abuse, or harm other users.</li>
            <li>Interfere with the proper functioning of the platform.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content provided by AtlasFlux, including tutorials, code
            examples, graphics, logos, and software, is owned by or licensed to
            us and is protected by copyright and other intellectual property
            laws. Unless otherwise indicated, you may use such content for
            personal, non‑commercial learning purposes. You may not reproduce,
            distribute, or create derivative works without our prior written
            consent.
          </p>

          <h2>5. Third‑Party Services</h2>
          <p>
            Our platform integrates with third‑party services (e.g., Clerk,
            Neon, EmailJS). We are not responsible for the acts or omissions of
            these providers. Your use of such services is subject to their
            respective terms.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may suspend or terminate your account at any time, with or
            without notice, for conduct that we believe violates these Terms or
            is harmful to other users or the platform. You may also delete your
            account at any time via your account settings.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The platform is provided on an "AS IS" and "AS AVAILABLE" basis. We
            make no warranties, express or implied, regarding the reliability,
            accuracy, or availability of the service. To the fullest extent
            permitted by law, we disclaim all warranties, including any implied
            warranties of merchantability, fitness for a particular purpose, and
            non‑infringement.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, AtlasFlux and its affiliates
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or relating to
            your use of the platform, even if advised of the possibility of such
            damages. Our total liability shall not exceed the amount you paid us
            (if any) in the past twelve months.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless AtlasFlux, its employees,
            and agents from any claims, losses, or expenses arising out of your
            violation of these Terms or your use of the platform.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of Malaysia, without regard to its conflict of law
            provisions. Any legal action or proceeding arising under these Terms
            shall be brought exclusively in the courts located in Johor,
            Malaysia.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may revise these Terms from time to time. The most current
            version will always be posted on this page. By continuing to use the
            platform after changes become effective, you agree to be bound by
            the updated Terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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
