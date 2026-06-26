"use client";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SkipToContent() {
  const t = useT();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const main = document.getElementById("main-content");
    if (!main) return;
    main.focus({ preventScroll: true });
    main.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]",
        "focus:rounded-2xl focus:bg-primary focus:px-5 focus:py-3",
        "focus:text-sm focus:font-semibold focus:text-primary-foreground",
        "focus:outline-none focus:ring-3 focus:ring-ring/50",
      )}
    >
      {t.a11y.skipToContent}
    </a>
  );
}
