import type {
  AdaptiveRecommendation,
  EvaluationFeedback,
} from "@/lib/types/learning";

const FALLBACK_EVALUATIONS: Record<
  AdaptiveRecommendation,
  EvaluationFeedback
> = {
  unlock: {
    headline: "Great Progress!",
    feedback:
      "Ang galing mo! You really understood this lesson. Handa ka nang mag-level up sa susunod na topic.",
    tips: [
      "Quickly review the parts you found tricky to make them stick.",
      "Teach the idea to a family member — it helps you remember!",
    ],
  },
  retry: {
    headline: "You're Improving!",
    feedback:
      "Malapit ka na! You got several right. Konting practice pa and you'll have this down.",
    tips: [
      "Re-read the Simple Explanation once more.",
      "Try the quiz again — mas mapapadali habang nag-prapractice ka.",
    ],
  },
  review: {
    headline: "Keep Going!",
    feedback:
      "Okay lang yan! Every learner starts somewhere, and you're already trying. Balikan natin ang lesson para mas lumiwanag.",
    tips: [
      "Read the lesson again slowly, isang section at a time.",
      "Focus on the real-life example to picture the idea.",
    ],
  },
};

export function getFallbackEvaluation(
  recommendation: AdaptiveRecommendation,
  lowDataMode = false,
): EvaluationFeedback {
  const base = FALLBACK_EVALUATIONS[recommendation];
  if (!lowDataMode) return base;

  return {
    headline: base.headline,
    feedback: base.feedback.split(".")[0] + ".",
    tips: base.tips.slice(0, 1),
  };
}
