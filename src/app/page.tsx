import { Link } from "react-router";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center gap-8 max-w-3xl">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Vite React Boilerplate
          </h1>
          <p className="text-muted-foreground">
            Edit <code className="bg-muted px-1.5 py-0.5 rounded text-sm">src/app/page.tsx</code> to
            start building.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://github.com/jokerhgs/vite-react-boilerplate/blob/main/documentation.md"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Documentation
          </a>
          <Link
            to="/about"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Static Route (/about)
          </Link>
          <Link
            to="/users/42"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Dynamic Route (/users/42)
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left w-full">
          <InstructionCard
            title="Update theme"
            body="Change colors in src/index.css (:root / .dark). Toggle is in src/components/theme-toggle.tsx."
          />
          <InstructionCard
            title="Update font"
            body="Change the import and --font-sans in src/index.css."
          />
          <InstructionCard
            title="Create a page"
            body="Add src/app/<name>/page.tsx. It becomes /<name> automatically. Use [slug] for dynamic routes."
          />
        </div>
      </main>

      <footer className="mt-auto pb-6 text-sm text-muted-foreground">
        <p>
          Created by <span className="font-semibold text-foreground">Joker Hagos</span>
        </p>
      </footer>
    </div>
  );
}

function InstructionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm">{body}</p>
    </div>
  );
}

export default App;
