'use server'

import { productService } from '@/services/product.service'
import { revalidatePath } from 'next/cache'
import { AppError } from '@/utils/errors'
import { after } from 'next/server'

export type ActionState = {
  ok: boolean
  message: string
  fieldErrors?: Record<string, string>
  payload?: any
}

export async function saveProductAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data = Object.fromEntries(formData.entries())
  
  try {
    if (data.id) {
       // Update
       await productService.update(data.id as string, data)
       after(() => console.log(`Product updated: ${data.sku}`))
    } else {
       // Create
       await productService.create(data)
       after(() => console.log(`Product created: ${data.sku}`))
    }

    revalidatePath('/products')
    return { ok: true, message: 'Saved successfully' }
  } catch (error: any) {
    if (error instanceof AppError) {
      return { ok: false, message: error.message, fieldErrors: error.fieldErrors }
    }
    return { ok: false, message: 'Internal Server Error' }
  }
}

export async function toggleActiveAction(id: string) {
  try {
    const product = await productService.toggleActive(id)
    revalidatePath('/products')
    return { ok: true, message: `Product ${product.active ? 'activated' : 'deactivated'}` }
  } catch (error) {
    return { ok: false, message: 'Failed to toggle active status' }
  }
}
