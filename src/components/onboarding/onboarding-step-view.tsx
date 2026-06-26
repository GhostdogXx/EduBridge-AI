"use client";

import { OptionCard } from "@/components/onboarding/option-card";
import type { OnboardingOption } from "@/lib/onboarding-content";

interface OnboardingStepViewProps<TValue extends string | number> {
  title: string;
  subtitle: string;
  options: OnboardingOption<TValue>[];
  selectedValue: TValue | undefined;
  onSelect: (value: TValue) => void;
}

export function OnboardingStepView<TValue extends string | number>({
  title,
  subtitle,
  options,
  selectedValue,
  onSelect,
}: OnboardingStepViewProps<TValue>) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="text-base text-muted-foreground">{subtitle}</p>
      </div>

      <ul className="flex flex-col gap-3" role="list">
        {options.map((option) => (
          <li key={String(option.value)}>
            <OptionCard
              icon={option.icon}
              label={option.label}
              description={option.description}
              selected={selectedValue === option.value}
              onSelect={() => onSelect(option.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
