import type { Grade, Subject, TopicSuggestion } from "@/lib/types/learning";

const FALLBACK_TOPICS: Record<string, TopicSuggestion[]> = {
  science: [
    {
      title: "Parts of Plants",
      description: "Learn the different parts of a plant and what they do.",
      estimatedReadingMinutes: 3,
      difficulty: "easy",
    },
    {
      title: "Plant Life Cycle",
      description: "Understand how plants grow from seeds.",
      estimatedReadingMinutes: 3,
      difficulty: "moderate",
    },
    {
      title: "Animals and Their Habitats",
      description: "Discover where animals live and how they survive.",
      estimatedReadingMinutes: 4,
      difficulty: "moderate",
    },
    {
      title: "The Human Body",
      description: "Explore basic body parts and how they help you every day.",
      estimatedReadingMinutes: 4,
      difficulty: "easy",
    },
  ],
  mathematics: [
    {
      title: "Adding Whole Numbers",
      description: "Practice adding numbers with friendly step-by-step examples.",
      estimatedReadingMinutes: 3,
      difficulty: "easy",
    },
    {
      title: "Subtracting Numbers",
      description: "Learn to take away numbers in everyday situations.",
      estimatedReadingMinutes: 3,
      difficulty: "easy",
    },
    {
      title: "Shapes Around Us",
      description: "Find circles, squares, and triangles in your community.",
      estimatedReadingMinutes: 3,
      difficulty: "easy",
    },
    {
      title: "Telling Time",
      description: "Read the clock and plan your school day.",
      estimatedReadingMinutes: 4,
      difficulty: "moderate",
    },
  ],
};

export function getMockTopicSuggestions(
  subject: Subject,
  keyword: string,
  lowDataMode = false,
): { category: string; topics: TopicSuggestion[] } {
  const base = FALLBACK_TOPICS[subject] ?? FALLBACK_TOPICS.science;
  const topics = (lowDataMode ? base.slice(0, 4) : base).map((topic) => ({
    ...topic,
    description: lowDataMode
      ? topic.description.split(".")[0] + "."
      : topic.description,
  }));

  return {
    category: keyword.trim() || "General",
    topics,
  };
}

export function getMockLessonForTopic(
  title: string,
  grade: Grade,
  lowDataMode = false,
) {
  return {
    title,
    simpleExplanation: `This is a simple lesson about ${title} for Grade ${grade} students.`,
    taglishExplanation: `Ngayon, pag-usapan natin ang ${title} — madali lang ito, kaya mo 'to!`,
    filipinoExample: "Halimbawa sa paaralan o sa bahay mo.",
    whyItMatters: "Kapaki-pakinabang ito sa araw-araw mong buhay bilang mag-aaral.",
    estimatedReadingMinutes: lowDataMode ? 1 : 3,
    encouragePractice: "Subukan ang Quick Check pagkatapos!",
  };
}
