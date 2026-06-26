import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { QuizFlow } from "@/components/quiz/quiz-flow";

export const metadata: Metadata = {
  title: "Mini Quiz",
  description: "Practice what you learned with a short adaptive quiz.",
};

interface QuizPageProps {
  searchParams: Promise<{ lesson?: string }>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const { lesson } = await searchParams;

  return (
    <AppShell
      topicId={lesson}
      showBack
      backHref={lesson ? `/learn?lesson=${lesson}` : "/learn"}
    >
      <QuizFlow topicId={lesson ?? ""} />
    </AppShell>
  );
}
