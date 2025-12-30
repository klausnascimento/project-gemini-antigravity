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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-bold">{product ? 'Edit Product' : 'New Product'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        
        <form action={action} className="p-6 space-y-4">
          <input type="hidden" name="id" value={product?.id || ''} />
          
          {state?.message && (
             <div className={`p-3 rounded text-sm ${state.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {state.message}
             </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
                name="name" 
                defaultValue={product?.name}
                className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700" 
            />
            {state?.fieldErrors?.name && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input 
                name="sku" 
                defaultValue={product?.sku}
                className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700" 
            />
            {state?.fieldErrors?.sku && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.sku}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input 
                    name="price" 
                    type="number" 
                    step="0.01" 
                    defaultValue={product?.price ?? ''}
                    className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700" 
                />
                {state?.fieldErrors?.price && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.price}</p>}
             </div>
             <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input 
                    name="stock" 
                    type="number" 
                    defaultValue={product?.stock}
                    className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700" 
                />
                {state?.fieldErrors?.stock && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.stock}</p>}
             </div>
          </div>
          
           <div>
            <label className="block text-sm font-medium mb-1">Category</label>
             <input 
                name="category" 
                defaultValue={product?.category}
                className="w-full border rounded px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700" 
            />
            {state?.fieldErrors?.category && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.category}</p>}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded hover:bg-gray-50 dark:hover:bg-zinc-800">Cancel</button>
            <button 
                type="submit" 
                disabled={isPending}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
