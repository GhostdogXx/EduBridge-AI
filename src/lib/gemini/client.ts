import { GoogleGenerativeAI } from "@google/generative-ai";
import type { z } from "zod";

import { GEMINI_MODEL, getGeminiApiKey } from "@/lib/gemini/config";

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiError";
  }
}

/** Strips markdown code fences and stray text so JSON.parse can succeed. */
function extractJson(raw: string): string {
  let text = raw.trim();

  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.slice(firstBrace, lastBrace + 1);
  }

  return text;
}

interface GenerateStructuredArgs<TSchema extends z.ZodTypeAny> {
  prompt: string;
  schema: TSchema;
  temperature?: number;
}

/**
 * Calls Gemini 2.5 Flash expecting JSON, parses and validates it against the
 * provided Zod schema. Retries exactly once with a stricter instruction if the
 * first response fails to parse or validate, per spec.
 */
export async function generateStructured<TSchema extends z.ZodTypeAny>({
  prompt,
  schema,
  temperature = 0.7,
}: GenerateStructuredArgs<TSchema>): Promise<z.infer<TSchema>> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new GeminiError("GEMINI_API_KEY is not configured.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: "application/json",
      temperature,
    },
  });

  const attempt = async (promptText: string): Promise<z.infer<TSchema>> => {
    const result = await model.generateContent(promptText);
    const text = result.response.text();
    const parsed = JSON.parse(extractJson(text)) as unknown;
    return schema.parse(parsed);
  };

  try {
    return await attempt(prompt);
  } catch {
    const stricterPrompt = `${prompt}\n\nIMPORTANT: Your previous attempt was invalid. Return ONLY a single valid, minified JSON object that exactly matches the required schema. No markdown, no code fences, no extra text.`;
    try {
      return await attempt(stricterPrompt);
    } catch (error) {
      throw new GeminiError(
        `Failed to generate valid JSON from Gemini: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }
}
