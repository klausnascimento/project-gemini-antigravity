import { NextRequest, NextResponse } from 'next/server'
import { productRepo, CreateProductDTO } from '@/lib/productRepo'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  const query = searchParams.get('query') || undefined
  const status = searchParams.get('status') as 'active' | 'inactive' | 'all' | undefined
  const category = searchParams.get('category') || undefined
  const page = Number(searchParams.get('page')) || 1
  const sortParam = searchParams.get('sort') || 'createdAt:desc'
  
  const [sort, order] = sortParam.split(':') as [string, 'asc' | 'desc']

  const result = await productRepo.findMany({
    query,
    status,
    category,
    page,
    sort,
    order
  })

  // Next.js 15: GET handlers using searchParams are dynamic by default, 
  // but we can be explicit if needed. 
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    const errors: Record<string, string> = {}
    if (!body.name || body.name.length < 3) errors.name = 'Name must be at least 3 chars'
    if (!body.sku || !/^[A-Z0-9\-._]+$/.test(body.sku)) errors.sku = 'SKU invalid (A-Z, 0-9, . - _)'
    if (body.price === undefined || body.price < 0) errors.price = 'Price must be >= 0'
    if (body.stock === undefined || body.stock < 0) errors.stock = 'Stock must be >= 0'
    if (!body.category) errors.category = 'Category is required'

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: 'Validation failed', fieldErrors: errors }, { status: 400 })
    }

    const product = await productRepo.create({
      name: body.name,
      sku: body.sku,
      price: body.price,
      stock: body.stock,
      category: body.category
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    if (error.message === 'SKU already exists') {
      return NextResponse.json(
        { message: 'Validation failed', fieldErrors: { sku: 'SKU already exists' } },
        { status: 400 }
      )
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
