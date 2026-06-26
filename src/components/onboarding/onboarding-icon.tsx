import {
  BookOpenCheck,
  GraduationCap,
  Languages,
  MessageSquareText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { OnboardingIcon as OnboardingIconName } from "@/lib/onboarding-content";

const ICON_MAP: Record<OnboardingIconName, LucideIcon> = {
  "grade-1": GraduationCap,
  "grade-2": GraduationCap,
  "grade-3": GraduationCap,
  "grade-4": GraduationCap,
  "grade-5": GraduationCap,
  "grade-6": GraduationCap,
  science: Sparkles,
  english: BookOpenCheck,
  filipino: Languages,
  taglish: MessageSquareText,
};

interface OnboardingIconProps {
  name: OnboardingIconName;
  className?: string;
}

export function OnboardingIcon({ name, className }: OnboardingIconProps) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
