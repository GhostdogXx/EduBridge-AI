"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { QuizError } from "@/components/quiz/quiz-error";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { QuizQuestionCard } from "@/components/quiz/quiz-question-card";
import { QuizResults } from "@/components/quiz/quiz-results";
import { QuizSkeleton } from "@/components/quiz/quiz-skeleton";
import { useAppContext } from "@/context/app-context";
import { useLearningPath } from "@/hooks/use-learning-path";
import { useProgress } from "@/hooks/use-progress";
import { useQuiz } from "@/hooks/use-quiz";
import { evaluateQuiz } from "@/lib/adaptive";
import { useT } from "@/lib/i18n";
import type { QuizResult } from "@/lib/types/learning";

interface QuizFlowProps {
  topicId: string;
}

export function QuizFlow({ topicId }: QuizFlowProps) {
  const router = useRouter();
  const { userProfile, isHydrated } = useAppContext();
  const { data, status, reload } = useQuiz(topicId);
  const { recordQuizSession } = useProgress();
  const { recordQuizResult } = useLearningPath();
  const t = useT();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  const backHref = `/learn?lesson=${topicId}`;

  useEffect(() => {
    if (isHydrated && !userProfile) {
      router.replace("/onboarding");
    }
  }, [isHydrated, userProfile, router]);

  const questions = data?.questions ?? [];

  const recordCompletion = (finalResult: QuizResult) => {
    recordQuizResult(topicId, finalResult);
    recordQuizSession({
      accuracy: finalResult.percentage,
      understanding: finalResult.percentage,
      masteredLesson: finalResult.recommendation === "unlock",
    });
  };

  const handleContinue = (isCorrect: boolean) => {
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    const finalResult = evaluateQuiz(newScore, questions.length);
    recordCompletion(finalResult);
    setResult(finalResult);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setResult(null);
    reload();
  };

  if (!isHydrated || !userProfile || status === "loading" || status === "idle") {
    return <QuizSkeleton />;
  }

  if (status === "error" || questions.length === 0) {
    return <QuizError onRetry={reload} backHref={backHref} />;
  }

  if (result) {
    return (
      <QuizResults
        result={result}
        topicId={topicId}
        topic={data?.topic ?? t.quiz.thisTopic}
        onRetry={handleRetry}
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex flex-col gap-6">
      <QuizProgress current={currentIndex + 1} total={questions.length} />
      <QuizQuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        isLast={currentIndex === questions.length - 1}
        onContinue={handleContinue}
      />
    </div>
  );
}
