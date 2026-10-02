# AGENTS.md

Instructions and architectural guidelines for AI agents working in this repository.

---

## 1. Project Overview

**`vite-react-boilerplate`** is a modern, lightweight React boilerplate featuring a **Next.js-style file-based routing engine** built on top of **React Router v7**, bundled with **Vite**, styled with **Tailwind CSS v4**, and managed with **Zustand** and **TypeScript**.

### Key Tech Stack
- **Framework**: React 19 + React Router v7
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4 (with native CSS variables and dark mode support)
- **State Management**: Zustand v5
- **Forms & Validation**: React Hook Form + Zod
- **HTTP Client**: Axios (configured with retry logic & 401 handling)
- **Testing**: Vitest v4
- **Package Manager**: pnpm

---

## 2. Directory Structure

```text
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js-style file-based routes
│   │   ├── layout.tsx      # Root layout wrapper
│   │   ├── page.tsx        # Root route (/)
│   │   ├── loading.tsx     # Root Suspense fallback
│   │   ├── not-found.tsx   # 404 page
│   │   ├── error.tsx       # Route error boundary
│   │   ├── about/page.tsx  # Static route (/about)
│   │   └── users/[id]/     # Dynamic route (/users/:id)
│   │       └── page.tsx
│   ├── components/         # Shared UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Shared utilities & configured libraries (api.ts, cn.ts)
│   ├── stores/             # Zustand state management stores
│   ├── types/              # TypeScript types and interfaces
│   ├── index.css           # Global stylesheet & Tailwind CSS theme variables
│   ├── main.tsx            # Application DOM entrypoint
│   └── router.tsx          # Dynamic file-based routing engine
├── tests/
│   ├── unit/               # Vitest unit tests
│   └── integration/        # Vitest integration tests
├── package.json
├── tsconfig.json
├── tsconfig.app.json       # App & tests TypeScript configuration
├── tsconfig.node.json      # Node tools TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── vitest.config.ts        # Vitest test runner configuration
└── AGENTS.md               # Agent guidelines (this file)
```

---

## 3. Essential Commands

Always use **`pnpm`** as the package manager in this project.

| Task | Command | Description |
| :--- | :--- | :--- |
| **Development** | `pnpm dev` | Starts Vite local dev server with HMR |
| **Type Check & Build** | `pnpm build` | Executes `tsc -b` and produces Vite production bundle |
| **Run Tests** | `pnpm test` | Runs Vitest test suite (`vitest run`) |
| **Lint Code** | `pnpm lint` | Runs ESLint across the codebase |
| **Preview Build** | `pnpm preview` | Serves the production build locally |

---

## 4. Coding Conventions & Best Practices

### Path Aliases
- **Always use the `@/*` alias** for imports within `src/` (e.g. `import { cn } from "@/lib";`, `import { ThemeToggle } from "@/components/theme-toggle";`).
- The alias is mapped to `./src/*` across TypeScript (`tsconfig.app.json`), Vite (`vite.config.ts`), and Vitest (`vitest.config.ts`).
- Avoid deep relative paths like `../../components/`.

### File-Based Routing System
- **Routes are automatically registered from `src/app/`** using `router.tsx`:
  - `src/app/page.tsx` $\to$ `/`
  - `src/app/about/page.tsx` $\to$ `/about`
  - `src/app/users/[id]/page.tsx` $\to$ `/users/:id` (dynamic route)
  - `src/app/posts/[category]/[slug]/page.tsx` $\to$ `/posts/:category/:slug`
- **Dynamic Segments**: Use brackets `[param]` in directory names; they convert to `:param` in React Router. Retrieve parameters inside page components using `useParams<{ param: string }>()` from `react-router`.
- **Layouts & Suspense**: Place `layout.tsx` or `loading.tsx` in route directories for nested layouts and hierarchical fallback loading.
- **Do not manually add routes to an array**; creating/deleting `page.tsx` files automatically updates the routing table.

### Styling & Theming
- Use Tailwind CSS v4 semantic utility tokens: `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `bg-primary`, `text-primary-foreground`, `text-muted-foreground`, `border-border`.
- All color variables and dark mode styles (`:root` / `.dark`) are declared in `src/index.css`.
- Combine class names using the `cn(...)` utility (`@/lib/cn` or `@/lib`).

### Global State Management
- Use Zustand stores located in `src/stores/`.
- Export typed hooks and actions (see `src/stores/ui.ts` for the pattern).

### API & Data Fetching
- Use the configured Axios instance in `src/lib/api.ts` (`import { api } from "@/lib";`).
- Base URL is configured via `import.meta.env.VITE_API_URL` (defaults to `/api`).
- Includes built-in single transparent retry for network errors / 5xx / 429 and dispatches `auth:unauthorized` on 401.

---

## 5. Testing Guidelines

- Place unit tests in `tests/unit/` (e.g. `tests/unit/router.test.ts`, `tests/unit/ui-store.test.ts`).
- Place integration tests in `tests/integration/`.
- Use Vitest's `describe`, `it`, and `expect` APIs.
- When adding new modules or helpers, add corresponding unit tests to verify functionality and prevent regressions.

---

## 6. Agent Workflow & Verification Checklist

When executing tasks in this repository, follow these steps before concluding:
1. **Implement changes** following the conventions above (using `@/` path aliases and file-based route structure).
2. **Run the test suite**:
   ```bash
   pnpm test
   ```
3. **Verify type check and build**:
   ```bash
   pnpm build
   ```
4. **Verify linting**:
   ```bash
   pnpm lint
   ```
5. Ensure all three verification commands pass with 0 errors.
