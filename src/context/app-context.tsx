"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_LANGUAGE, LANGUAGES, STORAGE_KEYS } from "@/lib/constants";
import type { LanguagePreference, UserProfile } from "@/lib/types/learning";
import { safeParseUserProfile } from "@/lib/validation";

interface AppContextValue {
  lowDataMode: boolean;
  setLowDataMode: (enabled: boolean) => void;
  preferredLanguage: LanguagePreference;
  setPreferredLanguage: (language: LanguagePreference) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  clearUserProfile: () => void;
  isHydrated: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

function readLowDataMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEYS.lowDataMode) === "true";
}

function readPreferredLanguage(): LanguagePreference {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEYS.preferredLanguage);
  const isValid = LANGUAGES.some((language) => language.value === stored);
  return isValid ? (stored as LanguagePreference) : DEFAULT_LANGUAGE;
}

function readUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEYS.userProfile);
  if (!raw) return null;

  try {
    const parsed = safeParseUserProfile(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lowDataMode, setLowDataModeState] = useState(false);
  const [preferredLanguage, setPreferredLanguageState] =
    useState<LanguagePreference>(DEFAULT_LANGUAGE);
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedLowData = readLowDataMode();
    setLowDataModeState(storedLowData);
    document.documentElement.classList.toggle("low-data-mode", storedLowData);

    setPreferredLanguageState(readPreferredLanguage());
    setUserProfileState(readUserProfile());
    setIsHydrated(true);
  }, []);

  const setLowDataMode = useCallback((enabled: boolean) => {
    setLowDataModeState(enabled);
    window.localStorage.setItem(STORAGE_KEYS.lowDataMode, String(enabled));
    document.documentElement.classList.toggle("low-data-mode", enabled);
  }, []);

  const setPreferredLanguage = useCallback((language: LanguagePreference) => {
    setPreferredLanguageState(language);
    window.localStorage.setItem(STORAGE_KEYS.preferredLanguage, language);
  }, []);

  const setUserProfile = useCallback((profile: UserProfile) => {
    setUserProfileState(profile);
    window.localStorage.setItem(
      STORAGE_KEYS.userProfile,
      JSON.stringify(profile),
    );
  }, []);

  const clearUserProfile = useCallback(() => {
    setUserProfileState(null);
    window.localStorage.removeItem(STORAGE_KEYS.userProfile);
  }, []);

  const value = useMemo(
    () => ({
      lowDataMode,
      setLowDataMode,
      preferredLanguage,
      setPreferredLanguage,
      userProfile,
      setUserProfile,
      clearUserProfile,
      isHydrated,
    }),
    [
      lowDataMode,
      setLowDataMode,
      preferredLanguage,
      setPreferredLanguage,
      userProfile,
      setUserProfile,
      clearUserProfile,
      isHydrated,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
