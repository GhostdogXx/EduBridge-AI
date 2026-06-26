import type { Grade, LanguagePreference, LearningGoal } from "@/lib/types/learning";

export const APP_NAME = "EduBridge AI";

export const GRADES: { value: Grade; label: string }[] = [
  { value: 4, label: "Grade 4" },
  { value: 5, label: "Grade 5" },
  { value: 6, label: "Grade 6" },
];

export const SUBJECTS = [{ value: "science" as const, label: "Science" }];

export const LANGUAGES: { value: LanguagePreference; label: string }[] = [
  { value: "filipino", label: "Filipino" },
  { value: "taglish", label: "Taglish" },
  { value: "english", label: "English" },
];

export const DEFAULT_LANGUAGE: LanguagePreference = "filipino";

export const LEARNING_GOALS: { value: LearningGoal; label: string }[] = [
  { value: "exam-preparation", label: "Exam Preparation" },
  { value: "homework-help", label: "Homework Help" },
  { value: "understand-concepts", label: "Understand Concepts" },
  { value: "resume-lesson", label: "Resume Previous Lesson" },
];

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
} as const;

export const COLORS = {
  primary: "#2563EB",
  accent: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  background: "#F8FAFC",
} as const;
