# Documentation

A premium, lightweight Vite + React boilerplate with a Next.js-style file-based router built on React Router.

## File-based Routing

Place components in `src/app/` following the `folder/page.tsx` convention. No manual route definitions.

| File Path | Route |
|-----------|-------|
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/blog/[slug]/page.tsx` | `/blog/:slug` |

### How it works

`src/router.tsx` uses Vite's `import.meta.glob("./app/**/page.tsx")` to scan for pages, converts `[param]` to `:param`, sorts static routes before dynamic ones, and lazy-loads every page for automatic code splitting.

### File conventions

| File | Purpose |
|------|---------|
| `page.tsx` | Route entry (required per route) |
| `layout.tsx` | Wraps the route subtree. Nearest layouts nest, root is outermost |
| `loading.tsx` | `Suspense` fallback. Deepest match wins |
| `not-found.tsx` | `*` catch-all. Root `src/app/not-found.tsx` is global |
| `error.tsx` | `errorElement` boundary. Root `src/app/error.tsx` is global |

### Create a page

```bash
# Static route /pricing
mkdir src/app/pricing
# create src/app/pricing/page.tsx with a default export
```

```tsx
export default function Pricing() {
  return <h1>Pricing</h1>;
}
```

Dynamic route: `src/app/blog/[slug]/page.tsx`, read the param with `useParams()` from `react-router`.

## Common Customization

### Update theme

Edit CSS variables in `src/index.css` (`:root` and `.dark`), then toggle with `src/components/theme-toggle.tsx` (persisted to `localStorage`).

### Update font

Edit the Google Fonts import and `--font-sans` in `src/index.css` (`@theme` block).

### Data fetching

Use the fetch wrapper in `src/lib/api.ts` (`api.get/post/put/patch/del`, base URL from `VITE_API_URL`, one retry, 401 event, `ApiError` on failure). Keep server data in TanStack Query (`src/lib/query-client.ts`, provider in `src/main.tsx`); keep UI state in `src/stores/ui.ts` (zustand).

### Forms & validation

Validate with Valibot schemas + `valibotResolver` from `@hookform/resolvers/valibot`.

```tsx
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";

const Schema = v.object({ email: v.pipe(v.string(), v.email()) });
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build && pnpm preview
pnpm typecheck
pnpm test
pnpm test:watch
pnpm lint
```
