"use client";

import { BarChart3, BookOpen, Target } from "lucide-react";

import { FadeIn } from "@/components/landing/fade-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useT } from "@/lib/i18n";

const FEATURE_ORDER = [
  "guided-lessons",
  "adaptive-practice",
  "personalized-progress",
] as const;

const ICON_MAP = {
  "guided-lessons": BookOpen,
  "adaptive-practice": Target,
  "personalized-progress": BarChart3,
} as const;

const ICON_STYLES = {
  "guided-lessons": "bg-primary/10 text-primary",
  "adaptive-practice": "bg-accent/15 text-accent",
  "personalized-progress": "bg-warning/15 text-warning",
} as const;

export function FeatureCards() {
  const t = useT();
  const { features } = t.landing;

  return (
    <section
      className="px-5 py-16 sm:px-8 sm:py-24"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-10 text-center sm:mb-14">
          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {features.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
            {features.subheading}
          </p>
        </FadeIn>

        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-6" role="list">
          {FEATURE_ORDER.map((id, index) => {
            const feature = features.items[id];
            const Icon = ICON_MAP[id];
            const iconStyle = ICON_STYLES[id];

            return (
              <li key={id}>
                <FadeIn delay={index * 0.08} className="h-full">
                  <Card className="h-full rounded-3xl border-border/60 shadow-sm transition-shadow hover:shadow-md low-data:shadow-none low-data:hover:shadow-none">
                    <CardHeader className="gap-4 pb-2">
                      <div
                        className={`flex size-14 items-center justify-center rounded-2xl ${iconStyle}`}
                      >
                        <Icon className="size-7" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
