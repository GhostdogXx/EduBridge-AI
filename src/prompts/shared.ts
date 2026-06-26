import type {
  Grade,
  LanguagePreference,
  LearningGoal,
  LessonVariant,
} from "@/lib/types/learning";

export function gradeGuidance(grade: Grade): string {
  switch (grade) {
    case 4:
      return "The student is in Grade 4 (around 9-10 years old). Use very simple, short sentences and the most basic vocabulary.";
    case 5:
      return "The student is in Grade 5 (around 10-11 years old). Use simple, clear sentences and everyday vocabulary.";
    case 6:
      return "The student is in Grade 6 (around 11-12 years old). Use clear sentences and grade-appropriate vocabulary; you may introduce a few key science terms with explanations.";
  }
}

export function languageGuidance(language: LanguagePreference): string {
  switch (language) {
    case "english":
      return "The student prefers English. Keep the simpleExplanation in clear English. Still provide the taglishExplanation field in natural Taglish as a friendly second take.";
    case "filipino":
      return "The student prefers Filipino. Make the taglishExplanation lean more towards Filipino. Keep the simpleExplanation in clear, simple English so they can connect both.";
    case "taglish":
      return "The student prefers Taglish. Make the taglishExplanation feel natural and conversational, mixing English and Filipino the way Filipino students actually speak.";
  }
}

export function goalGuidance(goal: LearningGoal): string {
  switch (goal) {
    case "exam-preparation":
      return "The student is preparing for quarterly exams, so emphasize the most testable key points.";
    case "homework-help":
      return "The student wants help understanding today's assignment, so be practical and direct.";
    case "understand-concepts":
      return "The student wants to deeply understand the concept, so build intuition with relatable examples.";
    case "resume-lesson":
      return "The student is resuming learning, so briefly reconnect them to the topic before going deeper.";
  }
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
  variant: LessonVariant,
  prerequisiteTopic?: string,
): string | null {
  switch (variant) {
    case "standard":
      return null;
    case "another-explanation":
      return "RE-TEACH: The student found this a little tricky. Explain it a DIFFERENT way than a standard textbook — use a fresh analogy and a new everyday Filipino example. Be extra encouraging.";
    case "simplified": {
      const prereq = prerequisiteTopic
        ? ` Briefly remind them of the related idea of \"${prerequisiteTopic}\" in one short sentence to rebuild their foundation.`
        : "";
      return `SIMPLIFY: The student struggled with this topic. Use the simplest possible words and very short sentences. Slow down and break the idea into tiny, easy steps.${prereq} Be warm and reassuring — make them feel capable, never behind.`;
    }
  }
}
