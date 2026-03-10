"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Credentials yang diberikan
  const SERVICE_ID = "service_xkpkpeg";
  const TEMPLATE_ID = "template_2klhh0g";
  const PUBLIC_KEY = "FYRViqFN2k-AxknhK";

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current!,
        PUBLIC_KEY,
      );

      if (result.text === "OK") {
        setShowModal(true);
        formRef.current?.reset();
        // Auto redirect setelah 2.5 saat
        setTimeout(() => {
          window.location.href = "/";
        }, 2500);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Modal kejayaan */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          showModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowModal(false)}
      >
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Message Sent!
          </h3>
          <p className="text-gray-600 mb-6">
            You will receive an auto-reply shortly. We'll get back to you as
            soon as possible.
          </p>
          <p className="text-sm text-gray-400">Redirecting to homepage...</p>
        </div>
      </div>

      {/* Halaman contact */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header sederhana */}
        <header className="container mx-auto px-6 py-8">
          <Link href="/" className="inline-block">
            <Image
              src="/atlas.png"
              alt="AtlasFlux"
              width={48}
              height={48}
              className="rounded-lg"
            />
          </Link>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Bahagian kiri: info & logo */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    AtlasFlux Support
                  </h1>
                  <p className="text-blue-100 mb-6">
                    We're here to help! Fill out the form and we'll respond
                    within 24 hours.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>support.atlasflux@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Johor, Malaysia</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  {/* Link ke website utama (globe icon) */}
                  <a
                    href="https://atlasflux.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition"
                    title="AtlasFlux Website"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c1.29 0 2.516.33 3.596.94L13.5 7.5l-2.5 1.5v3l-2 2v2L6 16.5 4.5 14.5c-.29-.79-.5-1.64-.5-2.5 0-2.21.9-4.21 2.36-5.66C7.36 4.9 9.36 4 12 4zm8 8c0 1.29-.33 2.52-.94 3.6l-1.56-1.56-2-1v-2l2-2h2.5c.5.77.94 1.62 1.2 2.5.2.62.3 1.3.3 2z" />
                    </svg>
                  </a>
                  {/* Link ke Instagram */}
                  <a
                    href="https://www.instagram.com/atlasflux.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition"
                    title="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.668.014-4.948.072-1.47.065-2.923.473-4.021 1.571-1.098 1.098-1.506 2.551-1.571 4.021-.058 1.28-.072 1.689-.072 4.948s.014 3.668.072 4.948c.065 1.47.473 2.923 1.571 4.021 1.098 1.098 2.551 1.506 4.021 1.571 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.47-.065 2.923-.473 4.021-1.571 1.098-1.098 1.506-2.551 1.571-4.021.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.065-1.47-.473-2.923-1.571-4.021-1.098-1.098-2.551-1.506-4.021-1.571-1.28-.058-1.689-.072-4.948-.072z" />
                      <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z" />
                      <circle
                        cx="18.406"
                        cy="5.594"
                        r="1.44"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bahagian kanan: form */}
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a message
                </h2>
                <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* Footer ringkas */}
        <footer className="border-t border-gray-200 py-6">
          <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AtlasFlux. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
