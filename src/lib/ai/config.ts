/** Primary model — fast and cost-effective for structured lesson/quiz JSON. */
export const OPENAI_MODEL = "gpt-4o-mini";

export const OPENAI_FALLBACK_MODELS = ["gpt-4o-mini", "gpt-4o"] as const;

/** Returns the configured key, or null if missing/blank. No prefix validation. */
export function getOpenAiApiKey(): string | null {
  const key = process.env.OPENAI_API_KEY?.trim();
  return key ? key : null;
}

export function hasAiKey(): boolean {
  return getOpenAiApiKey() !== null;
}

export function getOpenAiModels(): string[] {
  return [...OPENAI_FALLBACK_MODELS];
}
