"use client";

import { GraduationCap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { CurriculumAlignment } from "@/lib/curriculum";
import { useT } from "@/lib/i18n";

interface CurriculumCardProps {
  alignment: CurriculumAlignment;
}

export function CurriculumCard({ alignment }: CurriculumCardProps) {
  const t = useT();

  return (
    <Card className="rounded-3xl border-border/60 bg-secondary/40 shadow-sm low-data:rounded-2xl low-data:border-border low-data:bg-card low-data:shadow-none">
      <CardContent className="flex flex-col gap-2 pt-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GraduationCap className="size-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t.learn.curriculum.heading}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-foreground">
          <span>{alignment.framework}</span>
          <span className="text-muted-foreground/50">·</span>
          <span>{alignment.gradeArea}</span>
          <span className="text-muted-foreground/50">·</span>
          <span>{alignment.quarter}</span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">
            {t.learn.curriculum.competency}:
          </span>{" "}
          {alignment.competency}
        </p>
      </CardContent>
    </Card>
  );
}
