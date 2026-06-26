"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

interface BackButtonProps {
  /** Used when there is no browser history (e.g. direct link). */
  fallbackHref?: string;
}

export function BackButton({ fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();
  const t = useT();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(fallbackHref);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className="h-10 min-w-10 gap-1.5 rounded-2xl px-2.5 sm:px-3"
      aria-label={t.common.back}
    >
      <ArrowLeft className="size-5 shrink-0" aria-hidden="true" />
      <span className="text-sm font-medium">{t.common.back}</span>
    </Button>
  );
}
