import { Link, useRouteError } from "react-router";

export default function RouteError() {
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
