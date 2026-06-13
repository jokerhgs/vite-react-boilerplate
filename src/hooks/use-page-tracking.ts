import { useEffect } from "react";
import { useLocation } from "react-router";
import { sendPageview } from "../lib/analytics";

export function usePageTracking(enabled: boolean) {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!enabled) return;

    const url = search ? `${pathname}${search}` : pathname;
    sendPageview(url);
  }, [pathname, search, enabled]);
}
