'use client'

import { useOptimistic, useState, useTransition } from 'react'
import { SerializedProduct } from '@/lib/types'
import { toggleActiveAction } from '../actions'
import { ProductForm } from './ProductForm'

type Props = {
  products: SerializedProduct[]
}

export function ProductTable({ products }: Props) {
  const [editingProduct, setEditingProduct] = useState<SerializedProduct | null | 'new'>(null)
  
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">All Products</h2>
        <button 
            onClick={() => setEditingProduct('new')}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition"
        >
            New Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-800">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-400 border-b dark:border-zinc-800">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {optimisticProducts.map((product) => (
              <tr key={product.id} className="bg-white border-b dark:bg-zinc-950 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900">
                <td className="px-6 py-4 font-medium">
                    <div>{product.name}</div>
                    <div className="text-xs text-gray-500">{product.sku}</div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {product.active ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button 
                    onClick={() => setEditingProduct(product)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleToggle(product.id, product.active)}
                    disabled={isPending}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  >
                    {product.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
            {optimisticProducts.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No products found.</td>
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
