'use server'

import { productRepo } from '@/lib/productRepo'
import { revalidatePath, after } from 'next/cache'

export type ActionState = {
  ok: boolean
  message: string
  fieldErrors?: Record<string, string>
  payload?: any
}

// Helper to validate FormData
const validateProduct = (formData: FormData) => {
  const name = formData.get('name') as string
  const sku = formData.get('sku') as string
  const price = Number(formData.get('price'))
  const stock = Number(formData.get('stock'))
  const category = formData.get('category') as string
  const id = formData.get('id') as string | null

  const errors: Record<string, string> = {}
  
  if (!name || name.length < 3) errors.name = 'Name must be at least 3 chars'
  if (!sku || !/^[A-Z0-9\-._]+$/.test(sku)) errors.sku = 'SKU invalid (A-Z, 0-9, . - _)'
  if (isNaN(price) || price < 0) errors.price = 'Price must be >= 0'
  if (isNaN(stock) || stock < 0) errors.stock = 'Stock must be >= 0'
  if (!category) errors.category = 'Category is required'

  return { errors, data: { id, name, sku, price, stock, category } }
}

export async function saveProductAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const { errors, data } = validateProduct(formData)

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: 'Validation failed', fieldErrors: errors }
  }

  try {
    if (data.id) {
       // Update
       await productRepo.update(data.id, {
         name: data.name,
         sku: data.sku,
         price: data.price,
         stock: data.stock,
         category: data.category
       })
       // Log after response
       after(() => console.log(`Product updated: ${data.sku}`))
    } else {
       // Create
       await productRepo.create({
         name: data.name,
         sku: data.sku,
         price: data.price,
         stock: data.stock,
         category: data.category
       })
       after(() => console.log(`Product created: ${data.sku}`))
    }

    revalidatePath('/products')
    return { ok: true, message: 'Saved successfully' }
  } catch (error: any) {
    if (error.message === 'SKU already exists') { 
        return { ok: false, message: 'Validation failed', fieldErrors: { sku: 'SKU already exists' } }
    }
    return { ok: false, message: 'Internal Server Error' }
  }
}

export async function toggleActiveAction(id: string) {
  try {
    const product = await productRepo.toggleActive(id)
    revalidatePath('/products')
    return { ok: true, message: `Product ${product.active ? 'activated' : 'deactivated'}` }
  } catch (error) {
    return { ok: false, message: 'Failed to toggle active status' }
  }
}
