import type { Grade, LanguagePreference, Subject } from "@/lib/types/learning";
import { getSubjectLabel } from "@/lib/subjects";

/** Rules for AI-generated content when the learner chose Filipino. */
export const SIMPLE_FILIPINO_RULES = [
  "Write ONLY in simple, everyday Filipino that elementary students hear at home and in school.",
  "Do NOT use deep, old-fashioned, or highly formal Filipino (avoid: isakatuparan, mangyaring, nais, naaangkop, kahilingan, nilalaman, nabuo, pagkakahanay, kompetensi, ipagpatuloy, pagganap, pagtatanghal).",
  "Use short, clear sentences. Explain hard ideas with simple words.",
  "If a technical term is needed, explain it right away in simple Filipino.",
  "Be friendly and encouraging — like a kind elementary school teacher.",
  "Do NOT mix English unless there is no common Filipino word (e.g. quiz, computer, internet).",
  "PREFER everyday words: gawin, piliin, susunod, simulan, basahin, subukan, aralin, tanong, tulong, galing, kaya mo.",
].join(" ");

export function isFilipinoLanguage(language: LanguagePreference): boolean {
  return language === "filipino";
}

export function gradeGuidance(grade: Grade): string {
  switch (grade) {
    case 1:
      return "The student is in Grade 1 (around 6-7 years old). Use the simplest words, very short sentences, and concrete examples.";
    case 2:
      return "The student is in Grade 2 (around 7-8 years old). Use simple words and short sentences with familiar examples.";
    case 3:
      return "The student is in Grade 3 (around 8-9 years old). Use simple, clear language and everyday vocabulary.";
    case 4:
      return "The student is in Grade 4 (around 9-10 years old). Use very simple, short sentences and basic vocabulary.";
    case 5:
      return "The student is in Grade 5 (around 10-11 years old). Use simple, clear sentences and everyday vocabulary.";
    case 6:
      return "The student is in Grade 6 (around 11-12 years old). Use clear sentences and grade-appropriate vocabulary; explain any key terms simply.";
  }
}

export function subjectGuidance(subject: Subject): string {
  return `Subject: ${getSubjectLabel(subject)}. Follow Philippine DepEd K–12 elementary curriculum for this subject and grade. Never suggest high school or college topics.`;
}

export function languageGuidance(language: LanguagePreference): string {
  switch (language) {
    case "english":
      return "The student prefers English. Keep the simpleExplanation in clear English. Still provide the taglishExplanation field in natural Taglish as a friendly second take.";
    case "filipino":
      return [
        "The student prefers Filipino. ALL generated text for this student must be in simple everyday Filipino at an elementary reading level.",
        SIMPLE_FILIPINO_RULES,
        "For lessons: write simpleExplanation as the main lesson in simple Filipino; write taglishExplanation as a second, friendlier explanation also in simple Filipino (NOT English, NOT Taglish); write filipinoExample as a real-life example in simple Filipino.",
        "For quizzes: write every question, all four options, and every explanation in simple Filipino only.",
        "For topic suggestions: write category, titles, and descriptions in simple Filipino only.",
        "For feedback: write headline, feedback, and tips in simple Filipino only.",
      ].join(" ");
    case "taglish":
      return "The student prefers Taglish. Make the taglishExplanation feel natural and conversational, mixing English and Filipino the way Filipino students actually speak.";
  }
}

export function filipinoContentBlock(language: LanguagePreference): string | null {
  if (!isFilipinoLanguage(language)) return null;
  return ["FILIPINO LANGUAGE (REQUIRED):", SIMPLE_FILIPINO_RULES].join("\n");
}

export const TAGLISH_RULES = [
  "Write Taglish naturally — do NOT translate word-for-word.",
  "Use familiar Filipino contexts: jeepney, sari-sari store, palayan (rice field), school, family, or plants in the backyard.",
  "Be warm, encouraging, and never condescending.",
].join(" ");

export const JSON_ONLY_RULES = [
  "Respond with ONLY valid JSON.",
  "Do NOT include markdown, code fences, comments, or any text outside the JSON object.",
  "All string values must be plain text (no markdown formatting).",
].join(" ");

export function lowDataNote(lowDataMode: boolean): string {
  return lowDataMode
    ? "LOW DATA MODE: Keep every text field extremely short — one concise sentence per field, no filler words. Quiz options and explanations must be one short line each. Tips array: at most 1 tip. estimatedReadingMinutes must be 1."
    : "Keep explanations focused and not too long — a short paragraph per field is ideal.";
}

/** Extra quiz constraints when bandwidth is limited. */
export function lowDataQuizRules(lowDataMode: boolean): string | null {
  if (!lowDataMode) return null;
  return "Keep each question, every option, and every explanation to a single short line.";
}

/** Extra evaluation constraints when bandwidth is limited. */
export function lowDataEvaluationRules(lowDataMode: boolean): string | null {
  if (!lowDataMode) return null;
  return "Headline: 3 words max. Feedback: 1 short sentence. tips: exactly 1 short tip.";
}

/**
 * Adaptive re-teach guidance. The app decides the variant from the previous
 * quiz score; the model only changes HOW it explains, not the path.
 */
export function variantGuidance(
  variant: import("@/lib/types/learning").LessonVariant,
  prerequisiteTopic?: string,
  language?: LanguagePreference,
): string | null {
  const filipinoNote = isFilipinoLanguage(language ?? "english")
    ? " Use simple everyday Filipino only."
    : "";

  switch (variant) {
    case "standard":
      return null;
    case "another-explanation":
      return `RE-TEACH: The student found this a little tricky. Explain it a DIFFERENT way than a standard textbook — use a fresh analogy and a new everyday Filipino example. Be extra encouraging.${filipinoNote}`;
    case "simplified": {
      const prereq = prerequisiteTopic
        ? ` Briefly remind them of the related idea of \"${prerequisiteTopic}\" in one short sentence to rebuild their foundation.`
        : "";
      return `SIMPLIFY: The student struggled with this topic. Use the simplest possible words and very short sentences. Slow down and break the idea into tiny, easy steps.${prereq} Be warm and reassuring — make them feel capable, never behind.${filipinoNote}`;
    }
  }
}
