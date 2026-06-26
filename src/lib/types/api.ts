import type {
  AdaptiveRecommendation,
  ContentSource,
  EvaluationFeedback,
  LessonContent,
  LessonVariant,
  QuizQuestion,
  UserProfile,
} from "@/lib/types/learning";

export interface LessonRequest {
  profile: UserProfile;
  topicId: string;
  lowDataMode?: boolean;
  variant?: LessonVariant;
}

export interface LessonResponse {
  topicId: string;
  topic: string;
  lesson: LessonContent;
  source: ContentSource;
}

export interface QuizRequest {
  profile: UserProfile;
  topicId: string;
  lowDataMode?: boolean;
}

export interface QuizResponse {
  topicId: string;
  topic: string;
  questions: QuizQuestion[];
  source: ContentSource;
}

export interface EvaluationRequest {
  profile: UserProfile;
  topicId: string;
  score: number;
  total: number;
  recommendation: AdaptiveRecommendation;
  lowDataMode?: boolean;
}

export interface EvaluationResponse {
  evaluation: EvaluationFeedback;
  source: ContentSource;
}

export interface ApiErrorResponse {
  error: string;
}
