# Google Analytics 4 (GA4) Integration

This branch (`ga4-integration`) adds GA4 tracking with GDPR-compliant cookie consent and Google Consent Mode v2.

## Features

- **react-ga4** for GA4 initialization and event tracking
- **Google Consent Mode v2** — blocks analytics until user consent (required for EU/EEA)
- **Custom cookie consent banner** — Tailwind-styled, matches the project design system
- **Automatic page view tracking** — fires on every React Router navigation
- **Environment-based config** — measurement ID via `VITE_GA4_ID` env var

## Setup

### 1. Create your `.env` file

```bash
cp .env.example .env
```

Set your GA4 measurement ID:

```
VITE_GA4_ID=G-XXXXXXXXXX
```

You can find this in your [Google Analytics](https://analytics.google.com/) admin panel under **Data Streams > Web**.

### 2. Run the dev server

```bash
pnpm dev
```

The cookie consent banner will appear at the bottom of the screen. GA4 only loads after the user clicks **Accept All**.

## File Structure

```
src/
├── lib/
│   └── analytics.ts              # GA4 init, pageview, and event helpers
├── hooks/
│   ├── use-consent.ts            # Cookie-based consent state management
│   └── use-page-tracking.ts      # Page view tracking on route change
├── components/
│   ├── analytics-provider.tsx    # Root wrapper — gates GA4 behind consent
│   └── cookie-banner.tsx         # GDPR cookie consent banner
```

## How It Works

### Consent Flow

1. App loads → `AnalyticsProvider` mounts
2. Sets Google Consent Mode v2 defaults (`analytics_storage: 'denied'`)
3. Checks for existing `ga_consent` cookie
   - **No cookie** → renders `<CookieBanner />`, GA4 stays off
   - **`granted`** → initializes GA4, sends page views
   - **`denied`** → GA4 never loads
4. User clicks Accept → cookie set to `granted`, GA4 initializes
5. User clicks Decline → cookie set to `denied`, no tracking

### Consent Mode v2

Google Consent Mode v2 is required for GA4 in EU/EEA regions. It ensures:

- No analytics cookies are set until consent is granted
- The `gtag.js` script loads with `analytics_storage: 'denied'` by default
- Consent state is updated to `granted` only after user acceptance

### Page View Tracking

The `usePageTracking` hook listens to React Router's `useLocation()` and fires a page view event on every route change. It only sends data when consent is `granted`.

### Custom Events

Use the `sendEvent` helper from `src/lib/analytics.ts`:

```ts
import { sendEvent } from "../lib/analytics";

sendEvent("button_click", { category: "engagement", label: "hero-cta" });
```

## Customization

### Cookie Expiry

Default: 365 days. Change `COOKIE_DAYS` in `src/hooks/use-consent.ts`.

### Banner Styling

Edit `src/components/cookie-banner.tsx`. The banner uses the project's Tailwind design tokens (e.g., `bg-card`, `text-muted-foreground`, `bg-primary`).

### Consent Cookie Name

Default: `ga_consent`. Change `COOKIE_NAME` in `src/hooks/use-consent.ts`.

## Branch Notes

This integration lives on the `ga4-integration` branch. The `main` branch remains analytics-free. To use this variant:

```bash
git clone -b ga4-integration <repo-url>
```

Or merge into your project:

```bash
git merge ga4-integration
```
