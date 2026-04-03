import { vi, describe, it, expect, beforeEach } from 'vitest'
import { productService } from '../../services/product.service'
import { productRepo } from '../../lib/productRepo'
import { Prisma } from '@prisma/client'
import { AppError } from '../../utils/errors'

vi.mock('../../lib/productRepo', () => ({
  productRepo: {
    create: vi.fn(),
    update: vi.fn(),
    toggleActive: vi.fn(),
    findById: vi.fn(),
    findMany: vi.fn()
  }
}))

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('should create a product with valid data', async () => {
      const validData = { name: 'Test Product', sku: 'TST-123', price: 100, stock: 10, category: 'Test' }
      vi.mocked(productRepo.create).mockResolvedValue({ id: '1', ...validData, active: true, createdAt: new Date(), updatedAt: new Date() } as any)
      
      const result = await productService.create(validData)
      expect(result.id).toBe('1')
      expect(productRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Test Product', sku: 'TST-123' })
      )
    })

    it('should throw AppError for invalid creation data', async () => {
      // name too short, price/stock < 0, empty category
      const invalidData = { name: 'Te', sku: 'TST-123', price: -5, stock: -1, category: '' }
      
      await expect(productService.create(invalidData)).rejects.toMatchObject({
        name: 'AppError',
        fieldErrors: {
          name: expect.any(String),
          price: expect.any(String),
          stock: expect.any(String),
          category: expect.any(String)
        }
      })
      
      expect(productRepo.create).not.toHaveBeenCalled()
    })

    it('should handle Prisma P2002 error as SKU already exists', async () => {
      const validData = { name: 'Test Product', sku: 'TST-123', price: 100, stock: 10, category: 'Test' }
      
      const error = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '7.2.0',
        meta: {},
        batchRequestIdx: undefined
      })
      
      vi.mocked(productRepo.create).mockRejectedValue(error)

      await expect(productService.create(validData)).rejects.toMatchObject({
        name: 'AppError',
        fieldErrors: { sku: 'SKU already exists' }
      })
    })
  })
})
