import { Link } from "react-router";

export default function Documentation() {
    const docs = [
        { title: "Introduction", slug: "introduction" },
        { title: "Project Structure", slug: "structure" },
        { title: "Routing System", slug: "routing" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <Link to="/" className="text-sm text-primary hover:underline">← Back Home</Link>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Documentation</h1>
                        <p className="text-xl text-muted-foreground">
                            Learn how to build powerful applications with our Next.js-inspired file-based routing.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {docs.map((doc) => (
                            <Link
                                key={doc.slug}
                                to={`/documentation/${doc.slug}`}
                                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
                            >
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {doc.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Learn more about {doc.title.toLowerCase()} in this section.
                                </p>
                                <div className="mt-4 text-xs font-medium text-primary">Read more →</div>
                            </Link>
                        ))}
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none p-8 rounded-2xl bg-muted/30 border border-border">
                        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
                        <p className="text-muted-foreground">
                            Our custom router uses Vite's <code>import.meta.glob</code> to automatically scan the
                            <code>src/app</code> directory for <code>page.tsx</code> files. It translates the
                            directory structure directly into routes, including support for dynamic segments
                            like <code>[slug]</code>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
