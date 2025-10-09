import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import { gqlRequest } from "../lib/graphql"
// import { PRODUCT_BY_HANDLE } from "../lib/queries"

export default function PDP() {
  const { handle } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const d = await gqlRequest(PRODUCT_BY_HANDLE, { handle })
        setData(d.product)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [handle])

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-12">Đang tải sản phẩm…</div>
  if (error)   return <div className="max-w-6xl mx-auto px-4 py-12 text-red-600">Lỗi: {error}</div>
  if (!data)   return <div className="max-w-6xl mx-auto px-4 py-12">Không tìm thấy sản phẩm.</div>

  const price = data.variants?.edges?.[0]?.node?.price

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
      <div>
        <div className="aspect-square overflow-hidden rounded-2xl border">
          <img
            src={data.featuredImage?.url || data.images?.edges?.[0]?.node?.url}
            alt={data.featuredImage?.altText || data.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-5 gap-3 mt-3">
          {(data.images?.edges || []).slice(0,5).map((e,i)=>(
            <img key={i} src={e.node.url} alt={e.node.altText || data.title} className="rounded-lg border aspect-square object-cover"/>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        {price && (
          <p className="mt-2 text-xl">
            {Number(price.amount).toFixed(2)} {price.currencyCode}
          </p>
        )}
        {data.description && (
          <p className="mt-4 text-gray-700 whitespace-pre-line">{data.description}</p>
        )}
        <div className="mt-6 flex gap-3">
          <button className="btn btn--primary">Thêm vào giỏ</button>
          <button className="btn btn--ghost">Mua ngay</button>
        </div>
      </div>
    </section>
  )
}
