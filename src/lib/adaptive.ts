import { ADAPTIVE_THRESHOLDS } from "@/lib/constants";
import type {
  AdaptiveRecommendation,
  QuizResult,
} from "@/lib/types/learning";

/**
 * Deterministic adaptive logic. The application — never Gemini — decides the
 * learning path based on the quiz score:
 *   >= 80%  -> unlock the next lesson
 *   50-79%  -> retry (more practice on the same topic)
 *   < 50%   -> review (re-read the lesson, extra encouragement)
 */
export function recommendationFor(percentage: number): AdaptiveRecommendation {
  if (percentage >= ADAPTIVE_THRESHOLDS.unlock) return "unlock";
  if (percentage >= ADAPTIVE_THRESHOLDS.retry) return "retry";
  return "review";
}

export function evaluateQuiz(score: number, totalQuestions: number): QuizResult {
  const safeTotal = Math.max(totalQuestions, 1);
  const percentage = Math.round((score / safeTotal) * 100);

  return {
    score,
    totalQuestions: safeTotal,
    percentage,
    recommendation: recommendationFor(percentage),
  };
}
