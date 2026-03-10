"use client";

export default function MovingCards() {
  const items = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Tailwind",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "MongoDB",
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap bg-gray-50 py-4">
      <div className="inline-block animate-scroll-left">
        {items.concat(items).map((item, i) => (
          <span key={i} className="mx-8 text-lg font-medium text-gray-700">
            {item} •
          </span>
        ))}
      </div>
    </div>
  );
}
