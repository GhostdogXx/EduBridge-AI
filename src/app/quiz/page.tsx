import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { QuizFlow } from "@/components/quiz/quiz-flow";
import { getTopic, resolveTopicId } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "Mini Quiz",
  description: "Practice what you learned with a short adaptive quiz.",
};

interface QuizPageProps {
  searchParams: Promise<{ lesson?: string }>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const { lesson } = await searchParams;
  const topicId = resolveTopicId(lesson);
  const topic = getTopic(topicId);

  return (
    <AppShell title={topic?.topic} showBack backHref={`/learn?lesson=${topicId}`}>
      <QuizFlow topicId={topicId} />
    </AppShell>
  );
}
