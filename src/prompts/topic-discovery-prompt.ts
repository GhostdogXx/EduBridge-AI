import type { Grade, LanguagePreference, Subject } from "@/lib/types/learning";
import { getSubjectLabel } from "@/lib/subjects";
import {
  JSON_ONLY_RULES,
  filipinoContentBlock,
  gradeGuidance,
  isFilipinoLanguage,
  languageGuidance,
  subjectGuidance,
} from "@/prompts/shared";

interface BuildTopicDiscoveryPromptArgs {
  grade: Grade;
  subject: Subject;
  language: LanguagePreference;
  keyword: string;
  lowDataMode?: boolean;
}

const TOPIC_DISCOVERY_SCHEMA = `{
  "category": string (a short label for the keyword area, e.g. "Biology"),
  "topics": [
    {
      "title": string (short topic name appropriate for the grade),
      "description": string (one friendly sentence about what the student will learn),
      "estimatedReadingMinutes": number (integer, 2-5),
      "difficulty": "easy" | "moderate" | "challenging"
    }
  ]
}`;

export function buildTopicDiscoveryPrompt({
  grade,
  subject,
  language,
  keyword,
  lowDataMode = false,
}: BuildTopicDiscoveryPromptArgs): string {
  const trimmedKeyword = keyword.trim();
  const topicCount = lowDataMode ? "4" : "5 to 8";

  const filipinoBlock = filipinoContentBlock(language);

  return [
    "You are an educational curriculum assistant for Filipino elementary students.",
    "",
    "The student selected:",
    `Grade: ${grade}`,
    `Subject: ${getSubjectLabel(subject)}`,
    `Language: ${language}`,
    "",
    "They want to learn:",
    trimmedKeyword,
    "",
    `Return ${topicCount} topics that are DIRECTLY related to "${trimmedKeyword}" and appropriate for Grade ${grade} ${getSubjectLabel(subject)}.`,
    "",
    "CRITICAL RULES:",
    `- Every topic MUST relate to the keyword "${trimmedKeyword}". Never ignore the keyword.`,
    "- Never replace the keyword with a default topic like Photosynthesis, Fractions, or Solar System unless the student typed that exact keyword.",
    "- Do NOT generate a lesson. Do NOT answer the question. ONLY suggest topics.",
    "- If the keyword is broad, break it into beginner-friendly subtopics for this grade.",
    "- If the keyword is already a specific lesson, include closely related lessons.",
    `- ${gradeGuidance(grade)}`,
    `- ${subjectGuidance(subject)}`,
    `- ${languageGuidance(language)}`,
    ...(filipinoBlock ? ["", filipinoBlock] : []),
    ...(isFilipinoLanguage(language)
      ? [
          "- Isulat ang category, title, at description ng bawat paksa sa simpleng Filipino.",
          "- Gamitin ang salitang madaling intindihin ng batang elementarya.",
        ]
      : []),
    "- NEVER suggest high school or college topics. Simplify everything.",
    "- Align with Philippine DepEd K–12 elementary curriculum.",
    ...(lowDataMode
      ? [
          "- LOW DATA MODE: Keep descriptions to one short sentence. Return exactly 4 topics.",
        ]
      : []),
    "",
    "Return a single JSON object with EXACTLY this shape:",
    TOPIC_DISCOVERY_SCHEMA,
    "",
    JSON_ONLY_RULES,
  ].join("\n");
}
