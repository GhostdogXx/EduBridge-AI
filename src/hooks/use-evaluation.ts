"use client";

import { useEffect, useState } from "react";

import { useAppContext } from "@/context/app-context";
import { getFallbackEvaluation } from "@/lib/mock/evaluation";
import type { EvaluationResponse } from "@/lib/types/api";
import type { AdaptiveRecommendation } from "@/lib/types/learning";

type EvaluationStatus = "loading" | "ready";

interface UseEvaluationArgs {
  topicId: string;
  score: number;
  total: number;
  recommendation: AdaptiveRecommendation;
}

interface UseEvaluationResult {
  data: EvaluationResponse;
  status: EvaluationStatus;
}

/**
 * Fetches warm AI feedback for a finished quiz. Falls back to friendly local
 * copy on any failure so the results screen always shows encouragement.
 */
export function useEvaluation({
  topicId,
  score,
  total,
  recommendation,
}: UseEvaluationArgs): UseEvaluationResult {
  const { userProfile, lowDataMode, isHydrated } = useAppContext();

  const [data, setData] = useState<EvaluationResponse>({
    evaluation: getFallbackEvaluation(recommendation),
    source: "fallback",
  });
  const [status, setStatus] = useState<EvaluationStatus>("loading");

  useEffect(() => {
    if (!isHydrated || !userProfile) return;

    const controller = new AbortController();
    setStatus("loading");

    fetch("/api/evaluation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: userProfile,
        topicId,
        score,
        total,
        recommendation,
        lowDataMode,
      }),
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const json = (await response.json()) as EvaluationResponse;
        setData(json);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setData({
          evaluation: getFallbackEvaluation(recommendation),
          source: "fallback",
        });
      })
      .finally(() => {
        setStatus("ready");
      });

    return () => controller.abort();
  }, [
    isHydrated,
    userProfile,
    topicId,
    score,
    total,
    recommendation,
    lowDataMode,
  ]);

  return { data, status };
}
