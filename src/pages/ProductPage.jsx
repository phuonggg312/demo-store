import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request, gql } from "graphql-request";

const API = "https://mock.shop/api";

const PRODUCT_QUERY = gql`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 5) { edges { node { url } } }
      options { name values }
    }
  }
`;

export default function ProductPage() {
  const { handle } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    let ok = true;
    setLoading(true);
    request(API, PRODUCT_QUERY, { handle })
      .then((d) => {
        if (!ok) return;
        const p = d?.product ?? null;
        setProduct(p);

        const init = {};
        (p?.options || []).forEach((o) => {
          init[o.name] = (o.values && o.values[0]) || "";
        });
        setSelected(init);
        setImgIndex(0);
      })
      .finally(() => ok && setLoading(false));
    return () => { ok = false; };
  }, [handle]);

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-gray-500">Loading…</div>;
  }

  if (!product) {
    return <div className="min-h-screen grid place-items-center text-gray-500">Product not found</div>;
  }

  const images = (product.images?.edges || []).map(e => e.node && e.node.url).filter(Boolean);
  const mainImg =
    images[imgIndex] ||
    images[0] ||
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  const minPrice = product.priceRange?.minVariantPrice;
  const priceText = minPrice
    ? `$${Number(minPrice.amount).toFixed(2)} ${minPrice.currencyCode}`
    : ""; 

  const options = product.options || [];

  const pick = (name, value) => {
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-[#f3f3f3]">
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img src={mainImg} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-xl text-gray-900 mt-2">{priceText}</p>
          </div>

          {options.map((opt) => {
            const current = selected[opt.name] || "";
            const labelText = current ? `${opt.name} : ${current}` : opt.name;

            return (
              <div key={opt.name}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {labelText}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(opt.values || []).map((val) => {
                    const active = current === val;
                    const base = "px-3 h-10 border rounded text-sm";
                    const activeCls = " bg-gray-900 text-white border-gray-900";
                    const normalCls = " bg-white text-gray-900 border-gray-300 hover:border-gray-900";
                    const btnClass = base + (active ? activeCls : normalCls);

                    return (
                      <button
                        key={val}
                        onClick={() => pick(opt.name, val)}
                        className={btnClass}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
