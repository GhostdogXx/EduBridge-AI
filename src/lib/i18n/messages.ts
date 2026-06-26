import type { LanguagePreference } from "@/lib/types/learning";

export type UiLanguage = "en" | "fil";

/**
 * UI chrome is rendered in English or Filipino. Taglish learners get Filipino
 * chrome (their lesson *content* is still generated in Taglish by the model).
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
      badge: "For Grades 4–6 · Science · Taglish-friendly",
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
          body: "Most learning apps assume fluent English. Many Filipino students learn best in Filipino or Taglish.",
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
            "Clear explanations in English, Filipino, or Taglish — with real-life examples from jeepney rides to sari-sari stores.",
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
    eyebrow: "Quick setup · Less than 30 seconds",
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    continue: "Continue",
    startLearning: "Start Learning",
    back: "Back",
    grade: {
      title: "What grade are you in?",
      subtitle: "We'll match lessons to your level.",
      options: {
        "4": { label: "Grade 4", description: "Building strong foundations" },
        "5": { label: "Grade 5", description: "Growing your knowledge" },
        "6": { label: "Grade 6", description: "Preparing for the next level" },
      },
    },
    subject: {
      title: "What do you want to study?",
      subtitle: "More subjects are coming soon.",
      options: {
        science: { label: "Science", description: "Explore how the world works" },
      },
    },
    language: {
      title: "Which language helps you learn best?",
      subtitle: "You can change this anytime during a lesson.",
      options: {
        filipino: { label: "Filipino", description: "Lessons in Filipino" },
        taglish: { label: "Taglish", description: "A mix of English and Filipino" },
        english: { label: "English", description: "Lessons fully in English" },
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
      taglish: "In Taglish",
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
    skipToContent: "Lumaktaw sa pangunahing nilalaman",
    primaryNav: "Pangunahing nabigasyon",
    preferredLanguage: "Napiling wika",
    quizChoices: "Mga pagpipilian ng sagot",
    selected: "Napili",
    notSelected: "Hindi napili",
    correctAnswer: "Tamang sagot",
    yourAnswerWrong: "Iyong sagot — mali",
    optionLabel: (letter: string, text: string) => `${letter}. ${text}`,
  },
  common: {
    tryAgain: "Subukan Muli",
    back: "Bumalik",
    continue: "Magpatuloy",
    loadingLesson: "Naglo-load ng iyong aralin…",
    loadingQuiz: "Naglo-load ng iyong pagsusulit…",
    loadingProgress: "Naglo-load ng iyong progreso…",
  },
  landing: {
    hero: {
      badge: "Para sa Baitang 4–6 · Agham · Taglish-friendly",
      title: "Mas Matalinong Pag-aaral, Isang Aralin sa Bawat Pagkakataon.",
      subtitle:
        "Ang iyong AI-powered na kasama sa pag-aaral, ginawa para sa mga Pilipinong mag-aaral — may mga araling bilingüal, adaptive na pagsusulit, at personalized na gabay.",
      primaryCta: "Magsimulang Mag-aral",
      secondaryCta: "Paano Ito Gumagana",
      mockQuickCheck: "Mabilis na Pagsusuri",
      mockCaption: "Mga lesson card — hindi chat bubbles",
    },
    problem: {
      heading: "Ang problemang nilulutas namin",
      subheading:
        "Milyun-milyong estudyante sa probinsya ang gustong matuto — ngunit hindi para sa kanila ginawa ang mga karaniwang kasangkapan.",
      points: {
        language: {
          title: "Maling wika ng mga aralin",
          body: "Karamihan ng learning apps ay umaasa sa matatas na English. Maraming Pilipinong estudyante ang mas natututo sa Filipino o Taglish.",
        },
        connection: {
          title: "Mahina o walang internet",
          body: "Ang mabibigat at laging-online na apps ay hindi gumagana sa budget na telepono na may limitadong data.",
        },
        guidance: {
          title: "Walang gumagabay",
          body: "Kapag walang gurong malapit, mahirap malaman kung ano ang susunod na pag-aralan o saan nagkamali.",
        },
      },
    },
    features: {
      heading: "Ginawa para sa paraan ng iyong pag-aaral",
      subheading:
        "Maayos na mga aralin na gagabay sa iyo nang hakbang-hakbang — hindi walang katapusang chat.",
      items: {
        "guided-lessons": {
          title: "Gabay na mga Aralin",
          description:
            "Malinaw na paliwanag sa English, Filipino, o Taglish — may mga halimbawa mula sa pang-araw-araw na buhay, mula sa sakay ng jeep hanggang sari-sari store.",
        },
        "adaptive-practice": {
          title: "Adaptive na Pagsasanay",
          description:
            "Maiikling pagsusulit na umaangkop sa iyong pag-unawa. Mag-practice hanggang sigurado ka na, tapos magpatuloy.",
        },
        "personalized-progress": {
          title: "Personalized na Progreso",
          description:
            "Subaybayan ang iyong streak, accuracy, at susunod na inirerekomendang aralin. Alam mo lagi kung ano ang susunod.",
        },
      },
    },
    howItWorks: {
      heading: "Paano Ito Gumagana",
      subheading:
        "Bawat session ay may simpleng daan — walang kalituhan, walang patumpik-tumpik.",
      steps: {
        "1": {
          title: "Mag-aral",
          description:
            "Magbasa ng maikling aralin na ginawa para sa iyong baitang, may mga halimbawang pamilyar sa pang-araw-araw na buhay.",
        },
        "2": {
          title: "Magsanay",
          description:
            "Sagutin ang maiikling tanong nang isa-isa para masuri ang iyong naunawaan.",
        },
        "3": {
          title: "Gumaling",
          description:
            "Makakuha ng kapaki-pakinabang na feedback at karagdagang pagsasanay kung kailangan — walang hiya, laging may paghikayat.",
        },
        "4": {
          title: "Magpatuloy",
          description:
            "I-unlock ang susunod na aralin o ipagpatuloy kung saan ka tumigil. Panatilihin ang iyong streak!",
        },
      },
    },
    footer: {
      ready: "Handa ka na bang mag-aral?",
      tagline: "Ginawa nang may malasakit para sa mga Pilipinong mag-aaral.",
    },
    languageChoice: {
      heading: "Piliin ang iyong wika",
    },
  },
  nav: {
    learn: "Aralin",
    progress: "Progreso",
    settings: "Mga Setting",
    streakAria: (days: number) => `Streak ng pag-aaral: ${days} araw`,
  },
  lowData: {
    compact: "Tipid Data",
    title: "Tipid Data Mode",
    description: "Mas magaang aralin, walang animation, mas kaunting data.",
    activeHint: "Mas magaan na pahina at maiikling aralin para makatipid ng data.",
    toggleAria: "I-toggle ang Tipid Data Mode",
  },
  onboarding: {
    eyebrow: "Mabilis na setup · Wala pang 30 segundo",
    step: (n: number, total: number) => `Hakbang ${n} ng ${total}`,
    continue: "Magpatuloy",
    startLearning: "Magsimulang Mag-aral",
    back: "Bumalik",
    grade: {
      title: "Anong baitang ka na?",
      subtitle: "Itutugma namin ang mga aralin sa iyong antas.",
      options: {
        "4": { label: "Baitang 4", description: "Pagbuo ng matibay na pundasyon" },
        "5": { label: "Baitang 5", description: "Pinapalawak ang iyong kaalaman" },
        "6": { label: "Baitang 6", description: "Paghahanda sa susunod na antas" },
      },
    },
    subject: {
      title: "Ano ang gusto mong pag-aralan?",
      subtitle: "May darating pang ibang asignatura.",
      options: {
        science: { label: "Agham", description: "Tuklasin kung paano gumagana ang mundo" },
      },
    },
    language: {
      title: "Aling wika ang nakakatulong sa iyong pag-aaral?",
      subtitle: "Mababago mo ito anumang oras habang nag-aaral.",
      options: {
        filipino: { label: "Filipino", description: "Mga aralin sa Filipino" },
        taglish: { label: "Taglish", description: "Halong English at Filipino" },
        english: { label: "English", description: "Mga aralin sa English" },
      },
    },
    goal: {
      title: "Ano ang iyong layunin ngayon?",
      subtitle: "Makakatulong ito para gabayan ka sa susunod.",
      options: {
        "exam-preparation": {
          label: "Paghahanda sa Pagsusulit",
          description: "Maghanda para sa quarterly exams",
        },
        "homework-help": {
          label: "Tulong sa Takdang-Aralin",
          description: "Unawain ang takdang-aralin ngayon",
        },
        "understand-concepts": {
          label: "Unawain ang mga Konsepto",
          description: "Matutunan nang malalim ang mga paksa",
        },
        "resume-lesson": {
          label: "Ituloy ang Nakaraang Aralin",
          description: "Magpatuloy kung saan ka tumigil",
        },
      },
    },
  },
  learn: {
    minRead: (n: number) => `${n} min basahin`,
    offline: {
      label: "Offline na Aralin",
      title: "Offline na Pag-aaral",
      body: "Gumagamit ka ng mga nakahandang aralin para makapag-aral kahit mahina ang koneksyon.",
    },
    teachDifferently: "Ituro sa Ibang Paraan",
    curriculum: {
      heading: "Pagkakahanay sa Kurikulum",
      competency: "Kompetensi",
    },
    sections: {
      simple: "Simpleng Paliwanag",
      taglish: "Sa Taglish",
      example: "Halimbawa sa Totoong Buhay",
      whyItMatters: "Bakit Ito Mahalaga",
    },
    startMiniQuiz: "Simulan ang Mini Quiz",
    quickCheckButton: "Mabilis na Pagsusuri",
    error: {
      title: "Hindi ma-load ang iyong aralin",
      description:
        "Tingnan ang iyong koneksyon sa internet at subukang muli. Ligtas ang iyong progreso.",
    },
    quickCheck: {
      title: "Mabilis na Pagsusuri ng Pang-unawa",
      prompt: "Gaano mo na naiintindihan ang araling ito sa ngayon?",
      groupAria: "Gaano mo naiintindihan ang araling ito?",
      options: {
        "got-it": {
          label: "Naiintindihan ko!",
          encouragement:
            "Ang galing mo! Mukhang handa ka na. Patunayan natin sa isang mabilis na quiz.",
        },
        almost: {
          label: "Halos na",
          encouragement:
            "Gumagaling ka! Tama lang na mag-practice. Makakatulong ang quiz para tumatak.",
        },
        confused: {
          label: "Litó pa",
          encouragement:
            "Okay lang yan! Pwede mong basahin ulit ang lesson sa taas. Take your time — kaya mo 'to.",
        },
      },
    },
    adaptive: {
      "another-explanation": {
        title: "Narito ang ibang paraan ng pagtingin dito",
        body: "Minsan mas gumagana ang ibang paliwanag. Subukan natin ang panibagong paraan sa paksang ito.",
      },
      simplified: {
        title: "Balikan natin ito nang dahan-dahan",
        body: "Okay lang mahirapan! Hahatiin natin ito sa mas maliliit at mas madaling hakbang. Kaya mo 'to.",
      },
    },
  },
  quiz: {
    thisTopic: "ang paksang ito",
    questionLabel: "Tanong",
    checkAnswer: "Tingnan ang Sagot",
    seeResults: "Tingnan ang Resulta",
    nextQuestion: "Susunod na Tanong",
    correctFeedback: "Tama! Magaling.",
    wrongFeedback: "Magaling subukan — pag-aralan natin!",
    error: {
      title: "Hindi ma-load ang iyong pagsusulit",
      description:
        "Tingnan ang iyong koneksyon sa internet at subukang muli. Ligtas ang iyong progreso.",
      backToLesson: "Bumalik sa Aralin",
    },
    studyTips: "Mga Tip sa Pag-aaral",
    viewProgress: "Tingnan ang Aking Progreso",
    nextUp: (topic: string) => `Susunod: ${topic}`,
    whyNext: "Pinili para sa iyo batay sa resulta ng iyong pagsusulit.",
    readyToMoveOn: (topic: string) =>
      `Handa ka nang magpatuloy mula sa ${topic}!`,
    morePractice: (topic: string) =>
      `Konting practice pa sa ${topic} at kaya mo na ito.`,
    recommendation: {
      unlock: {
        badge: "Tapos na ang Aralin",
        primaryAction: "Susunod na Aralin",
        secondaryAction: "Balikan ang Araling Ito",
      },
      retry: {
        badge: "Halos na",
        primaryAction: "Subukan Muli ang Pagsusulit",
        secondaryAction: "Balikan ang Araling Ito",
      },
      review: {
        badge: "Balikan Natin",
        primaryAction: "Balikan ang Aralin",
        secondaryAction: "Subukan Muli ang Pagsusulit",
      },
    },
  },
  progress: {
    title: "Ang Iyong Progreso",
    subtitle: "Gumagaling ka — ituloy mo lang!",
    motivation: "Bawat aralin ay nagpapalakas sa iyo. Ituloy mo lang, isang hakbang sa bawat pagkakataon.",
    recommendedNext: {
      label: "Inirerekomendang Susunod",
      reviewMessage: "Balikan natin ito nang sama-sama para tumatak.",
      continueMessage: "Magpatuloy dito at panatilihin ang sigla.",
      reviewButton: "Balikan ang Aralin",
      continueButton: "Ipagpatuloy ang Pag-aaral",
    },
    todayGoal: {
      label: "Layunin Ngayon",
      done: "Tapos na! Naabot mo ang layunin ngayon. Ang galing mo!",
      remaining: (n: number) =>
        `${n} pa para maabot ang iyong layunin ngayon. Kaya mo 'to!`,
    },
    stats: {
      lessonsMastered: "Mga Araling Naunawaan",
      quizAccuracy: "Tama sa Pagsusulit",
      mostRecent: "Pinakahuling pagsusulit",
      learningStreak: "Streak ng Pag-aaral",
      day: (n: number) => `${n} araw`,
      days: (n: number) => `${n} araw`,
      studyTime: "Oras ng Pag-aaral",
    },
    understanding: {
      meter: "Sukatan ng Pang-unawa",
      great: "Mahusay na Progreso",
      improving: "Gumagaling Ka",
      keepGoing: "Ituloy Mo Lang",
      starting: "Kasisimula Pa Lang",
      ready: "Handa nang Magsimula",
    },
    weekly: {
      title: "Oras ng Pag-aaral Ngayong Linggo",
      empty1: "Wala pang oras ng pag-aaral ngayong linggo",
      empty2: "Tapusin ang isang pagsusulit at makikita mong lalaki ang mga bar!",
      weekdays: ["Lin", "Lun", "Mar", "Miy", "Huw", "Biy", "Sab"],
    },
    topics: {
      heading: "Ang Iyong mga Paksa",
      mastered: "Naunawaan",
      review: "Balikan",
      ready: "Handa",
      locked: "Naka-lock",
      best: (n: number) => ` · Pinakamataas ${n}%`,
    },
  },
  settings: {
    title: "Mga Setting",
    subtitle: "Ayusin kung paano gumagana ang EduBridge para sa iyo.",
    dataPerf: {
      title: "Data at Performance",
      description: "Makatipid ng data sa mabagal o limitadong koneksyon.",
    },
    language: {
      title: "Wika",
      description: "Piliin ang wikang nakakatulong sa iyong pag-aaral.",
      current: (lang: string) => `Kasalukuyan: ${lang}`,
      tapToSwitch: "I-tap para palitan ang wika.",
      toggleAria: (lang: string) => `Wika: ${lang}. I-tap para palitan.`,
    },
    startOver: {
      title: "Magsimula Muli",
      description: "I-reset ang iyong mga pinili at i-setup muli ang iyong pag-aaral.",
      button: "Simulan Muli ang Onboarding",
    },
  },
  offline: {
    title: "Offline ka ngayon",
    description:
      "Tingnan ang iyong koneksyon sa internet, tapos bumalik para ipagpatuloy ang aralin. Naghihintay ang iyong progreso.",
  },
  errorBoundary: {
    title: "May Nangyaring Mali",
    description:
      "Huwag mag-alala — ligtas ang iyong progreso. Subukan muli at magpatuloy sa pag-aaral.",
  },
};

export const messages: Record<UiLanguage, Dictionary> = { en, fil };

export type { Dictionary };
