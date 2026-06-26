"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

import { FadeIn } from "@/components/landing/fade-in";
import { LanguageChoice } from "@/components/landing/language-choice";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useT();
  const { lowDataMode, isHydrated } = useAppContext();
  const hero = t.landing.hero;
  const showDecor = isHydrated && !lowDataMode;

  return (
    <section
      className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16"
      aria-labelledby="hero-heading"
    >
      {showDecor ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/5 to-transparent"
          aria-hidden="true"
        />
      ) : null}

      <div className="relative mx-auto max-w-5xl">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            {hero.badge}
          </div>

          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:mt-6 sm:text-xl">
            {hero.subtitle}
          </p>

          <LanguageChoice />

          {lowDataMode ? (
            <p className="mt-4 text-sm font-medium text-warning">
              {t.lowData.activeHint}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <Link
              href="/onboarding"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-14 rounded-2xl px-8 text-base font-semibold shadow-md shadow-primary/20",
              )}
              aria-label={hero.primaryCta}
            >
              {hero.primaryCta}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>

            <a
              href="#how-it-works"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-14 rounded-2xl px-8 text-base font-semibold",
              )}
              aria-label={hero.secondaryCta}
            >
              {hero.secondaryCta}
              <ChevronDown className="size-5" aria-hidden="true" />
            </a>
          </div>
        </FadeIn>

        {showDecor ? (
          <FadeIn delay={0.15} className="mt-14 sm:mt-20">
            <div
              className="mx-auto max-w-md rounded-3xl border border-border/60 bg-card p-6 shadow-lg shadow-primary/5 sm:max-w-lg sm:p-8"
              aria-hidden="true"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="size-3 rounded-full bg-accent" />
                <div className="h-3 flex-1 rounded-full bg-muted" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-3/4 rounded-lg bg-primary/15" />
                <div className="h-3 w-full rounded-lg bg-muted" />
                <div className="h-3 w-5/6 rounded-lg bg-muted" />
                <div className="mt-5 rounded-2xl bg-secondary/80 p-4">
                  <div className="h-3 w-2/3 rounded-lg bg-primary/20" />
                  <div className="mt-2 h-3 w-full rounded-lg bg-muted/80" />
                </div>
                <Button
                  className="mt-2 h-11 w-full rounded-2xl text-sm font-semibold"
                  tabIndex={-1}
                >
                  {hero.mockQuickCheck}
                </Button>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {hero.mockCaption}
            </p>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
