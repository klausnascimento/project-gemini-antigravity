export function FilterSidebar() {
  const categories = ["All Templates", "Dashboard", "Landing Page", "E-commerce", "Portfolio", "Blog"];
  const popularTags = ["Next.js", "Tailwind", "React", "TypeScript", "Minimal", "Dark Mode"];

  return (
    <aside className="w-full space-y-8 lg:w-64 shrink-0">
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((category, i) => (
            <button
              key={category}
              className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
        <h4 className="font-semibold text-primary">Pro Access</h4>
        <p className="mt-1 text-xs text-muted-foreground">Unlock 50+ premium templates and priority support.</p>
        <button className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
            Upgrade Now
        </button>
      </div>
    </aside>
  );
}
