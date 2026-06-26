"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Confidence = "got-it" | "almost" | "confused";

const CONFIDENCE_VALUES: Confidence[] = ["got-it", "almost", "confused"];

interface QuickCheckProps {
  prompt: string;
}

export function QuickCheck({ prompt }: QuickCheckProps) {
  const t = useT();
  const [selected, setSelected] = useState<Confidence | null>(null);

  const options = CONFIDENCE_VALUES.map((value) => ({
    value,
    ...t.learn.quickCheck.options[value],
  }));
  const selectedOption = options.find((option) => option.value === selected);

  return (
    <Card className="rounded-3xl border-primary/20 bg-primary/5 shadow-sm">
      <CardContent className="flex flex-col gap-4 pt-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HelpCircle className="size-5" aria-hidden="true" />
          </span>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            {t.learn.quickCheck.title}
          </h2>
        </div>

        <p className="text-base font-medium text-foreground">{prompt}</p>

        <div
          className="flex flex-col gap-2"
          role="group"
          aria-label={t.learn.quickCheck.groupAria}
        >
          {options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelected(option.value)}
                aria-pressed={isSelected}
                aria-label={`${option.label}. ${isSelected ? t.a11y.selected : t.a11y.notSelected}`}
                className={cn(
                  "flex min-h-14 items-center gap-3 rounded-2xl border-2 bg-card p-3.5 text-left text-base font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  isSelected
                    ? "border-primary text-primary"
                    : "border-border/70 text-foreground hover:border-primary/40",
                )}
              >
                <CheckCircle2
                  className={cn(
                    "size-5 shrink-0",
                    isSelected ? "text-primary" : "text-muted-foreground/40",
                  )}
                  aria-hidden="true"
                />
                {option.label}
              </button>
            );
          })}
        </div>

        {selectedOption ? (
          <div
            className="flex items-start gap-2 rounded-2xl bg-accent/10 p-4 text-sm text-foreground"
            role="status"
            aria-live="polite"
          >
            <Sparkles
              className="mt-0.5 size-4 shrink-0 text-accent"
              aria-hidden="true"
            />
            <p>{selectedOption.encouragement}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
