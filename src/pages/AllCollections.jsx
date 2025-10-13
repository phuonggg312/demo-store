import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request, gql } from "graphql-request";

const API = "https://mock.shop/api";
const IconArrowRight = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
const QUERY = gql`
  query AllCollections($first:Int!, $after:String) {
    collections(first:$first, after:$after) {
      edges {
        node {
          id
          title
          handle
          image { url }
        }
      }
    }
  }
`;

export default function AllCollections() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        request(API, QUERY, { first: 8, after: null })
            .then((data) => {
                const list = (data.collections?.edges || []).map(e => e.node);
                setItems(list);
            })
            .catch(console.error);
    }, []);

    return (
        <section className="bg-[#efefef]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 md:mb-10">
                    Collections
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(c => (
                        <Link key={c.id} to={`/collections/${c.handle}`} className="block group relative">
                            <div className="aspect-square bg-[#efefef] rounded-lg overflow-hidden">
                                    <img
                                        src={c.image.url}
                                        alt={c.title}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        loading="lazy"
                                    />

                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
                                <h3>{c.title}</h3>
                                <IconArrowRight className="w-4 h-4" aria-hidden="true" />
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
