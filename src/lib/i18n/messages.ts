import type { LanguagePreference } from "@/lib/types/learning";

export type UiLanguage = "en" | "fil";

/**
 * UI chrome is rendered in English or Filipino based on the learner's language choice.
 *
 * Filipino strings use simple, everyday language for elementary students —
 * short sentences, common words, friendly tone. Avoid formal or archaic Filipino.
 */
export function resolveUiLanguage(pref: LanguagePreference): UiLanguage {
  return pref === "english" ? "en" : "fil";
}

const en = {
  a11y: {
    skipToContent: "Skip to main content",
    primaryNav: "Primary navigation",
    preferredLanguage: "Preferred language",
    quizChoices: "Answer choices",
    selected: "Selected",
    notSelected: "Not selected",
    correctAnswer: "Correct answer",
    yourAnswerWrong: "Your answer — incorrect",
    optionLabel: (letter: string, text: string) => `${letter}. ${text}`,
  },
  common: {
    tryAgain: "Try Again",
    back: "Back",
    continue: "Continue",
    loadingLesson: "Loading your lesson…",
    loadingQuiz: "Loading your quiz…",
    loadingProgress: "Loading your progress…",
  },
  landing: {
    hero: {
      badge: "For Grades 1–6 · All subjects · English or Filipino",
      title: "Learn Smarter, One Lesson at a Time.",
      subtitle:
        "Your AI-powered study companion designed for Filipino learners with bilingual lessons, adaptive quizzes, and personalized guidance.",
      primaryCta: "Start Learning",
      secondaryCta: "How It Works",
      mockQuickCheck: "Quick Check",
      mockCaption: "Lesson cards — not chat bubbles",
    },
    problem: {
      heading: "The problem we're solving",
      subheading:
        "Millions of students in the provinces are eager to learn — but the tools aren't built for them.",
      points: {
        language: {
          title: "Lessons in the wrong language",
          body: "Most learning apps assume fluent English. Many Filipino students learn best in Filipino.",
        },
        connection: {
          title: "Weak or no internet",
          body: "Heavy, always-online apps don't work on budget phones with limited data.",
        },
        guidance: {
          title: "No one to guide them",
          body: "Without a teacher nearby, it's hard to know what to study next or where you went wrong.",
        },
      },
    },
    features: {
      heading: "Built for how you learn",
      subheading:
        "Structured lessons that guide you step by step — not endless chat.",
      items: {
        "guided-lessons": {
          title: "Guided Lessons",
          description:
            "Clear explanations in English or Filipino — with real-life examples from jeepney rides to sari-sari stores.",
        },
        "adaptive-practice": {
          title: "Adaptive Practice",
          description:
            "Short quizzes that adjust to how well you understand. Practice until you're confident, then move forward.",
        },
        "personalized-progress": {
          title: "Personalized Progress",
          description:
            "Track your streak, accuracy, and next recommended lesson. Always know what to study next.",
        },
      },
    },
    howItWorks: {
      heading: "How It Works",
      subheading:
        "Every session follows a simple path — no confusion, no dead ends.",
      steps: {
        "1": {
          title: "Learn",
          description:
            "Read a short lesson made for your grade, with examples you recognize from everyday life.",
        },
        "2": {
          title: "Practice",
          description:
            "Answer quick questions one at a time to check what you understood.",
        },
        "3": {
          title: "Improve",
          description:
            "Get helpful feedback and extra practice if you need it — never shame, always encouragement.",
        },
        "4": {
          title: "Continue",
          description:
            "Unlock your next lesson or pick up where you left off. Keep your streak going!",
        },
      },
    },
    footer: {
      ready: "Ready to start learning?",
      tagline: "Made with care for Filipino learners.",
    },
    languageChoice: {
      heading: "Choose your language",
      options: {
        filipino: { label: "Filipino", description: "Lessons in Filipino" },
        english: { label: "English", description: "Lessons in English" },
      },
    },
  },
  nav: {
    learn: "Learn",
    progress: "Progress",
    settings: "Settings",
    streakAria: (days: number) => `Learning streak: ${days} days`,
  },
  lowData: {
    compact: "Low Data",
    title: "Low Data Mode",
    description: "Lighter lessons, no animations, less data used.",
    activeHint: "Lighter pages and shorter lessons to save data.",
    toggleAria: "Toggle Low Data Mode",
  },
  onboarding: {
    eyebrow: "Let's find your next lesson",
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    continue: "Continue",
    startLearning: "Start Learning",
    back: "Back",
    grade: {
      title: "What grade are you in?",
      subtitle: "We'll match lessons to your level.",
      options: {
        "1": { label: "Grade 1", description: "Starting your learning journey" },
        "2": { label: "Grade 2", description: "Growing every day" },
        "3": { label: "Grade 3", description: "Building confidence" },
        "4": { label: "Grade 4", description: "Building strong foundations" },
        "5": { label: "Grade 5", description: "Growing your knowledge" },
        "6": { label: "Grade 6", description: "Preparing for the next level" },
      },
    },
    subject: {
      title: "Choose a subject",
      subtitle: "Pick what you'd like to explore today.",
      options: {
        science: { label: "Science", description: "Explore how the world works" },
      },
    },
    language: {
      title: "Which language helps you learn best?",
      subtitle: "You can change this anytime during a lesson.",
      options: {
        filipino: { label: "Filipino", description: "Lessons in Filipino" },
        english: { label: "English", description: "Lessons fully in English" },
      },
    },
    topicDiscovery: {
      prompt: (subject: string) => {
        const labels: Record<string, string> = {
          mathematics: "Mathematics",
          science: "Science",
          english: "English",
          filipino: "Filipino",
          "araling-panlipunan": "Araling Panlipunan",
          esp: "ESP",
          mapeh: "MAPEH",
          ict: "ICT",
          "mother-tongue": "Mother Tongue",
        };
        return `What would you like to learn in ${labels[subject] ?? "this subject"} today?`;
      },
      placeholder: "Type a topic or keyword…",
      continue: "Find Topics",
      loading: "Finding topics for you…",
      examplesBySubject: {
        mathematics: ["Addition", "Fractions", "Shapes", "Time", "Money"],
        science: ["Plants", "Biology", "Solar System", "Human Body", "Magnets"],
        english: ["Reading", "Grammar", "Vocabulary", "Writing", "Stories"],
        filipino: ["Pagbasa", "Gramatika", "Talasalitaan", "Pagsulat", "Kuwento"],
        "araling-panlipunan": ["Community", "History", "Geography", "Leaders", "Culture"],
        esp: ["Values", "Respect", "Kindness", "Honesty", "Family"],
        mapeh: ["Music", "Art", "PE", "Health", "Dance"],
        ict: ["Computer", "Keyboard", "Internet", "Safety", "Apps"],
        "mother-tongue": ["Alpabet", "Sounds", "Words", "Stories", "Family"],
      },
    },
    topicSuggestions: {
      title: "Pick a topic to start",
      subtitle: (category: string) => `Here are ${category} topics for your grade.`,
      subtitleGeneric: "Choose the lesson that looks most interesting.",
      error: "We couldn't find topics. Go back and try a different keyword.",
      empty: "No topics were found for that keyword. Try a different word.",
      retry: "Try Again",
      badge: (grade: number, subject: string) => {
        const labels: Record<string, string> = {
          mathematics: "Mathematics",
          science: "Science",
          english: "English",
          filipino: "Filipino",
          "araling-panlipunan": "Araling Panlipunan",
          esp: "ESP",
          mapeh: "MAPEH",
          ict: "ICT",
          "mother-tongue": "Mother Tongue",
        };
        return `Grade ${grade} ${labels[subject] ?? subject}`;
      },
      readingTime: (minutes: number) => `${minutes} min read`,
      difficulty: {
        easy: "Easy",
        moderate: "Moderate",
        challenging: "Challenge",
      },
    },
    goal: {
      title: "What's your goal right now?",
      subtitle: "This helps us guide your next steps.",
      options: {
        "exam-preparation": {
          label: "Exam Preparation",
          description: "Get ready for quarterly exams",
        },
        "homework-help": {
          label: "Homework Help",
          description: "Understand today's assignment",
        },
        "understand-concepts": {
          label: "Understand Concepts",
          description: "Learn topics deeply",
        },
        "resume-lesson": {
          label: "Resume Previous Lesson",
          description: "Pick up where you left off",
        },
      },
    },
  },
  learn: {
    minRead: (n: number) => `${n} min read`,
    offline: {
      label: "Offline Lesson",
      title: "Offline Learning Mode",
      body: "You're using preloaded lessons so you can keep learning even with a weak connection.",
    },
    teachDifferently: "Teach Me Differently",
    curriculum: {
      heading: "Curriculum Alignment",
      competency: "Competency",
    },
    sections: {
      simple: "Simple Explanation",
      secondExplanation: "Another Explanation",
      filipinoSecond: "Another Explanation",
      example: "Real-life Example",
      whyItMatters: "Why It Matters",
    },
    startMiniQuiz: "Start Mini Quiz",
    quickCheckButton: "Quick Check",
    error: {
      title: "We couldn't load your lesson",
      description:
        "Check your internet connection and try again. Your progress is safe.",
    },
    quickCheck: {
      title: "Quick Understanding Check",
      prompt: "How well do you understand this lesson so far?",
      groupAria: "How well do you understand this lesson?",
      options: {
        "got-it": {
          label: "I get it!",
          encouragement:
            "Awesome! You look ready. Let's prove it with a quick quiz.",
        },
        almost: {
          label: "Almost there",
          encouragement:
            "You're improving! It's okay to practice. The quiz will help it stick.",
        },
        confused: {
          label: "Still confused",
          encouragement:
            "That's okay! You can read the lesson above again. Take your time — you've got this.",
        },
      },
    },
    adaptive: {
      "another-explanation": {
        title: "Here's another way to look at it",
        body: "Sometimes a different explanation works better. Let's try a fresh take on this topic.",
      },
      simplified: {
        title: "Let's review this together, slowly",
        body: "It's okay to find it hard! We'll break it into smaller, easier steps. You can do this.",
      },
    },
  },
  quiz: {
    thisTopic: "this topic",
    questionLabel: "Question",
    checkAnswer: "Check Answer",
    seeResults: "See Results",
    nextQuestion: "Next Question",
    correctFeedback: "Correct! Nice work.",
    wrongFeedback: "Good try — let's learn it!",
    error: {
      title: "We couldn't load your quiz",
      description:
        "Check your internet connection and try again. Your progress is safe.",
      backToLesson: "Back to Lesson",
    },
    studyTips: "Study Tips",
    viewProgress: "View My Progress",
    nextUp: (topic: string) => `Next up: ${topic}`,
    whyNext: "Chosen for you based on your quiz result.",
    readyToMoveOn: (topic: string) => `You're ready to move on from ${topic}!`,
    morePractice: (topic: string) =>
      `A little more practice on ${topic} and you've got this.`,
    recommendation: {
      unlock: {
        badge: "Lesson Complete",
        primaryAction: "Next Lesson",
        secondaryAction: "Review This Lesson",
      },
      retry: {
        badge: "Almost There",
        primaryAction: "Try Quiz Again",
        secondaryAction: "Review This Lesson",
      },
      review: {
        badge: "Let's Review",
        primaryAction: "Review Lesson",
        secondaryAction: "Try Quiz Again",
      },
    },
  },
  progress: {
    title: "Your Progress",
    subtitle: "You're improving — keep going!",
    motivation: "Every lesson makes you stronger. Keep learning, one step at a time.",
    recommendedNext: {
      label: "Recommended Next",
      reviewMessage: "Let's review this one together to make it stick.",
      continueMessage: "Pick up right here and keep your momentum going.",
      reviewButton: "Review Lesson",
      continueButton: "Continue Learning",
    },
    todayGoal: {
      label: "Today's Goal",
      done: "Done! You hit today's goal. Great job!",
      remaining: (n: number) =>
        `${n} more to reach your daily goal. You've got this!`,
    },
    stats: {
      lessonsMastered: "Lessons Mastered",
      quizAccuracy: "Quiz Accuracy",
      mostRecent: "Most recent quiz",
      learningStreak: "Learning Streak",
      day: (n: number) => `${n} day`,
      days: (n: number) => `${n} days`,
      studyTime: "Study Time",
    },
    understanding: {
      meter: "Understanding Meter",
      great: "Great Progress",
      improving: "You're Improving",
      keepGoing: "Keep Going",
      starting: "Just Getting Started",
      ready: "Ready to Begin",
    },
    weekly: {
      title: "This Week's Study Time",
      empty1: "No study time yet this week",
      empty2: "Finish a quiz and watch your bars grow!",
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    topics: {
      heading: "Your Topics",
      mastered: "Mastered",
      review: "Review",
      ready: "Ready",
      locked: "Locked",
      best: (n: number) => ` · Best ${n}%`,
    },
  },
  settings: {
    title: "Settings",
    subtitle: "Adjust how EduBridge works for you.",
    dataPerf: {
      title: "Data & Performance",
      description: "Save data on slow or limited connections.",
    },
    language: {
      title: "Language",
      description: "Choose the language that helps you learn best.",
      current: (lang: string) => `Current: ${lang}`,
      tapToSwitch: "Tap to switch language.",
      toggleAria: (lang: string) => `Language: ${lang}. Tap to change.`,
    },
    startOver: {
      title: "Start Over",
      description: "Reset your choices and set up your learning again.",
      button: "Restart Onboarding",
    },
  },
  offline: {
    title: "You're offline",
    description:
      "Check your internet connection, then come back to continue your lesson. Your progress will be waiting for you.",
  },
  errorBoundary: {
    title: "Something went wrong",
    description:
      "Don't worry — your progress is safe. Try again and keep learning.",
  },
};

type Dictionary = typeof en;

const fil: Dictionary = {
  a11y: {
    skipToContent: "Pumunta sa main content",
    primaryNav: "Menu",
    preferredLanguage: "Wika mo",
    quizChoices: "Mga pagpipilian",
    selected: "Napili",
    notSelected: "Hindi napili",
    correctAnswer: "Tamang sagot",
    yourAnswerWrong: "Sagot mo — mali",
    optionLabel: (letter: string, text: string) => `${letter}. ${text}`,
  },
  common: {
    tryAgain: "Subukan ulit",
    back: "Bumalik",
    continue: "Susunod",
    loadingLesson: "Kinukuha ang aralin mo…",
    loadingQuiz: "Kinukuha ang quiz mo…",
    loadingProgress: "Kinukuha ang progress mo…",
  },
  landing: {
    hero: {
      badge: "Para sa Baitang 1–6 · Lahat ng asignatura",
      title: "Matuto nang mas madali, isang aralin bawat isa.",
      subtitle:
        "Kasama mo sa pag-aaral — may aralin, quiz, at tulong na akma sa iyo. Puwede sa Filipino o English.",
      primaryCta: "Mag-aral na",
      secondaryCta: "Paano gumagana",
      mockQuickCheck: "Mabilis na tanong",
      mockCaption: "Mga aralin — hindi chat",
    },
    problem: {
      heading: "Ang problemang tinutulungan namin",
      subheading:
        "Maraming batang gustong matuto — pero hindi lahat ng app ay para sa kanila.",
      points: {
        language: {
          title: "Mali ang wika ng aralin",
          body: "Karamihan ng app ay English lang. Maraming bata ang mas natututo sa Filipino.",
        },
        connection: {
          title: "Mahina o walang internet",
          body: "Mabibigat na app na laging kailangan ng internet ay hindi gumagana sa mababang data.",
        },
        guidance: {
          title: "Walang tumutulong",
          body: "Kapag walang guro malapit, mahirap malaman kung ano ang susunod na aralin.",
        },
      },
    },
    features: {
      heading: "Ginawa para sa iyo",
      subheading:
        "May sunod-sunod na aralin — hindi walang katapusang chat.",
      items: {
        "guided-lessons": {
          title: "May gabay na aralin",
          description:
            "Malinaw na paliwanag sa English o Filipino — may halimbawa mula sa jeepney, sari-sari store, at paaralan.",
        },
        "adaptive-practice": {
          title: "Quiz na akma sa iyo",
          description:
            "Maikling quiz na tumutulong sa iyo. Mag-practice hanggang sigurado ka, tapos susunod na aralin.",
        },
        "personalized-progress": {
          title: "Sinusubaybayan ang progress mo",
          description:
            "Makikita mo ang streak mo, score mo, at susunod na aralin. Alam mo kung ano ang susunod.",
        },
      },
    },
    howItWorks: {
      heading: "Paano gumagana",
      subheading: "Simple lang — aral, quiz, tapos susunod.",
      steps: {
        "1": {
          title: "Mag-aral",
          description:
            "Basahin ang maikling aralin para sa baitang mo. May halimbawa mula sa totoong buhay.",
        },
        "2": {
          title: "Mag-quiz",
          description:
            "Sagutin ang maikling tanong para makita kung naintindihan mo.",
        },
        "3": {
          title: "Gumaling",
          description:
            "May tulong at dagdag na practice kung kailangan. Walang hiya — may papuri.",
        },
        "4": {
          title: "Magpatuloy",
          description:
            "Susunod na aralin o ituloy kung saan ka tumigil. Panatilihin ang streak mo!",
        },
      },
    },
    footer: {
      ready: "Handa ka na bang mag-aral?",
      tagline: "Ginawa para sa mga batang Pilipino.",
    },
    languageChoice: {
      heading: "Piliin ang wika mo",
      options: {
        filipino: { label: "Filipino", description: "Aralin sa Filipino" },
        english: { label: "English", description: "Aralin sa English" },
      },
    },
  },
  nav: {
    learn: "Aralin",
    progress: "Progress",
    settings: "Settings",
    streakAria: (days: number) => `Streak: ${days} araw na nag-aaral`,
  },
  lowData: {
    compact: "Tipid data",
    title: "Tipid data mode",
    description: "Mas maikling aralin, walang animation, mas kaunting data.",
    activeHint: "Mas magaan ang pahina para makatipid ng data.",
    toggleAria: "Buksan o isara ang tipid data mode",
  },
  onboarding: {
    eyebrow: "Hanapin ang susunod mong aralin",
    step: (n: number, total: number) => `Hakbang ${n} sa ${total}`,
    continue: "Susunod",
    startLearning: "Mag-aral na",
    back: "Bumalik",
    grade: {
      title: "Anong baitang ka?",
      subtitle: "Iaakma namin ang aralin sa antas mo.",
      options: {
        "1": { label: "Baitang 1", description: "Simula ng pag-aaral" },
        "2": { label: "Baitang 2", description: "Lumalaki araw-araw" },
        "3": { label: "Baitang 3", description: "Mas may tiwala na" },
        "4": { label: "Baitang 4", description: "Matibay na pundasyon" },
        "5": { label: "Baitang 5", description: "Mas maraming alam" },
        "6": { label: "Baitang 6", description: "Handa sa susunod na antas" },
      },
    },
    subject: {
      title: "Pumili ng asignatura",
      subtitle: "Ano ang gusto mong aralin ngayon?",
      options: {
        science: { label: "Agham", description: "Alamin kung paano gumagana ang mundo" },
      },
    },
    language: {
      title: "Anong wika ang gusto mo?",
      subtitle: "Puwede mong palitan kahit kailan.",
      options: {
        filipino: { label: "Filipino", description: "Aralin sa Filipino" },
        english: { label: "English", description: "Aralin sa English" },
      },
    },
    topicDiscovery: {
      prompt: (subject: string) => {
        const labels: Record<string, string> = {
          mathematics: "Matematika",
          science: "Agham",
          english: "English",
          filipino: "Filipino",
          "araling-panlipunan": "Araling Panlipunan",
          esp: "ESP",
          mapeh: "MAPEH",
          ict: "ICT",
          "mother-tongue": "Mother Tongue",
        };
        return `Ano ang gusto mong matutunan sa ${labels[subject] ?? "asignaturang ito"}?`;
      },
      placeholder: "Ano ang gusto mong matutunan?",
      continue: "Hanapin ang paksa",
      loading: "Hinahanap ang mga paksa…",
      examplesBySubject: {
        mathematics: ["Pagdaragdag", "Fraction", "Mga hugis", "Oras", "Pera"],
        science: ["Halaman", "Hayop", "Planeta", "Katawan", "Magnet"],
        english: ["Pagbasa", "Grammar", "Salita", "Pagsulat", "Kuwento"],
        filipino: ["Pagbasa", "Gramatika", "Salita", "Pagsulat", "Kuwento"],
        "araling-panlipunan": ["Komunidad", "Kasaysayan", "Lugar", "Mga lider", "Kultura"],
        esp: ["Mabuting asal", "Respeto", "Kabaitan", "Katapatan", "Pamilya"],
        mapeh: ["Musika", "Sining", "PE", "Kalusugan", "Sayaw"],
        ict: ["Computer", "Keyboard", "Internet", "Kaligtasan", "Apps"],
        "mother-tongue": ["Alpabet", "Tunog", "Salita", "Kuwento", "Pamilya"],
      },
    },
    topicSuggestions: {
      title: "Pumili ng paksa",
      subtitle: (category: string) => `Narito ang mga paksang ${category} para sa baitang mo.`,
      subtitleGeneric: "Piliin ang pinaka-interesante sa iyo.",
      error: "Hindi namin mahanap ang paksa. Subukan ang ibang salita.",
      empty: "Walang nahanap na paksa. Subukan ang ibang salita.",
      retry: "Subukan ulit",
      badge: (grade: number, subject: string) => {
        const labels: Record<string, string> = {
          mathematics: "Matematika",
          science: "Agham",
          english: "English",
          filipino: "Filipino",
          "araling-panlipunan": "Araling Panlipunan",
          esp: "ESP",
          mapeh: "MAPEH",
          ict: "ICT",
          "mother-tongue": "Mother Tongue",
        };
        return `Baitang ${grade} ${labels[subject] ?? subject}`;
      },
      readingTime: (minutes: number) => `${minutes} min basahin`,
      difficulty: {
        easy: "Madali",
        moderate: "Katamtaman",
        challenging: "Mahirap",
      },
    },
    goal: {
      title: "Ano ang gusto mong gawin?",
      subtitle: "Para malaman namin kung paano ka tutulungan.",
      options: {
        "exam-preparation": {
          label: "Maghanda sa pagsusulit",
          description: "Mag-review para sa exam",
        },
        "homework-help": {
          label: "Tulong sa takdang-aralin",
          description: "Unawain ang homework ngayon",
        },
        "understand-concepts": {
          label: "Unawain ang aralin",
          description: "Matuto nang mabuti sa paksa",
        },
        "resume-lesson": {
          label: "Ituloy ang dati",
          description: "Magpatuloy kung saan ka tumigil",
        },
      },
    },
  },
  learn: {
    minRead: (n: number) => `${n} min basahin`,
    offline: {
      label: "Offline na aralin",
      title: "Offline mode",
      body: "Gumagamit ka ng naka-save na aralin. Puwede kang mag-aral kahit mahina ang internet.",
    },
    teachDifferently: "Iba pang paliwanag",
    curriculum: {
      heading: "Ayon sa kurikulum",
      competency: "Layunin",
    },
    sections: {
      simple: "Paliwanag",
      secondExplanation: "Isa pang paliwanag",
      filipinoSecond: "Isa pang paliwanag",
      example: "Halimbawa sa buhay",
      whyItMatters: "Bakit mahalaga",
    },
    startMiniQuiz: "Simulan ang quiz",
    quickCheckButton: "Mabilis na tanong",
    error: {
      title: "Hindi ma-load ang aralin",
      description:
        "Tingnan ang internet mo at subukan ulit. Safe ang progress mo.",
    },
    quickCheck: {
      title: "Naintindihan mo ba?",
      prompt: "Naintindihan mo ba ang aralin?",
      groupAria: "Naintindihan mo ba ang aralin?",
      options: {
        "got-it": {
          label: "Oo, gets ko!",
          encouragement:
            "Ang galing! Subukan natin sa quiz para mas sigurado.",
        },
        almost: {
          label: "Halos na",
          encouragement:
            "Gumagaling ka! Okay lang mag-practice. Makakatulong ang quiz.",
        },
        confused: {
          label: "Hindi pa",
          encouragement:
            "Okay lang! Basahin mo ulit ang aralin sa taas. Kaya mo yan!",
        },
      },
    },
    adaptive: {
      "another-explanation": {
        title: "Subukan natin sa ibang paraan",
        body: "Minsan mas madaling intindihin kapag iba ang paliwanag. Subukan natin ulit.",
      },
      simplified: {
        title: "Balikan natin nang dahan-dahan",
        body: "Okay lang kung mahirap! Hatiin natin sa maliliit na hakbang. Kaya mo yan!",
      },
    },
  },
  quiz: {
    thisTopic: "ang paksang ito",
    questionLabel: "Tanong",
    checkAnswer: "Tingnan ang sagot",
    seeResults: "Tingnan ang resulta",
    nextQuestion: "Susunod na tanong",
    correctFeedback: "Tama! Ang galing mo.",
    wrongFeedback: "Subukan mo ulit — matututo ka!",
    error: {
      title: "Hindi ma-load ang quiz",
      description:
        "Tingnan ang internet mo at subukan ulit. Safe ang progress mo.",
      backToLesson: "Bumalik sa aralin",
    },
    studyTips: "Mga tip sa pag-aaral",
    viewProgress: "Tingnan ang progress ko",
    nextUp: (topic: string) => `Susunod: ${topic}`,
    whyNext: "Pinili ito base sa resulta ng quiz mo.",
    readyToMoveOn: (topic: string) => `Handa ka na sa susunod pagkatapos ng ${topic}!`,
    morePractice: (topic: string) =>
      `Kaunting practice pa sa ${topic} at kaya mo na!`,
    recommendation: {
      unlock: {
        badge: "Tapos na ang aralin",
        primaryAction: "Susunod na aralin",
        secondaryAction: "Balikan ang aralin",
      },
      retry: {
        badge: "Halos na",
        primaryAction: "Subukan ulit ang quiz",
        secondaryAction: "Balikan ang aralin",
      },
      review: {
        badge: "Balikan muna",
        primaryAction: "Basahin ulit ang aralin",
        secondaryAction: "Subukan ulit ang quiz",
      },
    },
  },
  progress: {
    title: "Progress mo",
    subtitle: "Gumagaling ka — ituloy mo lang!",
    motivation: "Bawat aralin ay dagdag na alam. Isang hakbang lang bawat araw.",
    recommendedNext: {
      label: "Susunod na inirerekomenda",
      reviewMessage: "Balikan natin ito para mas tumatak sa isip mo.",
      continueMessage: "Ituloy dito at huwag putulin ang galing mo.",
      reviewButton: "Balikan ang aralin",
      continueButton: "Magpatuloy sa pag-aaral",
    },
    todayGoal: {
      label: "Goal ngayon",
      done: "Tapos na! Naabot mo ang goal ngayon. Ang galing mo!",
      remaining: (n: number) =>
        `${n} pa para sa goal ngayon. Kaya mo yan!`,
    },
    stats: {
      lessonsMastered: "Araling natapos",
      quizAccuracy: "Tamang sagot sa quiz",
      mostRecent: "Huling quiz",
      learningStreak: "Sunod-sunod na araw",
      day: (n: number) => `${n} araw`,
      days: (n: number) => `${n} araw`,
      studyTime: "Oras ng pag-aaral",
    },
    understanding: {
      meter: "Gaano mo naiintindihan",
      great: "Ang galing mo",
      improving: "Gumagaling ka",
      keepGoing: "Ituloy mo lang",
      starting: "Kasisimula pa lang",
      ready: "Handa nang magsimula",
    },
    weekly: {
      title: "Oras ng pag-aaral ngayong linggo",
      empty1: "Wala pang oras ng pag-aaral ngayong linggo",
      empty2: "Tapusin ang quiz at lalaki ang bar dito!",
      weekdays: ["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"],
    },
    topics: {
      heading: "Mga paksa mo",
      mastered: "Natapos",
      review: "Balikan",
      ready: "Handa na",
      locked: "Naka-lock",
      best: (n: number) => ` · Pinakamataas ${n}%`,
    },
  },
  settings: {
    title: "Settings",
    subtitle: "Ayusin kung paano gumagana ang EduBridge para sa iyo.",
    dataPerf: {
      title: "Data at bilis",
      description: "Makatipid ng data kapag mabagal ang internet.",
    },
    language: {
      title: "Wika",
      description: "Piliin ang wikang gusto mo sa pag-aaral.",
      current: (lang: string) => `Ngayon: ${lang}`,
      tapToSwitch: "Pindutin para palitan ang wika.",
      toggleAria: (lang: string) => `Wika: ${lang}. Pindutin para palitan.`,
    },
    startOver: {
      title: "Magsimula ulit",
      description: "I-reset ang mga pinili mo at mag-setup ulit.",
      button: "Simulan ulit ang setup",
    },
  },
  offline: {
    title: "Offline ka",
    description:
      "Tingnan ang internet mo, tapos bumalik para magpatuloy. Nandito pa ang progress mo.",
  },
  errorBoundary: {
    title: "May nangyaring mali",
    description:
      "Huwag mag-alala — safe ang progress mo. Subukan ulit at magpatuloy sa pag-aaral.",
  },
};

export const messages: Record<UiLanguage, Dictionary> = { en, fil };

export type { Dictionary };
