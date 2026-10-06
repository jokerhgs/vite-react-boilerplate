# AGENTS.md

Instructions and architectural guidelines for AI agents working in this repository.

---

## 1. Project Overview

**`vite-react-boilerplate`** is a modern, lightweight React boilerplate featuring a **Next.js-style file-based routing engine** built on top of **React Router v7**, bundled with **Vite 6**, styled with **Tailwind CSS v4**, and typed with **TypeScript (strict)**.

### Key Tech Stack

- **Framework**: React 19 + React Router v7
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4 (CSS variables, `:root` / `.dark` in `src/index.css`)
- **Client state**: Zustand v5 (`src/stores/`)
- **Server state**: TanStack React Query v5 (`src/lib/query-client.ts`, provider in `src/main.tsx`)
- **Forms & Validation**: React Hook Form + Valibot (`valibotResolver` from `@hookform/resolvers/valibot`)
- **HTTP**: `fetch` wrapper in `src/lib/api.ts` (retry + 401 handling, `ApiError`)
- **Testing**: Vitest v4 + Testing Library (`react`, `user-event`, `jest-dom`) + jsdom
- **Package Manager**: pnpm (Node 22, pnpm 10)

---

## 2. Directory Structure

```text
├── public/                 # Static assets
├── src/
│   ├── app/                # File-based routes (page.tsx per route)
│   │   ├── layout.tsx      # Root layout wrapper
│   │   ├── page.tsx        # Route: /
│   │   ├── loading.tsx     # Root Suspense fallback
│   │   ├── not-found.tsx   # Global 404 (*)
│   │   ├── error.tsx       # Global error boundary
│   │   ├── about/page.tsx  # Route: /about
│   │   └── users/[id]/page.tsx  # Route: /users/:id
│   ├── components/         # Shared UI (e.g. theme-toggle.tsx)
│   ├── hooks/              # Custom hooks (e.g. use-media-query.ts)
│   ├── lib/                # api.ts, cn.ts, query-client.ts (+ index.ts barrel)
│   ├── stores/             # Zustand stores (e.g. ui.ts)
│   ├── types/              # Shared types (LayoutProps, PageProps)
│   ├── index.css           # Tailwind v4 theme + CSS variables
│   ├── main.tsx            # DOM entrypoint (QueryClientProvider + BrowserRouter)
│   └── router.tsx          # File-based routing engine
├── tests/
│   ├── setup.ts            # jest-dom setup
│   ├── unit/               # Vitest unit tests
│   └── integration/        # Vitest integration tests
├── .env.example            # VITE_API_URL=/api
├── vite.config.ts          # Vite + @ alias
├── vitest.config.ts        # jsdom + setupFiles + @ alias
├── tsconfig.app.json       # Strict app config (src + tests)
├── tsconfig.node.json      # Node tools config
└── AGENTS.md               # This file
```

---

## 3. Essential Commands

Always use **`pnpm`**. Never use npm/yarn.

| Task | Command | Description |
| :--- | :--- | :--- |
| **Development** | `pnpm dev` | Vite dev server with HMR |
| **Type Check only** | `pnpm typecheck` | `tsc -b` without bundling |
| **Type Check & Build** | `pnpm build` | `tsc -b` + Vite production bundle |
| **Run Tests** | `pnpm test` | `vitest run` (single run) |
| **Watch Tests** | `pnpm test:watch` | `vitest` watch mode |
| **Lint** | `pnpm lint` | ESLint across repo |
| **Preview** | `pnpm preview` | Serve production build |

---

## 4. Coding Conventions & Best Practices

### Naming & Casing

- **Routes**: lowercase `page.tsx`, `layout.tsx`, `loading.tsx`, `not-found.tsx`, `error.tsx`. Dynamic dirs use `[param]` (e.g. `users/[id]/`).
- **Components**: `kebab-case.tsx` files, `PascalCase` exports. Example: `theme-toggle.tsx` exports `ThemeToggle`.
- **Hooks**: `use-*.ts` files, `camelCase` exports. Example: `use-media-query.ts` exports `useMediaQuery`.
- **Stores**: lowercase `*.ts` in `src/stores/`, `use*Store` hook exports. Example: `ui.ts` exports `useUiStore`.
- **Lib**: lowercase `*.ts` (`api.ts`, `cn.ts`, `query-client.ts`), `camelCase` functions/constants, `PascalCase` classes/types (`ApiError`, `LayoutProps`).
- **Types**: `PascalCase` interfaces/types, colocated in `src/types/` or next to usage.

