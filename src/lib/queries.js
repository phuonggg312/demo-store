export const LIST_PRODUCTS = `
  query ListProducts($first: Int = 24) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;
