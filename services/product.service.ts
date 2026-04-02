import { productRepo } from '../lib/productRepo'
import { createProductSchema, updateProductSchema, productFilterSchema } from '../dtos/product.dto'
import { Prisma } from '@prisma/client'
import { AppError } from '../utils/errors'

const formatZodErrors = (fieldErrors: Record<string, string[] | undefined>) => {
  const formatted: Record<string, string> = {}
  for (const key in fieldErrors) {
    if (fieldErrors[key] && fieldErrors[key]!.length > 0) {
      formatted[key] = fieldErrors[key]![0]
    }
  }
  return formatted
}

export const productService = {
  async create(data: unknown) {
    const parsed = createProductSchema.safeParse(data)
    if (!parsed.success) {
      throw new AppError('Validation failed', formatZodErrors(parsed.error.flatten().fieldErrors), 400)
    }

    try {
      return await productRepo.create(parsed.data)
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Validation failed', { sku: 'SKU already exists' }, 400)
      }
      throw error
    }
  },

  async update(id: string, data: unknown) {
    const parsed = updateProductSchema.safeParse(data)
    if (!parsed.success) {
      throw new AppError('Validation failed', formatZodErrors(parsed.error.flatten().fieldErrors), 400)
    }

    try {
      return await productRepo.update(id, parsed.data)
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Validation failed', { sku: 'SKU already exists' }, 400)
      }
      throw error
    }
  },

  async toggleActive(id: string) {
    return await productRepo.toggleActive(id)
  },

  async findById(id: string) {
    const product = await productRepo.findById(id)
    if (!product) {
      throw new AppError('Product not found', undefined, 404)
    }
    return product
  },

  async findMany(params: unknown) {
    const parsed = productFilterSchema.safeParse(params)
    if (!parsed.success) {
      throw new AppError('Invalid filter parameters', formatZodErrors(parsed.error.flatten().fieldErrors), 400)
    }
    return await productRepo.findMany(parsed.data)
  },

  async getCategories() {
    return await productRepo.getCategories()
  }
}
