import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

const retriedUrls = new WeakSet<object>();

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as (AxiosRequestConfig & { _retried?: boolean }) | undefined;

    // Single transparent retry for network errors / 5xx / 429.
    const status = error.response?.status;
    const shouldRetry =
      config &&
      !config._retried &&
      (error.code === "ERR_NETWORK" || status === 429 || (status !== undefined && status >= 500));

    if (shouldRetry && config) {
      config._retried = true;
      // Avoid double-retrying the exact same config object across interceptors.
      if (!retriedUrls.has(config)) {
        retriedUrls.add(config);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return api(config);
      }
    }

    // Centralized 401 hook — apps can subscribe or redirect to /login here.
    if (status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    throw error;
  }
);

export type ApiError = AxiosError<{ message?: string }>;
