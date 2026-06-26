export const GEMINI_MODEL = "gemini-2.5-flash";

export const GEMINI_FALLBACK_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
] as const;

export function getGeminiApiKey(): string | null {
  return process.env.GEMINI_API_KEY?.trim() || null;
}

export function hasGeminiKey(): boolean {
  return getGeminiApiKey() !== null;
}

export function getGeminiModels(): string[] {
  return [GEMINI_MODEL, ...GEMINI_FALLBACK_MODELS];
}
