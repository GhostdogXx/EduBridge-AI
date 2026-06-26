"use client";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  const t = useT();
  const stepNumber = currentStep + 1;
  const stepLabel = t.onboarding.step(stepNumber, totalSteps);

  return (
    <div
      className="flex flex-col gap-3"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={stepNumber}
      aria-label={stepLabel}
    >
      <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
        <span>{stepLabel}</span>
        <span>{Math.round((stepNumber / totalSteps) * 100)}%</span>
      </div>
      <div className="flex gap-2" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              index <= currentStep ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
