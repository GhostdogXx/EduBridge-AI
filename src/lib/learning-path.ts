import {
  SCIENCE_TOPICS,
  getFirstTopic,
  getNextTopic,
  type CurriculumTopic,
} from "@/lib/curriculum";
import type {
  AdaptiveRecommendation,
  LearningPathState,
  LessonVariant,
  QuizResult,
  TopicState,
} from "@/lib/types/learning";

const DEFAULT_TOPIC_STATE: TopicState = {
  status: "locked",
  bestPercentage: 0,
  attempts: 0,
};

/** Builds a fresh path: first topic available, the rest locked. */
export function createInitialPath(
  topics: CurriculumTopic[] = SCIENCE_TOPICS,
): LearningPathState {
  return topics.reduce<LearningPathState>((path, topic, index) => {
    path[topic.id] = {
      ...DEFAULT_TOPIC_STATE,
      status: index === 0 ? "available" : "locked",
    };
    return path;
  }, {});
}

/** Ensures every curriculum topic has an entry, preserving stored progress. */
export function normalizePath(
  stored: Partial<LearningPathState> | null,
  topics: CurriculumTopic[] = SCIENCE_TOPICS,
): LearningPathState {
  const base = createInitialPath(topics);
  if (!stored) return base;

  for (const topic of topics) {
    const entry = stored[topic.id];
    if (entry) base[topic.id] = { ...base[topic.id], ...entry };
  }
  return base;
}

export function getTopicState(
  path: LearningPathState,
  topicId: string,
): TopicState {
  return path[topicId] ?? DEFAULT_TOPIC_STATE;
}

/** Pure: returns a new path reflecting a finished quiz, never mutates input. */
export function applyQuizResult(
  path: LearningPathState,
  topicId: string,
  result: QuizResult,
): LearningPathState {
  const prev = getTopicState(path, topicId);
  const bestPercentage = Math.max(prev.bestPercentage, result.percentage);
  const attempts = prev.attempts + 1;

  let status = prev.status;
  if (result.recommendation === "unlock") status = "mastered";
  else if (result.recommendation === "review") status = "needs-review";
  else status = prev.status === "mastered" ? "mastered" : "available";

  const next: LearningPathState = {
    ...path,
    [topicId]: { status, bestPercentage, attempts },
  };

  if (result.recommendation === "unlock") {
    const nextTopic = getNextTopic(topicId);
    if (nextTopic) {
      const nextState = getTopicState(next, nextTopic.id);
      if (nextState.status === "locked") {
        next[nextTopic.id] = { ...nextState, status: "available" };
      }
    }
  }

  return next;
}

/** The lowest-order topic the learner should tackle next. */
export function getRecommendedTopicId(
  path: LearningPathState,
  topics: CurriculumTopic[] = SCIENCE_TOPICS,
): string {
  const actionable = topics.find((topic) => {
    const state = getTopicState(path, topic.id);
    return state.status === "available" || state.status === "needs-review";
  });
  if (actionable) return actionable.id;

  // Everything mastered — let them revisit the latest topic.
  const lastMastered = [...topics]
    .reverse()
    .find((topic) => getTopicState(path, topic.id).status === "mastered");

  return lastMastered?.id ?? getFirstTopic().id;
}

export function isTopicLocked(
  path: LearningPathState,
  topicId: string,
): boolean {
  return getTopicState(path, topicId).status === "locked";
}

/* ---------- Adaptive lesson variant mapping ---------- */

export function variantForRecommendation(
  recommendation: AdaptiveRecommendation,
): LessonVariant {
  switch (recommendation) {
    case "review":
      return "simplified";
    case "retry":
      return "another-explanation";
    case "unlock":
      return "standard";
  }
}

/** Maps a URL `?mode=` value to a lesson variant (defaults to standard). */
export function variantFromMode(mode?: string): LessonVariant {
  if (mode === "review") return "simplified";
  if (mode === "retry") return "another-explanation";
  return "standard";
}
