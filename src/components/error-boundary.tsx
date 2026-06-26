"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStoredDictionary } from "@/lib/i18n";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("EduBridge AI error:", error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const t = getStoredDictionary();

      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
          <main
            id="main-content"
            tabIndex={-1}
            className="w-full max-w-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Card className="rounded-3xl shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
                <AlertTriangle
                  className="size-7 text-destructive"
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-xl">
                {this.props.fallbackTitle ?? t.errorBoundary.title}
              </CardTitle>
              <CardDescription>{t.errorBoundary.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="h-12 w-full rounded-2xl text-base"
                onClick={this.handleRetry}
                aria-label={t.common.tryAgain}
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                {t.common.tryAgain}
              </Button>
            </CardContent>
          </Card>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
