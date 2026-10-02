import { describe, it, expect } from "vitest";
import {
    filePathToRoute,
    dirOf,
    isPrefixDir,
    specificityScore,
    buildRoutes,
    builtRoutes,
} from "@/router";

describe("Routing Engine", () => {
    describe("filePathToRoute", () => {
        it("converts root page to '/'", () => {
            expect(filePathToRoute("./app/page.tsx")).toBe("/");
        });

        it("converts simple static routes", () => {
            expect(filePathToRoute("./app/about/page.tsx")).toBe("/about");
            expect(filePathToRoute("./app/dashboard/page.tsx")).toBe("/dashboard");
        });

        it("converts nested static routes", () => {
            expect(filePathToRoute("./app/dashboard/settings/profile/page.tsx")).toBe(
                "/dashboard/settings/profile"
            );
        });

        it("converts dynamic [param] to :param", () => {
            expect(filePathToRoute("./app/users/[id]/page.tsx")).toBe("/users/:id");
            expect(filePathToRoute("./app/blog/[slug]/page.tsx")).toBe("/blog/:slug");
        });

        it("converts multiple dynamic parameters in a path", () => {
            expect(
                filePathToRoute("./app/orgs/[orgId]/projects/[projectId]/page.tsx")
            ).toBe("/orgs/:orgId/projects/:projectId");
        });

        it("handles hyphens and underscores in dynamic parameters", () => {
            expect(
                filePathToRoute("./app/teams/[team_id]/members/[member-id]/page.tsx")
            ).toBe("/teams/:team_id/members/:member-id");
        });
    });

    describe("dirOf helper", () => {
        it("slices suffix from filepath correctly", () => {
            expect(dirOf("./app/about/page.tsx", "/page.tsx")).toBe("./app/about");
            expect(dirOf("./app/page.tsx", "/page.tsx")).toBe("./app");
            expect(dirOf("./app/users/[id]/layout.tsx", "/layout.tsx")).toBe(
                "./app/users/[id]"
            );
        });
    });

    describe("isPrefixDir helper", () => {
        it("matches exact directories", () => {
            expect(isPrefixDir("./app", "./app")).toBe(true);
            expect(isPrefixDir("./app/about", "./app/about")).toBe(true);
        });

        it("matches nested child directories", () => {
            expect(isPrefixDir("./app", "./app/about")).toBe(true);
            expect(isPrefixDir("./app", "./app/users/[id]")).toBe(true);
            expect(isPrefixDir("./app/dashboard", "./app/dashboard/settings")).toBe(true);
        });

        it("rejects non-prefix directories", () => {
            expect(isPrefixDir("./app/about", "./app/other")).toBe(false);
            expect(isPrefixDir("./app/dash", "./app/dashboard")).toBe(false);
        });
    });

    describe("specificityScore", () => {
        it("scores static routes with 0 dynamic segments", () => {
            const [dynamicCount, depth, path] = specificityScore("/dashboard/settings");
            expect(dynamicCount).toBe(0);
            expect(depth).toBe(2);
            expect(path).toBe("/dashboard/settings");
        });

        it("scores dynamic routes with positive dynamic count", () => {
            const [dynamicCount, depth] = specificityScore("/users/:id");
            expect(dynamicCount).toBe(1);
            expect(depth).toBe(2);

            const [twoDyn] = specificityScore("/orgs/:orgId/projects/:projectId");
            expect(twoDyn).toBe(2);
        });
    });

    describe("buildRoutes & builtRoutes", () => {
        it("builds and registers routes from the app directory", () => {
            const routes = buildRoutes();
            const paths = routes.map((r) => r.path);

            expect(paths).toContain("/");
            expect(paths).toContain("/about");
            expect(paths).toContain("/users/:id");
        });

        it("exports builtRoutes array matching buildRoutes()", () => {
            expect(builtRoutes.length).toBeGreaterThanOrEqual(3);
            const paths = builtRoutes.map((r) => r.path);
            expect(paths).toContain("/");
            expect(paths).toContain("/about");
            expect(paths).toContain("/users/:id");
        });

        it("sorts static routes before dynamic routes", () => {
            const staticIdx = builtRoutes.findIndex((r) => r.path === "/about");
            const dynamicIdx = builtRoutes.findIndex((r) => r.path === "/users/:id");
            expect(staticIdx).toBeLessThan(dynamicIdx);
        });
    });
});
