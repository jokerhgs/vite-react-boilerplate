import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

// Import all page.tsx files from the app directory using Vite's import.meta.glob
// This mimics Next.js App Router structure where routes are defined by page.tsx inside folders
const pages = import.meta.glob("./app/**/page.tsx");

const routes = Object.keys(pages).map((filePath) => {
    // Convert filepath to valid React Router path
    // e.g., "./app/page.tsx" -> "/"
    // e.g., "./app/about/page.tsx" -> "/about"
    // e.g., "./app/users/[id]/page.tsx" -> "/users/:id"

    const path = filePath
        .replace(/^\.\/app/, "")      // Remove "./app"
        .replace(/\/page\.tsx$/, "")  // Remove "/page.tsx"
        .replace(/\[(.*?)\]/g, ":$1") // Convert [param] to :param for dynamic routes
        .replace(/\/index$/g, "");    // Clean up any trailing index logic

    // Handle root path
    const routePath = path === "" ? "/" : path;

    return {
        path: routePath,
        // Cast to any to satisfy TS, since glob returns () => Promise<Module>
        // lazy expects () => Promise<{ default: ComponentType }>
        Component: lazy(pages[filePath] as any),
    };
});

export function AppRoutes() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                    <div className="animate-pulse">Loading...</div>
                </div>
            }
        >
            <Routes>
                {routes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                {/* Optional: Add a 404 Not Found route here if desired */}
            </Routes>
        </Suspense>
    );
}