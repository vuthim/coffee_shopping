// Product Data for Brew & Bean Co.

const products = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    category: 'light',
    roast: 'Light Roast',
    price: 18.99,
    originalPrice: null,
    badge: 'bestseller',
    description: 'Bright and complex with notes of blueberry, jasmine, and citrus. Grown at high altitudes in the birthplace of coffee.',
    origin: 'Ethiopia',
    altitude: '1,700-2,200m',
    process: 'Washed',
    flavors: ['Blueberry', 'Jasmine', 'Citrus'],
    rating: 4.9,
    reviews: 127,
   _stock: 50,
    image: '☕'
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    category: 'medium',
    roast: 'Medium Roast',
    price: 16.99,
    originalPrice: null,
    badge: null,
    description: 'Smooth and balanced with caramel sweetness, nutty undertones, and a clean finish. Classic Colombian profile.',
    origin: 'Colombia',
    altitude: '1,400-1,800m',
    process: 'Washed',
    flavors: ['Caramel', 'Hazelnut', 'Cocoa'],
    rating: 4.7,
    reviews: 89,
    _stock: 75,
    image: '☕'
  },
  {
    id: 3,
    name: 'Sumatra Mandheling',
    category: 'dark',
    roast: 'Dark Roast',
    price: 17.99,
    originalPrice: 21.99,
    badge: 'sale',
    description: 'Full-bodied and earthy with intense chocolate, cedar, and subtle spice notes. Low acidity.',
    origin: 'Indonesia',
    altitude: '1,100-1,600m',
    process: 'Wet-Hulled',
    flavors: ['Dark Chocolate', 'Cedar', 'Tobacco'],
    rating: 4.8,
    reviewCount: 156,
    _stock: 40,
    image: '☕'
  },
  {
    id: 4,
    name: 'Guatemala Antigua',
    category: 'medium',
    roast: 'Medium Roast',
    price: 19.99,
    originalPrice: null,
    badge: 'new',
    description: 'Rich and complex with chocolate, spice, and subtle fruit notes. Grown in volcanic soil.',
    origin: 'Guatemala',
    altitude: '1,500-1,700m',
    process: 'Washed',
    flavors: ['Chocolate', 'Orange', 'Cinnamon'],
    rating: 4.6,
    reviews: 45,
    _stock: 60,
    image: '☕'
  },
  {
    id: 5,
    name: 'Kenya AA',
    category: 'light',
    roast: 'Light Roast',
    price: 21.99,
    originalPrice: null,
    badge: null,
    description: 'Vibrant and wine-like with blackcurrant, grapefruit, and tomato notes. Complex and juicy.',
    origin: 'Kenya',
    altitude: '1,400-2,000m',
    process: 'Washed',
    flavors: ['Blackcurrant', 'Grapefruit', 'Tomato'],
    rating: 4.9,
    reviews: 78,
    _stock: 35,
    image: '☕'
  },
  {
    id: 6,
    name: 'Brazilian Santos',
    category: 'medium',
    roast: 'Medium Roast',
    price: 15.99,
    originalPrice: null,
    badge: null,
    description: 'Mild and sweet with notes of nuts, chocolate, and low acidity. Perfect for espresso blends.',
    origin: 'Brazil',
    altitude: '800-1,200m',
    process: 'Natural',
    flavors: ['Peanut', 'Milk Chocolate', 'Caramel'],
    rating: 4.5,
    reviews: 203,
    _stock: 100,
    image: '☕'
  },
  {
    id: 7,
    name: 'Costa Rica Tarrazu',
    category: 'medium',
    roast: 'Medium Roast',
    price: 18.49,
    originalPrice: null,
    badge: null,
    description: 'Bright acidity with honey sweetness, apple notes, and a smooth creamy body.',
    origin: 'Costa Rica',
    altitude: '1,200-1,700m',
    process: 'Honey',
    flavors: ['Honey', 'Apple', 'Almond'],
    rating: 4.7,
    reviews: 92,
    _stock: 55,
    image: '☕'
  },
  {
    id: 8,
    name: 'Italian Espresso Blend',
    category: 'espresso',
    roast: 'Dark Roast',
    price: 16.49,
    originalPrice: null,
    badge: 'bestseller',
    description: 'Traditional Italian style blend with rich crema, chocolate intensity, and hints of caramel.',
    origin: 'Blend',
    altitude: 'Various',
    process: 'Blend',
    flavors: ['Dark Chocolate', 'Caramel', 'Toasted Nuts'],
    rating: 4.8,
    reviews: 312,
    _stock: 80,
    image: '☕'
  },
  {
    id: 9,
    name: 'Decaf Colombian',
    category: 'decaf',
    roast: 'Medium Roast',
    price: 17.99,
    originalPrice: null,
    badge: null,
    description: 'Swiss Water Process decaf with full flavor. Sweet and smooth with caramel and nutty notes.',
    origin: 'Colombia',
    altitude: '1,400-1,800m',
    process: 'Swiss Water',
    flavors: ['Caramel', 'Walnut', 'Orange'],
    rating: 4.6,
    reviews: 67,
    _stock: 45,
    image: '☕'
  },
  {
    id: 10,
    name: 'Ghana AA',
    category: 'light',
    roast: 'Light Roast',
    price: 19.99,
    originalPrice: 24.99,
    badge: 'sale',
    description: 'Fruity and floral with strawberry, hibiscus, and lime. Clean and bright cup.',
    origin: 'Ghana',
    altitude: '1,200-1,500m',
    process: 'Washed',
    flavors: ['Strawberry', 'Hibiscus', 'Lime'],
    rating: 4.7,
    reviews: 54,
    _stock: 30,
    image: '☕'
  },
  {
    id: 11,
    name: 'Java Estate',
    category: 'dark',
    roast: 'Dark Roast',
    price: 20.99,
    originalPrice: null,
    badge: null,
    description: 'Heavy body with earthy, herbal notes, dark chocolate, and a long spicy finish.',
    origin: 'Indonesia',
    altitude: '1,000-1,500m',
    process: 'Wet-Hulled',
    flavors: ['Earth', 'Dark Chocolate', 'Herbs'],
    rating: 4.5,
    reviews: 41,
    _stock: 25,
    image: '☕'
  },
  {
    id: 12,
    name: 'House Espresso Blend',
    category: 'espresso',
    roast: 'Dark Roast',
    price: 14.99,
    originalPrice: null,
    badge: 'bestseller',
    description: 'Our signature house blend. Rich, syrupy body with chocolate, caramel, and a hints of fruit.',
    origin: 'Blend',
    altitude: 'Various',
    process: 'Blend',
    flavors: ['Chocolate', 'Caramel', 'Dried Fruit'],
    rating: 4.8,
    reviews: 456,
    _stock: 120,
    image: '☕'
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    initial: 'S',
    rating: 5,
    text: 'The Ethiopian Yirgacheffe is absolutely incredible! The blueberry notes are so pronounced and the aroma fills my kitchen every morning. Best coffee I\'ve ever had!'
  },
  {
    id: 2,
    name: 'James Rodriguez',
    initial: 'J',
    rating: 5,
    text: 'As a barista, I\'m super picky about my beans. Brew & Bean never disappoints. The freshness and quality are unmatched.'
  },
  {
    id: 3,
    name: 'Emily Chen',
    initial: 'E',
    rating: 4,
    text: 'Great subscription service! Love that I can try different origins each month. The Guatemala Antigua is my current favorite.'
  },
  {
    id: 4,
    name: 'Michael Thompson',
    initial: 'M',
    rating: 5,
    text: 'The Italian Espresso Blend is perfect for my morning pour-over. Rich, bold, and never bitter. Highly recommend!'
  },
  {
    id: 5,
    name: 'Lisa Park',
    initial: 'L',
    rating: 5,
    text: 'Finally found a decaf that actually tastes good! The Swiss Water process really makes a difference. Thank you!'
  },
  {
    id: 6,
    name: 'David Wilson',
    initial: 'D',
    rating: 4,
    text: 'Excellent customer service and fast shipping. The coffee arrives perfectly roasted and fresh. Will definitely order again!'
  }
];

