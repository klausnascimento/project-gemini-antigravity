import { NextRequest, NextResponse } from 'next/server'
import { productService } from '@/services/product.service'
import { AppError } from '@/utils/errors'

// Next.js 15: params is a Promise
export async function PATCH(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const product = await productService.update(id, body)
    return NextResponse.json(product)

  } catch (error: unknown) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message, fieldErrors: error.fieldErrors },
        { status: error.statusCode }
      )
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
