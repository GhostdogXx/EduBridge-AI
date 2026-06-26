import { GoogleGenerativeAI } from "@google/generative-ai";
import type { z } from "zod";

import { getGeminiApiKey, getGeminiModels } from "@/lib/gemini/config";

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiError";
  }
}

function isQuotaExceededError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("Quota exceeded") ||
    message.includes("exceeded your current quota")
  );
}

function isRetryableGeminiError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    isQuotaExceededError(error) ||
    message.includes("503") ||
    message.includes("high demand") ||
    message.includes("overloaded") ||
    message.includes("UNAVAILABLE")
  );
}

function toUserFacingError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("GEMINI_API_KEY is not configured")) {
    return "Topic discovery is unavailable. GEMINI_API_KEY is not configured.";
  }

  if (isQuotaExceededError(error)) {
    return "Your Gemini free quota is used up for today. Wait and try again later, or create a new API key at Google AI Studio.";
  }

  if (isRetryableGeminiError(error)) {
    return "The AI service is busy right now. Please wait a moment and try again.";
  }

  if (message.includes("API key not valid") || message.includes("API_KEY_INVALID")) {
    return "Your Gemini API key is invalid. Check .env.local and create a new key in Google AI Studio.";
  }

  return "Could not generate topics for your keyword. Please try again.";
}

export function getGeminiErrorMessage(error: unknown): string {
  return toUserFacingError(error);
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

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calls Gemini expecting JSON, parses and validates it against the provided Zod
 * schema. Retries with stricter instructions and fallback models when needed.
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
  const models = getGeminiModels();
  let lastError: unknown;

  for (const modelName of models) {
    const model = genAI.getGenerativeModel({
      model: modelName,
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

    for (let retry = 0; retry < 3; retry += 1) {
      try {
        if (retry > 0) await sleep(2000 * retry);
        return await attempt(prompt);
      } catch (error) {
        lastError = error;

        if (isRetryableGeminiError(error) && retry < 2) {
          continue;
        }

        try {
          const stricterPrompt = `${prompt}\n\nIMPORTANT: Your previous attempt was invalid. Return ONLY a single valid, minified JSON object that exactly matches the required schema. No markdown, no code fences, no extra text.`;
          return await attempt(stricterPrompt);
        } catch (retryError) {
          lastError = retryError;
          if (isRetryableGeminiError(retryError)) break;
        }
      }
    }
  }

  throw new GeminiError(
    lastError instanceof Error ? lastError.message : "unknown error",
  );
}
