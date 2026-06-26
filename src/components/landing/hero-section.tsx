"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/landing/fade-in";
import { LanguageChoice } from "@/components/landing/language-choice";
import { buttonVariants } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useT();
  const { lowDataMode, isHydrated } = useAppContext();
  const { hero, footer } = t.landing;
  const showDecor = isHydrated && !lowDataMode;

  return (
    <section
      className="relative flex flex-1 items-center overflow-hidden px-5 py-12 sm:px-8 sm:py-16"
      aria-labelledby="hero-heading"
    >
      {showDecor ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/5 to-transparent"
          aria-hidden="true"
        />
      ) : null}

      <div className="relative mx-auto w-full max-w-2xl">
        <FadeIn className="text-center">
          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl"
          >
            {footer.ready}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:mt-5 sm:text-xl">
            {footer.tagline}
          </p>

          <LanguageChoice />

          {lowDataMode ? (
            <p className="mt-4 text-sm font-medium text-warning">
              {t.lowData.activeHint}
            </p>
          ) : null}

          <div className="mt-8 sm:mt-10">
            <Link
              href="/onboarding"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-14 w-full rounded-2xl px-8 text-base font-semibold shadow-md shadow-primary/20 sm:w-auto",
              )}
              aria-label={hero.primaryCta}
            >
              {hero.primaryCta}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">{hero.badge}</p>
        </FadeIn>
      </div>
    </section>
  );
}
