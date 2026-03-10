"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddTestimonialPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", message: "", rating: 5 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Add Your Testimonial</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
              rows={4}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Rating</label>
            <select
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: parseInt(e.target.value) })
              }
              className="w-full border rounded-lg px-4 py-2"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 px-6 py-2"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
