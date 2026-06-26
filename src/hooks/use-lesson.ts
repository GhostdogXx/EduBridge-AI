"use client";

import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "@/context/app-context";
import { getCachedLesson } from "@/lib/offline-download";
import type { LessonResponse } from "@/lib/types/api";
import type { LessonVariant } from "@/lib/types/learning";

type LessonStatus = "idle" | "loading" | "success" | "error";

interface UseLessonResult {
  data: LessonResponse | null;
  status: LessonStatus;
  errorMessage: string | null;
  reload: () => void;
}

function canUseOfflineCache(variant: LessonVariant): boolean {
  return variant === "standard";
}

export function useLesson(
  topicId: string,
  variant: LessonVariant = "standard",
): UseLessonResult {
  const { userProfile, lowDataMode, isHydrated } = useAppContext();
  const [data, setData] = useState<LessonResponse | null>(null);
  const [status, setStatus] = useState<LessonStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    if (!isHydrated || !userProfile || !topicId.trim()) return;

    const controller = new AbortController();
    const cached =
      canUseOfflineCache(variant) ? getCachedLesson(topicId) : null;

    if (!navigator.onLine && cached) {
      setData(cached);
      setStatus("success");
      setErrorMessage(null);
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    fetch("/api/lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: userProfile,
        topicId,
        lowDataMode,
        variant,
      }),
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error ?? `Request failed: ${response.status}`);
        }
        const json = (await response.json()) as LessonResponse;
        setData(json);
        setStatus("success");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;

        if (cached) {
          setData(cached);
          setStatus("success");
          setErrorMessage(null);
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Lesson request failed.",
        );
        setStatus("error");
      });

    return () => controller.abort();
  }, [isHydrated, userProfile, topicId, lowDataMode, variant, reloadToken]);

  return { data, status, errorMessage, reload };
}
