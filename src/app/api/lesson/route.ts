import { NextResponse } from "next/server";

import { getPreviousTopic, getTopic } from "@/lib/curriculum";
import { generateStructured } from "@/lib/gemini/client";
import { hasGeminiKey } from "@/lib/gemini/config";
import { getMockLessonContent } from "@/lib/mock/lessons";
import type { LessonResponse } from "@/lib/types/api";
import { lessonContentSchema, lessonRequestSchema } from "@/lib/validation";
import { buildLessonPrompt } from "@/prompts/lesson-prompt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = lessonRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid lesson request." },
      { status: 400 },
    );
  }

  const { profile, topicId, lowDataMode, variant } = parsed.data;
  const topic = getTopic(topicId);
  if (!topic) {
    return NextResponse.json({ error: "Unknown topic." }, { status: 404 });
  }

  const prerequisiteTopic =
    variant === "simplified" ? getPreviousTopic(topic.id)?.topic : undefined;

  const fallback = (): LessonResponse => ({
    topicId: topic.id,
    topic: topic.topic,
    lesson: getMockLessonContent(topic.id, lowDataMode),
    source: "fallback",
  });

  if (!hasGeminiKey()) {
    return NextResponse.json(fallback());
  }

  try {
    const prompt = buildLessonPrompt({
      profile,
      topic,
      lowDataMode,
      variant,
      prerequisiteTopic,
    });
    const lesson = await generateStructured({
      prompt,
      schema: lessonContentSchema,
      temperature: 0.7,
    });

    const response: LessonResponse = {
      topicId: topic.id,
      topic: topic.topic,
      lesson,
      source: "ai",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Lesson generation failed:", error);
    return NextResponse.json(fallback());
  }
}
