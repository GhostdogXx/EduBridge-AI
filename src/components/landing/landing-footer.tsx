"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LandingFooter() {
  const t = useT();
  const { footer, hero } = t.landing;

  return (
    <footer className="border-t border-border/60 bg-background px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">
            {footer.ready}
          </p>
          <p className="text-muted-foreground">{footer.tagline}</p>
        </div>

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

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>
    </footer>
  );
}
