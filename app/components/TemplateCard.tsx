import Image from "next/image";

interface TemplateCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export function TemplateCard({ title, description, category, imageUrl }: TemplateCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {imageUrl ? (
            <Image 
                src={imageUrl} 
                alt={title} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
        ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary/50 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
        )}
        <div className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md">
            {category}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        
        <div className="mt-5 flex items-center justify-between">
            <div className="flex -space-x-2">
                 {/* Fake avatars for "users used this" */}
                <div className="h-6 w-6 rounded-full border-2 border-background bg-slate-300"></div>
                <div className="h-6 w-6 rounded-full border-2 border-background bg-slate-400"></div>
                <div className="h-6 w-6 rounded-full border-2 border-background bg-slate-500"></div>
            </div>
            
            <button className="inline-flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 group-hover:bg-primary group-hover:text-primary-foreground">
                View Details
            </button>
        </div>
      </div>
    </div>
  );
}
