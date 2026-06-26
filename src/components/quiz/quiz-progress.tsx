"use client";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const t = useT();

  return (
    <div
      className="flex flex-col gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`${t.quiz.questionLabel} ${current} / ${total}`}
    >
      <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
        <span>{t.quiz.questionLabel}</span>
        <span className="tabular-nums text-foreground">
          {current} / {total}
        </span>
      </div>
      <div className="flex gap-2" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              index < current ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
