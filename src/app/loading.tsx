// Per-route Suspense fallback. Create a sibling `loading.tsx`
// in any folder to override it for that subtree.
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
        <div className="animate-pulse text-sm text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}
