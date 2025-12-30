'use client'

import Form from 'next/form'
import { useSearchParams } from 'next/navigation'

export function ProductFilters({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams()
  
  return (
    <Form action="/products" className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input 
          name="query" 
          defaultValue={searchParams.get('query') || ''}
          placeholder="Search products..." 
          className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative">
             <select 
              name="status" 
              defaultValue={searchParams.get('status') || 'all'}
              className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring sm:w-[150px]"
              onChange={(e) => e.target.form?.requestSubmit()}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
        </div>

        <div className="relative">
             <select 
              name="category" 
              defaultValue={searchParams.get('category') || ''}
              className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring sm:w-[180px]"
              onChange={(e) => e.target.form?.requestSubmit()}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
        </div>
      </div>
    </Form>
  )
}
