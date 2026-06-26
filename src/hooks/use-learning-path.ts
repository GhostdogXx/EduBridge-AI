"use client";

import { useCallback, useEffect, useState } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import {
  applyQuizResult,
  createInitialPath,
  getRecommendedTopicId,
  getTopicState,
  normalizePath,
} from "@/lib/learning-path";
import type {
  LearningPathState,
  QuizResult,
  TopicState,
} from "@/lib/types/learning";

function readLearningPath(): LearningPathState {
  if (typeof window === "undefined") return createInitialPath();

  const raw = window.localStorage.getItem(STORAGE_KEYS.learningPath);
  if (!raw) return createInitialPath();

  try {
    return normalizePath(JSON.parse(raw) as Partial<LearningPathState>);
  } catch {
    return createInitialPath();
  }
}

export function useLearningPath() {
  const [path, setPath] = useState<LearningPathState>(() => createInitialPath());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPath(readLearningPath());
    setIsLoaded(true);
  }, []);

  const persist = useCallback((next: LearningPathState) => {
    setPath(next);
    window.localStorage.setItem(
      STORAGE_KEYS.learningPath,
      JSON.stringify(next),
    );
  }, []);

  const recordQuizResult = useCallback(
    (topicId: string, result: QuizResult) => {
      setPath((prev) => {
        const next = applyQuizResult(prev, topicId, result);
        window.localStorage.setItem(
          STORAGE_KEYS.learningPath,
          JSON.stringify(next),
        );
        return next;
      });
    },
    [],
  );

  const topicState = useCallback(
    (topicId: string): TopicState => getTopicState(path, topicId),
    [path],
  );

  const recommendedTopicId = useCallback(
    (): string => getRecommendedTopicId(path),
    [path],
  );

  return {
    path,
    isLoaded,
    persist,
    recordQuizResult,
    topicState,
    recommendedTopicId,
  };
}
