import { productRepo } from '../lib/productRepo'
import { createProductSchema, updateProductSchema, productFilterSchema } from '../dtos/product.dto'
import { Prisma } from '@prisma/client'
import { AppError } from '../utils/errors'
import { validateData } from '../utils/validation'

const handleRepoError = (error: unknown): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    throw new AppError('Validation failed', { sku: 'SKU already exists' }, 400)
  }
  throw error
}

export const productService = {
  async create(data: unknown) {
    const validData = validateData(createProductSchema, data)
    try {
      return await productRepo.create(validData)
    } catch (error: unknown) {
      return handleRepoError(error)
    }
  },

  async update(id: string, data: unknown) {
    const validData = validateData(updateProductSchema, data)
    try {
      return await productRepo.update(id, validData)
    } catch (error: unknown) {
      return handleRepoError(error)
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
    const validParams = validateData(productFilterSchema, params)
    return await productRepo.findMany(validParams)
  },

  async getCategories() {
    return await productRepo.getCategories()
  }
}
