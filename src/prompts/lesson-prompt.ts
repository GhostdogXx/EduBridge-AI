import type { ResolvedLessonTopic } from "@/lib/topic-utils";
import type { LessonVariant, UserProfile } from "@/lib/types/learning";
import {
  JSON_ONLY_RULES,
  ENGLISH_LESSON_RULES,
  filipinoContentBlock,
  gradeGuidance,
  isFilipinoLanguage,
  languageGuidance,
  lowDataNote,
  subjectGuidance,
  variantGuidance,
} from "@/prompts/shared";

interface BuildLessonPromptArgs {
  profile: UserProfile;
  topic: ResolvedLessonTopic;
  lowDataMode?: boolean;
  variant?: LessonVariant;
  prerequisiteTopic?: string;
}

const LESSON_SCHEMA_FILIPINO = `{
  "title": string (maikling pamagat ng aralin sa simpleng Filipino),
  "simpleExplanation": string (pangunahing paliwanag sa simpleng Filipino — maikli at madaling basahin),
  "taglishExplanation": string (pangalawang paliwanag sa simpleng Filipino, ibang salita o halimbawa — HINDI English o Taglish),
  "filipinoExample": string (isang halimbawa mula sa totoong buhay sa simpleng Filipino),
  "whyItMatters": string (bakit mahalaga ito sa araw-araw, sa simpleng Filipino),
  "estimatedReadingMinutes": number (integer, 1-5),
  "encouragePractice": string (isang maikling panghihikayat sa simpleng Filipino)
}`;

const LESSON_SCHEMA_DEFAULT = `{
  "title": string (a short, friendly lesson title),
  "simpleExplanation": string (clear, grade-appropriate explanation in English),
  "taglishExplanation": string (second friendly explanation in clear English — not a copy of the first),
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
  const adaptiveNote = variantGuidance(
    variant,
    prerequisiteTopic,
    profile.language,
  );
  const filipinoBlock = filipinoContentBlock(profile.language);
  const lessonSchema = isFilipinoLanguage(profile.language)
    ? LESSON_SCHEMA_FILIPINO
    : LESSON_SCHEMA_DEFAULT;

  return [
    "You are EduBridge AI, a kind and encouraging tutor for Filipino students. You are a tutor, not a chatbot — you teach a structured lesson.",
    "",
    `TOPIC: ${topic.title}`,
    `SCOPE: ${topic.focus}`,
    "",
    "STUDENT:",
    `- ${gradeGuidance(profile.grade)}`,
    `- ${subjectGuidance(profile.subject)}`,
    `- ${languageGuidance(profile.language)}`,
    ...(filipinoBlock ? ["", filipinoBlock] : []),
    "",
    "WRITING RULES:",
    ...(isFilipinoLanguage(profile.language)
      ? [
          "- Lahat ng teksto para sa mag-aaral ay nasa simpleng Filipino lang.",
          "- Maikli ang bawat pangungusap. Ipaliwanag ang mahirap na salita nang simple.",
        ]
      : [`- ${ENGLISH_LESSON_RULES}`]),
    `- ${lowDataNote(lowDataMode)}`,
    ...(lowDataMode
      ? ["- estimatedReadingMinutes must be 1.", "- Use plain, direct language — no decorative phrasing."]
      : []),
    "- Teach the concept; do not just answer a question.",
    ...(adaptiveNote ? ["", adaptiveNote] : []),
    "",
    "Return a single JSON object with EXACTLY these fields:",
    lessonSchema,
    "",
    JSON_ONLY_RULES,
  ].join("\n");
}
