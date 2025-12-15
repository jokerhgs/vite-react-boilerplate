import { ThemeToggle } from "./components/theme-toggle"

function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <main className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            v1.0.0 Public Beta
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Vite React <br className="hidden md:block" />
            <span className="text-primary">Boilerplate</span>
          </h1>

          <p className="max-w-[42rem] mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
            A premium foundation for your next big project. Pre-configured with Tailwind v4,
            shadcn-like variables, and robust routing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <a
            href="https://github.com/jokerhgs/vite-react-boilerplate/blob/main/README.md"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Documentation
          </a>
        </div>

        <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-4xl w-full">
          <FeatureCard
            title="Modern Stack"
            description="Built with Vite, React 19, and Tailwind CSS v4 for lightning fast development."
          />
          <FeatureCard
            title="Premium Design"
            description="Beautifully crafted UI components with dark mode support out of the box."
          />
          <FeatureCard
            title="Type Safe"
            description="Fully typed with TypeScript to catch errors before they happen."
          />
        </div>
      </main>

      <footer className="absolute bottom-6 text-center text-sm text-muted-foreground">
        <p>Created by <span className="font-semibold text-foreground">Joe Kier Hagos</span> &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default App;
