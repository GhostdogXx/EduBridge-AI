import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ErrorBoundary } from "@/components/error-boundary";
import { AppProviders } from "@/components/providers/app-providers";
import { APP_NAME } from "@/lib/constants";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Your AI-powered study companion designed for Filipino learners with bilingual lessons, adaptive quizzes, and personalized guidance.",
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fil" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>
        <AppProviders>
          <ErrorBoundary>{children}</ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  );
}
