import type { Metadata } from "next";

import { HeroSection } from "@/components/landing/hero-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";

export const metadata: Metadata = {
  title: "Learn Smarter, One Lesson at a Time",
  description:
    "Your AI-powered study companion designed for Filipino learners with bilingual lessons, adaptive quizzes, and personalized guidance.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main id="main-content" tabIndex={-1} className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <HeroSection />
      </main>
      <LandingFooter />
    </div>
  );
}
