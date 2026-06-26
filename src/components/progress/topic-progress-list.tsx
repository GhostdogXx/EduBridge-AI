"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Lock,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SCIENCE_TOPICS } from "@/lib/curriculum";
import { useT } from "@/lib/i18n";
import type { LearningPathState, TopicStatus } from "@/lib/types/learning";
import { getTopicState } from "@/lib/learning-path";
import { cn } from "@/lib/utils";

interface TopicProgressListProps {
  path: LearningPathState;
}

const STATUS_META: Record<
  TopicStatus,
  { icon: LucideIcon; labelKey: "mastered" | "review" | "ready" | "locked"; className: string }
> = {
  mastered: {
    icon: CheckCircle2,
    labelKey: "mastered",
    className: "text-accent",
  },
  "needs-review": {
    icon: RotateCcw,
    labelKey: "review",
    className: "text-warning",
  },
  available: {
    icon: Circle,
    labelKey: "ready",
    className: "text-primary",
  },
  locked: {
    icon: Lock,
    labelKey: "locked",
    className: "text-muted-foreground/60",
  },
};

export function TopicProgressList({ path }: TopicProgressListProps) {
  const t = useT();

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardContent className="flex flex-col gap-1 pt-6">
        <p className="mb-2 text-sm font-semibold text-foreground">
          {t.progress.topics.heading}
        </p>
        <ul className="flex flex-col" role="list">
          {SCIENCE_TOPICS.map((topic) => {
            const state = getTopicState(path, topic.id);
            const meta = STATUS_META[state.status];
            const Icon = meta.icon;
            const isLocked = state.status === "locked";

            const content = (
              <>
                <span className={cn("shrink-0", meta.className)}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-foreground">
                    {topic.topic}
                  </span>
                  <span className={cn("text-xs", meta.className)}>
                    {t.progress.topics[meta.labelKey]}
                    {state.bestPercentage > 0
                      ? t.progress.topics.best(state.bestPercentage)
                      : ""}
                  </span>
                </span>
              </>
            );

            if (isLocked) {
              return (
                <li
                  key={topic.id}
                  className="flex items-center gap-3 rounded-2xl p-3 opacity-60"
                  aria-disabled="true"
                >
                  {content}
                </li>
              );
            }

            return (
              <li key={topic.id}>
                <Link
                  href={`/learn?lesson=${topic.id}`}
                  className="flex items-center gap-3 rounded-2xl p-3 transition-colors outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
