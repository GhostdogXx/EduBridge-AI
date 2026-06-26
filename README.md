# EduBridge AI

AI-powered study companion for Filipino learners — built for hackathon MVP deployment on Vercel.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React
- OpenAI GPT-4o mini
- Recharts
- Serwist (PWA)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your OpenAI API key to `.env.local`.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build with PWA service worker
- `npm run start` — Start production server
- `npm run lint` — ESLint

## Project Structure

```
src/
├── app/              # Routes, layout, PWA service worker
├── components/       # UI and feature components
├── context/          # React context (low data mode)
├── hooks/            # Custom hooks
├── lib/              # Constants, types, utilities, OpenAI client
└── prompts/          # AI prompt builders
```

## Development Phases

1. ✅ Project initialization, Tailwind, shadcn/ui, PWA
2. ✅ Landing page
3. ✅ Onboarding
4. ✅ Learning session
5. ✅ OpenAI integration
6. ✅ Quiz flow
7. ✅ Adaptive learning
8. ✅ Progress dashboard
9. ✅ Low data mode polish
10. ✅ Accessibility
11. ✅ Testing

## Deploy on Vercel

Push to GitHub and import the repo in Vercel. Set `OPENAI_API_KEY` and `NEXT_PUBLIC_APP_URL` in project environment variables.
