import { productRepo } from '@/lib/productRepo'
import { ProductFilters } from './_components/ProductFilters'
import { ProductTable } from './_components/ProductTable'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams: Promise<{
    query?: string
    status?: string
    category?: string
    page?: string
  }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  
  const { products, metadata } = await productRepo.findMany({
    query: params.query,
    status: params.status as any,
    category: params.category,
    page: Number(params.page) || 1,
    pageSize: 10
  })

  const categories = await productRepo.getCategories()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductFilters categories={categories.filter((c): c is string => !!c)} />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
         <ProductTable products={products} />
      </Suspense>
        
      {/* Pagination (Simple Implementation) */}
      <div className="flex justify-between items-center text-sm text-gray-500">
         <div>
            Showing {(metadata.page - 1) * metadata.pageSize + 1} to {Math.min(metadata.page * metadata.pageSize, metadata.total)} of {metadata.total} results
         </div>
      </div>
    </div>
  )
}
