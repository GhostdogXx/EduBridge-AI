export type OnboardingIcon =
  | "grade-1"
  | "grade-2"
  | "grade-3"
  | "grade-4"
  | "grade-5"
  | "grade-6"
  | "science"
  | "english"
  | "filipino"
  | "taglish";

export interface OnboardingOption<TValue> {
  value: TValue;
  label: string;
  description: string;
  icon: OnboardingIcon;
}

export const TOTAL_ONBOARDING_STEPS = 4;
