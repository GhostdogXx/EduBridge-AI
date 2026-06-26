"use client";

import { Heart, RefreshCcw } from "lucide-react";

import { useT } from "@/lib/i18n";
import type { LessonVariant } from "@/lib/types/learning";

interface AdaptiveBannerProps {
  variant: LessonVariant;
}

const BANNER_ICON = {
  "another-explanation": RefreshCcw,
  simplified: Heart,
} as const;

export function AdaptiveBanner({ variant }: AdaptiveBannerProps) {
  const t = useT();

  if (variant === "standard") return null;

  const copy = t.learn.adaptive[variant];
  const Icon = BANNER_ICON[variant];

  return (
    <div
      className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4"
      role="status"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-foreground">{copy.title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
      </div>
    </div>
  );
}
