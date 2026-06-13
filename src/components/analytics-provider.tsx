import { type ReactNode, useEffect } from "react";
import { useConsent } from "../hooks/use-consent";
import { usePageTracking } from "../hooks/use-page-tracking";
import { initializeGA } from "../lib/analytics";
import { CookieBanner } from "./cookie-banner";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function setDefaultConsent() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    wait_for_update: 500,
  });
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const { consent, setConsent } = useConsent();
  const trackingEnabled = consent === "granted";

  useEffect(() => {
    setDefaultConsent();
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      initializeGA();
    }
  }, [consent]);

  usePageTracking(trackingEnabled);

  return (
    <>
      {children}
      {consent === null && (
        <CookieBanner
          onAccept={() => setConsent("granted")}
          onDecline={() => setConsent("denied")}
        />
      )}
    </>
  );
}
