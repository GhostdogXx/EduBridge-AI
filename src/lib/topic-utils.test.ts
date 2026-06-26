import { describe, expect, it } from "vitest";

import {
  createDiscoveredTopicId,
  resolveLessonTopic,
} from "@/lib/topic-utils";
import type { UserProfile } from "@/lib/types/learning";

describe("discovered topic ids", () => {
  it("namespaces ids so they never collide with static curriculum", () => {
    expect(createDiscoveredTopicId("Photosynthesis")).toBe(
      "discovered-photosynthesis",
    );
    expect(createDiscoveredTopicId("Photosynthesis")).not.toBe("photosynthesis");
  });

  it("resolves lessons only from the profile selected topic", () => {
    const profile: UserProfile = {
      grade: 5,
      subject: "science",
      language: "filipino",
      selectedTopic: {
        id: "discovered-plant-cells",
        title: "Plant Cells",
        description: "Learn about plant cells.",
        focus: "Plant Cells: Learn about plant cells.",
        estimatedReadingMinutes: 3,
        difficulty: "easy",
      },
    };

    const resolved = resolveLessonTopic("discovered-plant-cells", profile);
    expect(resolved?.title).toBe("Plant Cells");

    expect(resolveLessonTopic("photosynthesis", profile)).toBeNull();
  });
});
