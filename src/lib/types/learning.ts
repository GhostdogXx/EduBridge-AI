export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export type Subject =
  | "mathematics"
  | "science"
  | "english"
  | "filipino"
  | "araling-panlipunan"
  | "esp"
  | "mapeh"
  | "ict"
  | "mother-tongue";

export type LanguagePreference = "english" | "filipino";

export type TopicDifficulty = "easy" | "moderate" | "challenging";

export interface SelectedTopic {
  id: string;
  title: string;
  description: string;
  focus: string;
  estimatedReadingMinutes: number;
  difficulty: TopicDifficulty;
}

export interface UserProfile {
  grade: Grade;
  subject: Subject;
  language: LanguagePreference;
  selectedTopic: SelectedTopic;
}

export interface LessonContent {
  title: string;
  simpleExplanation: string;
  taglishExplanation: string;
  filipinoExample: string;
  whyItMatters: string;
  estimatedReadingMinutes: number;
  encouragePractice: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export type AdaptiveRecommendation = "unlock" | "retry" | "review";

/**
 * Which version of a lesson to generate. Driven by the previous quiz result so
 * struggling learners get a gentler re-teach instead of the same text.
 */
export type LessonVariant = "standard" | "another-explanation" | "simplified";

export type TopicStatus = "locked" | "available" | "needs-review" | "mastered";

export interface TopicState {
  status: TopicStatus;
  bestPercentage: number;
  attempts: number;
}

export type LearningPathState = Record<string, TopicState>;

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  recommendation: AdaptiveRecommendation;
}

export interface EvaluationFeedback {
  headline: string;
  feedback: string;
  tips: string[];
}

export type ContentSource = "ai" | "fallback";

export interface ProgressSnapshot {
  lessonsCompleted: number;
  quizAccuracy: number;
  understandingMeter: number;
  streakDays: number;
  estimatedStudyMinutes: number;
  todaysGoalLessons: number;
  /** Quiz sessions completed per local day, keyed by yyyy-mm-dd. */
  dailySessions: Record<string, number>;
}

export interface TopicSuggestion {
  title: string;
  description: string;
  estimatedReadingMinutes: number;
  difficulty: TopicDifficulty;
}
