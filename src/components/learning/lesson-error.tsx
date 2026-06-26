"use client";

import { CloudOff, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useT } from "@/lib/i18n";

interface LessonErrorProps {
  onRetry: () => void;
  message?: string | null;
}

export function LessonError({ onRetry, message }: LessonErrorProps) {
  const t = useT();

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardHeader className="items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <CloudOff className="size-7 text-muted-foreground" aria-hidden="true" />
        </span>
        <CardTitle className="text-xl">{t.learn.error.title}</CardTitle>
        <CardDescription>
          {message ?? t.learn.error.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          onClick={onRetry}
          className="h-12 rounded-2xl px-6 text-base font-semibold"
          aria-label={t.common.tryAgain}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {t.common.tryAgain}
        </Button>
      </CardContent>
    </Card>
  );
}
