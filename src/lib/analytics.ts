import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_ID as string;

export function initializeGA() {
  if (!GA_MEASUREMENT_ID) {
    console.warn("GA4 Measurement ID not found. Set VITE_GA4_ID in your .env file.");
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID);
}

export function sendPageview(path: string, title?: string) {
  ReactGA.send({ hitType: "pageview", page: path, title });
}

export function sendEvent(name: string, params?: Record<string, string | number | boolean>) {
  ReactGA.event(name, params);
}
