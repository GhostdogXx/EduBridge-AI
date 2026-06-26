/** Primary model — best quality; free tier has a low daily request cap. */
export const GEMINI_MODEL = "gemini-2.5-flash";

/** Tried first in production: lite models share separate quotas and fit free tier better. */
export const GEMINI_FALLBACK_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  GEMINI_MODEL,
] as const;

/** Returns the configured key, or null if missing/blank. No prefix validation. */
export function getGeminiApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  return key ? key : null;
}

export function hasGeminiKey(): boolean {
  return getGeminiApiKey() !== null;
}

export function getGeminiModels(): string[] {
  return [...GEMINI_FALLBACK_MODELS];
}
