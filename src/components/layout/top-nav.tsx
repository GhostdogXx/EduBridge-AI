"use client";

import Link from "next/link";
import { BookOpen, Flame } from "lucide-react";

import { BackButton } from "@/components/layout/back-button";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { LowDataToggle } from "@/components/layout/low-data-toggle";
import { useProgress } from "@/hooks/use-progress";
import { APP_NAME } from "@/lib/constants";
import { useT } from "@/lib/i18n";

interface TopNavProps {
  title?: string;
  showLessonControls?: boolean;
  showBack?: boolean;
  backHref?: string;
}

export function TopNav({
  title,
  showLessonControls = false,
  showBack = false,
  backHref,
}: TopNavProps) {
  const { progress, isLoaded } = useProgress();
  const t = useT();
  const streakDays = isLoaded ? progress.streakDays : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md low-data:bg-background low-data:backdrop-blur-none">
      <div className="mx-auto flex h-16 max-w-2xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        {showBack ? (
          <BackButton fallbackHref={backHref} />
        ) : (
          <Link
            href="/learn"
            className="flex shrink-0 items-center gap-2 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label={`${APP_NAME} home`}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="size-5 text-primary" aria-hidden="true" />
            </span>
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground sm:text-base">
            {title ?? APP_NAME}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {showLessonControls ? (
            <>
              <LanguageToggle />
              <LowDataToggle />
            </>
          ) : null}

          <Link
            href="/progress"
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label={t.nav.streakAria(streakDays)}
          >
            <Flame className="size-4 text-warning" aria-hidden="true" />
            <span className="text-xs font-semibold text-foreground">
              {streakDays}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
