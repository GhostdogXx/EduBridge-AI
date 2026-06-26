import { GoogleGenAI } from "@google/genai";
import type { z } from "zod";

import { getGeminiApiKey, getGeminiModels } from "@/lib/gemini/config";

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiError";
  }
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function isQuotaExceededError(error: unknown): boolean {
  const message = errorMessage(error);
  return (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("Quota exceeded") ||
    message.includes("exceeded your current quota")
  );
}

function isRetryableGeminiError(error: unknown): boolean {
  const message = errorMessage(error);
  return (
    isQuotaExceededError(error) ||
    message.includes("503") ||
    message.includes("high demand") ||
    message.includes("overloaded") ||
    message.includes("UNAVAILABLE")
  );
}

/** Keeps the API's reason text; strips only redundant SDK wrapper noise when possible. */
function sanitizeApiErrorMessage(message: string): string {
  const bracketTail = message.match(/\]\s+([\s\S]+)$/);
  if (bracketTail?.[1]) {
    return bracketTail[1].trim();
  }
  return message.trim();
}

export function getGeminiErrorMessage(error: unknown): string {
  const message = errorMessage(error);

  if (message.includes("GEMINI_API_KEY is not configured")) {
    return "GEMINI_API_KEY is not configured. Add it to .env.local and restart the dev server.";
  }

  return sanitizeApiErrorMessage(message);
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

async function generateJsonText(
  ai: GoogleGenAI,
  modelName: string,
  promptText: string,
  temperature: number,
): Promise<string> {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: promptText,
    config: {
      responseMimeType: "application/json",
      temperature,
    },
  });

  const text = response.text;
  if (!text) {
    throw new GeminiError("Gemini returned an empty response.");
  }

  return text;
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

  const ai = new GoogleGenAI({ apiKey });
  const models = getGeminiModels();
  let lastError: unknown;

  const attempt = async (promptText: string, modelName: string): Promise<z.infer<TSchema>> => {
    const text = await generateJsonText(ai, modelName, promptText, temperature);
    const parsed = JSON.parse(extractJson(text)) as unknown;
    return schema.parse(parsed);
  };

  for (const modelName of models) {
    let quotaExceeded = false;

    for (let retry = 0; retry < 3; retry += 1) {
      try {
        if (retry > 0) await sleep(2000 * retry);
        return await attempt(prompt, modelName);
      } catch (error) {
        lastError = error;

        if (isQuotaExceededError(error)) {
          quotaExceeded = true;
          break;
        }

        if (isRetryableGeminiError(error) && retry < 2) {
          continue;
        }

        try {
          const stricterPrompt = `${prompt}\n\nIMPORTANT: Your previous attempt was invalid. Return ONLY a single valid, minified JSON object that exactly matches the required schema. No markdown, no code fences, no extra text.`;
          return await attempt(stricterPrompt, modelName);
        } catch (retryError) {
          lastError = retryError;
          if (isQuotaExceededError(retryError)) {
            quotaExceeded = true;
            break;
          }
          if (isRetryableGeminiError(retryError)) break;
        }
      }
    }

    if (quotaExceeded) continue;
  }

  throw new GeminiError(errorMessage(lastError));
}
