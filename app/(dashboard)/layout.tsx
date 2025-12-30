import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans">
      <nav className="border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">
         <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Store Admin</h1>
            <div className="flex gap-4">
              <Link href="/products" className="text-sm font-medium hover:text-blue-600 dark:text-zinc-400 dark:hover:text-white">Products</Link>
            </div>
         </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
