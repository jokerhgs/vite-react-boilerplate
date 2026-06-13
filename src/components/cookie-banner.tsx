import { useState } from "react";

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieBanner({ onAccept, onDecline }: CookieBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-foreground">
              We value your privacy
            </p>
            <p className="text-sm text-muted-foreground">
              We use cookies to analyze site traffic and optimize your experience.
              By accepting, anonymous usage data is collected via Google Analytics.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              onClick={() => {
                setVisible(false);
                onDecline();
              }}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Decline
            </button>
            <button
              onClick={() => {
                setVisible(false);
                onAccept();
              }}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
