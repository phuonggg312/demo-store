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
            featuredImage { url }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  }
`;

// Static data loader
async function loadStaticData(handle) {
  try {
    const response = await fetch(`/static-data/${handle}.json`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Static data not found, falling back to API');
  }
  return null;
}

export default function StaticCollectionPage() {
    const { handle } = useParams();          
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState(handle || "");
    const [loading, setLoading] = useState(true);
    const [isStatic, setIsStatic] = useState(false);

    useEffect(() => {
        setLoading(true);
        
        // Try static data first
        loadStaticData(handle)
            .then(staticData => {
                if (staticData) {
                    console.log('📦 Using static data for:', handle);
                    setTitle(staticData.title);
                    setItems(staticData.products);
                    setIsStatic(true);
                    setLoading(false);
                    
                    // Preload first image immediately since we have the data
                    if (staticData.products.length > 0 && staticData.products[0].featuredImage?.url) {
                        const firstImageUrl = optimizeShopifyImage(staticData.products[0].featuredImage.url, 400);
                        const link = document.createElement('link');
                        link.rel = 'preload';
                        link.as = 'image';
                        link.href = firstImageUrl;
                        link.fetchPriority = 'high';
                        document.head.appendChild(link);
                    }
                } else {
                    // Fallback to API
                    console.log('🌐 Falling back to API for:', handle);
                    return request(API, QUERY, { handle, first: 12 });
                }
            })
            .then((apiData) => {
                if (apiData) {
                    setTitle(apiData.collection?.title || handle);
                    const list = apiData.collection?.products?.edges?.map(e => e.node) || [];
                    setItems(list);
                    setIsStatic(false);
                }
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
    }, [handle]);

    return (
        <section className="bg-[#f3f3f3]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900">
                        {title}
                    </h1>
                    {isStatic && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                            ⚡ Static
                        </span>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {loading ? (
                        // Skeleton loading
                        Array.from({ length: 12 }).map((_, index) => {
                            const isFirstSkeleton = index === 0;
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
                                    <h3 className="hover:underline mt-3 text-sm font-medium text-gray-900">{p.title}</h3>
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
