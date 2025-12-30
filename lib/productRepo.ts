import { prisma } from './prisma'
import { Product, Prisma } from '@prisma/client'

export type ProductFilterParams = {
  query?: string
  status?: 'active' | 'inactive' | 'all'
  category?: string
  page?: number
  pageSize?: number
  sort?: string // 'name' | 'price' | 'createdAt'
  order?: 'asc' | 'desc'
}

export type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'active'>
export type UpdateProductDTO = Partial<CreateProductDTO>

export const productRepo = {
  async create(data: CreateProductDTO) {
    try {
      return await prisma.product.create({
        data: {
          ...data,
          active: true,
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('SKU already exists')
        }
      }
      throw error
    }
  },

  async update(id: string, data: UpdateProductDTO) {
    try {
      return await prisma.product.update({
        where: { id },
        data,
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('SKU already exists')
        }
      }
      throw error
    }
  },

  async toggleActive(id: string) {
    const product = await prisma.product.findUniqueOrThrow({ where: { id } })
    return await prisma.product.update({
      where: { id },
      data: { active: !product.active },
    })
  },

  async findById(id: string) {
    return await prisma.product.findUnique({ where: { id } })
  },

  async findMany({
    query,
    status,
    category,
    page = 1,
    pageSize = 10,
    sort = 'createdAt',
    order = 'desc',
  }: ProductFilterParams) {
    const where: Prisma.ProductWhereInput = {
      AND: [
        query
          ? {
              OR: [
                { name: { contains: query } }, 
                { sku: { contains: query } }
              ],
            }
          : {},
        status === 'active' ? { active: true } : status === 'inactive' ? { active: false } : {},
        category ? { category } : {},
      ],
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [sort]: order },
      }),
      prisma.product.count({ where }),
    ])

    return {
      products,
      metadata: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    }
  },
  
  async getCategories() {
    const categories = await prisma.product.groupBy({
        by: ['category'],
    })
    return categories.map(c => c.category)
  }
}
