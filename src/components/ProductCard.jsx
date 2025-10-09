import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  const { handle, title, featuredImage, priceRange } = product
  const price = priceRange?.minVariantPrice
  return (
    <Link to={`/products/${handle}`} className="block group">
      <div className="aspect-square overflow-hidden rounded-2xl border">
        <img
          src={featuredImage?.url}
          alt={featuredImage?.altText || title}
          className="h-full w-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        {price && (
          <p className="mt-1 text-sm">
            {Number(price.amount).toFixed(2)} {price.currencyCode}
          </p>
        )}
      </div>
    </Link>
  )
}
