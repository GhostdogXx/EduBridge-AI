"use client";

import { TopicSuggestionCard } from "@/components/onboarding/topic-suggestion-card";
import type { TopicSuggestion } from "@/lib/types/learning";

interface TopicSuggestionListProps {
  topics: TopicSuggestion[];
  selectedTitle: string | null;
  badge: string;
  readingTimeLabel: (minutes: number) => string;
  difficultyLabels: Record<TopicSuggestion["difficulty"], string>;
  onSelect: (topic: TopicSuggestion) => void;
}

export function TopicSuggestionList({
  topics,
  selectedTitle,
  badge,
  readingTimeLabel,
  difficultyLabels,
  onSelect,
}: TopicSuggestionListProps) {
  return (
    <ul className="flex flex-col gap-4" role="list">
      {topics.map((topic) => (
        <li key={topic.title}>
          <TopicSuggestionCard
            topic={topic}
            badge={badge}
            readingTimeLabel={readingTimeLabel(topic.estimatedReadingMinutes)}
            difficultyLabel={difficultyLabels[topic.difficulty]}
            selected={selectedTitle === topic.title}
            onSelect={() => onSelect(topic)}
          />
        </li>
      ))}
    </ul>
  );
}
