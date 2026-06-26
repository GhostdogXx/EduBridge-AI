"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useT } from "@/lib/i18n";

export function QuizSkeleton() {
  const t = useT();

  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-live="polite">
      <span className="sr-only">{t.common.loadingQuiz}</span>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-28 rounded-md" />
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      <Card className="rounded-3xl border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-4 pt-6">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-6 w-1/2 rounded-lg" />
          <div className="mt-2 flex flex-col gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-14 w-full rounded-2xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
