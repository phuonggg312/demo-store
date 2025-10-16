/**
 * @param {string} url - Original image URL
 * @param {number} width - Desired width
 * @returns {string} Optimized image URL
 */
export function optimizeShopifyImage(url, width = 800) {
  if (!url) return url;
  
  // Check if it's a Shopify CDN URL or mock.shop URL
  if (url.includes('cdn.shopify.com') || url.includes('mock.shop')) {
    // Check if URL already has width parameter
    if (url.includes('width=')) {
      // Replace existing width parameter
      return url.replace(/width=\d+/, `width=${width}`);
    }
    
    // Add width parameter
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${width}`;
  }
  
  return url;
}

/**
 * @param {string} url 
 * @returns {string} 
 */
export function generateSrcSet(url) {
  if (!url) return '';
  if (!url.includes('cdn.shopify.com') && !url.includes('mock.shop')) return '';
  
  const sizes = [400, 600, 800, 1200];
  return sizes
    .map(size => `${optimizeShopifyImage(url, size)} ${size}w`)
    .join(', ');
}
