import { NextResponse } from "next/server";

import { generateStructured, getGeminiErrorMessage } from "@/lib/gemini/client";
import { hasGeminiKey } from "@/lib/gemini/config";
import { resolveLessonTopic } from "@/lib/topic-utils";
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
  const topic = resolveLessonTopic(topicId, profile);
  if (!topic) {
    return NextResponse.json({ error: "Unknown topic." }, { status: 404 });
  }

  if (!hasGeminiKey()) {
    return NextResponse.json(
      { error: "Lesson generation is unavailable. GEMINI_API_KEY is not configured." },
      { status: 503 },
    );
  }

  try {
    const prompt = buildLessonPrompt({
      profile,
      topic,
      lowDataMode,
      variant,
    });
    const lesson = await generateStructured({
      prompt,
      schema: lessonContentSchema,
      temperature: 0.7,
    });

    const response: LessonResponse = {
      topicId: topic.id,
      topic: topic.title,
      lesson,
      source: "ai",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Lesson generation failed:", error);
    return NextResponse.json(
      { error: getGeminiErrorMessage(error) },
      { status: 503 },
    );
  }
}
