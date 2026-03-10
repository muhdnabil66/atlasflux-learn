import Link from "next/link";

export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pathNames: Record<string, string> = {
    "full-stack": "Full-Stack Development",
    "ai-engineer": "AI Engineering",
    "data-science": "Data Science",
    "mobile-dev": "Mobile Development",
  };
  const title = pathNames[slug] || "Learning Path";

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p>This path is under construction. Check back soon!</p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
