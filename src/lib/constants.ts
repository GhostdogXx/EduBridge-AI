import type { Grade, LanguagePreference, Subject } from "@/lib/types/learning";

export const APP_NAME = "EduBridge AI";

export const GRADES: { value: Grade; label: string }[] = [
  { value: 1, label: "Grade 1" },
  { value: 2, label: "Grade 2" },
  { value: 3, label: "Grade 3" },
  { value: 4, label: "Grade 4" },
  { value: 5, label: "Grade 5" },
  { value: 6, label: "Grade 6" },
];

export const SUBJECTS: { value: Subject; label: string }[] = [
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "english", label: "English" },
  { value: "filipino", label: "Filipino" },
  { value: "araling-panlipunan", label: "Araling Panlipunan" },
  { value: "esp", label: "ESP" },
  { value: "mapeh", label: "MAPEH" },
  { value: "ict", label: "ICT / Computer" },
  { value: "mother-tongue", label: "Mother Tongue" },
];

export const LANGUAGES: { value: LanguagePreference; label: string }[] = [
  { value: "filipino", label: "Filipino" },
  { value: "english", label: "English" },
];

/** Maps legacy stored values (e.g. taglish) to a supported language. */
export function normalizeLanguagePreference(
  value: unknown,
): LanguagePreference {
  if (value === "english") return "english";
  return "filipino";
}

export const DEFAULT_LANGUAGE: LanguagePreference = "filipino";

export const ADAPTIVE_THRESHOLDS = {
  unlock: 80,
  retry: 50,
} as const;

export const STORAGE_KEYS = {
  userProfile: "edubridge-user-profile",
  lowDataMode: "edubridge-low-data-mode",
  progress: "edubridge-progress",
  learningPath: "edubridge-learning-path",
  preferredLanguage: "edubridge-preferred-language",
  offlinePacks: "edubridge-offline-packs",
} as const;

export const COLORS = {
  primary: "#2563EB",
  accent: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  background: "#F8FAFC",
} as const;
