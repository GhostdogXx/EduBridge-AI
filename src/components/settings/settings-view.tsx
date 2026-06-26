"use client";

import { useRouter } from "next/navigation";
import { Globe, RotateCcw } from "lucide-react";

import { LanguageToggle } from "@/components/layout/language-toggle";
import { LowDataToggle } from "@/components/layout/low-data-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/context/app-context";
import { LANGUAGES } from "@/lib/constants";
import { useT } from "@/lib/i18n";

export function SettingsView() {
  const router = useRouter();
  const { activeLanguage, clearUserProfile } = useAppContext();
  const t = useT();

  const currentLanguage =
    LANGUAGES.find((language) => language.value === activeLanguage)?.label ??
    "Filipino";

  const handleRestart = () => {
    clearUserProfile();
    router.push("/onboarding");
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.settings.title}
        </h1>
        <p className="text-muted-foreground">{t.settings.subtitle}</p>
      </div>

      <Card className="rounded-3xl border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">{t.settings.dataPerf.title}</CardTitle>
          <CardDescription>{t.settings.dataPerf.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <LowDataToggle variant="full" />
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">{t.settings.language.title}</CardTitle>
          <CardDescription>{t.settings.language.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Globe className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-foreground">
                  {t.settings.language.current(currentLanguage)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.settings.language.tapToSwitch}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">{t.settings.startOver.title}</CardTitle>
          <CardDescription>{t.settings.startOver.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={handleRestart}
            className="h-12 w-full rounded-2xl text-base font-medium"
            aria-label={t.settings.startOver.button}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            {t.settings.startOver.button}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
