import { prisma } from './prisma'
import { Prisma } from '@prisma/client'
import { CreateProductDTO, UpdateProductDTO, ProductFilterDTO } from '../dtos/product.dto'

export const productRepo = {
  async create(data: CreateProductDTO) {
    // Apenas comunicação com o banco, sem try/catch sujo de regra de negócio
    return await prisma.product.create({
      data: {
        ...data,
        active: true,
      } as Prisma.ProductCreateInput,
    })
  },

  async update(id: string, data: UpdateProductDTO) {
    return await prisma.product.update({
      where: { id },
      data,
    })
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
  }: ProductFilterDTO) {
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
    return categories.map((c: any) => c.category)
  }
}
