# EduBridge AI

**Learn Smarter, One Lesson at a Time.**

EduBridge AI is an AI-powered study companion built for Filipino elementary students (Grades 1–6). It delivers guided lessons, adaptive quizzes, and personalized progress tracking in **English** or **Filipino** — designed for learners on budget phones, slow connections, and areas with weak internet.

Built for our hackathon submission by **Team Git Happens**.

**Live demo:** [https://edubridge-ai-lovat.vercel.app](https://edubridge-ai-lovat.vercel.app)  
**Repository:** [https://github.com/GhostdogXx/EduBridge-AI](https://github.com/GhostdogXx/EduBridge-AI)

---

## Table of Contents

- [Project Description](#project-description)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [AI Tools & APIs Used](#ai-tools--apis-used)
- [Team](#team)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Deployment (Vercel)](#deployment-vercel)
- [Testing](#testing)
- [License](#license)

---

## Project Description

Many Filipino students in the provinces face three barriers: lessons that assume fluent English, apps that require always-on internet, and no one nearby to guide what to study next. EduBridge AI addresses these with a **structured learning path** — not open-ended chat.

### How it works

1. **Onboard** — Choose grade, subject, and a keyword; AI suggests curriculum-aligned topics.
2. **Learn** — Read a short bilingual lesson with real-life examples (jeepney rides, sari-sari stores, etc.).
3. **Practice** — Take a mini quiz one question at a time.
4. **Improve** — Get encouraging feedback; retry or unlock the next topic based on score.
5. **Track progress** — Streaks, accuracy, study time, and recommended next lessons.
6. **Study offline** — Download a lesson and quiz to the device for use without internet.

### Target users

- Elementary students (Grades 1–6) in the Philippines  
- Subjects: Mathematics, Science, English, Filipino, Araling Panlipunan, ESP, MAPEH, ICT, Mother Tongue  
- Learners who prefer **Filipino** or **English** instruction  

---

## Key Features

| Feature | Description |
|--------|-------------|
| **AI topic discovery** | Keyword-based topic suggestions aligned to DepEd K–12 |
| **Guided lessons** | Simple explanations, examples, and “why it matters” sections |
| **Mini quizzes** | 4-option questions with instant feedback |
| **Adaptive learning** | Different lesson variants after low quiz scores |
| **Progress dashboard** | Streak, accuracy, weekly study chart, topic mastery |
| **Offline download** | Save lesson + quiz locally for offline access |
| **Low data mode** | Shorter content, fewer animations, less bandwidth |
| **PWA** | Installable app with service worker and offline fallback page |
| **Accessibility** | Skip links, ARIA labels, keyboard-friendly UI |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Charts | [Recharts](https://recharts.org/) |
| Validation | [Zod](https://zod.dev/) |
| PWA | [Serwist](https://serwist.pages.dev/) |
| AI SDK | [OpenAI Node SDK](https://github.com/openai/openai-node) |
| Testing | [Vitest](https://vitest.dev/) |
| Deployment | [Vercel](https://vercel.com/) |
| Version control | [GitHub](https://github.com/) |

---

## AI Tools & APIs Used

### AI assistants (development & design)

We used multiple AI tools throughout planning, coding, debugging, and documentation:

| Tool | Use |
|------|-----|
| **ChatGPT (OpenAI)** | Feature planning, prompt drafting, debugging help |
| **Claude (Anthropic)** | Code review, architecture suggestions, copy refinement |
| **Gemini (Google AI Studio)** | Early prototyping and alternative prompt testing |
| **Cursor AI** | In-IDE pair programming, refactoring, and deployment support |

### AI APIs (runtime — lesson & quiz generation)

| API | Role |
|-----|------|
| **Google Gemini API** | Initial AI integration during early development (topic discovery, lessons, quizzes) |
| **OpenAI API** | Current production API — `gpt-4o-mini` (primary) with `gpt-4o` fallback for structured lesson, quiz, evaluation, and topic discovery responses |

> **Note:** The app currently reads `OPENAI_API_KEY` from environment variables. Gemini was used during the hackathon build phase before migrating to OpenAI for improved reliability.

---

## Team

**Hackathon team:** Git Happens

| Role | Name |
|------|------|
| **Team Representative** | Jan Paul Fadriquela |
| **Member** | Karl Emmanuel Robles |
| **Member** | Derrick Odda |
| **Member** | John Laurence Gueverra |

---

## Setup Instructions

### Prerequisites

- **Node.js** 18+ (20+ recommended) — [https://nodejs.org](https://nodejs.org)
- **npm** (included with Node.js)
- An **OpenAI API key** — [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 1. Clone the repository

```bash
git clone https://github.com/GhostdogXx/EduBridge-AI.git
cd EduBridge-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and add your API key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Windows (PowerShell):** If `npm run dev` is blocked by execution policy, use `npm.cmd run dev` instead.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

If port 3000 is busy, Next.js will use the next available port (e.g. `3001`) — check the terminal output for the exact URL.

### 5. Production build (optional)

```bash
npm run build
npm run start
```

> **Tip:** Stop the dev server before running `npm run build` to avoid `.next` cache conflicts on Windows.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for AI-generated lessons, quizzes, and topic discovery |
| `NEXT_PUBLIC_APP_URL` | No | Public app URL (use `http://localhost:3000` locally; set to your Vercel URL in production) |

Never commit `.env.local` or real API keys to Git.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build + PWA service worker |
| `npm run start` | Run production server locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest unit tests |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── topics/         # AI topic discovery
│   │   ├── lesson/         # AI lesson generation
│   │   ├── quiz/           # AI quiz generation
│   │   └── evaluation/     # Post-quiz feedback
│   ├── learn/              # Lesson view
│   ├── quiz/               # Quiz flow
│   ├── progress/           # Progress dashboard
│   ├── onboarding/         # Grade → subject → topic setup
│   ├── settings/           # Preferences & saved offline lessons
│   └── sw.ts               # Serwist service worker source
├── components/             # UI and feature components
├── context/                # App-wide state (profile, language, low data mode)
├── hooks/                  # Data-fetching and offline download hooks
├── lib/                    # Constants, types, AI client, offline storage
├── prompts/                # AI prompt builders (provider-agnostic)
└── i18n/                   # English & Filipino UI strings
```

---

## Deployment (Vercel)

The app is deployed on **Vercel** with GitHub integration for automatic deploys on push to `main`.

### Steps

1. Push the repo to GitHub.
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. Add environment variables:
   - `OPENAI_API_KEY` — your OpenAI key (Production + Preview)
   - `NEXT_PUBLIC_APP_URL` — e.g. `https://edubridge-ai-lovat.vercel.app`
4. Deploy. Vercel runs `npm run build` automatically.

### Manual deploy (CLI)

```bash
npx vercel --prod
```

---

## Testing

Run the test suite:

```bash
npm test
```

Tests cover validation, adaptive logic, learning path, topic utilities, and progress stats.

---

## License

This project was built for a hackathon submission. All rights reserved by **Team Git Happens** unless otherwise specified by the event organizers.

---

*Made with care for Filipino learners.*
