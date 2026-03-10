"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function TestimonialDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<any>(null);
  const [form, setForm] = useState({ name: "", message: "", rating: 5 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonial();
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const res = await fetch(`/api/testimonials/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonial(data);
      setForm({ name: data.name, message: data.message, rating: data.rating });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch(`/api/testimonials/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Edit Testimonial</h1>
        <form
          onSubmit={handleUpdate}
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
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
            >
              Delete
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
