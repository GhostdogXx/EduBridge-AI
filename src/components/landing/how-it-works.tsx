"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { useT } from "@/lib/i18n";

const STEP_ORDER = ["1", "2", "3", "4"] as const;

export function HowItWorks() {
  const t = useT();
  const { howItWorks } = t.landing;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-muted/40 px-5 py-16 sm:px-8 sm:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-10 text-center sm:mb-14">
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {howItWorks.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
            {howItWorks.subheading}
          </p>
        </FadeIn>

        <ol className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {STEP_ORDER.map((number, index) => {
            const step = howItWorks.steps[number];
            return (
              <li key={number}>
                <FadeIn delay={index * 0.08} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                    <div
                      className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground"
                      aria-hidden="true"
                    >
                      {number}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
