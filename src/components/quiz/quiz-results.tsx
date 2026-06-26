"use client";

import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";

import { useEvaluation } from "@/hooks/use-evaluation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getNextTopic } from "@/lib/curriculum";
import { useT } from "@/lib/i18n";
import type { QuizResult } from "@/lib/types/learning";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  result: QuizResult;
  topicId: string;
  topic: string;
  onRetry: () => void;
}

const TONE_BY_RECOMMENDATION = {
  unlock: { ring: "text-accent", chip: "bg-accent/15 text-accent", icon: Trophy },
  retry: {
    ring: "text-primary",
    chip: "bg-primary/10 text-primary",
    icon: PartyPopper,
  },
  review: {
    ring: "text-primary",
    chip: "bg-primary/10 text-primary",
    icon: Sparkles,
  },
} as const;

export function QuizResults({
  result,
  topicId,
  topic,
  onRetry,
}: QuizResultsProps) {
  const t = useT();
  const { data: evaluationData, status } = useEvaluation({
    topicId,
    score: result.score,
    total: result.totalQuestions,
    recommendation: result.recommendation,
  });

  const copy = t.quiz.recommendation[result.recommendation];
  const tone = TONE_BY_RECOMMENDATION[result.recommendation];
  const ToneIcon = tone.icon;
  const nextTopic =
    result.recommendation === "unlock" ? getNextTopic(topicId) : null;

  const reviewHref =
    result.recommendation === "review"
      ? `/learn?lesson=${topicId}&mode=review`
      : result.recommendation === "retry"
        ? `/learn?lesson=${topicId}&mode=retry`
        : `/learn?lesson=${topicId}`;

  const renderPrimaryAction = () => {
    if (result.recommendation === "unlock") {
      if (nextTopic) {
        return (
          <Link
            href={`/learn?lesson=${nextTopic.id}`}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20",
            )}
          >
            {copy.primaryAction}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        );
      }
      return (
        <Link
          href="/progress"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20",
          )}
        >
          {t.quiz.viewProgress}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      );
    }

    if (result.recommendation === "retry") {
      return (
        <Button
          onClick={onRetry}
          className="h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20"
        >
          <RotateCcw className="size-5" aria-hidden="true" />
          {copy.primaryAction}
        </Button>
      );
    }

    return (
      <Link
        href={reviewHref}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20",
        )}
      >
        {copy.primaryAction}
        <ArrowRight className="size-5" aria-hidden="true" />
      </Link>
    );
  };

  const renderSecondaryAction = () => {
    if (result.recommendation === "review") {
      return (
        <Button
          variant="ghost"
          onClick={onRetry}
          className="h-11 w-full rounded-2xl text-base font-medium"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {copy.secondaryAction}
        </Button>
      );
    }

    return (
      <Link
        href={reviewHref}
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "h-11 w-full rounded-2xl text-base font-medium",
        )}
      >
        {copy.secondaryAction}
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
        <CardHeader className="items-center gap-3 text-center">
          <span className={cn("flex size-16 items-center justify-center rounded-3xl", tone.chip)}>
            <ToneIcon className="size-8" aria-hidden="true" />
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              tone.chip,
            )}
          >
            {copy.badge}
          </span>
          <CardTitle className="text-2xl">
            {result.score} / {result.totalQuestions} correct
          </CardTitle>
          <p className={cn("text-4xl font-bold tabular-nums", tone.ring)}>
            {result.percentage}%
          </p>
        </CardHeader>

        <CardContent>
          {status === "loading" ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-center">
                <h3 className="text-lg font-bold text-foreground">
                  {evaluationData.evaluation.headline}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {evaluationData.evaluation.feedback}
                </p>
              </div>

              {evaluationData.evaluation.tips.length > 0 ? (
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Lightbulb className="size-4 text-warning" aria-hidden="true" />
                    {t.quiz.studyTips}
                  </p>
                  <ul className="flex flex-col gap-2" role="list">
                    {evaluationData.evaluation.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      <p className="px-2 text-center text-sm text-muted-foreground">
        {result.recommendation === "unlock"
          ? t.quiz.readyToMoveOn(topic)
          : t.quiz.morePractice(topic)}
      </p>

      {nextTopic ? (
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-center">
          <p className="text-sm font-semibold text-foreground">
            {t.quiz.nextUp(nextTopic.topic)}
          </p>
          <p className="text-xs text-muted-foreground">{t.quiz.whyNext}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {renderPrimaryAction()}
        {renderSecondaryAction()}
      </div>
    </div>
  );
}
