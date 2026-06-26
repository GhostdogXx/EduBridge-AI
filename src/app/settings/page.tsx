import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { SettingsView } from "@/components/settings/settings-view";

export const metadata: Metadata = {
  title: "Settings",
  description: "Adjust language, data usage, and learning preferences.",
};

export default function SettingsPage() {
  return (
    <AppShell showBack backHref="/learn">
      <SettingsView />
    </AppShell>
  );
}
