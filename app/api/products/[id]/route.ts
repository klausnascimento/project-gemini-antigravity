import { NextRequest, NextResponse } from 'next/server'
import { productRepo } from '@/lib/productRepo'

// Next.js 15: params is a Promise
export async function PATCH(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // If it's just a toggle active request (custom implementation or via body)
    // We can support both partial update and explicit toggle logic
    
    // We will just do partial update here.
    const product = await productRepo.update(id, body)
    return NextResponse.json(product)

  } catch (error: any) {
    if (error.code === 'P2025') { // Prisma Record Not Found
       return NextResponse.json({ message: 'Product not found' }, { status: 404 })
    }
     if (error.message === 'SKU already exists') {
      return NextResponse.json(
        { message: 'Validation failed', fieldErrors: { sku: 'SKU already exists' } },
        { status: 400 }
      )
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
