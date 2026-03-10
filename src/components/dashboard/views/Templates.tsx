import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const templates = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "A modern portfolio template with Tailwind CSS",
    category: "Portfolio",
  },
  {
    id: 2,
    name: "E-commerce Store",
    description: "Full e-commerce template with product listings",
    category: "E-commerce",
  },
  {
    id: 3,
    name: "Blog Layout",
    description: "Clean and minimal blog template",
    category: "Blog",
  },
  {
    id: 4,
    name: "Admin Dashboard",
    description: "Responsive admin dashboard layout",
    category: "Dashboard",
  },
];

export default function Templates() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Template Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6"
          >
            <DocumentDuplicateIcon className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {template.description}
            </p>
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
              {template.category}
            </span>
            <div className="mt-4">
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Preview →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