// Get products by category
function getProductsByCategory(category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

// Get product by ID
function getProductById(id) {
  return products.find(p => p.id === id);
}

// Sort products
function sortProducts(productArray, sortBy) {
  const sorted = [...productArray];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

// Search products
function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.origin.toLowerCase().includes(q) ||
    p.flavorProfile.some(f => f.toLowerCase().includes(q)) ||
    p.description.toLowerCase().includes(q)
  );
}

// Format price
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// Get badge class
function getBadgeClass(badge) {
  return badge ? `product-badge ${badge}` : '';
}

// Get badge text
function getBadgeText(badge) {
  switch (badge) {
    case 'sale': return 'Sale';
    case 'new': return 'New';
    case 'bestseller': return 'Bestseller';
    default: return '';
  }
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let html = '';
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      html += '★';
    } else if (i === fullStars && hasHalf) {
      html += '★';
    } else {
      html += '☆';
    }
  }
  
  return html;
}

// Get random products (for featured)
function getFeaturedProducts(count = 4) {
  return [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

// Get products on sale
function getProductsOnSale() {
  return products.filter(p => p.originalPrice !== null);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    products,
    testimonials,
    getProductsByCategory,
    getProductById,
    sortProducts,
    searchProducts,
    formatPrice,
    getBadgeClass,
    getBadgeText,
    generateStars,
    getFeaturedProducts,
    getProductsOnSale
  };
}
