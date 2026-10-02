import { describe, it, expect, beforeEach } from "vitest";
import { useUiStore } from "@/stores";

describe("UI Store (Zustand)", () => {
    beforeEach(() => {
        useUiStore.setState({ sidebarOpen: false });
    });

    it("initializes with sidebarOpen false", () => {
        expect(useUiStore.getState().sidebarOpen).toBe(false);
    });

    it("updates sidebarOpen via setSidebarOpen", () => {
        useUiStore.getState().setSidebarOpen(true);
        expect(useUiStore.getState().sidebarOpen).toBe(true);

        useUiStore.getState().setSidebarOpen(false);
        expect(useUiStore.getState().sidebarOpen).toBe(false);
    });

    it("toggles sidebarOpen via toggleSidebar", () => {
        useUiStore.getState().toggleSidebar();
        expect(useUiStore.getState().sidebarOpen).toBe(true);

        useUiStore.getState().toggleSidebar();
        expect(useUiStore.getState().sidebarOpen).toBe(false);
    });
});
