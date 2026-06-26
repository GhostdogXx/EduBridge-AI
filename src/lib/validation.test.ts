import { describe, expect, it } from "vitest";

import {
  getNextTopic,
  getTopic,
  resolveTopicId,
} from "@/lib/curriculum";
import {
  lessonContentSchema,
  quizSetSchema,
  safeParseUserProfile,
  topicDiscoverySchema,
  toQuizQuestions,
} from "@/lib/validation";

describe("curriculum", () => {
  it("resolves unknown topic ids to the first topic", () => {
    expect(resolveTopicId(undefined)).toBe("photosynthesis");
    expect(resolveTopicId("invalid")).toBe("photosynthesis");
    expect(resolveTopicId("water-cycle")).toBe("water-cycle");
  });

  it("returns the next topic in order", () => {
    expect(getNextTopic("photosynthesis")?.id).toBe("water-cycle");
    expect(getNextTopic("states-of-matter")).toBeNull();
  });

  it("includes DepEd alignment metadata from the server", () => {
    const topic = getTopic("photosynthesis");
    expect(topic?.alignment.framework).toBe("DepEd K–12");
    expect(topic?.alignment.competency).toContain("photosynthesis");
  });
});

describe("safeParseUserProfile", () => {
  it("accepts a valid profile with selected topic", () => {
    const result = safeParseUserProfile({
      grade: 6,
      subject: "science",
      language: "filipino",
      selectedTopic: {
        id: "parts-of-plants",
        title: "Parts of Plants",
        description: "Learn plant parts.",
        focus: "Learn plant parts.",
        estimatedReadingMinutes: 3,
        difficulty: "easy",
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid grades and subjects", () => {
    expect(
      safeParseUserProfile({
        grade: 7,
        subject: "science",
        language: "filipino",
        selectedTopic: {
          id: "parts-of-plants",
          title: "Parts of Plants",
          description: "Learn plant parts.",
          focus: "Learn plant parts.",
          estimatedReadingMinutes: 3,
          difficulty: "easy",
        },
      }).success,
    ).toBe(false);

    expect(
      safeParseUserProfile({
        grade: 6,
        subject: "science",
        language: "filipino",
        goal: "exam-preparation",
      }).success,
    ).toBe(false);
  });
});

describe("topic discovery schema", () => {
  it("validates topic suggestions from Gemini", () => {
    const parsed = topicDiscoverySchema.safeParse({
      category: "Biology",
      topics: [
        {
          title: "Parts of Plants",
          description: "Learn the different parts of a plant.",
          estimatedReadingMinutes: 3,
          difficulty: "easy",
        },
      ],
    });
    expect(parsed.success).toBe(true);
  });
});

describe("Gemini output schemas", () => {
  it("validates lesson content shape", () => {
    const parsed = lessonContentSchema.safeParse({
      title: "Plants Make Food",
      simpleExplanation: "Plants use sunlight to make food.",
      taglishExplanation: "Gumagawa ang halaman ng pagkain gamit ang araw.",
      filipinoExample: "Halimbawa sa palayan.",
      whyItMatters: "Kailangan natin ng oxygen.",
      estimatedReadingMinutes: 2,
      encouragePractice: "Subukan ang quiz!",
    });
    expect(parsed.success).toBe(true);
  });

  it("validates quiz sets with exactly three questions", () => {
    const question = {
      id: "q1",
      question: "What do plants need?",
      options: ["Sunlight", "Rocks", "Plastic", "Metal"],
      correctIndex: 0,
      explanation: "Tama!",
    };

    expect(
      quizSetSchema.safeParse({ questions: [question, question, question] })
        .success,
    ).toBe(true);
    expect(quizSetSchema.safeParse({ questions: [question] }).success).toBe(
      false,
    );
  });

  it("narrows quiz options to a four-item tuple", () => {
    const parsed = quizSetSchema.parse({
      questions: Array.from({ length: 3 }, (_, index) => ({
        id: `q${index + 1}`,
        question: "Sample?",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "Nice!",
      })),
    });

    const questions = toQuizQuestions(parsed);
    expect(questions[0].options).toHaveLength(4);
  });
});
