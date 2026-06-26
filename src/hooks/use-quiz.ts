"use client";

import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "@/context/app-context";
import type { QuizResponse } from "@/lib/types/api";

type QuizStatus = "idle" | "loading" | "success" | "error";

interface UseQuizResult {
  data: QuizResponse | null;
  status: QuizStatus;
  reload: () => void;
}

export function useQuiz(topicId: string): UseQuizResult {
  const { userProfile, lowDataMode, isHydrated } = useAppContext();
  const [data, setData] = useState<QuizResponse | null>(null);
  const [status, setStatus] = useState<QuizStatus>("idle");
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    if (!isHydrated || !userProfile) return;

    const controller = new AbortController();
    setStatus("loading");

    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: userProfile, topicId, lowDataMode }),
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const json = (await response.json()) as QuizResponse;
        setData(json);
        setStatus("success");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [isHydrated, userProfile, topicId, lowDataMode, reloadToken]);

  return { data, status, reload };
}
