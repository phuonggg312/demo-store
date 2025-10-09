import { useEffect, useState } from "react"
// import { gqlRequest } from "../lib/graphql"
// import { LIST_PRODUCTS } from "../lib/queries"
import ProductCard from "../components/ProductCard"

export default function PLP() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const data = await gqlRequest(LIST_PRODUCTS, { first: 24 })
        const nodes = data.products?.edges?.map(e => e.node) || []
        setItems(nodes)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-12">Đang tải sản phẩm…</div>
  if (error)   return <div className="max-w-6xl mx-auto px-4 py-12 text-red-600">Lỗi: {error}</div>

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">Tất cả sản phẩm</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
