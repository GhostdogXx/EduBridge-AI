import { describe, expect, it } from "vitest";

import { evaluateQuiz, recommendationFor } from "@/lib/adaptive";

describe("recommendationFor", () => {
  it("unlocks at 80% and above", () => {
    expect(recommendationFor(80)).toBe("unlock");
    expect(recommendationFor(100)).toBe("unlock");
  });

  it("retries between 50% and 79%", () => {
    expect(recommendationFor(50)).toBe("retry");
    expect(recommendationFor(79)).toBe("retry");
  });

  it("reviews below 50%", () => {
    expect(recommendationFor(49)).toBe("review");
    expect(recommendationFor(0)).toBe("review");
  });
});

describe("evaluateQuiz", () => {
  it("computes percentage and recommendation from score", () => {
    expect(evaluateQuiz(3, 3)).toEqual({
      score: 3,
      totalQuestions: 3,
      percentage: 100,
      recommendation: "unlock",
    });
  });

  it("rounds percentage correctly", () => {
    expect(evaluateQuiz(1, 3).percentage).toBe(33);
    expect(evaluateQuiz(1, 3).recommendation).toBe("review");
  });

  it("guards against zero total questions", () => {
    const result = evaluateQuiz(0, 0);
    expect(result.totalQuestions).toBe(1);
    expect(result.percentage).toBe(0);
    expect(result.recommendation).toBe("review");
  });
});
