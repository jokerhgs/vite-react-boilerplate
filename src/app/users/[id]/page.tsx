import { Link, useParams } from "react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dynamic Route Example
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          User Profile
        </h1>

        <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm font-medium text-muted-foreground">Route Pattern:</span>
            <code className="text-sm bg-muted px-2 py-0.5 rounded font-mono text-foreground">
              /users/:id
            </code>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-medium text-muted-foreground">Extracted Param (<code className="text-xs">id</code>):</span>
            <span className="text-sm font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
              {id ?? "None"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center pt-4">
          <Link
            to="/users/1"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
          >
            User #1
          </Link>
          <Link
            to="/users/42"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
          >
            User #42
          </Link>
          <Link
            to="/users/joker"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
          >
            User #joker
          </Link>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
