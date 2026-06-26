import { describe, expect, it } from "vitest";

import { evaluateQuiz } from "@/lib/adaptive";
import {
  applyQuizResult,
  createInitialPath,
  getRecommendedTopicId,
  isTopicLocked,
  variantForRecommendation,
  variantFromMode,
} from "@/lib/learning-path";

describe("createInitialPath", () => {
  it("unlocks only the first topic", () => {
    const path = createInitialPath();
    expect(path.photosynthesis.status).toBe("available");
    expect(path["water-cycle"].status).toBe("locked");
    expect(path["states-of-matter"].status).toBe("locked");
  });
});

describe("applyQuizResult", () => {
  it("masters topic and unlocks the next on a passing score", () => {
    const path = createInitialPath();
    const result = evaluateQuiz(3, 3);

    const next = applyQuizResult(path, "photosynthesis", result);

    expect(next.photosynthesis.status).toBe("mastered");
    expect(next.photosynthesis.bestPercentage).toBe(100);
    expect(next.photosynthesis.attempts).toBe(1);
    expect(next["water-cycle"].status).toBe("available");
  });

  it("flags needs-review on a low score", () => {
    const path = createInitialPath();
    const result = evaluateQuiz(0, 3);

    const next = applyQuizResult(path, "photosynthesis", result);

    expect(next.photosynthesis.status).toBe("needs-review");
    expect(isTopicLocked(next, "water-cycle")).toBe(true);
  });

  it("keeps mastered status on a retry-range score", () => {
    let path = createInitialPath();
    path = applyQuizResult(path, "photosynthesis", evaluateQuiz(3, 3));
    const retry = applyQuizResult(path, "water-cycle", evaluateQuiz(2, 3));

    expect(retry.photosynthesis.status).toBe("mastered");
    expect(retry["water-cycle"].status).toBe("available");
    expect(retry["water-cycle"].bestPercentage).toBe(67);
  });

  it("does not mutate the original path", () => {
    const path = createInitialPath();
    applyQuizResult(path, "photosynthesis", evaluateQuiz(3, 3));
    expect(path.photosynthesis.status).toBe("available");
  });
});

describe("getRecommendedTopicId", () => {
  it("returns the first available topic", () => {
    const path = createInitialPath();
    expect(getRecommendedTopicId(path)).toBe("photosynthesis");
  });

  it("recommends a topic that needs review", () => {
    let path = createInitialPath();
    path = applyQuizResult(path, "photosynthesis", evaluateQuiz(0, 3));

    expect(getRecommendedTopicId(path)).toBe("photosynthesis");
  });

  it("moves to the next available topic after mastery", () => {
    let path = createInitialPath();
    path = applyQuizResult(path, "photosynthesis", evaluateQuiz(3, 3));

    expect(getRecommendedTopicId(path)).toBe("water-cycle");
  });
});

describe("variant mapping", () => {
  it("maps recommendations to lesson variants", () => {
    expect(variantForRecommendation("unlock")).toBe("standard");
    expect(variantForRecommendation("retry")).toBe("another-explanation");
    expect(variantForRecommendation("review")).toBe("simplified");
  });

  it("maps URL mode query values", () => {
    expect(variantFromMode("review")).toBe("simplified");
    expect(variantFromMode("retry")).toBe("another-explanation");
    expect(variantFromMode(undefined)).toBe("standard");
  });
});
