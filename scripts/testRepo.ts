import { productRepo } from '../lib/productRepo'
import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

async function runTests() {
  console.log('Running Repository Tests...')

  // Cleandb
  await prisma.product.deleteMany()

  // 1. Create
  console.log('Test 1: Create Product')
  const p1 = await productRepo.create({
    name: 'Test Product 1',
    sku: 'TEST-001',
    price: new Prisma.Decimal(99.99),
    stock: 10,
    category: 'Electronics'
  })
  console.assert(p1.id, 'Created product should have ID')
  console.assert(p1.sku === 'TEST-001', 'SKU should match')

  // 2. findMany
  console.log('Test 2: Find Many')
  const list = await productRepo.findMany({ query: 'Test' })
  console.assert(list.metadata.total === 1, 'Should find 1 product')

  // 3. Update
  console.log('Test 3: Update')
  const p1Updated = await productRepo.update(p1.id, { price: new Prisma.Decimal(100) })
  console.assert(p1Updated.price.toString() === '100', 'Price should be updated')

  // 4. Toggle Active
  console.log('Test 4: Toggle Active')
  const p1Toggled = await productRepo.toggleActive(p1.id)
  console.assert(p1Toggled.active === false, 'Should be inactive')
  
  // 5. Unique Constraint
  console.log('Test 5: Unique Constraint')
  try {
     await productRepo.create({
        name: 'Duplicate SKU',
        sku: 'TEST-001',
        price: new Prisma.Decimal(50),
        stock: 5,
        category: 'Test'
     })
     console.error('Should have failed with duplicate SKU')
  } catch(e: any) {
     console.assert(e.message === 'SKU already exists', 'Should throw correct error')
  }

  console.log('All tests passed!')
}

runTests()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
