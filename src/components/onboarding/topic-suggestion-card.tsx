"use client";

import { Check, Clock3 } from "lucide-react";

import type { TopicSuggestion } from "@/lib/types/learning";
import { cn } from "@/lib/utils";

interface TopicSuggestionCardProps {
  topic: TopicSuggestion;
  badge: string;
  readingTimeLabel: string;
  difficultyLabel: string;
  selected: boolean;
  onSelect: () => void;
}

export function TopicSuggestionCard({
  topic,
  badge,
  readingTimeLabel,
  difficultyLabel,
  selected,
  onSelect,
}: TopicSuggestionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${topic.title}. ${topic.description}`}
      className={cn(
        "flex w-full flex-col gap-3 rounded-3xl border-2 bg-card p-5 text-left transition-colors outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border/70 hover:border-primary/40 hover:bg-muted/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-lg font-semibold text-foreground">{topic.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {topic.description}
          </p>
        </div>
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-transparent",
          )}
          aria-hidden="true"
        >
          {selected ? <Check className="size-4" /> : null}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
          {badge}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-muted-foreground">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {readingTimeLabel}
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
          {difficultyLabel}
        </span>
      </div>
    </button>
  );
}
