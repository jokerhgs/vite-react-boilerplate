# Vite + React Boilerplate

A lightweight and fast boilerplate for modern web development using:

- **[Vite](https://vitejs.dev/):** A modern build tool that offers fast development startup and lightning-fast hot module replacement.
- **[React](https://react.dev/):** A declarative JavaScript library for building user interfaces with a component-based architecture.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapidly building custom user interfaces with consistent design.
- **[React Router](https://reactrouter.com/):** A routing library for React that enables dynamic routing and navigation in single-page applications.
- **[Zod](https://zod.dev/):** A TypeScript-first schema declaration and validation library.
- **[Zustand](https://zustand-bear.github.io/):** A small, fast, and scalable bear-bones state-management solution using simplified flux principles.
- **[React Hook Form](https://react-hook-form.com/):** A performant, flexible and extensible forms library with easy-to-use validation.
- **[Axios](https://axios-http.com/):** A promise-based HTTP client for the browser and Node.js.
- **[Vitest](https://vitest.dev/):** A blazing fast unit test framework powered by Vite.
- **[ESLint](https://eslint.org/):** A pluggable linter to identify and fix problems in JavaScript and React codebases.
- **[pnpm](https://pnpm.io/):** A fast, disk space-efficient package manager that uses a content-addressable file system.

---

## Folder Structure

```
vite-react-boilerplate/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── constants/         # Application constants and configuration
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Third-party library configurations
│   ├── stores/            # Zustand state management stores
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions and helpers
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite environment type declarations
├── tests/
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── pnpm-lock.yaml         # pnpm lock file
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # TypeScript app-specific configuration
├── tsconfig.node.json     # TypeScript Node-specific configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

### Directory Descriptions

- **`src/components/`** - Contains all reusable React components. Each component should be self-contained and follow the single responsibility principle.

- **`src/constants/`** - Stores application-wide constants, configuration values, and enums to avoid magic strings/numbers throughout the codebase.

- **`src/hooks/`** - Custom React hooks for shared logic and state management. Promotes code reusability and separation of concerns.

- **`src/lib/`** - Configuration files for third-party libraries (e.g., Axios instances, API clients).

- **`src/stores/`** - Zustand stores for global state management. Each store should manage a specific domain of the application state.

- **`src/types/`** - TypeScript type definitions, interfaces, and type utilities used across the application.

- **`src/utils/`** - Pure utility functions and helper methods that don't depend on React or application state.

- **`tests/unit/`** - Unit tests for individual components, hooks, and utility functions.

- **`tests/integration/`** - Integration tests that verify multiple components or modules working together.

---

### Installation

Ensure you have `pnpm` installed globally:

```bash
npm install -g pnpm
```

---

### Cloning the repository

```bash
git clone https://github.com/jokerhgs/vite-react-boilerplate.git
cd vite-react-boilerplate
```

---

### Install dependencies:

```bash
pnpm install
```

---

### Start the development server:

```bash
pnpm dev
```

### Run ESLint to analyze code quality:

```bash
pnpm lint
```

### Run tests with Vitest:

```bash
pnpm test
```
