import type { ReactNode } from "react";

// Root layout — wraps every route. Keep it a passthrough so
// existing full-screen pages keep their own backgrounds.
// Add nav/footer providers here as the template grows.
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
