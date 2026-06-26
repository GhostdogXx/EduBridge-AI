"use client";

import { ClipboardCheck, HelpCircle, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

interface LessonActionsProps {
  onQuickCheck: () => void;
  onStartQuiz: () => void;
  onTeachDifferently?: () => void;
}

export function LessonActions({
  onQuickCheck,
  onStartQuiz,
  onTeachDifferently,
}: LessonActionsProps) {
  const t = useT();

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={onStartQuiz}
        className="h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20"
        aria-label={t.learn.startMiniQuiz}
      >
        <ClipboardCheck className="size-5" aria-hidden="true" />
        {t.learn.startMiniQuiz}
      </Button>
      <Button
        variant="outline"
        onClick={onQuickCheck}
        className="h-12 w-full rounded-2xl text-base font-medium"
        aria-label={t.learn.quickCheckButton}
      >
        <HelpCircle className="size-4" aria-hidden="true" />
        {t.learn.quickCheckButton}
      </Button>
      {onTeachDifferently ? (
        <Button
          variant="ghost"
          onClick={onTeachDifferently}
          className="h-12 w-full rounded-2xl text-base font-medium"
          aria-label={t.learn.teachDifferently}
        >
          <RefreshCcw className="size-4" aria-hidden="true" />
          {t.learn.teachDifferently}
        </Button>
      ) : null}
    </div>
  );
}
