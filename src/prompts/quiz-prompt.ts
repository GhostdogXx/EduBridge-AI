import type { CurriculumTopic } from "@/lib/curriculum";
import type { UserProfile } from "@/lib/types/learning";
import {
  JSON_ONLY_RULES,
  gradeGuidance,
  languageGuidance,
  lowDataNote,
  lowDataQuizRules,
} from "@/prompts/shared";

interface BuildQuizPromptArgs {
  profile: UserProfile;
  topic: CurriculumTopic;
  lowDataMode?: boolean;
}

const QUIZ_SCHEMA = `{
  "questions": [
    {
      "id": string (e.g. "q1"),
      "question": string (the question text),
      "options": [string, string, string, string] (exactly 4 choices),
      "correctIndex": number (0, 1, 2, or 3 — index of the correct option),
      "explanation": string (short, encouraging reason why the answer is correct)
    }
  ]
}`;

export function buildQuizPrompt({
  profile,
  topic,
  lowDataMode = false,
}: BuildQuizPromptArgs): string {
  return [
    "You are EduBridge AI, creating a short practice quiz for a Filipino student.",
    "",
    `TOPIC: ${topic.topic}`,
    `SCOPE: ${topic.focus}`,
    "",
    "STUDENT:",
    `- ${gradeGuidance(profile.grade)}`,
    `- ${languageGuidance(profile.language)}`,
    "",
    "QUIZ RULES:",
    "- Create EXACTLY 3 multiple-choice questions about the topic.",
    "- Each question must have EXACTLY 4 options.",
    "- Exactly one option is correct; set correctIndex to its 0-based index.",
    "- Make wrong options plausible but clearly incorrect on reflection.",
    "- Keep questions and options short and grade-appropriate.",
    "- Write the explanation in a warm, encouraging tone.",
    `- ${lowDataNote(lowDataMode)}`,
    ...(lowDataQuizRules(lowDataMode) ? [`- ${lowDataQuizRules(lowDataMode)}`] : []),
    "",
    "Return a single JSON object with EXACTLY this shape:",
    QUIZ_SCHEMA,
    "",
    JSON_ONLY_RULES,
  ].join("\n");
}
