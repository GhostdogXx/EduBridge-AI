"use client";

import { useAppContext } from "@/context/app-context";
import { DEFAULT_LANGUAGE, normalizeLanguagePreference, STORAGE_KEYS } from "@/lib/constants";
import type { LanguagePreference } from "@/lib/types/learning";
import {
  messages,
  resolveUiLanguage,
  type Dictionary,
  type UiLanguage,
} from "@/lib/i18n/messages";

export { resolveUiLanguage };
export type { Dictionary, UiLanguage };

/** Active UI language. Defaults to Filipino until the client has hydrated. */
export function useUiLanguage(): UiLanguage {
  const { activeLanguage, isHydrated } = useAppContext();
  if (!isHydrated) return resolveUiLanguage(DEFAULT_LANGUAGE);
  return resolveUiLanguage(activeLanguage);
}

export function useT(): Dictionary {
  return messages[useUiLanguage()];
}

function isLanguagePreference(value: unknown): value is LanguagePreference {
  return value === "english" || value === "filipino" || value === "taglish";
}

/**
 * Non-hook resolver for contexts that can't use hooks (e.g. the class-based
 * error boundary). Reads the same persisted sources the provider uses.
 */
export function getStoredDictionary(): Dictionary {
  if (typeof window === "undefined") {
    return messages[resolveUiLanguage(DEFAULT_LANGUAGE)];
  }

  try {
    const rawProfile = window.localStorage.getItem(STORAGE_KEYS.userProfile);
    if (rawProfile) {
      const parsed = JSON.parse(rawProfile) as { language?: unknown };
      if (isLanguagePreference(parsed.language)) {
        return messages[resolveUiLanguage(normalizeLanguagePreference(parsed.language))];
      }
    }

    const storedPref = window.localStorage.getItem(
      STORAGE_KEYS.preferredLanguage,
    );
    if (isLanguagePreference(storedPref)) {
      return messages[resolveUiLanguage(normalizeLanguagePreference(storedPref))];
    }
  } catch {
    // fall through to default
  }

  return messages[resolveUiLanguage(DEFAULT_LANGUAGE)];
}
