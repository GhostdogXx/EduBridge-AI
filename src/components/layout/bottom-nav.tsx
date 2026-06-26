"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LineChart, Settings, type LucideIcon } from "lucide-react";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function BottomNav() {
  const pathname = usePathname();
  const t = useT();

  const navItems: NavItem[] = [
    { href: "/learn", label: t.nav.learn, icon: BookOpen },
    { href: "/progress", label: t.nav.progress, icon: LineChart },
    { href: "/settings", label: t.nav.settings, icon: Settings },
  ];

  return (
    <nav
      className="sticky bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-md low-data:bg-background low-data:backdrop-blur-none"
      aria-label={t.a11y.primaryNav}
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl transition-colors",
                    isActive ? "bg-primary/10" : "bg-transparent",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
