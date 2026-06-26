import type { Metadata } from "next";

import { OfflineNotice } from "@/components/offline-notice";

export const metadata: Metadata = {
  title: "Offline",
  description: "You are currently offline. Reconnect to continue learning.",
};

export default function OfflinePage() {
  return <OfflineNotice />;
}
