export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";
export const API_TIMEOUT = 10_000;
export const API_RETRY_DELAY = 500;

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  timeout?: number;
  /** Set false to skip the single transparent retry. */
  retry?: boolean;
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function buildUrl(path: string, params?: ApiRequestOptions["params"]): string {
  const base = path.startsWith("http") ? path : `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  if (!params) return base;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.append(key, String(value));
  }
  const query = search.toString();
  return query ? `${base}?${query}` : base;
}

function isRetriable(status: number | null): boolean {
  return status === null || status === 429 || status >= 500;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function dispatchUnauthorized(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:unauthorized"));
  }
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
  try {
    const text = await response.text();
    return text === "" ? null : text;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { params, body, timeout = API_TIMEOUT, retry = true, headers, signal, ...rest } = options;

  const doFetch = async (): Promise<Response> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    // Link an external signal if provided.
    if (signal) {
      if (signal.aborted) controller.abort();
      else signal.addEventListener("abort", () => controller.abort(), { once: true });
    }
    try {
      return await fetch(buildUrl(path, params), {
        ...rest,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
      });
    } finally {
      clearTimeout(timer);
    }
  };

  let attempt = 0;
  for (;;) {
    attempt += 1;
    let response: Response;
    try {
      response = await doFetch();
    } catch (error) {
      // Network error / abort (excluding explicit external abort) → single retry.
      const wasExternalAbort = signal?.aborted ?? false;
      if (retry && attempt === 1 && !wasExternalAbort) {
        await delay(API_RETRY_DELAY);
        continue;
      }
      throw error;
    }

    if (response.ok) {
      return (await parseBody(response)) as T;
    }

    if (response.status === 401) dispatchUnauthorized();

    if (retry && attempt === 1 && isRetriable(response.status)) {
      await delay(API_RETRY_DELAY);
      continue;
    }

    const data = await parseBody(response);
    const message =
      (typeof data === "object" && data !== null && "message" in data
        ? String((data as { message?: unknown }).message)
        : null) ?? `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }
}

type QueryParams = ApiRequestOptions["params"];

export const api = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  request: apiRequest,
  get: <T>(path: string, options?: Omit<ApiRequestOptions, "body" | "method"> & { params?: QueryParams }) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "body">) =>
    apiRequest<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "body">) =>
    apiRequest<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<ApiRequestOptions, "body">) =>
    apiRequest<T>(path, { ...options, method: "PATCH", body }),
  del: <T>(path: string, options?: Omit<ApiRequestOptions, "body" | "method">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
