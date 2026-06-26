export const LANDING_COPY = {
  hero: {
    title: "Learn Smarter, One Lesson at a Time.",
    subtitle:
      "Your AI-powered study companion designed for Filipino learners with bilingual lessons, adaptive quizzes, and personalized guidance.",
    primaryCta: "Start Learning",
    secondaryCta: "How It Works",
  },
  features: {
    heading: "Built for how you learn",
    subheading:
      "Structured lessons that guide you step by step — not endless chat.",
    items: [
      {
        id: "guided-lessons",
        title: "Guided Lessons",
        description:
          "Clear explanations in English or Filipino — with real-life examples from jeepney rides to sari-sari stores.",
        icon: "book" as const,
      },
      {
        id: "adaptive-practice",
        title: "Adaptive Practice",
        description:
          "Short quizzes that adjust to how well you understand. Practice until you're confident, then move forward.",
        icon: "target" as const,
      },
      {
        id: "personalized-progress",
        title: "Personalized Progress",
        description:
          "Track your streak, accuracy, and next recommended lesson. Always know what to study next.",
        icon: "chart" as const,
      },
    ],
  },
  howItWorks: {
    heading: "How It Works",
    subheading: "Every session follows a simple path — no confusion, no dead ends.",
    steps: [
      {
        number: 1,
        title: "Learn",
        description:
          "Read a short lesson made for your grade, with examples you recognize from everyday life.",
      },
      {
        number: 2,
        title: "Practice",
        description:
          "Answer quick questions one at a time to check what you understood.",
      },
      {
        number: 3,
        title: "Improve",
        description:
          "Get helpful feedback and extra practice if you need it — never shame, always encouragement.",
      },
      {
        number: 4,
        title: "Continue",
        description:
          "Unlock your next lesson or pick up where you left off. Keep your streak going!",
      },
    ],
  },
  footer: {
    tagline: "Made with care for Filipino learners.",
    copyright: "EduBridge AI",
  },
} as const;
