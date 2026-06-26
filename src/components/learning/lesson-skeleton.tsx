"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useT } from "@/lib/i18n";

export function LessonSkeleton() {
  const t = useT();

  return (
    <div className="flex flex-col gap-5" aria-busy="true" aria-live="polite">
      <span className="sr-only">{t.common.loadingLesson}</span>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-8 w-3/4 rounded-xl" />
      </div>

      {Array.from({ length: 3 }, (_, index) => (
        <Card key={index} className="rounded-3xl border-border/60 shadow-sm">
          <CardContent className="flex flex-col gap-3 pt-6">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-xl" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
