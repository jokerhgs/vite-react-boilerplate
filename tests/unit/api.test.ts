import { describe, it, expect } from "vitest";
import { api } from "@/lib";

describe("API Client (Axios)", () => {
    it("is configured with default JSON headers and timeout", () => {
        expect(api.defaults.timeout).toBe(10_000);
        expect(api.defaults.headers["Content-Type"]).toBe("application/json");
    });

    it("has a valid baseURL configured", () => {
        expect(api.defaults.baseURL).toBeDefined();
        expect(typeof api.defaults.baseURL).toBe("string");
    });
});
