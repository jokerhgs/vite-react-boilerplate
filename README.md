# Vite + React Boilerplate

A premium, lightweight, and fast boilerplate for modern web development. Now featuring a **Next.js-style file-based routing system** built on top of React Router.

## Features

- **[Vite](https://vitejs.dev/):** Lightning-fast development and HMR.
- **[React 19](https://react.dev/):** The latest React features and optimizations.
- **[File-based Routing](https://reactrouter.com/):** Next.js-inspired `app/` directory routing (without the Next.js overhead).
- **[Tailwind CSS v4](https://tailwindcss.com/):** Modern utility-first styling with native CSS variables.
- **[Zustand](https://zustand-bear.github.io/):** Simple, fast, and scalable state management.
- **[React Hook Form](https://react-hook-form.com/):** Performant and flexible form handling.
- **[Zod](https://zod.dev/):** TypeScript-first schema validation.
- **[Vitest](https://vitest.dev/):** Powerful unit testing.
- **[ESLint](https://eslint.org/):** Code quality and consistency.

---

## File-based Routing (App Router)

This boilerplate uses a custom dynamic routing engine that mimics the Next.js App Router. No more manual route definitions!

### How it works:
Place your components in `src/app/` following the `folder/page.tsx` convention:

| File Path | Route |
|-----------|-------|
| `src/app/page.tsx` | `/` |
| `src/app/documentation/page.tsx` | `/documentation` |
| `src/app/documentation/[slug]/page.tsx` | `/documentation/:slug` |

**Features:**
- **Automatic Code Splitting**: Every page is lazily loaded by default.
- **Dynamic Routes**: Use `[param]` syntax for dynamic path segments.
- **Nested Routing**: Create deep hierarchies naturally through folders.

---

## Folder Structure

```text
client/
├── public/                 # Static assets
├── src/
│   ├── app/               # File-based Routes (Next.js style)
│   │   ├── page.tsx       # Root route (/)
│   │   └── documentation/ # Nested route (/documentation)
│   ├── components/        # Reusable React components
│   ├── constants/         # Application constants
│   │── hooks/             # Custom React hooks
│   ├── stores/            # Zustand state management
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   ├── router.tsx         # The Routing Engine
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles (Tailwind v4)
├── tests/                 # Vitest test suites
├── vite.config.ts         # Vite configuration
└── README.md
```

---

## Getting Started

### 1. Prerequisites
Ensure you have [pnpm](https://pnpm.io/) installed:
```bash
npm install -g pnpm
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Development
```bash
pnpm dev
```

### 4. Build & Preview
```bash
pnpm build
pnpm preview
```

### 5. Testing & Quality
```bash
pnpm test    # Run Vitest
pnpm lint    # Run ESLint
```

---

## License
Created by [Joe Kier Hagos](https://github.com/jokerhgs) &copy; 2026.
