import type { ResolvedLessonTopic } from "@/lib/topic-utils";
import type {
  AdaptiveRecommendation,
  UserProfile,
} from "@/lib/types/learning";
import {
  JSON_ONLY_RULES,
  filipinoContentBlock,
  isFilipinoLanguage,
  languageGuidance,
  lowDataNote,
  lowDataEvaluationRules,
} from "@/prompts/shared";

interface BuildEvaluationPromptArgs {
  profile: UserProfile;
  topic: ResolvedLessonTopic;
  score: number;
  total: number;
  /** Decided deterministically by the app — never by the model. */
  recommendation: AdaptiveRecommendation;
  lowDataMode?: boolean;
}

const EVALUATION_SCHEMA = `{
  "headline": string (a short, positive headline, e.g. "Great Progress!"),
  "feedback": string (2-3 warm, encouraging sentences about how they did),
  "tips": [string] (1-3 short, actionable study tips)
}`;

const RECOMMENDATION_CONTEXT: Record<AdaptiveRecommendation, string> = {
  unlock:
    "They did great and are ready to move on to the next lesson. Celebrate their success.",
  retry:
    "They are getting there but should practice this topic a bit more. Be encouraging and motivating.",
  review:
    "They found this hard and should review the lesson again. Be extra supportive and reassuring — never make them feel bad.",
};

export function buildEvaluationPrompt({
  profile,
  topic,
  score,
  total,
  recommendation,
  lowDataMode = false,
}: BuildEvaluationPromptArgs): string {
  const filipinoBlock = filipinoContentBlock(profile.language);

  return [
    "You are EduBridge AI, giving warm, positive feedback after a quiz. Never shame the student.",
    "",
    `TOPIC: ${topic.title}`,
    `RESULT: The student scored ${score} out of ${total}.`,
    `SITUATION: ${RECOMMENDATION_CONTEXT[recommendation]}`,
    "",
    "STUDENT:",
    `- ${languageGuidance(profile.language)}`,
    ...(filipinoBlock ? ["", filipinoBlock] : []),
    "",
    "FEEDBACK RULES:",
    "- Always be encouraging and kind, whatever the score.",
    ...(isFilipinoLanguage(profile.language)
      ? [
          "- Isulat ang headline, feedback, at tips sa simpleng Filipino.",
          "- Maikli at malinaw ang bawat pangungusap. Parang guro na nagpapalakas ng loob.",
        ]
      : [
          "- Use a warm Taglish-friendly tone that a Filipino student would enjoy.",
        ]),
    "- Do NOT decide the next lesson — only give feedback and tips.",
    `- ${lowDataNote(lowDataMode)}`,
    ...(lowDataEvaluationRules(lowDataMode)
      ? [`- ${lowDataEvaluationRules(lowDataMode)}`]
      : []),
    "",
    "Return a single JSON object with EXACTLY this shape:",
    EVALUATION_SCHEMA,
    "",
    JSON_ONLY_RULES,
  ].join("\n");
}
