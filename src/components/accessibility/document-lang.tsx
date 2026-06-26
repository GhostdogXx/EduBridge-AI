"use client";

import { useEffect } from "react";

import { useUiLanguage } from "@/lib/i18n";

/** Keeps `<html lang>` in sync with the active UI language for screen readers. */
export function DocumentLang() {
  const uiLanguage = useUiLanguage();

  useEffect(() => {
    document.documentElement.lang = uiLanguage === "fil" ? "fil" : "en";
  }, [uiLanguage]);

  return null;
}
