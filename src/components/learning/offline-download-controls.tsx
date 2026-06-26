"use client";

import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface OfflineDownloadOptionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function OfflineDownloadOption({
  checked,
  onChange,
  disabled = false,
}: OfflineDownloadOptionProps) {
  const t = useT();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={t.offlineDownload.toggleAria}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex w-full items-start gap-3 rounded-3xl border-2 p-4 text-left transition-colors outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        checked
          ? "border-primary bg-primary/5"
          : "border-border/70 bg-card hover:border-primary/40",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          checked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
        )}
        aria-hidden="true"
      >
        <Download className="size-5" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-base font-semibold text-foreground">
          {t.offlineDownload.toggleTitle}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {t.offlineDownload.toggleDescription}
        </span>
      </span>
    </button>
  );
}

interface DownloadLessonButtonProps {
  isDownloaded: boolean;
  isDownloading: boolean;
  onDownload: () => void;
}

export function DownloadLessonButton({
  isDownloaded,
  isDownloading,
  onDownload,
}: DownloadLessonButtonProps) {
  const t = useT();

  if (isDownloaded) {
    return (
      <p
        className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-center text-sm font-medium text-foreground"
        role="status"
      >
        {t.offlineDownload.saved}
      </p>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onDownload}
      disabled={isDownloading}
      className="h-12 w-full rounded-2xl text-base font-medium"
      aria-label={t.offlineDownload.downloadButton}
    >
      {isDownloading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          {t.offlineDownload.downloading}
        </>
      ) : (
        <>
          <Download className="size-4" aria-hidden="true" />
          {t.offlineDownload.downloadButton}
        </>
      )}
    </Button>
  );
}
