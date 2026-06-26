"use client";

import { useId } from "react";
import { Zap } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/app-context";
import { useT } from "@/lib/i18n";

interface LowDataToggleProps {
  variant?: "compact" | "full";
}

export function LowDataToggle({ variant = "compact" }: LowDataToggleProps) {
  const { lowDataMode, setLowDataMode } = useAppContext();
  const t = useT();
  const id = useId();

  if (variant === "compact") {
    return (
      <label
        htmlFor={id}
        className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-3"
      >
        <Zap
          className={lowDataMode ? "size-4 text-warning" : "size-4 text-muted-foreground"}
          aria-hidden="true"
        />
        <span className="text-xs font-semibold text-foreground">
          {t.lowData.compact}
        </span>
        <Switch
          id={id}
          checked={lowDataMode}
          onCheckedChange={setLowDataMode}
          size="sm"
          aria-label={t.lowData.toggleAria}
        />
      </label>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-warning/15">
          <Zap className="size-5 text-warning" aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold text-foreground">{t.lowData.title}</p>
          <p className="text-sm text-muted-foreground">
            {t.lowData.description}
          </p>
        </div>
      </div>
      <Switch
        id={id}
        checked={lowDataMode}
        onCheckedChange={setLowDataMode}
        aria-label={t.lowData.toggleAria}
      />
    </div>
  );
}
