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
      images(first: 50) {
        edges {
          node {
            url
            altText
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
            image {
              url
            }
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
  const [currentVariantImages, setCurrentVariantImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      request("https://mock.shop/api", PRODUCT_QUERY, { handle }),
      request("https://mock.shop/api", RECOMMENDED_PRODUCTS_QUERY),
    ])
      .then(([productData, recommendedData]) => {
        const prod = productData.product;
        setProduct(prod);

        const defaultOptions = {};
        prod.options?.forEach(option => {
          if (option.values && option.values.length > 0) {
            defaultOptions[option.name] = option.values[0];
          }
        });
        setSelectedOptions(defaultOptions);

        if (defaultOptions.Color) {
          const colorMapping = {
            'Olive': 'Clay',
            'Green': 'Green',
            'Ocean': 'Ocean',
            'Purple': 'Purple',
            'Red': 'Red',
          };
          
          const urlColorName = colorMapping[defaultOptions.Color] || defaultOptions.Color;
          
          const allImages = prod.images?.edges || [];
          const colorImages = allImages
            .filter(edge => {
              const url = edge.node.url;
              return url.toLowerCase().includes(urlColorName.toLowerCase());
            })
            .map(edge => edge.node.url);
          
          if (colorImages.length > 0) {
            setCurrentVariantImages(colorImages);
          } else {
            setCurrentVariantImages(allImages.slice(0, 5).map(e => e.node.url));
          }
        }
        
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

  const images = product.images?.edges?.map((e) => e.node.url) || [];
  const price = product.priceRange?.minVariantPrice;
  const productOptions = product.options || [];
  
  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
    
    if (optionName === 'Color') {
      const colorMapping = {
        'Olive': 'Clay',
        'Green': 'Green',
        'Ocean': 'Ocean',
        'Purple': 'Purple',
        'Red': 'Red',
      };
      
      const urlColorName = colorMapping[value] || value;
      
      const allImages = product.images?.edges || [];
      const colorImages = allImages
        .filter(edge => {
          const url = edge.node.url;
          return url.toLowerCase().includes(urlColorName.toLowerCase());
        })
        .map(edge => edge.node.url);
      
      if (colorImages.length > 0) {
        setCurrentVariantImages(colorImages);
        setSelectedImage(0);
      } else {
        const colorVariants = product.variants?.edges.filter(e => 
          e.node.selectedOptions?.some(opt => 
            opt.name === 'Color' && opt.value === value
          )
        );
        
        const variantImageUrls = colorVariants
          ?.map(e => e.node.image?.url)
          .filter(url => url);
        
        const uniqueImages = [...new Set(variantImageUrls)];
        
        if (uniqueImages.length > 0) {
          setCurrentVariantImages(uniqueImages);
          setSelectedImage(0);
        }
      }
    }
  };
  const getColorStyle = (colorName) => {
    const colorMap = {
      'Green': '#2d5f3f',
      'Red': '#6e3e4c',
      'Purple': '#3a3159',
      'Olive': '#726948',
      'Ocean': '#2a5259',
      'Clay': '#9b8579',
    };
    return colorMap[colorName] || '#9ca3af';
  };

  const openLightbox = (index) => {
    setLightboxImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };


  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-12">
          <div className="space-y-4 ">
            <div 
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <img
                src={currentVariantImages[0] || images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                width="800"
                height="800"
              />
            </div>
            {currentVariantImages.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {currentVariantImages.slice(1, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => openLightbox(idx + 1)}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 2}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="400"
                      height="400"
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
                 
                  {isColorOption ? (
                    <div className="flex flex-wrap gap-2">
                      {optionValues.map((value) => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(optionName, value)}
                          style={{ backgroundColor: getColorStyle(value) }}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            value === 'White' ? 'border-gray-300' : ''
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
                        loading="lazy"
                        width="300"
                        height="300"
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

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-[#f3f3f3] z-50 flex items-center justify-center cursor-zoom-out"
          onClick={closeLightbox}
        >
          <div 
            className="relative w-full h-full overflow-y-auto py-8"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>{`
              .relative.w-full.h-full.overflow-y-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="max-w-4xl mx-auto px-4 space-y-8">
              {(() => {
                const displayImages = currentVariantImages.length > 0 ? currentVariantImages : images;
                const reorderedImages = [
                  displayImages[lightboxImage],
                  ...displayImages.slice(0, lightboxImage),
                  ...displayImages.slice(lightboxImage + 1)
                ];
                
                return reorderedImages.map((img, idx) => (
                  <div key={idx} className="w-full">
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-auto object-contain"
                      loading={idx === 0 ? "eager" : "lazy"}
                      width="1200"
                      height="1200"
                    />
                  </div>
                ));
              })()}
            </div>
          </div>
          
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 text-gray-900 text-4xl hover:text-gray-600 transition-colors z-10"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}





