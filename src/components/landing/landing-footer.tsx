"use client";

import { APP_NAME } from "@/lib/constants";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-background px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>
    </footer>
  );
}
