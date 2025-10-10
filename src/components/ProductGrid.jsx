import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";

const PRODUCTS_QUERY = gql`
  query GetProducts {
    products(first: 6) {
      edges {
        node {
          id
          title
          priceRange { minVariantPrice { amount currencyCode } }
          featuredImage { url }
        }
      }
    }
  }
`;

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    request("https://mock.shop/api", PRODUCTS_QUERY)
      .then((data) => {
        const list = data?.products?.edges?.map((e) => e.node) || [];
        setProducts(list);
      })
      .catch((err) => {
        console.error("Fetch products error:", err);
      });
  }, []);

  return (
    <section className="py-12 px-4 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-wide text-gray-600">
            New arrivals
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Spring ’23
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((p) => {
            const img = p.featuredImage?.url;
            const price = p.priceRange?.minVariantPrice;

            return (
              <a
                key={p.id}
                href={`/products/${p.title?.toLowerCase()?.replace(/\s+/g, "-")}`}
                className="block overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 overflow-hidden">
                 
                    <img
                      src={img}
                      alt={p.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
               
                </div>

                <div className="p-[14px]">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {p.title}
                  </h3>
                  {price && (
                    <p className="mt-1 text-[18px] font-normal">
                      {Number(price.amount).toFixed(2)} {price.currencyCode}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
