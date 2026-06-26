"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Download, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/context/app-context";
import { useOfflineLibrary } from "@/hooks/use-offline-download";
import { useT, useUiLanguage } from "@/lib/i18n";
import { getOfflinePack, removeOfflinePack } from "@/lib/offline-storage";

function formatDownloadDate(isoDate: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export function OfflineLessonsCard() {
  const router = useRouter();
  const { setUserProfile } = useAppContext();
  const uiLanguage = useUiLanguage();
  const t = useT();
  const { packs, refresh } = useOfflineLibrary();
  const locale = uiLanguage === "en" ? "en-PH" : "fil-PH";

  const handleOpen = (topicId: string) => {
    const pack = getOfflinePack(topicId);
    if (pack) {
      setUserProfile(pack.profile);
    }
    router.push(`/learn?lesson=${topicId}`);
  };

  const handleRemove = (topicId: string) => {
    removeOfflinePack(topicId);
    refresh();
  };

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Download className="size-5 text-primary" aria-hidden="true" />
          {t.settings.offlineLessons.title}
        </CardTitle>
        <CardDescription>{t.settings.offlineLessons.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {packs.length === 0 ? (
          <p className="rounded-2xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
            {t.settings.offlineLessons.empty}
          </p>
        ) : (
          <ul className="space-y-3" role="list">
            {packs.map((pack) => (
              <li
                key={pack.topicId}
                className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <p className="truncate font-semibold text-foreground">
                    {pack.topicTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.settings.offlineLessons.savedAt(
                      formatDownloadDate(pack.downloadedAt, locale),
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleOpen(pack.topicId)}
                    className="h-10 rounded-xl px-4 text-sm font-medium"
                    aria-label={t.settings.offlineLessons.open(pack.topicTitle)}
                  >
                    <BookOpen className="size-4" aria-hidden="true" />
                    {t.settings.offlineLessons.openLabel}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(pack.topicId)}
                    className="h-10 rounded-xl px-3"
                    aria-label={t.settings.offlineLessons.remove(pack.topicTitle)}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
