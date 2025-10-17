import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { request, gql } from "graphql-request";
import { optimizeShopifyImage, generateSrcSet } from "../utils/imageOptimizer";

const API = "https://mock.shop/api";

const QUERY = gql`
  query ProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      title
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            featuredImage { 
              url
            }
            priceRange { 
              minVariantPrice { 
                amount 
                currencyCode 
              } 
            }
          }
        }
      }
    }
  }
`;

export default function CollectionPage() {
    const { handle } = useParams();          
    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        // Start API call immediately without delay
        const startTime = performance.now();
        request(API, QUERY, { handle, first: 12 })
            .then((data) => {
                const endTime = performance.now();
                console.log(`API call took: ${endTime - startTime}ms`);
                
                setTitle(data.collection?.title || handle);
                const list = data.collection?.products?.edges?.map(e => e.node) || [];
                setItems(list);
                
                // Skip dynamic preload since we already preload common images in HTML
                // This reduces JavaScript execution time
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    }, [handle]);

    return (
        <section className="bg-[#f3f3f3]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 md:mb-10">
                    {title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {loading ? (
                        // Skeleton loading with prioritize LCP for first item 
                        Array.from({ length: 12 }).map((_, index) => {
                            const isFirstSkeleton = index === 0;    const [title, setTitle] = useState(handle || ""); 
                            return (
                                <div key={index} className="block overflow-hidden animate-pulse">
                                    <div className={`aspect-square overflow-hidden ${isFirstSkeleton ? 'bg-gray-200' : 'bg-gray-300'}`}></div>
                                    <div className="mt-3 space-y-2">
                                        <div className={`h-4 rounded w-3/4 ${isFirstSkeleton ? 'bg-gray-200' : 'bg-gray-300'}`}></div>
                                        <div className={`h-4 rounded w-1/2 ${isFirstSkeleton ? 'bg-gray-200' : 'bg-gray-300'}`}></div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        items.map((p, index) => {
                            const img = p.featuredImage?.url;
                            const price = p.priceRange?.minVariantPrice;
                            const isFirstImage = index === 0;
                            return (
                                <Link
                                    key={p.id}
                                    to={`/products/${p.handle}`}
                                    className="block overflow-hidden">
                                    <div className="aspect-square bg-[#efefef] overflow-hidden">
                                        {img && (
                                            <img
                                                src={optimizeShopifyImage(img, 400)}
                                                srcSet={generateSrcSet(img)}
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                loading={isFirstImage ? "eager" : "lazy"}
                                                fetchPriority={isFirstImage ? "high" : "low"}
                                                width="400"
                                                height="400"
                                            />
                                        )}
                                    </div>
                                    <h3 className="hover:underline mt-3 text-sm font-medium text-gray-900 ">{p.title}</h3>
                                    {price && (
                                        <p className="font-medium text-gray-700">
                                            {Number(price.amount).toFixed(2)} {price.currencyCode}
                                        </p>
                                    )}
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
