"use client";

import { Check, Languages } from "lucide-react";

import { useAppContext } from "@/context/app-context";
import { LANGUAGES } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageChoice() {
  const { activeLanguage, setActiveLanguage } = useAppContext();
  const t = useT();

  return (
    <div className="mx-auto mt-8 max-w-md rounded-3xl border border-border/60 bg-card/70 p-5 text-left shadow-sm sm:mt-10">
      <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
        <Languages className="size-4" aria-hidden="true" />
        {t.landing.languageChoice.heading}
      </div>

      <div
        role="radiogroup"
        aria-label={t.a11y.preferredLanguage}
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
      >
        {LANGUAGES.map(({ value, label }) => {
          const option = t.landing.languageChoice.options[value];
          const isSelected = activeLanguage === value;

          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setActiveLanguage(value)}
              className={cn(
                "flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-2xl border-2 px-4 py-3 text-center transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-primary/40",
              )}
            >
              <span className="flex items-center gap-1.5 text-base font-semibold text-foreground">
                {isSelected ? (
                  <Check className="size-4 text-primary" aria-hidden="true" />
                ) : null}
                {option.label}
              </span>
              <span className="text-xs leading-tight text-muted-foreground">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
