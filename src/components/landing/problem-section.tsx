"use client";

import { Compass, Languages, WifiOff } from "lucide-react";

import { FadeIn } from "@/components/landing/fade-in";
import { useT } from "@/lib/i18n";

const POINT_ORDER = ["language", "connection", "guidance"] as const;

const POINT_ICON = {
  language: Languages,
  connection: WifiOff,
  guidance: Compass,
} as const;

export function ProblemSection() {
  const t = useT();
  const { problem } = t.landing;

  return (
    <section
      className="bg-muted/40 px-5 py-16 sm:px-8 sm:py-24"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-10 text-center sm:mb-14">
          <h2
            id="problem-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {problem.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            {problem.subheading}
          </p>
        </FadeIn>

        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6" role="list">
          {POINT_ORDER.map((id, index) => {
            const point = problem.points[id];
            const Icon = POINT_ICON[id];

            return (
              <li key={id}>
                <FadeIn delay={index * 0.08} className="h-full">
                  <div className="flex h-full flex-col gap-3 rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {point.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {point.body}
                    </p>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
