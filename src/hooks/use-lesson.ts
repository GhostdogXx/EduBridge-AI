"use client";

import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "@/context/app-context";
import type { LessonResponse } from "@/lib/types/api";
import type { LessonVariant } from "@/lib/types/learning";

type LessonStatus = "idle" | "loading" | "success" | "error";

interface UseLessonResult {
  data: LessonResponse | null;
  status: LessonStatus;
  reload: () => void;
}

export function useLesson(
  topicId: string,
  variant: LessonVariant = "standard",
): UseLessonResult {
  const { userProfile, lowDataMode, isHydrated } = useAppContext();
  const [data, setData] = useState<LessonResponse | null>(null);
  const [status, setStatus] = useState<LessonStatus>("idle");
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    if (!isHydrated || !userProfile) return;

    const controller = new AbortController();
    setStatus("loading");

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
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const json = (await response.json()) as LessonResponse;
        setData(json);
        setStatus("success");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [isHydrated, userProfile, topicId, lowDataMode, variant, reloadToken]);

  return { data, status, reload };
}
