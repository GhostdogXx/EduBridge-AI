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

import { DEFAULT_LANGUAGE, normalizeLanguagePreference, STORAGE_KEYS } from "@/lib/constants";
import type { LanguagePreference, UserProfile } from "@/lib/types/learning";
import { safeParseUserProfile } from "@/lib/validation";

interface AppContextValue {
  lowDataMode: boolean;
  setLowDataMode: (enabled: boolean) => void;
  /** Resolved language: profile language when set, otherwise landing preference. */
  activeLanguage: LanguagePreference;
  preferredLanguage: LanguagePreference;
  setPreferredLanguage: (language: LanguagePreference) => void;
  setActiveLanguage: (language: LanguagePreference) => void;
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
  return normalizeLanguagePreference(stored);
}

function persistPreferredLanguage(language: LanguagePreference): void {
  window.localStorage.setItem(STORAGE_KEYS.preferredLanguage, language);
}

function persistUserProfile(profile: UserProfile): void {
  window.localStorage.setItem(
    STORAGE_KEYS.userProfile,
    JSON.stringify(profile),
  );
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

  const activeLanguage = userProfile?.language ?? preferredLanguage;

  useEffect(() => {
    const storedLowData = readLowDataMode();
    setLowDataModeState(storedLowData);
    document.documentElement.classList.toggle("low-data-mode", storedLowData);

    const storedPref = readPreferredLanguage();
    const storedProfile = readUserProfile();

    if (storedProfile) {
      // Profile language is canonical once onboarding is complete.
      if (storedPref !== storedProfile.language) {
        persistPreferredLanguage(storedProfile.language);
      }
      setPreferredLanguageState(storedProfile.language);
      setUserProfileState(storedProfile);
    } else {
      setPreferredLanguageState(storedPref);
      setUserProfileState(null);
    }

    setIsHydrated(true);
  }, []);

  const setLowDataMode = useCallback((enabled: boolean) => {
    setLowDataModeState(enabled);
    window.localStorage.setItem(STORAGE_KEYS.lowDataMode, String(enabled));
    document.documentElement.classList.toggle("low-data-mode", enabled);
  }, []);

  const setActiveLanguage = useCallback((language: LanguagePreference) => {
    setPreferredLanguageState(language);
    persistPreferredLanguage(language);
    setUserProfileState((prev) => {
      if (!prev || prev.language === language) return prev;
      const next = { ...prev, language };
      persistUserProfile(next);
      return next;
    });
  }, []);

  const setPreferredLanguage = setActiveLanguage;

  const setUserProfile = useCallback((profile: UserProfile) => {
    setUserProfileState(profile);
    persistUserProfile(profile);
    setPreferredLanguageState(profile.language);
    persistPreferredLanguage(profile.language);
  }, []);

  const clearUserProfile = useCallback(() => {
    setUserProfileState(null);
    window.localStorage.removeItem(STORAGE_KEYS.userProfile);
  }, []);

  const value = useMemo(
    () => ({
      lowDataMode,
      setLowDataMode,
      activeLanguage,
      preferredLanguage,
      setPreferredLanguage,
      setActiveLanguage,
      userProfile,
      setUserProfile,
      clearUserProfile,
      isHydrated,
    }),
    [
      lowDataMode,
      setLowDataMode,
      activeLanguage,
      preferredLanguage,
      setPreferredLanguage,
      setActiveLanguage,
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
