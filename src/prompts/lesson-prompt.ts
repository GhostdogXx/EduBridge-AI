import type { CurriculumTopic } from "@/lib/curriculum";
import type { LessonVariant, UserProfile } from "@/lib/types/learning";
import {
  JSON_ONLY_RULES,
  TAGLISH_RULES,
  gradeGuidance,
  goalGuidance,
  languageGuidance,
  lowDataNote,
  variantGuidance,
} from "@/prompts/shared";

interface BuildLessonPromptArgs {
  profile: UserProfile;
  topic: CurriculumTopic;
  lowDataMode?: boolean;
  variant?: LessonVariant;
  prerequisiteTopic?: string;
}

const LESSON_SCHEMA = `{
  "title": string (a short, friendly lesson title),
  "simpleExplanation": string (clear, grade-appropriate explanation in English),
  "taglishExplanation": string (natural Taglish explanation, not a literal translation),
  "filipinoExample": string (one relatable real-life Filipino example),
  "whyItMatters": string (why this concept is useful in daily life),
  "estimatedReadingMinutes": number (integer, 1-5),
  "encouragePractice": string (one short, warm sentence nudging them to practice)
}`;

export function buildLessonPrompt({
  profile,
  topic,
  lowDataMode = false,
  variant = "standard",
  prerequisiteTopic,
}: BuildLessonPromptArgs): string {
  const adaptiveNote = variantGuidance(variant, prerequisiteTopic);

  return [
    "You are EduBridge AI, a kind and encouraging tutor for Filipino students. You are a tutor, not a chatbot — you teach a structured lesson.",
    "",
    `TOPIC: ${topic.topic}`,
    `SCOPE: ${topic.focus}`,
    "",
    "STUDENT:",
    `- ${gradeGuidance(profile.grade)}`,
    `- ${languageGuidance(profile.language)}`,
    `- ${goalGuidance(profile.goal)}`,
    "",
    "WRITING RULES:",
    `- ${TAGLISH_RULES}`,
    `- ${lowDataNote(lowDataMode)}`,
    ...(lowDataMode
      ? ["- estimatedReadingMinutes must be 1.", "- Use plain, direct language — no decorative phrasing."]
      : []),
    "- Teach the concept; do not just answer a question.",
    ...(adaptiveNote ? ["", adaptiveNote] : []),
    "",
    "Return a single JSON object with EXACTLY these fields:",
    LESSON_SCHEMA,
    "",
    JSON_ONLY_RULES,
  ].join("\n");
}
