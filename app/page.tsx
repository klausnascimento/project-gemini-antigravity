import { Header } from "./components/Header";
import { FilterSidebar } from "./components/FilterSidebar";
import { TemplateCard } from "./components/TemplateCard";

export default function Home() {
  const templates = [
    {
      title: "SaaS Starter Kit",
      description: "A complete starter kit for your next SaaS project. Includes auth, payments, and dashboard.",
      category: "SaaS",
    },
    {
      title: "Modern Portfolio",
      description: "Showcase your work with this clean, minimal, and responsive portfolio template.",
      category: "Portfolio",
    },
    {
      title: "E-commerce Storefront",
      description: "A fully functional e-commerce storefront with cart, checkout, and product pages.",
      category: "E-commerce",
    },
    {
      title: "Blog & Newsletter",
      description: "A beautiful blog template with newsletter subscription and CMS integration.",
      category: "Blog",
    },
    {
      title: "Admin Dashboard",
      description: "A powerful admin dashboard with charts, tables, and data visualization components.",
      category: "Dashboard",
    },
    {
      title: "Landing Page V1",
      description: "High-conversion landing page optimized for marketing and lead generation.",
      category: "Landing Page",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      
      <main className="container mx-auto flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8 lg:flex-row">
        <FilterSidebar />
        
        <div className="flex-1">
          <div className="mb-8 flex items-end justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Explore Templates</h1>
                <p className="mt-2 text-muted-foreground">
                    Discover professional templates to kickstart your next project.
                </p>
            </div>
            
            <div className="hidden sm:block">
                <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                </select>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, index) => (
              <TemplateCard
                key={index}
                title={template.title}
                description={template.description}
                category={template.category}
              />
            ))}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border bg-card py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} GeminiTemplates. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
