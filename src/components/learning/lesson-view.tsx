"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Lightbulb,
  MessageSquareText,
  Sprout,
} from "lucide-react";

import { AdaptiveBanner } from "@/components/learning/adaptive-banner";
import { CurriculumCard } from "@/components/learning/curriculum-card";
import { LessonActions } from "@/components/learning/lesson-actions";
import { LessonError } from "@/components/learning/lesson-error";
import { LessonHeader } from "@/components/learning/lesson-header";
import { LessonSectionCard } from "@/components/learning/lesson-section-card";
import { LessonSkeleton } from "@/components/learning/lesson-skeleton";
import { OfflineBanner } from "@/components/learning/offline-banner";
import { QuickCheck } from "@/components/learning/quick-check";
import { useAppContext } from "@/context/app-context";
import { resolveLessonTopic } from "@/lib/topic-utils";
import { useLearningPath } from "@/hooks/use-learning-path";
import { useLesson } from "@/hooks/use-lesson";
import { useT } from "@/lib/i18n";
import type { LessonVariant } from "@/lib/types/learning";

interface LessonViewProps {
  topicId: string;
  variant?: LessonVariant;
  /** Whether the topic came from an explicit ?lesson= param. */
  explicit?: boolean;
}

export function LessonView({
  topicId,
  variant = "standard",
  explicit = true,
}: LessonViewProps) {
  const router = useRouter();
  const { userProfile, isHydrated, lowDataMode } = useAppContext();
  const { isLoaded: pathLoaded, recommendedTopicId } = useLearningPath();
  const [activeVariant, setActiveVariant] = useState<LessonVariant>(variant);
  const effectiveTopicId =
    topicId || userProfile?.selectedTopic?.id || recommendedTopicId();

  const { data, status, errorMessage, reload } = useLesson(effectiveTopicId, activeVariant);
  const t = useT();
  const quickCheckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveVariant(variant);
  }, [variant, effectiveTopicId]);

  useEffect(() => {
    if (isHydrated && !userProfile) {
      router.replace("/onboarding");
    }
  }, [isHydrated, userProfile, router]);

  // Resume legacy paths only when no explicit or profile topic exists.
  useEffect(() => {
    if (explicit || !pathLoaded || !userProfile || userProfile.selectedTopic) {
      return;
    }

    const recommended = recommendedTopicId();
    if (recommended !== effectiveTopicId) {
      router.replace(`/learn?lesson=${recommended}`);
    }
  }, [
    explicit,
    pathLoaded,
    userProfile,
    recommendedTopicId,
    effectiveTopicId,
    router,
  ]);

  const handleQuickCheck = () => {
    quickCheckRef.current?.scrollIntoView({
      behavior: lowDataMode ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleStartQuiz = () => {
    router.push(`/quiz?lesson=${effectiveTopicId}`);
  };

  if (
    !isHydrated ||
    !userProfile ||
    !effectiveTopicId ||
    status === "loading" ||
    status === "idle"
  ) {
    return <LessonSkeleton />;
  }

  if (status === "error" || !data) {
    return <LessonError onRetry={reload} message={errorMessage} />;
  }

  const { lesson, topic, source } = data;
  const alignment = userProfile
    ? resolveLessonTopic(effectiveTopicId, userProfile)?.alignment
    : undefined;

  const handleTeachDifferently = () => {
    setActiveVariant("another-explanation");
    window.scrollTo({ top: 0, behavior: lowDataMode ? "auto" : "smooth" });
  };

  const secondSectionLabel =
    userProfile.language === "filipino"
      ? t.learn.sections.filipinoSecond
      : t.learn.sections.secondExplanation;

  return (
    <div className="flex flex-col gap-5">
      <LessonHeader
        topic={topic}
        title={lesson.title}
        estimatedReadingMinutes={lesson.estimatedReadingMinutes}
      />

      {alignment ? <CurriculumCard alignment={alignment} /> : null}

      {source === "fallback" ? <OfflineBanner /> : null}

      <AdaptiveBanner variant={activeVariant} />

      <LessonSectionCard
        icon={BookOpen}
        label={t.learn.sections.simple}
        tone="primary"
      >
        {lesson.simpleExplanation}
      </LessonSectionCard>

      <LessonSectionCard
        icon={MessageSquareText}
        label={secondSectionLabel}
        tone="accent"
      >
        {lesson.taglishExplanation}
      </LessonSectionCard>

      <LessonSectionCard
        icon={Sprout}
        label={t.learn.sections.example}
        tone="accent"
      >
        {lesson.filipinoExample}
      </LessonSectionCard>

      <LessonSectionCard
        icon={Lightbulb}
        label={t.learn.sections.whyItMatters}
        tone="warning"
      >
        {lesson.whyItMatters}
      </LessonSectionCard>

      <p className="px-1 text-center text-base font-medium text-foreground">
        {lesson.encouragePractice}
      </p>

      <div ref={quickCheckRef} className="scroll-mt-20">
        <QuickCheck prompt={t.learn.quickCheck.prompt} />
      </div>

      <LessonActions
        onQuickCheck={handleQuickCheck}
        onStartQuiz={handleStartQuiz}
        onTeachDifferently={
          activeVariant === "another-explanation"
            ? undefined
            : handleTeachDifferently
        }
      />
    </div>
  );
}
