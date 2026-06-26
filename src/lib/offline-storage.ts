import { STORAGE_KEYS } from "@/lib/constants";
import type { LessonResponse, QuizResponse } from "@/lib/types/api";
import type { UserProfile } from "@/lib/types/learning";

export interface OfflinePack {
  topicId: string;
  topicTitle: string;
  profile: UserProfile;
  lesson: LessonResponse;
  quiz: QuizResponse;
  downloadedAt: string;
}

export interface OfflinePackSummary {
  topicId: string;
  topicTitle: string;
  downloadedAt: string;
}

function readStore(): Record<string, OfflinePack> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.offlinePacks);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, OfflinePack>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, OfflinePack>): void {
  window.localStorage.setItem(STORAGE_KEYS.offlinePacks, JSON.stringify(store));
}

export function getOfflinePack(topicId: string): OfflinePack | null {
  if (!topicId.trim()) return null;
  return readStore()[topicId] ?? null;
}

export function saveOfflinePack(pack: OfflinePack): void {
  const store = readStore();
  store[pack.topicId] = pack;
  writeStore(store);
}

export function removeOfflinePack(topicId: string): void {
  const store = readStore();
  delete store[topicId];
  writeStore(store);
}

export function listOfflinePacks(): OfflinePackSummary[] {
  return Object.values(readStore())
    .map(({ topicId, topicTitle, downloadedAt }) => ({
      topicId,
      topicTitle,
      downloadedAt,
    }))
    .sort(
      (a, b) =>
        new Date(b.downloadedAt).getTime() - new Date(a.downloadedAt).getTime(),
    );
}

export function isTopicDownloaded(topicId: string): boolean {
  return getOfflinePack(topicId) !== null;
}
