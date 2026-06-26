"use client";

import { DocumentLang } from "@/components/accessibility/document-lang";
import { SkipToContent } from "@/components/accessibility/skip-to-content";
import { AppProvider } from "@/context/app-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <SkipToContent />
      <DocumentLang />
      {children}
    </AppProvider>
  );
}
