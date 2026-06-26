"use client";

import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n";

interface LessonHeaderProps {
  topic: string;
  title: string;
  estimatedReadingMinutes: number;
}

export function LessonHeader({
  topic,
  title,
  estimatedReadingMinutes,
}: LessonHeaderProps) {
  const t = useT();

  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
          {topic}
        </Badge>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {t.learn.minRead(estimatedReadingMinutes)}
        </span>
      </div>
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
    </header>
  );
}
