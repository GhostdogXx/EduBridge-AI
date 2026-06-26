"use client";

import Link from "next/link";
import { ArrowLeft, CloudOff, RefreshCw } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface QuizErrorProps {
  onRetry: () => void;
  backHref: string;
}

export function QuizError({ onRetry, backHref }: QuizErrorProps) {
  const t = useT();

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardHeader className="items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <CloudOff className="size-7 text-muted-foreground" aria-hidden="true" />
        </span>
        <CardTitle className="text-xl">{t.quiz.error.title}</CardTitle>
        <CardDescription>{t.quiz.error.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button
          onClick={onRetry}
          className="h-12 w-full rounded-2xl text-base font-semibold"
          aria-label={t.common.tryAgain}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {t.common.tryAgain}
        </Button>
        <Link
          href={backHref}
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "h-11 w-full rounded-2xl text-base font-medium",
          )}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t.quiz.error.backToLesson}
        </Link>
      </CardContent>
    </Card>
  );
}
