import { describe, it, expect } from "vitest";
import { cn } from "@/lib";

describe("cn utility (clsx + tailwind-merge)", () => {
    it("combines class names correctly", () => {
        expect(cn("px-4", "py-2")).toBe("px-4 py-2");
    });

    it("handles conditional classes", () => {
        const isHidden = false;
        const isBold = true;
        expect(cn("base-class", isHidden && "hidden", isBold && "font-bold")).toBe(
            "base-class font-bold"
        );
    });

    it("resolves Tailwind class conflicts in favor of latter classes", () => {
        expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
        expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    });
});
