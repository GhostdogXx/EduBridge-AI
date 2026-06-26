export const GEMINI_MODEL = "gemini-2.5-flash";

export function getGeminiApiKey(): string | null {
  return process.env.GEMINI_API_KEY?.trim() || null;
}

export function hasGeminiKey(): boolean {
  return getGeminiApiKey() !== null;
}
