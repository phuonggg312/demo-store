/**
 * Optimize Shopify CDN images by adding size parameters
 * @param {string} url - Original image URL
 * @param {number} width - Desired width
 * @returns {string} Optimized image URL
 */
export function optimizeShopifyImage(url, width = 800) {
  if (!url) return url;
  
  // Check if it's a Shopify CDN URL
  if (url.includes('cdn.shopify.com')) {
    // Remove existing size parameters
    const baseUrl = url.split('?')[0];
    
    // Add optimized size parameter
    // Format: _800x (width constraint, auto height)
    const extension = baseUrl.substring(baseUrl.lastIndexOf('.'));
    const urlWithoutExt = baseUrl.substring(0, baseUrl.lastIndexOf('.'));
    
    return `${urlWithoutExt}_${width}x${extension}`;
  }
  
  return url;
}

/**
 * @param {string} url 
 * @returns {string} 
 */
export function generateSrcSet(url) {
  if (!url || !url.includes('cdn.shopify.com')) return '';
  
  const sizes = [400, 600, 800, 1200];
  return sizes
    .map(size => `${optimizeShopifyImage(url, size)} ${size}w`)
    .join(', ');
}
