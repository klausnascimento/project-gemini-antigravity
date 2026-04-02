import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 chars'),
  sku: z.string().regex(/^[A-Z0-9\-._]+$/, 'SKU invalid (A-Z, 0-9, . - _)'),
  price: z.coerce.number().min(0, 'Price must be >= 0'),
  stock: z.coerce.number().int('Stock must be an integer').min(0, 'Stock must be >= 0'),
  category: z.string().min(1, 'Category is required')
})

export const updateProductSchema = createProductSchema.partial()

export const productFilterSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['active', 'inactive', 'all']).optional(),
  category: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).optional().default(10),
  sort: z.string().optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc')
})

export type CreateProductDTO = z.infer<typeof createProductSchema>
export type UpdateProductDTO = z.infer<typeof updateProductSchema>
export type ProductFilterDTO = z.infer<typeof productFilterSchema>
