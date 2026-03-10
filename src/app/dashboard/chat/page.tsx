import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AnimatedSection from "@/components/AnimatedSection";
import AppleFooter from "@/components/AppleFooter";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Slider - no buttons */}
      <HeroSlider />

      {/* Animated content sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn to Code, For Free
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of developers mastering programming with our
              hands-on tutorials and tools.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3">100+ Tutorials</h3>
                <p className="text-gray-600">
                  From basics to advanced, covering all major technologies.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3">Live Editor</h3>
                <p className="text-gray-600">
                  Write code and see results instantly with our interactive
                  editor.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3">AI Assistant</h3>
                <p className="text-gray-600">
                  Get help from DeepSeek AI, available 24/7.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Moving boxes / carousel section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <AnimatedSection direction="left" className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Tutorials
            </h2>
          </AnimatedSection>
          <div className="flex space-x-6 animate-scroll-left">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 bg-white p-6 rounded-xl shadow"
              >
                <h3 className="font-semibold text-xl mb-2">Tutorial {i}</h3>
                <p className="text-gray-600">Learn something new today.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Another animated section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedSection direction="left" className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interactive Learning
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our platform provides real-time feedback and hands-on exercises
                to accelerate your learning.
              </p>
              <Link
                href="/tutorials"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Get Started
              </Link>
            </AnimatedSection>
            <AnimatedSection direction="right" className="md:w-1/2">
              <Image
                src="/placeholder-image.jpg"
                alt="Interactive"
                width={500}
                height={300}
                className="rounded-2xl shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection direction="up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to start coding?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community today and unlock your potential.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition"
            >
              Continue to Dashboard
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <AppleFooter />
    </main>
  );
}
