import {
  Atom,
  BookOpenCheck,
  ClipboardList,
  GraduationCap,
  Languages,
  Lightbulb,
  MessageSquareText,
  PencilRuler,
  PlayCircle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { OnboardingIcon as OnboardingIconName } from "@/lib/onboarding-content";

const ICON_MAP: Record<OnboardingIconName, LucideIcon> = {
  "grade-4": GraduationCap,
  "grade-5": GraduationCap,
  "grade-6": GraduationCap,
  science: Atom,
  english: BookOpenCheck,
  filipino: Languages,
  taglish: MessageSquareText,
  exam: ClipboardList,
  homework: PencilRuler,
  concepts: Lightbulb,
  resume: PlayCircle,
};

interface OnboardingIconProps {
  name: OnboardingIconName;
  className?: string;
}

export function OnboardingIcon({ name, className }: OnboardingIconProps) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
