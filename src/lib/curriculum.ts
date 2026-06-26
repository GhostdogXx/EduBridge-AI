export interface CurriculumAlignment {
  /** Curriculum framework, e.g. "DepEd K–12". */
  framework: string;
  /** Grade and learning area, e.g. "Grade 6 Science". */
  gradeArea: string;
  /** Grading period, e.g. "Quarter 2". */
  quarter: string;
  /** The learning competency this lesson maps to. */
  competency: string;
}

export interface CurriculumTopic {
  id: string;
  order: number;
  topic: string;
  /** Short hint that guides AI generation and grounds the lesson scope. */
  focus: string;
  /** DepEd alignment metadata, shown to build educational credibility. */
  alignment: CurriculumAlignment;
}

/**
 * Authoritative Science curriculum for the MVP. Topic text lives here on the
 * server so the AI prompt is never built from arbitrary client input — the
 * client only sends a topic id, which we resolve against this list.
 */
export const SCIENCE_TOPICS: CurriculumTopic[] = [
  {
    id: "photosynthesis",
    order: 1,
    topic: "Photosynthesis",
    focus:
      "How green plants make their own food using sunlight, water, and carbon dioxide, and release oxygen.",
    alignment: {
      framework: "DepEd K–12",
      gradeArea: "Grade 6 Science",
      quarter: "Quarter 2",
      competency:
        "Explain how plants make their own food through the process of photosynthesis.",
    },
  },
  {
    id: "water-cycle",
    order: 2,
    topic: "The Water Cycle",
    focus:
      "How water moves through evaporation, condensation, and precipitation in a continuous cycle.",
    alignment: {
      framework: "DepEd K–12",
      gradeArea: "Grade 4 Science",
      quarter: "Quarter 4",
      competency:
        "Describe how water moves through the environment in the water cycle (evaporation, condensation, precipitation).",
    },
  },
  {
    id: "states-of-matter",
    order: 3,
    topic: "States of Matter",
    focus:
      "The three common states of matter (solid, liquid, gas) and how matter changes state when heated or cooled.",
    alignment: {
      framework: "DepEd K–12",
      gradeArea: "Grade 5 Science",
      quarter: "Quarter 1",
      competency:
        "Describe the different states of matter and how matter changes from one state to another.",
    },
  },
];

export function getTopic(topicId: string): CurriculumTopic | null {
  return SCIENCE_TOPICS.find((topic) => topic.id === topicId) ?? null;
}

export function getFirstTopic(): CurriculumTopic {
  return SCIENCE_TOPICS[0];
}

export function getNextTopic(topicId: string): CurriculumTopic | null {
  const current = getTopic(topicId);
  if (!current) return null;
  return (
    SCIENCE_TOPICS.find((topic) => topic.order === current.order + 1) ?? null
  );
}

export function getPreviousTopic(topicId: string): CurriculumTopic | null {
  const current = getTopic(topicId);
  if (!current) return null;
  return (
    SCIENCE_TOPICS.find((topic) => topic.order === current.order - 1) ?? null
  );
}

export function resolveTopicId(topicId?: string): string {
  if (topicId && getTopic(topicId)) return topicId;
  return getFirstTopic().id;
}
