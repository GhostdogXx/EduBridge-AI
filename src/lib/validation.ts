import { z } from "zod";

import type { QuizQuestion } from "@/lib/types/learning";

const gradeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

const subjectSchema = z.enum([
  "mathematics",
  "science",
  "english",
  "filipino",
  "araling-panlipunan",
  "esp",
  "mapeh",
  "ict",
  "mother-tongue",
]);

const topicDifficultySchema = z.enum(["easy", "moderate", "challenging"]);

export const selectedTopicSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(120),
  description: z.string().min(1),
  focus: z.string().min(1),
  estimatedReadingMinutes: z.number().int().min(1).max(20),
  difficulty: topicDifficultySchema,
});

export const userProfileSchema = z.object({
  grade: gradeSchema,
  subject: subjectSchema,
  language: z.enum(["english", "filipino", "taglish"]),
  selectedTopic: selectedTopicSchema,
});

export function safeParseUserProfile(value: unknown) {
  return userProfileSchema.safeParse(value);
}

/* ---------- Gemini topic discovery output ---------- */

export const topicSuggestionSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1),
  estimatedReadingMinutes: z.number().int().min(1).max(15),
  difficulty: topicDifficultySchema,
});

export const topicDiscoverySchema = z.object({
  category: z.string().min(1).max(80),
  topics: z.array(topicSuggestionSchema).min(1).max(8),
});

export type TopicDiscoveryParsed = z.infer<typeof topicDiscoverySchema>;

/* ---------- Gemini lesson output ---------- */

export const lessonContentSchema = z.object({
  title: z.string().min(1).max(120),
  simpleExplanation: z.string().min(1),
  taglishExplanation: z.string().min(1),
  filipinoExample: z.string().min(1),
  whyItMatters: z.string().min(1),
  estimatedReadingMinutes: z.number().int().min(1).max(20),
  encouragePractice: z.string().min(1),
});

export type LessonContentParsed = z.infer<typeof lessonContentSchema>;

/* ---------- Gemini quiz output ---------- */

const correctIndexSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

export const quizQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  options: z.array(z.string().min(1)).length(4),
  correctIndex: correctIndexSchema,
  explanation: z.string().min(1),
});

export const quizSetSchema = z.object({
  questions: z.array(quizQuestionSchema).length(3),
});

export type QuizSetParsed = z.infer<typeof quizSetSchema>;

/** Narrows the validated options array to the tuple shape used in the app. */
export function toQuizQuestions(parsed: QuizSetParsed): QuizQuestion[] {
  return parsed.questions.map((question) => ({
    ...question,
    options: question.options as [string, string, string, string],
  }));
}

/* ---------- Gemini evaluation output ---------- */

export const evaluationSchema = z.object({
  headline: z.string().min(1).max(60),
  feedback: z.string().min(1),
  tips: z.array(z.string().min(1)).min(1).max(3),
});

export type EvaluationParsed = z.infer<typeof evaluationSchema>;

/* ---------- API request schemas ---------- */

export const lessonVariantSchema = z.enum([
  "standard",
  "another-explanation",
  "simplified",
]);

export const lessonRequestSchema = z.object({
  profile: userProfileSchema,
  topicId: z.string().min(1),
  lowDataMode: z.boolean().optional(),
  variant: lessonVariantSchema.optional(),
});

export const quizRequestSchema = z.object({
  profile: userProfileSchema,
  topicId: z.string().min(1),
  lowDataMode: z.boolean().optional(),
});

export const evaluationRequestSchema = z.object({
  profile: userProfileSchema,
  topicId: z.string().min(1),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  recommendation: z.enum(["unlock", "retry", "review"]),
  lowDataMode: z.boolean().optional(),
});

export const topicsRequestSchema = z.object({
  grade: gradeSchema,
  subject: subjectSchema,
  language: z.enum(["english", "filipino", "taglish"]),
  keyword: z.string().min(1).max(80),
  lowDataMode: z.boolean().optional(),
});
