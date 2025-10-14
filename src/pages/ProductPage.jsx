import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { request, gql } from "graphql-request";

const PRODUCT_QUERY = gql`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 5) {
        edges {
          node {
            url
          }
        }
      }
      options {
        name
        values
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = gql`
  query GetRecommendedProducts {
    products(first: 4) {
      edges {
        node {
          id
          title
          handle
          priceRange { minVariantPrice { amount currencyCode } }
          featuredImage { url }
        }
      }
    }
  }
`;

export default function ProductPage() {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      request("https://mock.shop/api", PRODUCT_QUERY, { handle }),
      request("https://mock.shop/api", RECOMMENDED_PRODUCTS_QUERY),
    ])
      .then(([productData, recommendedData]) => {
        setProduct(productData.product);
        const list = recommendedData?.products?.edges?.map((e) => e.node) || [];
        setRecommendedProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const images = product.images?.edges?.map((e) => e.node.url) || [];
  const price = product.priceRange?.minVariantPrice;
  const productOptions = product.options || [];
  
  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };
  const getColorClass = (colorName) => {
    const colorMap = {
      'Green': 'bg-green-700',
      'Blue': 'bg-blue-700',
      'Red': 'bg-red-700',
      'Black': 'bg-gray-900',
      'White': 'bg-white border-gray-300',
      'Yellow': 'bg-yellow-500',
      'Pink': 'bg-pink-500',
      'Purple': 'bg-purple-700',
      'Orange': 'bg-orange-500',
      'Gray': 'bg-gray-500',
      'Brown': 'bg-amber-700',
      'Navy': 'bg-blue-900',
      'Beige': 'bg-amber-100',
      'Olive': 'bg-green-600',
      'Burgundy': 'bg-red-900',
    };
    return colorMap[colorName];
  };


  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-12">
          <div className="space-y-4 ">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImage] || images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {images.slice(0, 2).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                      selectedImage === idx
                    
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>


          <div className="space-y-6 md:pr-20">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              {price && (
                <p className="text-2xl font-normal text-gray-900">
                  ${Number(price.amount).toFixed(2)} {price.currencyCode}
                </p>
              )}
              <Link
                to="#"
                className="text-sm text-gray-600 underline hover:text-gray-900 mt-1 inline-block"
              >
                Shipping
              </Link>
              <span className="text-sm text-gray-600"> calculated at checkout.</span>
            </div>


            {productOptions.map((option) => {
              const optionName = option.name;
              const optionValues = option.values;
              const selectedValue = selectedOptions[optionName];


              if (!optionValues || optionValues.length === 0) return null;


              const isColorOption = optionName.toLowerCase() === 'color';
              return (
                <div key={optionName}>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    {optionName}
                    {selectedValue && ` : ${selectedValue}`}
                  </label>
                 
                  {isColorOption ? (-
                    <div className="flex flex-wrap gap-2">
                      {optionValues.map((value) => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(optionName, value)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            getColorClass(value)
                          } ${
                            selectedValue === value
                              ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                              : "border-gray-300 hover:border-gray-500"
                          }`}
                          title={value}
                          aria-label={value}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {optionValues.map((value) => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(optionName, value)}
                          className={`px-4 py-2 border rounded text-sm font-medium transition-colors ${
                            selectedValue === value
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-900 border-gray-300 hover:border-gray-900"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}


            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4 border-2 inline-flex">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-1 border-gray-300 rounded hover:border-gray-900"
                >
                  −
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-1 border-gray-300 rounded hover:border-gray-900"
                >
                  +
                </button>
              </div>
            </div>


            <button className="w-full bg-gray-900 text-white py-4 rounded-md font-medium hover:bg-gray-800 transition-colors max-md:max-w-[300px]">
              Add to cart
            </button>


            <div className="pt-6">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>


        {recommendedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((p) => {
                const img = p.featuredImage?.url;
                const price = p.priceRange?.minVariantPrice;


                return (
                  <Link
                    key={p.id}
                    to={`/products/${p.handle}`}
                    className="group"
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <img
                        src={img}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {p.title}
                    </h3>
                    {price && (
                      <p className="text-sm text-gray-600">
                        ${Number(price.amount).toFixed(2)} {price.currencyCode}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





