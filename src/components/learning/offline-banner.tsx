"use client";

import { CloudOff } from "lucide-react";

import { useT } from "@/lib/i18n";

export function OfflineBanner() {
  const t = useT();

  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4"
      role="status"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-warning/20 text-warning">
        <CloudOff className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-foreground">
          {t.learn.offline.title}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t.learn.offline.body}
        </p>
      </div>
    </div>
  );
}
