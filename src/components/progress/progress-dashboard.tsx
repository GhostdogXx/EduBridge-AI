"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flame, GraduationCap, Sparkles, Target, Timer } from "lucide-react";

import { RecommendedNext } from "@/components/progress/recommended-next";
import { StatCard } from "@/components/progress/stat-card";
import { TodayGoalCard } from "@/components/progress/today-goal-card";
import { TopicProgressList } from "@/components/progress/topic-progress-list";
import { UnderstandingMeter } from "@/components/progress/understanding-meter";
import { WeeklyChart } from "@/components/progress/weekly-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/app-context";
import { useLearningPath } from "@/hooks/use-learning-path";
import { useProgress } from "@/hooks/use-progress";
import { SCIENCE_TOPICS } from "@/lib/curriculum";
import { useT } from "@/lib/i18n";
import { getTopicState } from "@/lib/learning-path";
import {
  computeStreak,
  formatStudyTime,
  sessionsToday,
  totalStudyMinutes,
  weeklySeries,
} from "@/lib/progress-stats";

function DashboardSkeleton({ loadingLabel }: { loadingLabel: string }) {
  return (
    <div className="flex flex-col gap-5" aria-busy="true">
      <span className="sr-only">{loadingLabel}</span>
      <Skeleton className="h-32 w-full rounded-3xl" />
      <Skeleton className="h-28 w-full rounded-3xl" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-28 rounded-3xl" />
        ))}
      </div>
      <Skeleton className="h-40 w-full rounded-3xl" />
    </div>
  );
}

export function ProgressDashboard() {
  const router = useRouter();
  const { userProfile, isHydrated, lowDataMode } = useAppContext();
  const { progress, isLoaded: progressLoaded } = useProgress();
  const {
    path,
    isLoaded: pathLoaded,
    topicState,
    recommendedTopicId,
  } = useLearningPath();
  const t = useT();

  useEffect(() => {
    if (isHydrated && !userProfile) {
      router.replace("/onboarding");
    }
  }, [isHydrated, userProfile, router]);

  if (!isHydrated || !userProfile || !progressLoaded || !pathLoaded) {
    return <DashboardSkeleton loadingLabel={t.common.loadingProgress} />;
  }

  const streak = computeStreak(progress.dailySessions);
  const studyMinutes = totalStudyMinutes(progress.dailySessions);
  const todayCount = sessionsToday(progress.dailySessions);
  const weekly = weeklySeries(progress.dailySessions);
  const masteredCount = SCIENCE_TOPICS.filter(
    (topic) => getTopicState(path, topic.id).status === "mastered",
  ).length;

  const recommendedId = recommendedTopicId();
  const recommendedStatus = topicState(recommendedId).status;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.progress.title}
        </h1>
        <p className="text-muted-foreground">{t.progress.subtitle}</p>
      </div>

      <RecommendedNext topicId={recommendedId} status={recommendedStatus} />

      <TodayGoalCard
        completed={todayCount}
        goal={progress.todaysGoalLessons}
      />

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={GraduationCap}
          label={t.progress.stats.lessonsMastered}
          value={`${masteredCount}/${SCIENCE_TOPICS.length}`}
          tone="accent"
        />
        <StatCard
          icon={Target}
          label={t.progress.stats.quizAccuracy}
          value={`${progress.quizAccuracy}%`}
          sublabel={t.progress.stats.mostRecent}
          tone="primary"
        />
        <StatCard
          icon={Flame}
          label={t.progress.stats.learningStreak}
          value={
            streak === 1 ? t.progress.stats.day(1) : t.progress.stats.days(streak)
          }
          tone="warning"
        />
        <StatCard
          icon={Timer}
          label={t.progress.stats.studyTime}
          value={formatStudyTime(studyMinutes)}
          tone="primary"
        />
      </div>

      <UnderstandingMeter value={progress.understandingMeter} />

      {lowDataMode ? null : <WeeklyChart data={weekly} />}

      <TopicProgressList path={path} />

      <div className="flex items-center gap-3 rounded-3xl border border-primary/20 bg-primary/5 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium text-foreground">
          {t.progress.motivation}
        </p>
      </div>
    </div>
  );
}
