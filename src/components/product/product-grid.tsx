import { ProductCard } from "@/components/product/product-card"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4 | 5
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-3 sm:gap-4`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  )
}
