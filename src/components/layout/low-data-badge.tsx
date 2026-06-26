"use client";

import { Zap } from "lucide-react";

import { useAppContext } from "@/context/app-context";
import { useT } from "@/lib/i18n";

export function LowDataBadge() {
  const { lowDataMode } = useAppContext();
  const t = useT();

  if (!lowDataMode) return null;

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-semibold text-warning"
      role="status"
      aria-live="polite"
    >
      <Zap className="size-3.5" aria-hidden="true" />
      {t.lowData.title}
    </div>
  );
}
