"use client";

import { useCallback, useEffect, useState } from "react";

import { downloadTopicForOffline } from "@/lib/offline-download";
import { isTopicDownloaded, listOfflinePacks } from "@/lib/offline-storage";
import type { OfflinePackSummary } from "@/lib/offline-storage";
import type { UserProfile } from "@/lib/types/learning";

type DownloadStatus = "idle" | "downloading" | "success" | "error";

interface UseOfflineDownloadResult {
  isDownloaded: boolean;
  status: DownloadStatus;
  errorMessage: string | null;
  download: (profile: UserProfile, topicId: string, lowDataMode?: boolean) => Promise<boolean>;
  refreshDownloadedState: () => void;
}

export function useOfflineDownload(topicId: string): UseOfflineDownloadResult {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshDownloadedState = useCallback(() => {
    setIsDownloaded(isTopicDownloaded(topicId));
  }, [topicId]);

  useEffect(() => {
    refreshDownloadedState();
  }, [refreshDownloadedState]);

  const download = useCallback(
    async (
      profile: UserProfile,
      targetTopicId: string,
      lowDataMode = false,
    ): Promise<boolean> => {
      setStatus("downloading");
      setErrorMessage(null);

      try {
        await downloadTopicForOffline(profile, targetTopicId, lowDataMode);
        setIsDownloaded(true);
        setStatus("success");
        return true;
      } catch (error: unknown) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Could not download this lesson.",
        );
        return false;
      }
    },
    [],
  );

  return {
    isDownloaded,
    status,
    errorMessage,
    download,
    refreshDownloadedState,
  };
}

export function useOfflineLibrary() {
  const [packs, setPacks] = useState<OfflinePackSummary[]>([]);

  const refresh = useCallback(() => {
    setPacks(listOfflinePacks());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { packs, refresh };
}
