import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { LessonView } from "@/components/learning/lesson-view";
import { getTopic, resolveTopicId } from "@/lib/curriculum";
import { variantFromMode } from "@/lib/learning-path";

export const metadata: Metadata = {
  title: "Learn",
  description: "Your guided lesson with bilingual explanations and examples.",
};

interface LearnPageProps {
  searchParams: Promise<{ lesson?: string; mode?: string }>;
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const { lesson, mode } = await searchParams;
  const topicId = resolveTopicId(lesson);
  const topic = getTopic(topicId);
  const variant = variantFromMode(mode);

  return (
    <AppShell
      title={topic?.topic}
      showLessonControls
      showBack
      backHref="/"
    >
      <LessonView
        topicId={topicId}
        variant={variant}
        explicit={lesson !== undefined}
      />
    </AppShell>
  );
}
