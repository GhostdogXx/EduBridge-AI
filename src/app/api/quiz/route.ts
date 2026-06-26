import { NextResponse } from "next/server";

import { getTopic } from "@/lib/curriculum";
import { generateStructured } from "@/lib/gemini/client";
import { hasGeminiKey } from "@/lib/gemini/config";
import { getMockQuiz } from "@/lib/mock/quizzes";
import type { QuizResponse } from "@/lib/types/api";
import {
  quizRequestSchema,
  quizSetSchema,
  toQuizQuestions,
} from "@/lib/validation";
import { buildQuizPrompt } from "@/prompts/quiz-prompt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = quizRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid quiz request." },
      { status: 400 },
    );
  }

  const { profile, topicId, lowDataMode } = parsed.data;
  const topic = getTopic(topicId);
  if (!topic) {
    return NextResponse.json({ error: "Unknown topic." }, { status: 404 });
  }

  const fallback = (): QuizResponse => ({
    topicId: topic.id,
    topic: topic.topic,
    questions: getMockQuiz(topic.id, lowDataMode),
    source: "fallback",
  });

  if (!hasGeminiKey()) {
    return NextResponse.json(fallback());
  }

  try {
    const prompt = buildQuizPrompt({ profile, topic, lowDataMode });
    const quizSet = await generateStructured({
      prompt,
      schema: quizSetSchema,
      temperature: 0.8,
    });

    const response: QuizResponse = {
      topicId: topic.id,
      topic: topic.topic,
      questions: toQuizQuestions(quizSet),
      source: "ai",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Quiz generation failed:", error);
    return NextResponse.json(fallback());
  }
}
