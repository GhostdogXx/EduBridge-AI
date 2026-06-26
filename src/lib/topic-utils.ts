import type { CurriculumAlignment } from "@/lib/curriculum";
import { getSubjectLabel } from "@/lib/subjects";
import type { Grade, Subject, UserProfile } from "@/lib/types/learning";

export interface ResolvedLessonTopic {
  id: string;
  title: string;
  focus: string;
  alignment: CurriculumAlignment;
}

export function slugifyTopic(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "topic";
}

/** Namespace discovered topics so they never collide with static curriculum ids. */
export function createDiscoveredTopicId(title: string): string {
  return `discovered-${slugifyTopic(title)}`;
}

export function buildCurriculumAlignment(
  grade: Grade,
  subject: Subject,
  topicTitle: string,
): CurriculumAlignment {
  return {
    framework: "DepEd K–12",
    gradeArea: `Grade ${grade} ${getSubjectLabel(subject)}`,
    quarter: "Aligned",
    competency: topicTitle,
  };
}

export function resolveLessonTopic(
  topicId: string,
  profile: UserProfile,
): ResolvedLessonTopic | null {
  const { selectedTopic } = profile;
  if (!selectedTopic || selectedTopic.id !== topicId) {
    return null;
  }

  return {
    id: selectedTopic.id,
    title: selectedTopic.title,
    focus: selectedTopic.focus,
    alignment: buildCurriculumAlignment(
      profile.grade,
      profile.subject,
      selectedTopic.title,
    ),
  };
}
