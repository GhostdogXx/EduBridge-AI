"use client";

import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface TopicInputProps {
  title: string;
  placeholder: string;
  examples: string[];
  value: string;
  onChange: (value: string) => void;
}

export function TopicInput({
  title,
  placeholder,
  examples,
  value,
  onChange,
}: TopicInputProps) {
  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <p className="text-xl font-semibold leading-snug text-foreground">{title}</p>
        </div>

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-14 w-full rounded-2xl border border-border/70 bg-background px-4 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />

        <div className="flex flex-wrap gap-2" aria-hidden="true">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onChange(example)}
              className="rounded-full border border-border/70 bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
