import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EduBridge AI",
    short_name: "EduBridge",
    description:
      "Your AI-powered study companion designed for Filipino learners with bilingual lessons, adaptive quizzes, and personalized guidance.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#2563EB",
    orientation: "portrait-primary",
    categories: ["education"],
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
