import { useCallback, useEffect, useState } from "react";

export type ConsentState = "granted" | "denied" | null;

const COOKIE_NAME = "ga_consent";
const COOKIE_DAYS = 365;

function getCookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function useConsent() {
  const [consent, setConsentState] = useState<ConsentState>(() => {
    const stored = getCookieValue(COOKIE_NAME);
    if (stored === "granted" || stored === "denied") return stored;
    return null;
  });

  const setConsent = useCallback((value: "granted" | "denied") => {
    setCookie(COOKIE_NAME, value, COOKIE_DAYS);
    setConsentState(value);
  }, []);

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    const gtag = w.gtag as ((...args: unknown[]) => void) | undefined;

    if (consent === "granted" && typeof gtag === "function") {
      gtag("consent", "update", { analytics_storage: "granted" });
    } else if (consent === "denied" && typeof gtag === "function") {
      gtag("consent", "update", { analytics_storage: "denied" });
    }
  }, [consent]);

  return { consent, setConsent };
}
