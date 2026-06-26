import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SectionTone = "primary" | "accent" | "warning" | "neutral";

const TONE_STYLES: Record<SectionTone, { icon: string; label: string }> = {
  primary: { icon: "bg-primary/10 text-primary", label: "text-primary" },
  accent: { icon: "bg-accent/15 text-accent", label: "text-accent" },
  warning: { icon: "bg-warning/15 text-warning", label: "text-warning" },
  neutral: {
    icon: "bg-secondary text-secondary-foreground",
    label: "text-muted-foreground",
  },
};

interface LessonSectionCardProps {
  icon: LucideIcon;
  label: string;
  tone?: SectionTone;
  children: React.ReactNode;
}

export function LessonSectionCard({
  icon: Icon,
  label,
  tone = "neutral",
  children,
}: LessonSectionCardProps) {
  const styles = TONE_STYLES[tone];

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm low-data:rounded-2xl low-data:border-border low-data:shadow-none">
      <CardContent className="flex flex-col gap-3 pt-6">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-xl",
              styles.icon,
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h2
            className={cn(
              "text-sm font-semibold uppercase tracking-wide",
              styles.label,
            )}
          >
            {label}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-foreground/90">
          {children}
        </p>
      </CardContent>
    </Card>
  );
}
