import { describe, it, expect } from "vitest";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email("Enter a valid email")),
  password: v.pipe(v.string(), v.minLength(8, "Minimum 8 characters")),
});

describe("Validation (Valibot + hookform resolvers)", () => {
  it("accepts valid input", () => {
    const result = v.safeParse(LoginSchema, { email: "a@b.com", password: "password123" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid input with issues", () => {
    const result = v.safeParse(LoginSchema, { email: "nope", password: "short" });
    expect(result.success).toBe(false);
  });

  it("works as a react-hook-form resolver", async () => {
    const resolver = valibotResolver(LoginSchema);
    const { values, errors } = await resolver(
      { email: "bad", password: "short" },
      undefined,
      { shouldUseNativeValidation: false, fields: {}, criteriaMode: "firstError" } as never,
    );
    expect(values).toEqual({});
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });
});
