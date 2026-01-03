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
  
  const { products: rawProducts, metadata } = await productRepo.findMany({
    query: params.query,
    status: params.status as any,
    category: params.category,
    page: Number(params.page) || 1,
    pageSize: 10
  })

  // Serialize products (convert Decimal to number)
  const products = rawProducts.map((p: any) => ({
    ...p,
    price: Number(p.price)
  }))

  const categories = await productRepo.getCategories()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* We can remove the title here as it is inside the Table component or keep it if we want a global page title. 
            The design has 'All Products' in table. Let's keep a page header for breadcrumbs or high level context if needed, 
            but for now the previous one was simple. 
            Let's remove the redundant 'Products' title if the table has 'All Products', 
            OR make this the main header and remove it from table.
            
            Let's keep the Filters separate.
        */}
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Products Dashboard</h1>
        </div>
        <ProductFilters categories={categories.filter((c: any): c is string => !!c)} />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
         <ProductTable products={products} />
      </Suspense>
        
      {/* Pagination (Simple Implementation) */}
      <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
         <div>
            Showing {(metadata.page - 1) * metadata.pageSize + 1} to {Math.min(metadata.page * metadata.pageSize, metadata.total)} of {metadata.total} results
         </div>
         <div className="flex gap-2">
            <button className="rounded-md border border-input bg-background px-3 py-1 hover:bg-accent disabled:opacity-50" disabled={metadata.page <= 1}>Previous</button>
            <button className="rounded-md border border-input bg-background px-3 py-1 hover:bg-accent disabled:opacity-50" disabled={metadata.page * metadata.pageSize >= metadata.total}>Next</button>
         </div>
      </div>
    </div>
  )
}
