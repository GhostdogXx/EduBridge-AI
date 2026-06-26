"use client";

import { useCallback, useEffect, useState } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import {
  MINUTES_PER_SESSION,
  computeStreak,
  dateKey,
} from "@/lib/progress-stats";
import type { ProgressSnapshot } from "@/lib/types/learning";

export const DEFAULT_PROGRESS: ProgressSnapshot = {
  lessonsCompleted: 0,
  quizAccuracy: 0,
  understandingMeter: 0,
  streakDays: 0,
  estimatedStudyMinutes: 0,
  todaysGoalLessons: 3,
  dailySessions: {},
};

function readProgress(): ProgressSnapshot {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;

  const raw = window.localStorage.getItem(STORAGE_KEYS.progress);
  if (!raw) return DEFAULT_PROGRESS;

  try {
    const parsed = JSON.parse(raw) as Partial<ProgressSnapshot>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      dailySessions: parsed.dailySessions ?? {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

interface QuizSessionInput {
  accuracy: number;
  understanding: number;
  masteredLesson: boolean;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressSnapshot>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setIsLoaded(true);
  }, []);

  const persist = useCallback((next: ProgressSnapshot) => {
    window.localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(next));
  }, []);

  const updateProgress = useCallback(
    (partial: Partial<ProgressSnapshot>) => {
      setProgress((prev) => {
        const next = { ...prev, ...partial };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  /** Records one finished quiz: bumps today's activity, streak, and stats. */
  const recordQuizSession = useCallback(
    ({ accuracy, understanding, masteredLesson }: QuizSessionInput) => {
      setProgress((prev) => {
        const today = dateKey();
        const dailySessions = {
          ...prev.dailySessions,
          [today]: (prev.dailySessions[today] ?? 0) + 1,
        };

        const next: ProgressSnapshot = {
          ...prev,
          dailySessions,
          streakDays: computeStreak(dailySessions),
          estimatedStudyMinutes:
            prev.estimatedStudyMinutes + MINUTES_PER_SESSION,
          quizAccuracy: accuracy,
          understandingMeter: understanding,
          lessonsCompleted: masteredLesson
            ? prev.lessonsCompleted + 1
            : prev.lessonsCompleted,
        };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  return { progress, updateProgress, recordQuizSession, isLoaded };
}
