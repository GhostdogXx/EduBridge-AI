"use client";

import { Target } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/app-context";
import { useT } from "@/lib/i18n";

interface TodayGoalCardProps {
  completed: number;
  goal: number;
}

export function TodayGoalCard({ completed, goal }: TodayGoalCardProps) {
  const t = useT();
  const { lowDataMode } = useAppContext();
  const safeGoal = Math.max(goal, 1);
  const reached = Math.min(completed, safeGoal);
  const percentage = Math.round((reached / safeGoal) * 100);
  const isDone = completed >= safeGoal;

  return (
    <Card className="rounded-3xl border-primary/20 bg-primary/5 shadow-sm low-data:border-border low-data:bg-card low-data:shadow-none">
      <CardContent className="flex flex-col gap-4 pt-6 low-data:gap-3">
        <div className="flex items-center gap-4">
          {lowDataMode ? (
            <div
              className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-border bg-muted/40"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={safeGoal}
              aria-valuenow={reached}
              aria-label={`Today's goal: ${reached} of ${safeGoal} lessons`}
            >
              <span className="text-lg font-bold tabular-nums text-foreground">
                {reached}/{safeGoal}
              </span>
            </div>
          ) : (
            <div
              className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--color-primary) ${percentage * 3.6}deg, var(--color-muted) 0deg)`,
              }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={safeGoal}
              aria-valuenow={reached}
              aria-label={`Today's goal: ${reached} of ${safeGoal} lessons`}
            >
              <div className="flex size-16 flex-col items-center justify-center rounded-full bg-card">
                <span className="text-lg font-bold tabular-nums text-foreground">
                  {reached}/{safeGoal}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-primary" aria-hidden="true" />
              <p className="font-semibold text-foreground">
                {t.progress.todayGoal.label}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {isDone
                ? t.progress.todayGoal.done
                : t.progress.todayGoal.remaining(safeGoal - reached)}
            </p>
          </div>
        </div>

        {lowDataMode ? (
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${percentage}%` }}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
