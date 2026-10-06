# Vite + React Boilerplate

Lightweight React 19 + Vite 6 starter with **Next.js-style file-based routing** (React Router v7), Tailwind CSS v4 theming, Zustand + TanStack Query state, and Valibot forms.

## Stack

| Area | Tech | Version |
| :--- | :--- | :--- |
| Framework | React + React Router | 19.3 / 7.18 |
| Bundler | Vite + @vitejs/plugin-react | 6.4 / 4.7 |
| Styling | Tailwind CSS + @tailwindcss/vite | 4.3 |
| UI state | Zustand | 5.0 |
| Server state | TanStack React Query | 5.104 |
| API | fetch wrapper (`src/lib/api.ts`) | — |
| Forms | React Hook Form + Valibot (`@hookform/resolvers`) | 7.89 / 1.5 |
| Testing | Vitest + Testing Library + jsdom | 4.1 / 16.3 / 30.1 |
| Quality | TypeScript (strict) + ESLint | 5.8 / 9.39 |

Why this stack: file routes remove router boilerplate, Query caches server data while Zustand stays for UI, Valibot is smaller than Zod, and the `fetch` wrapper keeps retry/401 behavior without Axios.

---

## Quickstart

Prerequisites: **Node 22+**, **pnpm 10+**.

```bash
cp .env.example .env   # VITE_API_URL=/api
pnpm install
pnpm dev               # http://localhost:5173
```

| Script | Command | Purpose |
| :--- | :--- | :--- |
| Dev | `pnpm dev` | HMR dev server |
| Build | `pnpm build` | `tsc -b` + production bundle |
| Typecheck | `pnpm typecheck` | `tsc -b` only |
| Test | `pnpm test` | `vitest run` |
| Watch | `pnpm test:watch` | `vitest` watch |
| Lint | `pnpm lint` | ESLint |
| Preview | `pnpm preview` | Serve `dist/` |

---

## File-based Routing

No route array — create `src/app/<name>/page.tsx` and it becomes `/<name>`. Engine: `src/router.tsx` (`import.meta.glob`, `[param]` -> `:param`, static-first sort, `lazy()` + `Suspense`).

| File Path | Route |
|-----------|-------|
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/users/[id]/page.tsx` | `/users/:id` |

| File | Purpose |
|------|---------|
| `page.tsx` | Route entry (`default` export required) |
| `layout.tsx` | Nests around subtree (root outermost) |
| `loading.tsx` | `Suspense` fallback (deepest wins) |
| `not-found.tsx` | `*` catch-all |
| `error.tsx` | `errorElement` boundary |

```tsx
// src/app/pricing/page.tsx -> /pricing
export default function Pricing() {
  return <h1>Pricing</h1>;
}

// src/app/users/[id]/page.tsx -> /users/:id
import { useParams } from "react-router";
export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  return <h1>User {id}</h1>;
}
```

---

## Usage

### Data fetching (Query + api)

```tsx
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib";

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get<{ id: string }[]>("/users"),
  });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Failed to load.</p>;
  return <ul>{data?.map((u) => <li key={u.id}>{u.id}</li>)}</ul>;
}
```

`api.get/post/put/patch/del` uses `VITE_API_URL` (default `/api`), JSON headers, 10s timeout, one retry on network/429/5xx, `auth:unauthorized` event on 401, and throws `ApiError { status, body }`.

### Forms (Hook Form + Valibot)

```tsx
import * as v from "valibot";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";

const Schema = v.object({
  email: v.pipe(v.string(), v.email("Enter a valid email")),
  password: v.pipe(v.string(), v.minLength(8, "Minimum 8 characters")),
});

type Form = v.InferOutput<typeof Schema>;

const { register, handleSubmit } = useForm<Form>({ resolver: valibotResolver(Schema) });
```

### UI state (Zustand) vs theme

```tsx
import { useUiStore } from "@/stores";
const toggleSidebar = useUiStore((s) => s.toggleSidebar);
```

Toggle dark mode with `ThemeToggle` from `@/components/theme-toggle` (persists to `localStorage`). Theme tokens live in `src/index.css` (`:root` / `.dark`); use semantic classes (`bg-background`, `text-foreground`, `border-border`) + `cn()` from `@/lib`.

---

## Folder Structure

```text
├── public/                 # Static assets
├── src/
│   ├── app/                # Routes: page/layout/loading/not-found/error
│   ├── components/         # theme-toggle.tsx, shared UI
│   ├── hooks/              # use-media-query.ts
│   ├── lib/                # api.ts, cn.ts, query-client.ts
│   ├── stores/             # ui.ts (useUiStore)
│   ├── types/              # LayoutProps, PageProps
│   ├── index.css           # Tailwind theme + variables
│   ├── main.tsx            # QueryClientProvider + BrowserRouter
│   └── router.tsx          # Routing engine
├── tests/
│   ├── setup.ts            # jest-dom
│   ├── unit/               # router, cn, ui-store, api, query-client, validation
│   └── integration/        # Integration tests
├── .env.example            # VITE_API_URL
├── vite.config.ts / vitest.config.ts  # @ -> ./src, jsdom + setup
└── documentation.md        # Extended guide
```

Conventions: `@/` imports only, `kebab-case.tsx` + `PascalCase` components, `use-*` hooks, `use*Store` stores, `default` export for pages / `named` for shared. See `AGENTS.md` for agent rules.

---

## Testing

```bash
pnpm test        # single run (jsdom + jest-dom)
pnpm test:watch # watch mode
```

Component tests use `@testing-library/react` + `user-event` (assert roles/text). `fetch` is mocked via `vi.stubGlobal`; Query tests use `createQueryClient()` for isolation.

---

## License

Created by [Joker Hagos](https://github.com/jokerhgs) © 2026.
