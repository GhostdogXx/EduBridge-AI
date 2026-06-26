"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";

import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingStepView } from "@/components/onboarding/onboarding-step-view";
import { SubjectCard } from "@/components/onboarding/subject-card";
import { TopicInput } from "@/components/onboarding/topic-input";
import { TopicSuggestionList } from "@/components/onboarding/topic-suggestion-list";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { STORAGE_KEYS } from "@/lib/constants";
import { useT, useUiLanguage } from "@/lib/i18n";
import { createPathForTopic } from "@/lib/learning-path";
import type { OnboardingOption } from "@/lib/onboarding-content";
import { TOTAL_ONBOARDING_STEPS } from "@/lib/onboarding-content";
import { SUBJECT_DEFINITIONS } from "@/lib/subjects";
import { createDiscoveredTopicId } from "@/lib/topic-utils";
import type {
  Grade,
  SelectedTopic,
  Subject,
  TopicSuggestion,
  UserProfile,
} from "@/lib/types/learning";
import type { TopicsResponse } from "@/lib/types/api";

interface DraftProfile {
  grade?: Grade;
  subject?: Subject;
  keyword?: string;
  selectedTopic?: SelectedTopic;
}

export function OnboardingFlow() {
  const router = useRouter();
  const uiLanguage = useUiLanguage();
  const { setUserProfile, lowDataMode, preferredLanguage } = useAppContext();
  const t = useT();

  const [currentStep, setCurrentStep] = useState(0);
  const [draft, setDraft] = useState<DraftProfile>({});
  const [topicSuggestions, setTopicSuggestions] = useState<TopicSuggestion[]>([]);
  const [topicCategory, setTopicCategory] = useState("");
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [topicsError, setTopicsError] = useState(false);
  const [topicsErrorMessage, setTopicsErrorMessage] = useState("");

  const gradeOptions: OnboardingOption<Grade>[] = ([1, 2, 3, 4, 5, 6] as const).map(
    (grade) => ({
      value: grade,
      icon: `grade-${grade}` as OnboardingOption<Grade>["icon"],
      ...t.onboarding.grade.options[String(grade) as "1"],
    }),
  );

  const subjectExamples =
    t.onboarding.topicDiscovery.examplesBySubject[draft.subject ?? "science"];

  const curriculumBadge =
    draft.grade && draft.subject
      ? t.onboarding.topicSuggestions.badge(draft.grade, draft.subject)
      : "";

  const isStepComplete = (() => {
    switch (currentStep) {
      case 0:
        return draft.grade !== undefined;
      case 1:
        return draft.subject !== undefined;
      case 2:
        return (draft.keyword?.trim().length ?? 0) > 0;
      case 3:
        return draft.selectedTopic !== undefined;
      default:
        return false;
    }
  })();

  const isFinalStep = currentStep === TOTAL_ONBOARDING_STEPS - 1;

  const fetchTopics = async () => {
    if (!draft.grade || !draft.subject || !draft.keyword?.trim()) {
      return false;
    }

    setTopicsLoading(true);
    setTopicsError(false);
    setTopicsErrorMessage("");

    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: draft.grade,
          subject: draft.subject,
          language: preferredLanguage,
          keyword: draft.keyword.trim(),
          lowDataMode,
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setTopicsErrorMessage(
          errorBody?.error ?? t.onboarding.topicSuggestions.error,
        );
        throw new Error("Topics request failed");
      }

      const json = (await response.json()) as TopicsResponse;

      if (!json.topics?.length) {
        setTopicsErrorMessage(t.onboarding.topicSuggestions.empty);
        throw new Error("No topics returned");
      }

      setTopicCategory(json.category);
      setTopicSuggestions(json.topics);
      setDraft((prev) => ({ ...prev, selectedTopic: undefined }));
      return true;
    } catch {
      setTopicsError(true);
      return false;
    } finally {
      setTopicsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      return;
    }
    router.push("/");
  };

  const handleContinue = async () => {
    if (!isStepComplete || topicsLoading) return;

    if (currentStep === 2) {
      const ok = await fetchTopics();
      if (ok) setCurrentStep(3);
      return;
    }

    if (!isFinalStep) {
      setCurrentStep((step) => step + 1);
      return;
    }

    const profile: UserProfile = {
      grade: draft.grade as Grade,
      subject: draft.subject as Subject,
      language: preferredLanguage,
      selectedTopic: draft.selectedTopic as SelectedTopic,
    };

    setUserProfile(profile);
    window.localStorage.setItem(
      STORAGE_KEYS.learningPath,
      JSON.stringify(createPathForTopic(profile.selectedTopic.id)),
    );
    router.push(`/learn?lesson=${profile.selectedTopic.id}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <OnboardingStepView<Grade>
            title={t.onboarding.grade.title}
            subtitle={t.onboarding.grade.subtitle}
            options={gradeOptions}
            selectedValue={draft.grade}
            onSelect={(grade) => setDraft((prev) => ({ ...prev, grade }))}
          />
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t.onboarding.subject.title}
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                {t.onboarding.subject.subtitle}
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {SUBJECT_DEFINITIONS.map((subject) => {
                const label =
                  uiLanguage === "en" ? subject.labelEn : subject.labelFil;
                const description =
                  uiLanguage === "en"
                    ? subject.descriptionEn
                    : subject.descriptionFil;

                return (
                  <li key={subject.id}>
                    <SubjectCard
                      subject={subject}
                      label={label}
                      description={description}
                      selected={draft.subject === subject.id}
                      onSelect={() =>
                        setDraft((prev) => ({
                          ...prev,
                          subject: subject.id,
                          keyword: "",
                          selectedTopic: undefined,
                        }))
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <TopicInput
              title={t.onboarding.topicDiscovery.prompt(
                draft.subject ?? "science",
              )}
              placeholder={t.onboarding.topicDiscovery.placeholder}
              examples={subjectExamples}
              value={draft.keyword ?? ""}
              onChange={(keyword) => {
                setTopicsError(false);
                setTopicsErrorMessage("");
                setTopicSuggestions([]);
                setDraft((prev) => ({ ...prev, keyword, selectedTopic: undefined }));
              }}
            />
            {topicsError ? (
              <div className="space-y-3 rounded-2xl bg-destructive/10 px-4 py-3 text-center">
                <p className="text-sm text-destructive">
                  {topicsErrorMessage || t.onboarding.topicSuggestions.error}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void fetchTopics()}
                  disabled={topicsLoading}
                  className="h-11 rounded-2xl"
                >
                  {t.common.tryAgain}
                </Button>
              </div>
            ) : null}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t.onboarding.topicSuggestions.title}
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                {topicCategory
                  ? t.onboarding.topicSuggestions.subtitle(topicCategory)
                  : t.onboarding.topicSuggestions.subtitleGeneric}
              </p>
            </div>

            {topicsError ? (
              <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
                {t.onboarding.topicSuggestions.error}
              </p>
            ) : null}

            <TopicSuggestionList
              topics={topicSuggestions}
              selectedTitle={draft.selectedTopic?.title ?? null}
              badge={curriculumBadge}
              readingTimeLabel={t.onboarding.topicSuggestions.readingTime}
              difficultyLabels={t.onboarding.topicSuggestions.difficulty}
              onSelect={(topic) =>
                setDraft((prev) => ({
                  ...prev,
                  selectedTopic: {
                    id: createDiscoveredTopicId(topic.title),
                    title: topic.title,
                    description: topic.description,
                    focus: `${topic.title}: ${topic.description}`,
                    estimatedReadingMinutes: topic.estimatedReadingMinutes,
                    difficulty: topic.difficulty,
                  },
                }))
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  const continueLabel =
    currentStep === 2
      ? t.onboarding.topicDiscovery.continue
      : isFinalStep
        ? t.onboarding.startLearning
        : t.onboarding.continue;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:py-12"
      >
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="size-4" aria-hidden="true" />
          {t.onboarding.eyebrow}
        </div>

        <div className="mb-8">
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={TOTAL_ONBOARDING_STEPS}
          />
        </div>

        <div className="flex-1">
          {lowDataMode ? (
            renderStep()
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="sticky bottom-0 mt-8 flex flex-col gap-3 bg-background/90 pb-2 pt-4 backdrop-blur-sm">
          <Button
            onClick={() => void handleContinue()}
            disabled={!isStepComplete || topicsLoading}
            className="h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20"
            aria-label={continueLabel}
          >
            {topicsLoading ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                {t.onboarding.topicDiscovery.loading}
              </>
            ) : (
              <>
                {continueLabel}
                <ArrowRight className="size-5" aria-hidden="true" />
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={handleBack}
            className="h-11 w-full rounded-2xl text-base font-medium"
            aria-label={t.onboarding.back}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.onboarding.back}
          </Button>
        </div>
      </main>
    </div>
  );
}
