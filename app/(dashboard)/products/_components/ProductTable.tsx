'use client'

import { useOptimistic, useState, useTransition, useEffect } from 'react'
import { SerializedProduct } from '@/lib/types'
import { toggleActiveAction } from '../actions'
import { ProductForm } from './ProductForm'
import { useFavoritesStore } from '@/app/store'

type Props = {
  products: SerializedProduct[]
}

export function ProductTable({ products }: Props) {
  const [editingProduct, setEditingProduct] = useState<SerializedProduct | null | 'new'>(null)
  
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Optimistic UI for toggling active status
  const [optimisticProducts, setOptimisticProduct] = useOptimistic(
    products,
    (state, { id, active }: { id: string; active: boolean }) =>
      state.map((p) => (p.id === id ? { ...p, active } : p))
  )
  
  const [isPending, startTransition] = useTransition()

  const handleToggle = async (id: string, currentActive: boolean) => {
    // Optimistic update
    startTransition(async () => {
        setOptimisticProduct({ id, active: !currentActive })
        await toggleActiveAction(id)
    })
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
            <h2 className="text-xl font-bold tracking-tight">All Products</h2>
            <p className="text-sm text-muted-foreground">Manage your product inventory and status.</p>
        </div>
        <button 
            onClick={() => setEditingProduct('new')}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </svg>
            New Product
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stock</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {optimisticProducts.map((product) => (
              <tr key={product.id} className="bg-card transition-colors hover:bg-muted/50">
                <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{product.sku}</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10">
                        {product.category}
                    </span>
                </td>
                <td className="px-6 py-4 font-medium text-foreground">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4 text-muted-foreground">{product.stock}</td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        product.active 
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-400/20' 
                        : 'bg-zinc-50 text-zinc-700 ring-zinc-600/20 dark:bg-zinc-900/30 dark:text-zinc-400 dark:ring-zinc-400/20'
                    }`}>
                        {product.active ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => toggleFavorite(product.id)}
                        className={`rounded-md p-2 hover:bg-secondary ${
                             mounted && isFavorite(product.id) ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'
                        }`}
                        title={mounted && isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={mounted && isFavorite(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => setEditingProduct(product)}
                        className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => handleToggle(product.id, product.active)}
                        disabled={isPending}
                        className={`rounded-md p-2 hover:bg-secondary ${
                             product.active ? 'text-destructive hover:text-destructive' : 'text-emerald-600 hover:text-emerald-700'
                        }`}
                        title={product.active ? 'Deactivate' : 'Activate'}
                    >
                        {product.active ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" x2="9" y1="9" y2="15" />
                                <line x1="9" x2="15" y1="9" y2="15" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {optimisticProducts.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-muted-foreground/50 mb-3">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <p className="text-lg font-medium">No products found</p>
                            <p className="text-sm">Try adjusting your search or filters.</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <ProductForm 
            onClose={() => setEditingProduct(null)} 
            product={editingProduct === 'new' ? null : editingProduct} 
        />
      )}
    </>
  )
}
