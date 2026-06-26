"use client";

import Link from "next/link";
import { WifiOff } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function OfflineNotice() {
  const t = useT();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full max-w-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Card className="rounded-3xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-muted">
            <WifiOff className="size-7 text-muted-foreground" aria-hidden="true" />
          </div>
          <CardTitle className="text-xl">{t.offline.title}</CardTitle>
          <CardDescription>{t.offline.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 w-full rounded-2xl text-base",
            )}
            aria-label={t.common.tryAgain}
          >
            {t.common.tryAgain}
          </Link>
        </CardContent>
      </Card>
      </main>
    </div>
  );
}
