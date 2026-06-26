import type { QuizQuestion } from "@/lib/types/learning";

/**
 * Fallback quizzes used when the Gemini API is unavailable or returns invalid
 * data, so the learning flow never dead-ends during a demo.
 */
const MOCK_QUIZZES: Record<string, QuizQuestion[]> = {
  photosynthesis: [
    {
      id: "q1",
      question: "What do plants mainly use to make their own food?",
      options: ["Sunlight", "Moonlight", "Soil only", "Rocks"],
      correctIndex: 0,
      explanation:
        "Tama! Plants use sunlight (plus water and carbon dioxide) to make food through photosynthesis.",
    },
    {
      id: "q2",
      question: "Which gas do plants release during photosynthesis?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Smoke"],
      correctIndex: 1,
      explanation:
        "Oo! Plants release oxygen — yung hinihinga natin. Salamat sa mga halaman!",
    },
    {
      id: "q3",
      question: "Which part of the plant captures the most sunlight?",
      options: ["Roots", "Flowers", "Leaves", "Seeds"],
      correctIndex: 2,
      explanation:
        "Galing! Ang mga dahon (leaves) ang pangunahing sumasalo ng sikat ng araw.",
    },
  ],
  "water-cycle": [
    {
      id: "q1",
      question: "What is it called when the sun turns water into vapor?",
      options: ["Condensation", "Evaporation", "Precipitation", "Collection"],
      correctIndex: 1,
      explanation:
        "Tama! Evaporation ang tawag kapag nagiging singaw ang tubig dahil sa init ng araw.",
    },
    {
      id: "q2",
      question: "What happens when water vapor cools high in the sky?",
      options: [
        "It forms clouds",
        "It disappears",
        "It becomes soil",
        "It turns to fire",
      ],
      correctIndex: 0,
      explanation:
        "Oo! Kapag lumamig ang singaw, nagiging ulap ito — tinatawag na condensation.",
    },
    {
      id: "q3",
      question: "What do we call water falling from clouds as rain?",
      options: ["Evaporation", "Reflection", "Precipitation", "Rotation"],
      correctIndex: 2,
      explanation:
        "Husay! Precipitation ang tawag sa pagbagsak ng tubig bilang ulan.",
    },
  ],
  "states-of-matter": [
    {
      id: "q1",
      question: "Which state of matter keeps its own shape?",
      options: ["Liquid", "Gas", "Solid", "Vapor"],
      correctIndex: 2,
      explanation:
        "Tama! Ang solid, gaya ng yelo o bato, ay may sariling hugis.",
    },
    {
      id: "q2",
      question: "Water in a glass takes the shape of the glass. What state is it?",
      options: ["Solid", "Liquid", "Gas", "Plasma"],
      correctIndex: 1,
      explanation:
        "Oo! Ang liquid ay sumusunod sa hugis ng lalagyan nito.",
    },
    {
      id: "q3",
      question: "What happens to ice when you heat it?",
      options: [
        "It becomes a gas instantly",
        "It melts into liquid water",
        "It stays the same",
        "It turns into a rock",
      ],
      correctIndex: 1,
      explanation:
        "Galing! Kapag iniinit ang yelo (solid), natutunaw ito at nagiging tubig (liquid).",
    },
  ],
};

export function getMockQuiz(
  topicId: string,
  lowDataMode = false,
): QuizQuestion[] {
  const questions = MOCK_QUIZZES[topicId] ?? MOCK_QUIZZES.photosynthesis;
  if (!lowDataMode) return questions;

  return questions.map((question) => ({
    ...question,
    explanation: question.explanation.split(".")[0] + ".",
  }));
}
