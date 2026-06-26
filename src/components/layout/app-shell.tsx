import { BottomNav } from "@/components/layout/bottom-nav";
import { LowDataBadge } from "@/components/layout/low-data-badge";
import { TopNav } from "@/components/layout/top-nav";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showLessonControls?: boolean;
  showBack?: boolean;
  backHref?: string;
}

export function AppShell({
  children,
  title,
  showLessonControls = false,
  showBack = false,
  backHref,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav
        title={title}
        showLessonControls={showLessonControls}
        showBack={showBack}
        backHref={backHref}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-2xl flex-1 px-4 pb-8 pt-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-6"
      >
        <div className="mb-4">
          <LowDataBadge />
        </div>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
