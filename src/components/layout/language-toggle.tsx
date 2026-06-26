"use client";

import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { LANGUAGES } from "@/lib/constants";
import { useT } from "@/lib/i18n";
import type { LanguagePreference } from "@/lib/types/learning";

const ORDER: LanguagePreference[] = ["filipino", "english"];

const SHORT_LABEL: Record<LanguagePreference, string> = {
  english: "EN",
  filipino: "FIL",
};

export function LanguageToggle() {
  const { activeLanguage, setActiveLanguage } = useAppContext();
  const t = useT();

  const currentLabel =
    LANGUAGES.find((language) => language.value === activeLanguage)?.label ??
    "Filipino";

  const handleCycle = () => {
    const nextIndex = (ORDER.indexOf(activeLanguage) + 1) % ORDER.length;
    setActiveLanguage(ORDER[nextIndex]);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCycle}
      className="h-9 gap-1.5 rounded-full px-3"
      aria-label={t.settings.language.toggleAria(currentLabel)}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span className="text-xs font-semibold">{SHORT_LABEL[activeLanguage]}</span>
    </Button>
  );
}
