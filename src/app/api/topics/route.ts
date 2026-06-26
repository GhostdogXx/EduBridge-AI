import { NextResponse } from "next/server";

import { generateStructured, getAiErrorMessage } from "@/lib/ai/client";
import { hasAiKey } from "@/lib/ai/config";
import type { TopicsResponse } from "@/lib/types/api";
import { topicDiscoverySchema, topicsRequestSchema } from "@/lib/validation";
import { buildTopicDiscoveryPrompt } from "@/prompts/topic-discovery-prompt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = topicsRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid topics request." }, { status: 400 });
  }

  const { grade, subject, language, keyword, lowDataMode } = parsed.data;
  const trimmedKeyword = keyword.trim();

  if (!trimmedKeyword) {
    return NextResponse.json({ error: "Keyword is required." }, { status: 400 });
  }

  if (!hasAiKey()) {
    return NextResponse.json(
      { error: "Topic discovery is unavailable. OPENAI_API_KEY is not configured." },
      { status: 503 },
    );
  }

  try {
    const prompt = buildTopicDiscoveryPrompt({
      grade,
      subject,
      language,
      keyword: trimmedKeyword,
      lowDataMode,
    });
    const discovery = await generateStructured({
      prompt,
      schema: topicDiscoverySchema,
      temperature: 0.6,
    });

    const maxTopics = lowDataMode ? 4 : 8;
    const response: TopicsResponse = {
      category: discovery.category,
      topics: discovery.topics.slice(0, maxTopics),
      source: "ai",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Topic discovery failed:", error);
    return NextResponse.json(
      { error: getAiErrorMessage(error) },
      { status: 503 },
    );
  }
}
