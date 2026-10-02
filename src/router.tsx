/* eslint-disable react-refresh/only-export-components */
// Routing engine exports testable helpers alongside the component.
import { lazy, Suspense, type ComponentType, type ReactNode } from "react";
import { Route, Routes, useRouteError, Link } from "react-router";

type PageLoader = () => Promise<{ default: ComponentType }>;
type LayoutLoader = () => Promise<{ default: ComponentType<{ children: ReactNode }> }>;

// Import all page/layout/loading/not-found/error files from the app directory.
// This mimics Next.js App Router structure where routes are defined by page.tsx inside folders.
const pages = import.meta.glob("./app/**/page.tsx");
const layouts = import.meta.glob("./app/**/layout.tsx");
const loadings = import.meta.glob("./app/**/loading.tsx");
const notFoundFiles = import.meta.glob("./app/**/not-found.tsx");
const errorFiles = import.meta.glob("./app/**/error.tsx");

/**
 * Convert a page filepath to a React Router path.
 * e.g., "./app/page.tsx" -> "/"
 * e.g., "./app/about/page.tsx" -> "/about"
 * e.g., "./app/users/[id]/page.tsx" -> "/users/:id"
 */
export function filePathToRoute(filePath: string): string {
    const path = filePath
        .replace(/^\.\/app/, "") // Remove "./app"
        .replace(/\/page\.tsx$/, "") // Remove "/page.tsx"
        .replace(/\[(.*?)\]/g, ":$1") // Convert [param] to :param for dynamic routes
        .replace(/\/index$/g, ""); // Clean up any trailing index logic

    return path === "" ? "/" : path;
}

export function dirOf(filePath: string, suffix: string): string {
    return filePath.slice(0, filePath.length - suffix.length);
}

export function isPrefixDir(prefix: string, dir: string): boolean {
    return dir === prefix || dir.startsWith(`${prefix}/`);
}

export function specificityScore(routePath: string): [number, number, string] {
    const dynamicSegments = (routePath.match(/:/g) ?? []).length;
    const depth = routePath.split("/").filter(Boolean).length;
    return [dynamicSegments, depth, routePath];
}

function DefaultLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="animate-pulse">Loading...</div>
        </div>
    );
}

function DefaultNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-muted-foreground">This page could not be found.</p>
            <Link to="/" className="text-sm font-medium text-primary hover:underline">
                ← Back home
            </Link>
        </div>
    );
}

function DefaultRouteError() {
    const error = useRouteError() as Error | null;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground p-8 text-center">
            <h1 className="text-4xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground max-w-md">
                {error?.message ?? "An unexpected error occurred."}
            </p>
            <Link to="/" className="text-sm font-medium text-primary hover:underline">
                ← Back home
            </Link>
        </div>
    );
}

// Lazily-created components are cached at module scope so render
// never calls lazy() — doing so per-render remounts and suspends forever.
const pageComponentCache = new Map<string, ComponentType>();
const layoutComponentCache = new Map<string, ComponentType<{ children: ReactNode }>>();
const loadingComponentCache = new Map<string, ComponentType>();

function getPageComponent(file: string): ComponentType {
    let component = pageComponentCache.get(file);
    if (!component) {
        component = lazy(pages[file] as PageLoader);
        pageComponentCache.set(file, component);
    }
    return component;
}

function getLayoutComponent(file: string): ComponentType<{ children: ReactNode }> {
    let component = layoutComponentCache.get(file);
    if (!component) {
        component = lazy(layouts[file] as LayoutLoader);
        layoutComponentCache.set(file, component);
    }
    return component;
}

function getLoadingComponent(file: string): ComponentType {
    let component = loadingComponentCache.get(file);
    if (!component) {
        component = lazy(loadings[file] as PageLoader);
        loadingComponentCache.set(file, component);
    }
    return component;
}

export interface BuiltRoute {
    path: string;
    Page: ComponentType;
    Layouts: ComponentType<{ children: ReactNode }>[];
    LoadingFallback: ComponentType;
}

export function buildRoutes(): BuiltRoute[] {
    const built: BuiltRoute[] = Object.keys(pages).map((pageFile) => {
        const routePath = filePathToRoute(pageFile);
        const pageDir = dirOf(pageFile, "/page.tsx");

        const layoutFiles = Object.keys(layouts)
            .filter((layoutFile) => isPrefixDir(dirOf(layoutFile, "/layout.tsx"), pageDir))
            .sort((a, b) => a.length - b.length);

        // Deepest (most specific) loading.tsx wins.
        const loadingFile =
            Object.keys(loadings)
                .filter((loading) => isPrefixDir(dirOf(loading, "/loading.tsx"), pageDir))
                .sort((a, b) => b.length - a.length)[0] ?? null;

        return {
            path: routePath,
            Page: getPageComponent(pageFile),
            Layouts: layoutFiles.map(getLayoutComponent),
            LoadingFallback: loadingFile ? getLoadingComponent(loadingFile) : DefaultLoading,
        };
    });

    // Static routes first so /blog/new wins over /blog/:slug.
    built.sort((a, b) => {
        const [aDyn, aDepth, aPath] = specificityScore(a.path);
        const [bDyn, bDepth, bPath] = specificityScore(b.path);
        if (aDyn !== bDyn) return aDyn - bDyn;
        if (aDepth !== bDepth) return aDepth - bDepth;
        return aPath.localeCompare(bPath);
    });

    return built;
}

export const builtRoutes = buildRoutes();

const rootNotFoundFile = "./app/not-found.tsx";
const rootErrorFile = "./app/error.tsx";

const NotFoundComponent: ComponentType =
    rootNotFoundFile in notFoundFiles
        ? lazy(notFoundFiles[rootNotFoundFile] as PageLoader)
        : DefaultNotFound;

const ErrorComponent: ComponentType =
    rootErrorFile in errorFiles
        ? lazy(errorFiles[rootErrorFile] as PageLoader)
        : DefaultRouteError;

function RouteElement({ route }: { route: BuiltRoute }) {
    const { Page, Layouts, LoadingFallback } = route;

    // Wrap page in layouts: deepest layout is innermost.
    let wrapped: ReactNode = <Page />;
    for (let i = Layouts.length - 1; i >= 0; i--) {
        const Layout = Layouts[i];
        const children = wrapped;
        wrapped = <Layout>{children}</Layout>;
    }

    return <Suspense fallback={<LoadingFallback />}>{wrapped}</Suspense>;
}

export function AppRoutes() {
    return (
        <Suspense fallback={<DefaultLoading />}>
            <Routes>
                {builtRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        errorElement={<ErrorComponent />}
                        element={<RouteElement route={route} />}
                    />
                ))}
                <Route path="*" element={<NotFoundComponent />} />
            </Routes>
        </Suspense>
    );
}
