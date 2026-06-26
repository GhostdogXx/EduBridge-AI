import { NextResponse } from "next/server";

import { generateStructured } from "@/lib/ai/client";
import { hasAiKey } from "@/lib/ai/config";
import { getFallbackEvaluation } from "@/lib/mock/evaluation";
import { resolveLessonTopic } from "@/lib/topic-utils";
import type { EvaluationResponse } from "@/lib/types/api";
import { evaluationRequestSchema, evaluationSchema } from "@/lib/validation";
import { buildEvaluationPrompt } from "@/prompts/evaluation-prompt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = evaluationRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid evaluation request." },
      { status: 400 },
    );
  }

  const { profile, topicId, score, total, recommendation, lowDataMode } =
    parsed.data;
  const topic = resolveLessonTopic(topicId, profile);
  if (!topic) {
    return NextResponse.json({ error: "Unknown topic." }, { status: 404 });
  }

  const fallback = (): EvaluationResponse => ({
    evaluation: getFallbackEvaluation(recommendation, lowDataMode),
    source: "fallback",
  });

  if (!hasAiKey()) {
    return NextResponse.json(fallback());
  }

  try {
    const prompt = buildEvaluationPrompt({
      profile,
      topic,
      score,
      total,
      recommendation,
      lowDataMode,
    });
    const evaluation = await generateStructured({
      prompt,
      schema: evaluationSchema,
      temperature: 0.6,
    });

    const response: EvaluationResponse = { evaluation, source: "ai" };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Evaluation generation failed:", error);
    return NextResponse.json(fallback());
  }
}
