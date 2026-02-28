import { Link } from "react-router";

export default function About() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground relative">
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    About Page
                </h1>
                <p className="text-lg text-muted-foreground">
                    This is an example of the new file-based routing system. Any React component
                    added to the <code className="bg-muted px-2 py-1 rounded">src/pages</code> directory
                    will automatically become a route!
                </p>

                <div className="pt-8">
                    <Link
                        to="/"
                        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
    );
}
