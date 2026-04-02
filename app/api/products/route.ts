import { NextRequest, NextResponse } from 'next/server'
import { productService } from '@/services/product.service'
import { AppError } from '@/utils/errors'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const queryParam = Object.fromEntries(searchParams.entries())

  try {
    const result = await productService.findMany(queryParam)
    return NextResponse.json(result)
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message, fieldErrors: error.fieldErrors }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const product = await productService.create(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message, fieldErrors: error.fieldErrors },
        { status: error.statusCode }
      )
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
