import OpenAI from "openai";
import type { z } from "zod";

import { getOpenAiApiKey, getOpenAiModels } from "@/lib/ai/config";

export class AiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AiError";
  }
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function isRateLimitError(error: unknown): boolean {
  const message = errorMessage(error);
  return (
    message.includes("429") ||
    message.includes("rate_limit") ||
    message.includes("Rate limit")
  );
}

function isRetryableAiError(error: unknown): boolean {
  const message = errorMessage(error);
  return (
    isRateLimitError(error) ||
    message.includes("503") ||
    message.includes("500") ||
    message.includes("overloaded") ||
    message.includes("timeout")
  );
}

export function getAiErrorMessage(error: unknown): string {
  const message = errorMessage(error);

  if (message.includes("OPENAI_API_KEY is not configured")) {
    return "OPENAI_API_KEY is not configured. Add it to .env.local and restart the dev server.";
  }

  return message.trim();
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
  client: OpenAI,
  modelName: string,
  promptText: string,
  temperature: number,
): Promise<string> {
  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      {
        role: "user",
        content: promptText,
      },
    ],
    response_format: { type: "json_object" },
    temperature,
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new AiError("OpenAI returned an empty response.");
  }

  return text;
}

/**
 * Calls OpenAI expecting JSON, parses and validates it against the provided Zod
 * schema. Retries with stricter instructions and fallback models when needed.
 */
export async function generateStructured<TSchema extends z.ZodTypeAny>({
  prompt,
  schema,
  temperature = 0.7,
}: GenerateStructuredArgs<TSchema>): Promise<z.infer<TSchema>> {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) {
    throw new AiError("OPENAI_API_KEY is not configured.");
  }

  const client = new OpenAI({ apiKey });
  const models = getOpenAiModels();
  let lastError: unknown;

  const attempt = async (promptText: string, modelName: string): Promise<z.infer<TSchema>> => {
    const text = await generateJsonText(client, modelName, promptText, temperature);
    const parsed = JSON.parse(extractJson(text)) as unknown;
    return schema.parse(parsed);
  };

  for (const modelName of models) {
    let rateLimited = false;

    for (let retry = 0; retry < 3; retry += 1) {
      try {
        if (retry > 0) await sleep(2000 * retry);
        return await attempt(prompt, modelName);
      } catch (error) {
        lastError = error;

        if (isRateLimitError(error)) {
          rateLimited = true;
          break;
        }

        if (isRetryableAiError(error) && retry < 2) {
          continue;
        }

        try {
          const stricterPrompt = `${prompt}\n\nIMPORTANT: Your previous attempt was invalid. Return ONLY a single valid, minified JSON object that exactly matches the required schema. No markdown, no code fences, no extra text.`;
          return await attempt(stricterPrompt, modelName);
        } catch (retryError) {
          lastError = retryError;
          if (isRateLimitError(retryError)) {
            rateLimited = true;
            break;
          }
          if (isRetryableAiError(retryError)) break;
        }
      }
    }

    if (rateLimited) continue;
  }

  throw new AiError(errorMessage(lastError));
}
