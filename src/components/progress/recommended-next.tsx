"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTopic } from "@/lib/curriculum";
import { useT } from "@/lib/i18n";
import type { TopicStatus } from "@/lib/types/learning";
import { cn } from "@/lib/utils";

interface RecommendedNextProps {
  topicId: string;
  status: TopicStatus;
}

export function RecommendedNext({ topicId, status }: RecommendedNextProps) {
  const t = useT();
  const topic = getTopic(topicId);
  if (!topic) return null;

  const isReview = status === "needs-review";
  const mode = isReview ? "&mode=review" : "";

  return (
    <Card className="overflow-hidden rounded-3xl border-none bg-primary text-primary-foreground shadow-md shadow-primary/20">
      <CardContent className="flex flex-col gap-4 pt-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
            {t.progress.recommendedNext.label}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">{topic.topic}</h2>
          <p className="mt-1 text-sm opacity-90">
            {isReview
              ? t.progress.recommendedNext.reviewMessage
              : t.progress.recommendedNext.continueMessage}
          </p>
        </div>

        <Link
          href={`/learn?lesson=${topic.id}${mode}`}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-12 w-full rounded-2xl bg-card text-base font-semibold text-primary hover:bg-card/90",
          )}
        >
          {isReview
            ? t.progress.recommendedNext.reviewButton
            : t.progress.recommendedNext.continueButton}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
