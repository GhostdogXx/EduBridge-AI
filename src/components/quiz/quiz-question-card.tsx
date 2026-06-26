"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useT } from "@/lib/i18n";
import type { QuizQuestion } from "@/lib/types/learning";
import { cn } from "@/lib/utils";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  isLast: boolean;
  onContinue: (isCorrect: boolean) => void;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export function QuizQuestionCard({
  question,
  isLast,
  onContinue,
}: QuizQuestionCardProps) {
  const t = useT();
  const headingId = useId();
  const feedbackId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = selectedIndex === question.correctIndex;

  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelectedIndex(index);
  };

  const handlePrimary = () => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    onContinue(isCorrect);
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="rounded-3xl border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-5 pt-6">
          <h2
            id={headingId}
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-semibold leading-snug text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {question.question}
          </h2>

          <div
            role="radiogroup"
            aria-labelledby={headingId}
            aria-describedby={revealed ? feedbackId : undefined}
            aria-label={t.a11y.quizChoices}
            className="flex flex-col gap-3"
          >
            {question.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              const isAnswer = index === question.correctIndex;

              const state = !revealed
                ? isSelected
                  ? "selected"
                  : "default"
                : isAnswer
                  ? "correct"
                  : isSelected
                    ? "wrong"
                    : "muted";

              const optionLabel = t.a11y.optionLabel(OPTION_LABELS[index], option);
              const stateLabel = revealed
                ? isAnswer
                  ? t.a11y.correctAnswer
                  : isSelected
                    ? t.a11y.yourAnswerWrong
                    : undefined
                : isSelected
                  ? t.a11y.selected
                  : t.a11y.notSelected;

              return (
                <button
                  key={index}
                  type="button"
                  role="radio"
                  onClick={() => handleSelect(index)}
                  disabled={revealed}
                  aria-checked={isSelected}
                  aria-label={
                    stateLabel ? `${optionLabel}. ${stateLabel}` : optionLabel
                  }
                  className={cn(
                    "flex w-full min-h-14 items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    state === "default" &&
                      "border-border/70 hover:border-primary/40 hover:bg-muted/40",
                    state === "selected" && "border-primary bg-primary/5",
                    state === "correct" && "border-accent bg-accent/10",
                    state === "wrong" && "border-destructive bg-destructive/10",
                    state === "muted" && "border-border/50 opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                      state === "correct"
                        ? "bg-accent text-accent-foreground"
                        : state === "wrong"
                          ? "bg-destructive text-white"
                          : state === "selected"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground",
                    )}
                    aria-hidden="true"
                  >
                    {state === "correct" ? (
                      <Check className="size-4" />
                    ) : state === "wrong" ? (
                      <X className="size-4" />
                    ) : (
                      OPTION_LABELS[index]
                    )}
                  </span>
                  <span className="flex-1 text-base font-medium text-foreground">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {revealed ? (
            <div
              id={feedbackId}
              className={cn(
                "flex items-start gap-3 rounded-2xl p-4",
                isCorrect ? "bg-accent/10" : "bg-secondary",
              )}
              role="status"
              aria-live="polite"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg",
                  isCorrect
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary/10 text-primary",
                )}
              >
                {isCorrect ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Sparkles className="size-4" aria-hidden="true" />
                )}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-foreground">
                  {isCorrect ? t.quiz.correctFeedback : t.quiz.wrongFeedback}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {question.explanation}
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Button
        onClick={handlePrimary}
        disabled={selectedIndex === null}
        className="h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20"
        aria-label={
          !revealed
            ? t.quiz.checkAnswer
            : isLast
              ? t.quiz.seeResults
              : t.quiz.nextQuestion
        }
      >
        {!revealed ? (
          t.quiz.checkAnswer
        ) : isLast ? (
          t.quiz.seeResults
        ) : (
          <>
            {t.quiz.nextQuestion}
            <ArrowRight className="size-5" aria-hidden="true" />
          </>
        )}
      </Button>
    </div>
  );
}
