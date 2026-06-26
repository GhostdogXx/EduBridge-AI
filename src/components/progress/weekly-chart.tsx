"use client";

import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { useT } from "@/lib/i18n";
import type { WeeklyPoint } from "@/lib/progress-stats";

interface WeeklyChartProps {
  data: WeeklyPoint[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const t = useT();
  const hasActivity = data.some((point) => point.minutes > 0);
  const todayIndex = data.length - 1;
  const chartData = data.map((point) => ({
    ...point,
    label: t.progress.weekly.weekdays[point.weekday],
  }));

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      <CardContent className="flex flex-col gap-4 pt-6">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="size-5" aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold text-foreground">
            {t.progress.weekly.title}
          </p>
        </div>

        {hasActivity ? (
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 4, bottom: 0, left: 4 }}
              >
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <Bar dataKey="minutes" radius={[6, 6, 6, 6]} maxBarSize={28}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === todayIndex
                          ? "var(--color-primary)"
                          : "var(--color-chart-1)"
                      }
                      fillOpacity={index === todayIndex ? 1 : 0.35}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center gap-1 rounded-2xl bg-muted/40 text-center">
            <p className="text-sm font-medium text-foreground">
              {t.progress.weekly.empty1}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.progress.weekly.empty2}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
