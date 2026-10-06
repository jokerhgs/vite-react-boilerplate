import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { api, ApiError, API_BASE_URL, API_TIMEOUT } from "@/lib";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("API Client (fetch)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is configured with default JSON timeout and baseURL", () => {
    expect(api.timeout).toBe(API_TIMEOUT);
    expect(api.baseURL).toBeDefined();
    expect(typeof api.baseURL).toBe("string");
  });

  it("sends JSON headers and parses JSON responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ hello: "world" }));
    vi.stubGlobal("fetch", fetchMock);

    const data = await api.get<{ hello: string }>("/hello");

    expect(data).toEqual({ hello: "world" });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
  });

  it("prefixes relative paths with the base URL and appends params", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(null));
    vi.stubGlobal("fetch", fetchMock);

    await api.get("/users", { params: { page: 2 } });

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${API_BASE_URL}/users?page=2`);
  });

  it("retries once on 500 then succeeds", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ message: "boom" }, 500))
      .mockResolvedValueOnce(jsonResponse({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const data = await api.get<{ ok: boolean }>("/flaky");
    expect(data).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws ApiError with status and body on failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "nope" }, 404)));

    const error = await api.get("/missing").catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(404);
    expect((error as ApiError).message).toBe("nope");
  });

  it("dispatches auth:unauthorized on 401", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "unauth" }, 401)));
    const listener = vi.fn();
    window.addEventListener("auth:unauthorized", listener);

    await api.get("/me").catch(() => {});
    expect(listener).toHaveBeenCalledOnce();

    window.removeEventListener("auth:unauthorized", listener);
  });
});
