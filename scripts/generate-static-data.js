import { request, gql } from 'graphql-request';
import fs from 'fs';
import path from 'path';

const API = "https://mock.shop/api";

const COLLECTIONS_QUERY = gql`
  query GetCollections {
    collections(first: 10) {
      edges {
        node {
          handle
          title
          products(first: 12) {
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
    }
  }
`;

const COLLECTION_QUERY = gql`
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

async function generateStaticData() {
  console.log('🚀 Generating static data...');
  
  try {
    // Create static data directory
    const staticDir = path.join(process.cwd(), 'public', 'static-data');
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }

    // Generate popular collections data
    const popularCollections = ['men', 'women', 'unisex'];
    
    for (const handle of popularCollections) {
      console.log(`📦 Generating data for collection: ${handle}`);
      
      const data = await request(API, COLLECTION_QUERY, { handle, first: 12 });
      
      if (data.collection) {
        const staticData = {
          title: data.collection.title,
          products: data.collection.products.edges.map(e => e.node),
          generatedAt: new Date().toISOString(),
          handle
        };
        
        const filePath = path.join(staticDir, `${handle}.json`);
        fs.writeFileSync(filePath, JSON.stringify(staticData, null, 2));
        
        console.log(`✅ Generated: ${filePath}`);
      }
    }

    // Generate collections list
    console.log('📋 Generating collections list...');
    const collectionsData = await request(API, COLLECTIONS_QUERY);
    const collectionsList = {
      collections: collectionsData.collections.edges.map(e => ({
        handle: e.node.handle,
        title: e.node.title,
        productCount: e.node.products.edges.length
      })),
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(staticDir, 'collections.json'), 
      JSON.stringify(collectionsList, null, 2)
    );

    console.log('🎉 Static data generation completed!');
    console.log(`📁 Files generated in: ${staticDir}`);
    
  } catch (error) {
    console.error('❌ Error generating static data:', error);
    process.exit(1);
  }
}

generateStaticData();
