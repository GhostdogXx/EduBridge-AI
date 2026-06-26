"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingStepView } from "@/components/onboarding/onboarding-step-view";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { useT } from "@/lib/i18n";
import type { OnboardingOption } from "@/lib/onboarding-content";
import { TOTAL_ONBOARDING_STEPS } from "@/lib/onboarding-content";
import type {
  Grade,
  LanguagePreference,
  LearningGoal,
  Subject,
  UserProfile,
} from "@/lib/types/learning";

interface DraftProfile {
  grade?: Grade;
  subject?: Subject;
  language?: LanguagePreference;
  goal?: LearningGoal;
}

export function OnboardingFlow() {
  const router = useRouter();
  const { setUserProfile, lowDataMode, preferredLanguage, setPreferredLanguage } =
    useAppContext();
  const t = useT();

  const [currentStep, setCurrentStep] = useState(0);
  const [languageTouched, setLanguageTouched] = useState(false);
  const [draft, setDraft] = useState<DraftProfile>({
    subject: "science",
    language: preferredLanguage,
  });

  useEffect(() => {
    if (languageTouched) return;
    setDraft((prev) => ({ ...prev, language: preferredLanguage }));
  }, [preferredLanguage, languageTouched]);

  const gradeOptions: OnboardingOption<Grade>[] = [
    { value: 4, icon: "grade-4", ...t.onboarding.grade.options["4"] },
    { value: 5, icon: "grade-5", ...t.onboarding.grade.options["5"] },
    { value: 6, icon: "grade-6", ...t.onboarding.grade.options["6"] },
  ];

  const subjectOptions: OnboardingOption<Subject>[] = [
    { value: "science", icon: "science", ...t.onboarding.subject.options.science },
  ];

  const languageOptions: OnboardingOption<LanguagePreference>[] = [
    { value: "filipino", icon: "filipino", ...t.onboarding.language.options.filipino },
    { value: "taglish", icon: "taglish", ...t.onboarding.language.options.taglish },
    { value: "english", icon: "english", ...t.onboarding.language.options.english },
  ];

  const goalOptions: OnboardingOption<LearningGoal>[] = [
    {
      value: "exam-preparation",
      icon: "exam",
      ...t.onboarding.goal.options["exam-preparation"],
    },
    {
      value: "homework-help",
      icon: "homework",
      ...t.onboarding.goal.options["homework-help"],
    },
    {
      value: "understand-concepts",
      icon: "concepts",
      ...t.onboarding.goal.options["understand-concepts"],
    },
    {
      value: "resume-lesson",
      icon: "resume",
      ...t.onboarding.goal.options["resume-lesson"],
    },
  ];

  const isStepComplete = (() => {
    switch (currentStep) {
      case 0:
        return draft.grade !== undefined;
      case 1:
        return draft.subject !== undefined;
      case 2:
        return draft.language !== undefined;
      case 3:
        return draft.goal !== undefined;
      default:
        return false;
    }
  })();

  const isFinalStep = currentStep === TOTAL_ONBOARDING_STEPS - 1;

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      return;
    }
    router.push("/");
  };

  const handleContinue = () => {
    if (!isStepComplete) return;

    if (!isFinalStep) {
      setCurrentStep((step) => step + 1);
      return;
    }

    const profile: UserProfile = {
      grade: draft.grade as Grade,
      subject: draft.subject as Subject,
      language: draft.language as LanguagePreference,
      goal: draft.goal as LearningGoal,
    };

    setUserProfile(profile);
    router.push("/learn");
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
          <OnboardingStepView<Subject>
            title={t.onboarding.subject.title}
            subtitle={t.onboarding.subject.subtitle}
            options={subjectOptions}
            selectedValue={draft.subject}
            onSelect={(subject) => setDraft((prev) => ({ ...prev, subject }))}
          />
        );
      case 2:
        return (
          <OnboardingStepView<LanguagePreference>
            title={t.onboarding.language.title}
            subtitle={t.onboarding.language.subtitle}
            options={languageOptions}
            selectedValue={draft.language}
            onSelect={(language) => {
              setLanguageTouched(true);
              setPreferredLanguage(language);
              setDraft((prev) => ({ ...prev, language }));
            }}
          />
        );
      case 3:
        return (
          <OnboardingStepView<LearningGoal>
            title={t.onboarding.goal.title}
            subtitle={t.onboarding.goal.subtitle}
            options={goalOptions}
            selectedValue={draft.goal}
            onSelect={(goal) => setDraft((prev) => ({ ...prev, goal }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main id="main-content" tabIndex={-1} className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 py-8 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:py-12">
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
            onClick={handleContinue}
            disabled={!isStepComplete}
            className="h-14 w-full rounded-2xl text-base font-semibold shadow-md shadow-primary/20"
            aria-label={isFinalStep ? t.onboarding.startLearning : t.onboarding.continue}
          >
            {isFinalStep ? t.onboarding.startLearning : t.onboarding.continue}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>

          {currentStep >= 0 ? (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="h-11 w-full rounded-2xl text-base font-medium"
              aria-label={t.onboarding.back}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t.onboarding.back}
            </Button>
          ) : null}
        </div>
      </main>
    </div>
  );
}
