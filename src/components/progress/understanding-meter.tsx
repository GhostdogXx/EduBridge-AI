"use client";

import { Gauge } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useT } from "@/lib/i18n";
import { understandingKey } from "@/lib/progress-stats";
import { cn } from "@/lib/utils";

interface UnderstandingMeterProps {
  value: number;
}

export function UnderstandingMeter({ value }: UnderstandingMeterProps) {
  const t = useT();
  const clamped = Math.max(0, Math.min(100, value));
  const label = t.progress.understanding[understandingKey(clamped)];

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardContent className="flex flex-col gap-3 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Gauge className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-foreground">
              {t.progress.understanding.meter}
            </p>
          </div>
          <span className="text-sm font-bold tabular-nums text-primary">
            {clamped}%
          </span>
        </div>

        <div
          className="h-3 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={clamped}
          aria-label={`Understanding: ${label}, ${clamped} percent`}
        >
          <div
            className={cn(
              "h-full rounded-full bg-primary transition-all duration-500",
            )}
            style={{ width: `${clamped}%` }}
          />
        </div>

        <p className="text-sm font-medium text-accent">{label}</p>
      </CardContent>
    </Card>
  );
}
