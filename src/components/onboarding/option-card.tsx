"use client";

import { Check } from "lucide-react";

import { OnboardingIcon } from "@/components/onboarding/onboarding-icon";
import { useT } from "@/lib/i18n";
import type { OnboardingIcon as OnboardingIconName } from "@/lib/onboarding-content";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon: OnboardingIconName;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function OptionCard({
  icon,
  label,
  description,
  selected,
  onSelect,
}: OptionCardProps) {
  const t = useT();

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${label}. ${description}. ${selected ? t.a11y.selected : t.a11y.notSelected}`}
      className={cn(
        "group flex w-full items-center gap-4 rounded-3xl border-2 bg-card p-4 text-left transition-colors outline-none sm:p-5",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        selected
          ? "border-primary bg-primary/5"
          : "border-border/70 hover:border-primary/40 hover:bg-muted/40",
      )}
    >
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-2xl transition-colors sm:size-14",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-primary",
        )}
      >
        <OnboardingIcon name={icon} className="size-6 sm:size-7" />
      </span>

      <span className="flex-1">
        <span className="block text-lg font-semibold text-foreground">
          {label}
        </span>
        <span className="block text-sm text-muted-foreground">
          {description}
        </span>
      </span>

      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-transparent",
        )}
        aria-hidden="true"
      >
        {selected ? <Check className="size-4" /> : null}
      </span>
    </button>
  );
}
