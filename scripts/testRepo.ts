import { productService } from '../services/product.service'
import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errors'

async function runTests() {
  console.log('Running Service Tests...')

  // Cleandb
  await prisma.product.deleteMany()

  // 1. Create
  console.log('Test 1: Create Product')
  const p1 = await productService.create({
    name: 'Test Product 1',
    sku: 'TEST-001',
    price: 99.99,
    stock: 10,
    category: 'Electronics'
  })
  if (!p1) throw new Error('Created product should not be undefined')
  console.assert(p1.id !== undefined, 'Created product should have ID')
  console.assert(p1.sku === 'TEST-001', 'SKU should match')

  // 2. findMany
  console.log('Test 2: Find Many')
  const list = await productService.findMany({ query: 'Test' })
  console.assert(list.metadata.total === 1, 'Should find 1 product')

  // 3. Update
  console.log('Test 3: Update')
  const p1Updated = await productService.update(p1.id, { price: 100 })
  if (!p1Updated) throw new Error('Updated product should not be undefined')
  console.assert(p1Updated.price.toString() === '100', 'Price should be updated')

  // 4. Toggle Active
  console.log('Test 4: Toggle Active')
  const p1Toggled = await productService.toggleActive(p1.id)
  if (!p1Toggled) throw new Error('Toggled product should not be undefined')
  console.assert(p1Toggled.active === false, 'Should be inactive')
  
  // 5. Unique Constraint
  console.log('Test 5: Unique Constraint')
  try {
     await productService.create({
        name: 'Duplicate SKU',
        sku: 'TEST-001',
        price: 50,
        stock: 5,
        category: 'Test'
     })
     console.error('Should have failed with duplicate SKU')
  } catch(e: any) {
     if (e instanceof AppError) {
       console.assert(e.fieldErrors?.sku === 'SKU already exists', 'Should throw correct error')
     } else {
       console.error('Unexpected error type', e)
     }
  }

  console.log('All tests passed!')
}

runTests()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
