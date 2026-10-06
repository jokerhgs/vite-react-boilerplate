import { describe, it, expect } from "vitest";
import { createQueryClient, queryClient } from "@/lib";

describe("Query Client (TanStack Query)", () => {
  it("exposes a shared singleton client", () => {
    expect(queryClient).toBeDefined();
    expect(queryClient.getDefaultOptions().queries?.retry).toBe(1);
    expect(queryClient.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(false);
  });

  it("creates isolated clients via factory", () => {
    const a = createQueryClient();
    const b = createQueryClient();
    expect(a).not.toBe(b);
    expect(a.getDefaultOptions().queries?.staleTime).toBe(30_000);
  });
});
