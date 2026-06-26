export type OnboardingIcon =
  | "grade-4"
  | "grade-5"
  | "grade-6"
  | "science"
  | "english"
  | "filipino"
  | "taglish"
  | "exam"
  | "homework"
  | "concepts"
  | "resume";

export interface OnboardingOption<TValue> {
  value: TValue;
  label: string;
  description: string;
  icon: OnboardingIcon;
}

export const TOTAL_ONBOARDING_STEPS = 4;
