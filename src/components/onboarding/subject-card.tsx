"use client";

import {
  Atom,
  BookOpenCheck,
  Calculator,
  Globe,
  Heart,
  Languages,
  MessageCircle,
  Monitor,
  Music,
  type LucideIcon,
} from "lucide-react";

import type { SubjectDefinition } from "@/lib/subjects";
import { cn } from "@/lib/utils";

const SUBJECT_ICONS: Record<SubjectDefinition["icon"], LucideIcon> = {
  mathematics: Calculator,
  science: Atom,
  english: BookOpenCheck,
  filipino: Languages,
  "araling-panlipunan": Globe,
  esp: Heart,
  mapeh: Music,
  ict: Monitor,
  "mother-tongue": MessageCircle,
};

interface SubjectCardProps {
  subject: SubjectDefinition;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function SubjectCard({
  subject,
  label,
  description,
  selected,
  onSelect,
}: SubjectCardProps) {
  const Icon = SUBJECT_ICONS[subject.icon];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${label}. ${description}`}
      className={cn(
        "flex w-full flex-col gap-3 rounded-3xl border-2 bg-card p-5 text-left transition-colors outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border/70 hover:border-primary/40 hover:bg-muted/40",
      )}
    >
      <span
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl",
          selected ? "bg-primary text-primary-foreground" : "bg-secondary text-primary",
        )}
      >
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-lg font-semibold text-foreground">{label}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  );
}
