const MINUTES_PER_SESSION = 5;

/** Local calendar date as yyyy-mm-dd (avoids UTC offset bugs at day edges). */
export function dateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export interface WeeklyPoint {
  /** Day of week 0 (Sun) – 6 (Sat); the UI maps this to a localized label. */
  weekday: number;
  minutes: number;
  sessions: number;
}

/** Last 7 days oldest → newest, ready for a bar chart. */
export function weeklySeries(
  dailySessions: Record<string, number>,
  today: Date = new Date(),
): WeeklyPoint[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index - 6);
    const sessions = dailySessions[dateKey(date)] ?? 0;
    return {
      weekday: date.getDay(),
      sessions,
      minutes: sessions * MINUTES_PER_SESSION,
    };
  });
}

/**
 * Consecutive active days ending today (with a one-day grace: if there's no
 * activity yet today, we still count a streak that ran through yesterday).
 */
export function computeStreak(
  dailySessions: Record<string, number>,
  today: Date = new Date(),
): number {
  let cursor = today;
  if ((dailySessions[dateKey(cursor)] ?? 0) === 0) {
    cursor = addDays(cursor, -1);
  }

  let streak = 0;
  while ((dailySessions[dateKey(cursor)] ?? 0) > 0) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function totalStudyMinutes(
  dailySessions: Record<string, number>,
): number {
  return (
    Object.values(dailySessions).reduce((sum, count) => sum + count, 0) *
    MINUTES_PER_SESSION
  );
}

export function sessionsToday(
  dailySessions: Record<string, number>,
  today: Date = new Date(),
): number {
  return dailySessions[dateKey(today)] ?? 0;
}

export function formatStudyTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder === 0 ? `${hours}h` : `${hours}h ${remainder}m`;
}

export type UnderstandingKey =
  | "great"
  | "improving"
  | "keepGoing"
  | "starting"
  | "ready";

/** Encouraging bucket for the understanding meter — never negative. */
export function understandingKey(value: number): UnderstandingKey {
  if (value >= 80) return "great";
  if (value >= 60) return "improving";
  if (value >= 40) return "keepGoing";
  if (value > 0) return "starting";
  return "ready";
}

export { MINUTES_PER_SESSION };
