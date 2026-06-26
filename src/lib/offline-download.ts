import {
  getOfflinePack,
  saveOfflinePack,
  type OfflinePack,
} from "@/lib/offline-storage";
import type { LessonResponse, QuizResponse } from "@/lib/types/api";
import type { UserProfile } from "@/lib/types/learning";

async function fetchLesson(
  profile: UserProfile,
  topicId: string,
  lowDataMode: boolean,
): Promise<LessonResponse> {
  const response = await fetch("/api/lesson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      profile,
      topicId,
      lowDataMode,
      variant: "standard",
    }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? `Lesson request failed: ${response.status}`);
  }

  return (await response.json()) as LessonResponse;
}

async function fetchQuiz(
  profile: UserProfile,
  topicId: string,
  lowDataMode: boolean,
): Promise<QuizResponse> {
  const response = await fetch("/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile, topicId, lowDataMode }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? `Quiz request failed: ${response.status}`);
  }

  return (await response.json()) as QuizResponse;
}

export async function downloadTopicForOffline(
  profile: UserProfile,
  topicId: string,
  lowDataMode = false,
): Promise<OfflinePack> {
  const [lesson, quiz] = await Promise.all([
    fetchLesson(profile, topicId, lowDataMode),
    fetchQuiz(profile, topicId, lowDataMode),
  ]);

  const pack: OfflinePack = {
    topicId,
    topicTitle: profile.selectedTopic.title,
    profile,
    lesson,
    quiz,
    downloadedAt: new Date().toISOString(),
  };

  saveOfflinePack(pack);
  return pack;
}

export function getCachedLesson(topicId: string): LessonResponse | null {
  const pack = getOfflinePack(topicId);
  if (!pack) return null;
  return { ...pack.lesson, source: "offline" };
}

export function getCachedQuiz(topicId: string): QuizResponse | null {
  const pack = getOfflinePack(topicId);
  if (!pack) return null;
  return { ...pack.quiz, source: "offline" };
}
