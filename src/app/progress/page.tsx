import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { ProgressDashboard } from "@/components/progress/progress-dashboard";

export const metadata: Metadata = {
  title: "Progress",
  description: "Track your lessons, accuracy, streak, and what to study next.",
};

export default function ProgressPage() {
  return (
    <AppShell showBack backHref="/learn">
      <ProgressDashboard />
    </AppShell>
  );
}
