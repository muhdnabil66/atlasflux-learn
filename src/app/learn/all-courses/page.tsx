import Link from "next/link";

export default function AllCoursesPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <p>This page is under construction.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
