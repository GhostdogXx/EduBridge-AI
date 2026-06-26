import { describe, expect, it } from "vitest";

import {
  computeStreak,
  dateKey,
  formatStudyTime,
  sessionsToday,
  totalStudyMinutes,
  understandingKey,
  weeklySeries,
} from "@/lib/progress-stats";

describe("dateKey", () => {
  it("formats local calendar dates as yyyy-mm-dd", () => {
    expect(dateKey(new Date(2026, 5, 26))).toBe("2026-06-26");
  });
});

describe("computeStreak", () => {
  const today = new Date(2026, 5, 26);

  it("counts consecutive active days ending today", () => {
    const sessions = {
      "2026-06-24": 1,
      "2026-06-25": 1,
      "2026-06-26": 1,
    };
    expect(computeStreak(sessions, today)).toBe(3);
  });

  it("allows one-day grace when today has no activity", () => {
    const sessions = {
      "2026-06-24": 1,
      "2026-06-25": 1,
    };
    expect(computeStreak(sessions, today)).toBe(2);
  });

  it("returns zero when there is no recent activity", () => {
    expect(computeStreak({}, today)).toBe(0);
  });
});

describe("weeklySeries", () => {
  it("returns seven days ending on the given date", () => {
    const today = new Date(2026, 5, 26);
    const series = weeklySeries({ "2026-06-26": 2 }, today);

    expect(series).toHaveLength(7);
    expect(series.at(-1)?.sessions).toBe(2);
    expect(series.at(-1)?.minutes).toBe(10);
    expect(series.at(-1)?.weekday).toBe(today.getDay());
  });
});

describe("study time helpers", () => {
  it("totals minutes from daily sessions", () => {
    expect(totalStudyMinutes({ "2026-06-26": 2, "2026-06-25": 1 })).toBe(15);
  });

  it("reads sessions for today", () => {
    const today = new Date(2026, 5, 26);
    expect(sessionsToday({ "2026-06-26": 3 }, today)).toBe(3);
    expect(sessionsToday({}, today)).toBe(0);
  });

  it("formats minutes and hours", () => {
    expect(formatStudyTime(45)).toBe("45 min");
    expect(formatStudyTime(60)).toBe("1h");
    expect(formatStudyTime(75)).toBe("1h 15m");
  });
});

describe("understandingKey", () => {
  it("maps values to encouraging buckets", () => {
    expect(understandingKey(0)).toBe("ready");
    expect(understandingKey(45)).toBe("keepGoing");
    expect(understandingKey(65)).toBe("improving");
    expect(understandingKey(90)).toBe("great");
  });
});
