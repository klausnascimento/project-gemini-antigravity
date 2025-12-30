'use client'

import Form from 'next/form'
import { useSearchParams } from 'next/navigation'

export function ProductFilters({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams()
  
  return (
    <Form action="/products" className="flex flex-wrap gap-4 items-center bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-zinc-800">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="query" className="sr-only">Search</label>
        <input 
          name="query" 
          defaultValue={searchParams.get('query') || ''}
          placeholder="Search items..." 
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent"
        />
      </div>
      
      <div className="w-[150px]">
        <select 
          name="status" 
          defaultValue={searchParams.get('status') || 'all'}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent"
          onChange={(e) => e.target.form?.requestSubmit()}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="w-[150px]">
         <select 
          name="category" 
          defaultValue={searchParams.get('category') || ''}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent"
          onChange={(e) => e.target.form?.requestSubmit()}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Filter
      </button>
      
      {/* Hidden inputs to preserve other params if needed, but Form replaces searchParams by default */}
    </Form>
  )
}
