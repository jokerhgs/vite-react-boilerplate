import { useParams, Link } from "react-router";

export default function DocSlug() {
    const { slug } = useParams();

    const docTitle = slug
        ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
        : "Documentation";

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
            <div className="max-w-3xl w-full space-y-8 text-center">
                <div className="space-y-4">
                    <Link
                        to="/documentation"
                        className="text-sm font-medium text-primary hover:underline transition-all"
                    >
                        ← Back to Documentation
                    </Link>
                    <div className="inline-flex items-center rounded-full border border-border bg-muted/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-500">
                        Current Section: {slug}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-tr from-primary via-primary/80 to-primary/40">
                        {docTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        You're currently reading the <strong>{docTitle}</strong> section of our
                        comprehensive documentation. This is powered by a dynamic slug
                        path in our file-based routing system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pb-16">
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-sm text-left hover:shadow-md transition-shadow duration-300">
                        <h3 className="font-bold text-lg mb-2 text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Dynamic Extraction
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Our router automatically detects the <strong>[slug]</strong> in your file path
                            and maps it to <code>:slug</code> in React Router.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-sm text-left hover:shadow-md transition-shadow duration-300">
                        <h3 className="font-bold text-lg mb-2 text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Type-Safe Params
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Using the <code>useParams</code> hook, you can access the current URI parameters
                            stably across components.
                        </p>
                    </div>
                </div>

                <footer className="pt-12 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        Still have questions? <a href="#" className="text-primary hover:underline">Chat with us</a> or visit the <Link to="/" className="text-primary hover:underline">home page</Link>.
                    </p>
                </footer>
            </div>

            {/* Visual background accents */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}
