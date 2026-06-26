"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

import { LowDataBadge } from "@/components/layout/low-data-badge";
import { LowDataToggle } from "@/components/layout/low-data-toggle";
import { APP_NAME } from "@/lib/constants";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md low-data:bg-background low-data:backdrop-blur-none">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label={`${APP_NAME} home`}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="size-5 text-primary" aria-hidden="true" />
          </div>
          <span className="truncate text-lg font-bold tracking-tight text-foreground">
            {APP_NAME}
          </span>
        </Link>

        <LowDataToggle />
      </div>
      <div className="mx-auto max-w-5xl px-5 pb-3 sm:px-8">
        <LowDataBadge />
      </div>
    </header>
  );
}
