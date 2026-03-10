"use client";

import { useUser } from "@clerk/nextjs";
import { useDashboardModal } from "@/context/DashboardModalContext";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import VisitorCounter from "@/components/VisitorCounter";
import InfiniteCards from "@/components/InfiniteCards";
// TestimonialCarousel import removed
import FAQ from "@/components/FAQ";
import BackToTop from "@/components/BackToTop";
import DashboardModal from "@/components/DashboardModal";
import Image from "next/image";
import Link from "next/link";

const SectionPlaceholder = ({ id, title }: { id: string; title: string }) => {
  // Define custom messages based on id
  const getMessage = () => {
    switch (id) {
      case "languages":
        return "Master the syntax of the future with interactive tracks for Python, JavaScript, Rust, and more, tailored from beginner to architect levels.";
      case "ai":
        return "Dive into the world of neural networks and large language models, learning how to build, train, and deploy intelligent systems.";
      case "interview-prep":
        return "Sharpen your problem-solving skills with a curated library of technical challenges and mock interviews modeled after top-tier tech firms.";
      case "compiler":
        return "Write, test, and execute your code instantly in our high-performance, multi-language browser environment—no setup required.";
      case "projects":
        return "Bridge the gap between theory and reality by building production-ready applications for your portfolio with guided, hands-on modules.";
      case "sandbox":
        return "Experiment freely in a secure, isolated cloud environment designed for testing complex architectures and risky deployments without limits.";
      case "api":
        return "Experiment freely in a secure, isolated cloud environment designed for testing complex architectures and risky deployments without limits.";
      case "opensource":
        return "Contribute to open source projects and collaborate with the community.";
      case "leaderboards":
        return "Compete with a global network of developers, earn XP for every line of code, and climb the ranks to prove your technical prowess.";
      case "forums":
        return "oin the conversation to solve complex bugs, share insights, and collaborate with a diverse community of passionate learners.";
      case "discord":
        return "Connect with the AtlasFlux inner circle in real-time for instant feedback, networking, and exclusive community-driven events.";
      case "jobs":
        return "Track your career by connecting with global recruiters and internships that match your verified skill level on AtlasFlux.";
      case "transactions":
        return "View your transaction history and billing details.";
      case "subscription":
        return "Manage your subscription and plan details.";
      case "help":
        return "Get the support you need through our extensive knowledge base or reach out to us directly at support.atlasflux@gmail.com.";
      case "status":
        return "Monitor our real-time infrastructure health to ensure your learning environment and deployments are always running at peak performance.";
      case "build":
        return "Build and deploy your projects.";
      case "community":
        return "Connect with the community.";
      case "account":
        return "Manage your account settings.";
      case "tutorials":
        return "Access a deep archive of step-by-step guides and video walkthroughs designed to simplify the most complex engineering concepts.";
      default:
        return `This section is under construction. Content for ${title} will be added soon.`;
    }
  };

  return (
    <section id={id} className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <AnimatedSection direction="up">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
          <p className="text-gray-600">{getMessage()}</p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const { setShowDashboardModal } = useDashboardModal();

  const handleDashboardClick = () => {
    if (!isSignedIn) {
      setShowDashboardModal(true);
    } else {
      window.location.href = "/dashboard"; // or router.push
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />

      {/* Call to Action - now right after HeroSlider */}
      <section id="cta" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold mb-4">Ready to start coding?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community and unlock your potential.
            </p>
            <button
              onClick={handleDashboardClick}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition"
            >
              Go to Dashboard
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <AnimatedSection
            direction="up"
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Coding for Free
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AtlasFlux Learn provides everything you need to become a
              developer: tutorials, real-time coding, AI assistance, and a
              supportive community.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses">
        <InfiniteCards />
      </section>

      {/* Featured Programs */}
      <section id="featured" className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <AnimatedSection direction="left" className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Programs
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={`/featured-${i}.jpg`}
                  alt={`Featured ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="learning-paths" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Choose Your Path
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Full-Stack", slug: "full-stack" },
              { name: "AI Engineer", slug: "ai-engineer" },
              { name: "Data Science", slug: "data-science" },
              { name: "Mobile Dev", slug: "mobile-dev" },
            ].map((path, idx) => (
              <AnimatedSection key={path.name} direction="up" delay={idx * 0.1}>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition group">
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-600">
                    {path.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Master {path.name} with hands-on projects.
                  </p>
                  {/* "Learn more" link removed */}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="stats" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <AnimatedSection
            direction="up"
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Learn with confidence on our platform
            </h2>
            <p className="text-xl mb-12">
              Join a growing community of developers building skills with free,
              high-quality resources.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-blue-200">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100+</div>
                <div className="text-blue-200">Free Tutorials</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-200">AI Assistance</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-blue-200">Free Forever</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials section removed */}

      {/* FAQ */}
      <section id="faq">
        <FAQ />
      </section>

      {/* Semua seksyen tambahan dengan mesej yang relevan */}
      <SectionPlaceholder id="languages" title="Coding Languages" />
      <SectionPlaceholder id="ai" title="AI & Machine Learning" />
      <SectionPlaceholder id="interview-prep" title="Interview Prep" />
      <SectionPlaceholder id="compiler" title="Online Compiler" />
      <SectionPlaceholder id="projects" title="Projects" />
      <SectionPlaceholder id="sandbox" title="Cloud Sandbox" />
      <SectionPlaceholder id="api" title="API Reference" />
      <SectionPlaceholder id="opensource" title="Open Source" />
      <SectionPlaceholder id="leaderboards" title="Leaderboards" />
      <SectionPlaceholder id="forums" title="Discussion Forums" />
      <SectionPlaceholder id="discord" title="Discord / Slack" />
      <SectionPlaceholder id="jobs" title="Job Board" />
      {/* <SectionPlaceholder id="transactions" title="Transaction History" />
      <SectionPlaceholder id="subscription" title="Manage Subscription" /> */}
      <SectionPlaceholder id="help" title="Help Center" />
      <SectionPlaceholder id="status" title="System Status" />
      <SectionPlaceholder id="build" title="Build" />
      <SectionPlaceholder id="community" title="Community" />
      <SectionPlaceholder id="account" title="Account" />
      <SectionPlaceholder id="tutorials" title="Tutorials" />

      {/* Visitor Counter */}
      <div className="container mx-auto px-6 py-4 border-t border-gray-200">
        <VisitorCounter />
      </div>

      <Footer />
      <BackToTop />
      <DashboardModal />
    </main>
  );
}
