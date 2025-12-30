'use client'

import { useActionState } from 'react'
import { saveProductAction, ActionState } from '../actions'
import { SerializedProduct } from '@/lib/types'

const initialState: ActionState = {
  ok: false,
  message: '',
}

type Props = {
  onClose: () => void
  product?: SerializedProduct | null
}

export function ProductForm({ onClose, product }: Props) {
  const [state, action, isPending] = useActionState(saveProductAction, initialState)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold tracking-tight">{product ? 'Edit Product' : 'New Product'}</h2>
            <button 
                onClick={onClose} 
                className="rounded-md p-1 hover:bg-secondary hover:text-foreground transition-colors"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <span className="sr-only">Close</span>
            </button>
        </div>
        
        <form action={action} className="flex flex-col gap-6 p-6">
          <input type="hidden" name="id" value={product?.id || ''} />
          
          {state?.message && (
             <div className={`flex items-center gap-2 rounded-md p-3 text-sm font-medium ${state.ok ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground'}`}>
                {state.ok ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 6 9 17l-5-5"/></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                )}
                {state.message}
             </div>
          )}
          
          <div className="space-y-4">
            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                <input 
                    name="name" 
                    defaultValue={product?.name}
                    placeholder="e.g. Premium T-Shirt"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                />
                {state?.fieldErrors?.name && <p className="text-xs font-medium text-destructive">{state.fieldErrors.name}</p>}
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">SKU</label>
                <input 
                    name="sku" 
                    defaultValue={product?.sku}
                    placeholder="e.g. PROD-123"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                />
                {state?.fieldErrors?.sku && <p className="text-xs font-medium text-destructive">{state.fieldErrors.sku}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Price</label>
                    <input 
                        name="price" 
                        type="number" 
                        step="0.01" 
                        defaultValue={product?.price ?? ''}
                        placeholder="0.00"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    />
                    {state?.fieldErrors?.price && <p className="text-xs font-medium text-destructive">{state.fieldErrors.price}</p>}
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Stock</label>
                    <input 
                        name="stock" 
                        type="number" 
                        defaultValue={product?.stock}
                        placeholder="0"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    />
                    {state?.fieldErrors?.stock && <p className="text-xs font-medium text-destructive">{state.fieldErrors.stock}</p>}
                </div>
            </div>
            
             <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Category</label>
                 <input 
                    name="category" 
                    defaultValue={product?.category}
                    placeholder="e.g. Clothing"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                />
                {state?.fieldErrors?.category && <p className="text-xs font-medium text-destructive">{state.fieldErrors.category}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={isPending}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
                {isPending ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
