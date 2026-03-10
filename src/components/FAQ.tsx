"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import AnimatedSection from "./AnimatedSection";

const faqData = [
  {
    question: "What is AtlasFlux Learn and who is it for?",
    answer:
      "AtlasFlux Learn is a free, open-source coding platform designed for beginners and experienced developers alike. Whether you're just starting out or looking to expand your skills, we offer tutorials, interactive coding environments, AI assistance, and a supportive community to help you grow.",
  },
  {
    question: "Is AtlasFlux Learn really free? Are there any hidden costs?",
    answer:
      "Yes, it is completely free! There are no hidden fees, premium tiers, or credit walls. All features including tutorials, AI chat, code editor, and SDK documentation are accessible to everyone. We believe in democratizing education.",
  },
  {
    question: "What programming languages and technologies can I learn?",
    answer:
      "We cover a wide range of languages and technologies including HTML, CSS, JavaScript, TypeScript, Python, React, Node.js, SQL, and many more. Our Learning Paths guide you through structured curricula, while our Tutorials section provides in-depth topics for each language.",
  },
  {
    question: "How do Learning Paths work?",
    answer:
      "Learning Paths are curated sequences of modules designed to take you from beginner to job‑ready. You progress through modules in order, and after completing all modules in a path, you earn XP and unlock achievements. It's a structured way to master a technology.",
  },
  {
    question: "Can I earn certificates or rewards?",
    answer:
      "Absolutely! Completing Learning Paths awards you XP and unlocks achievements (badges, avatars, borders). You can showcase your achievements on your profile and even equip special borders. Certificates are currently in development.",
  },
  {
    question: "How does the AI Assistant work?",
    answer:
      "Our AI Assistant, powered by models like DeepSeek, can help you debug code, explain concepts, generate code snippets, and answer programming questions. It's available 24/7 and uses your chat credits (refreshed regularly) to provide assistance.",
  },
  {
    question: "Can I contribute to open source projects through the platform?",
    answer:
      "Yes! The Open Source section lists curated projects looking for contributors. You can filter by language, difficulty, and labels like 'good first issue'. It's a great way to gain real‑world experience.",
  },
  {
    question: "What is the SDK section and how can I use it?",
    answer:
      "The SDK section provides documentation and examples for popular SDKs and tools such as Supabase, Clerk, Stripe, and many more. You can browse by category, search, and view installation guides and code samples – all to help you integrate these services into your projects.",
  },
  {
    question: "How do I track my progress and achievements?",
    answer:
      "Your dashboard shows your XP, learning streak, completed tutorials, and recent activity. The My Achievements page displays all unlocked badges, avatars, and borders. You can claim rewards and equip them from there.",
  },
  {
    question: "Is there a mobile app or is the platform mobile-friendly?",
    answer:
      "While we don't have a dedicated mobile app yet, the entire platform is fully responsive and works great on mobile browsers. You can learn on the go! A PWA (Progressive Web App) is on our roadmap.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedSection direction="up" className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Got questions? We've got answers.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <AnimatedSection key={index} direction="up" delay={index * 0.05}>
              <div className="border-b border-gray-200 py-4">
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="pb-2">{faq.answer}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