### Imports & Exports

- **Always use `@/*`** for `src/` imports: `import { cn } from "@/lib"`, `import { ThemeToggle } from "@/components/theme-toggle"`. No `../../` chains.
- Import order: `react` / external → `@/` internal → relative. Use `import type` for types (`verbatimModuleSyntax` is on).
- **Pages/layouts**: `default` export (required by `router.tsx` glob). **Shared modules**: `named` exports via barrel (`src/lib/index.ts`, `src/stores/index.ts`, `src/hooks/index.ts`).

### TypeScript

- Strict mode + `noUnusedLocals` + `noUnusedParameters` + `erasableSyntaxOnly`. No `any`; prefer `unknown` + narrowing. No unused imports/vars — `pnpm typecheck` must pass.

### React & Routing

- Function components only; hooks at top level (enforced by `eslint-plugin-react-hooks`).
- Routes come from `src/app/` via `router.tsx` — never hardcode a route array:
  - `src/app/page.tsx` -> `/`
  - `src/app/about/page.tsx` -> `/about`
  - `src/app/users/[id]/page.tsx` -> `/users/:id`
- Dynamic params: `[param]` dir -> `:param`; read with `useParams<{ id: string }>()` from `react-router`.
- `layout.tsx` nests (root outermost); deepest `loading.tsx` wins as `Suspense` fallback; root `not-found.tsx` is `*`; root `error.tsx` is `errorElement`.
- Every page is `lazy()`-loaded — keep pages thin, move logic to components/hooks.

### Styling & Theming

- Tailwind v4 semantic tokens only: `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `bg-primary`, `text-primary-foreground`, `text-muted-foreground`, `border-border`, `border-input`, `bg-accent`.
- Theme vars live in `src/index.css` (`:root` / `.dark` + `@theme`). Toggle via `ThemeToggle` (`localStorage` + `prefers-color-scheme`).
- Merge classes with `cn(...)` from `@/lib`. Never concatenate conditionally by hand.

### State: UI vs Server

- **UI state** (sidebar, theme, filters): Zustand in `src/stores/` — typed `create<State>()` with explicit actions (see `ui.ts`: `setSidebarOpen`, `toggleSidebar`).
- **Server state** (fetch/cache/mutate): TanStack Query with shared `queryClient` (`src/lib/query-client.ts`). Use `createQueryClient()` for isolated tests.

### API & Data Fetching

- Use `api` from `@/lib`: `api.get/post/put/patch/del/request` (see `src/lib/api.ts`).
- Base URL: `import.meta.env.VITE_API_URL` (defaults to `/api`; copy `.env.example` to `.env`).
- Semantics: JSON headers, 10s timeout (`AbortController`), one 500ms retry on network/429/5xx, `auth:unauthorized` window event on 401, throws `ApiError { status, body, message }`. Catch `ApiError` — never swallow errors silently.

### Forms & Validation

- React Hook Form + Valibot: define `v.object(...)` schemas, wire via `valibotResolver` from `@hookform/resolvers/valibot`. Show field-level messages; see `tests/unit/validation.test.ts` for the canonical pattern.

### Env & Errors

- Public env vars must be `VITE_*` and documented in `.env.example`. Access via `import.meta.env`.
- Route errors go to `error.tsx`; 404s to `not-found.tsx`. `main.tsx` throws if `#root` is missing — keep that guard.

---

## 5. Testing Guidelines

- Unit: `tests/unit/*.test.ts` (`router`, `cn`, `ui-store`, `api`, `query-client`, `validation`). Integration: `tests/integration/`.
- Stack: `vitest` (`describe`/`it`/`expect` + `vi`), `jsdom`, `setupFiles: tests/setup.ts` (`jest-dom/vitest`), `@testing-library/react` + `user-event` for components — assert roles/text, not internals.
- Mock `fetch` with `vi.stubGlobal("fetch", ...)` + `vi.unstubAllGlobals()` (see `api.test.ts`). Use `createQueryClient()` per test for isolation.
- Every new module/helper needs a unit test. Keep tests deterministic (no real network/timers except the 500ms retry path, which is already covered).

---

## 6. Agent Workflow & Verification Checklist

1. Implement using `@/` aliases and file-based routes; follow naming/casing above.
2. Run tests: `pnpm test`
3. Typecheck + build: `pnpm typecheck` then `pnpm build`
4. Lint: `pnpm lint`
5. All commands must pass with 0 errors. If a finding contradicts a prior claim, re-read the file and trust the code.
