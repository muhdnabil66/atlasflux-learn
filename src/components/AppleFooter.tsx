import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Tutorials", href: "/tutorials" },
      { name: "Editor", href: "/editor" },
      { name: "AI Chat", href: "/chat" },
      { name: "Challenges", href: "/challenges" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Documentation", href: "/docs" },
      { name: "Community", href: "/community" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "License", href: "/license" },
    ],
  },
];

export default function AppleFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/atlas.png"
              alt="AtlasFlux Logo"
              width={24}
              height={24}
            />
            <span className="ml-2 text-sm text-gray-600">
              © {new Date().getFullYear()} AtlasFlux Learn. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
