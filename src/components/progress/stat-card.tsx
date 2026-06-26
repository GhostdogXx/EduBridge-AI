import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatTone = "primary" | "accent" | "warning";

const TONE_STYLES: Record<StatTone, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent",
  warning: "bg-warning/15 text-warning",
};

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel?: string;
  tone?: StatTone;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  tone = "primary",
}: StatCardProps) {
  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardContent className="flex flex-col gap-3 pt-6">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-xl",
            TONE_STYLES[tone],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            {value}
          </p>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {sublabel ? (
            <p className="mt-0.5 text-xs text-muted-foreground/80">{sublabel}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
