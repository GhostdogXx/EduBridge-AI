import type { Metadata } from "next";

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Set up your EduBridge AI learning experience in less than 30 seconds.",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
