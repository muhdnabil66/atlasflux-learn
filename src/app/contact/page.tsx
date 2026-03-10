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
                      <span>Kuala Lumpur, Malaysia</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.533-3.102 13.95 13.95 0 002.163-7.281c0-.209-.004-.416-.015-.622A9.935 9.935 0 0024 4.59z" />
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
