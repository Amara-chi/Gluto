// pages/Catalog.tsx
// pages/Catalog.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Import icons individually
import { Search } from 'lucide-react';
import { Filter } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { X } from 'lucide-react';

// Import custom components
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { CategorySidebar } from '@/components/CategorySidebar';
import { ProductCard } from '@/components/ProductCard';
import { OrderModal } from '@/components/OrderModal';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartModal } from '@/components/CartModal';


const CATEGORIES = [
  {
    id: 1,
    name: 'AGRI FRESH PRODUCTS',
    subcategories: [
      { id: 11, name: 'Rice' },
      { id: 12, name: 'Beans' },
      { id: 13, name: 'Fruits' },
      { id: 14, name: 'Seeds' },
      { id: 15, name: 'Nuts' }
    ]
  },
  {
    id: 2,
    name: 'FOOD AND BEVERAGE (FMCG)',
    subcategories: [
      { id: 21, name: 'Snacks' },
      { id: 22, name: 'Drinks' },
      { id: 23, name: 'Toiletries' }
    ]
  },
  {
    id: 3,
    name: 'MEAT AND POULTRY PRODUCT',
    subcategories: [
      { id: 31, name: 'Eggs' },
      { id: 32, name: 'Fish' },
      { id: 33, name: 'Beef' }
    ]
  },
  {
    id: 4,
    name: 'PROCESSED AFRICAN FOOD AND ITEMS',
    subcategories: [
      { id: 41, name: 'Stock fish' },
      { id: 42, name: 'Egusi' },
      { id: 43, name: 'Poundo yam' }
    ]
  },
  {
    id: 5,
    name: 'NON FOOD PRODUCTS',
    subcategories: [
      { id: 51, name: 'Nivea cream' },
      { id: 52, name: 'Organic soaps' },
      { id: 53, name: 'Organic syrup' }
    ]
  },
  {
    id: 6,
    name: 'AGRONUTRITION, FERTILIZERS, SPECIAL PRODUCTS',
    subcategories: [
      { id: 61, name: 'Fertilisers' },
      { id: 62, name: 'Bio stimulants' }
    ]
  }
];

export default function Catalog() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const itemsPerPage = 12;

  // Dark mode and scroll effects
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  // Updated products data with new categories
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: 'Organic Avocados',
      description: 'Premium organic avocados sourced from Mexico. Rich in healthy fats and vitamins.',
      price: 2.99,
      image: '/avocado.jpg',
      availability: 85,
      eanUpc: '123456789012',
      weight: '200g each',
      origin: 'Mexico',
      packaging: '20 pieces per carton, 40 cartons per pallet',
      leadTime: '3-5 days',
      shelfLife: '14 days',
      categoryId: 1,
      subcategoryId: 13
    },
    {
      id: 2,
      name: 'Premium Coffee Beans',
      description: 'Arabica coffee beans from Colombia. Medium roast with chocolate notes.',
      price: 12.99,
      image: '/coffee.jpg',
      availability: 95,
      eanUpc: '345678901234',
      weight: '1kg bag',
      origin: 'Colombia',
      packaging: '10 bags per carton, 20 cartons per pallet',
      leadTime: '7-10 days',
      shelfLife: '12 months',
      categoryId: 2,
      subcategoryId: 22
    },
    {
      id: 3,
      name: 'Fresh Salmon Fillets',
      description: 'Wild-caught salmon fillets from Alaska. Sustainably sourced.',
      price: 18.99,
      image: '/salmon.jpg',
      availability: 45,
      eanUpc: '567890123456',
      weight: '300g fillet',
      origin: 'Alaska, USA',
      packaging: '10 fillets per carton, 15 cartons per pallet',
      leadTime: '1-2 days',
      shelfLife: '7 days frozen',
      categoryId: 3,
      subcategoryId: 32
    },
    {
      id: 4,
      name: 'Premium Basmati Rice',
      description: 'Aged basmati rice from India. Long grain and aromatic.',
      price: 7.99,
      image: '/rice.jpg',
      availability: 92,
      eanUpc: '012345678901',
      weight: '2kg bag',
      origin: 'India',
      packaging: '10 bags per carton, 15 cartons per pallet',
      leadTime: '10-14 days',
      shelfLife: '24 months',
      categoryId: 1,
      subcategoryId: 11
    },
    {
      id: 5,
      name: 'Organic Egusi',
      description: 'High-quality egusi seeds from Nigeria. Perfect for traditional soups.',
      price: 5.49,
      image: '/egusi.jpg',
      availability: 78,
      eanUpc: '112233445566',
      weight: '500g pack',
      origin: 'Nigeria',
      packaging: '20 packs per carton, 30 cartons per pallet',
      leadTime: '5-7 days',
      shelfLife: '18 months',
      categoryId: 4,
      subcategoryId: 42
    },
    {
      id: 6,
      name: 'Organic Fertilizer',
      description: 'Natural plant fertilizer made from composted materials. Rich in nutrients.',
      price: 24.99,
      image: '/fertilizer.jpg',
      availability: 65,
      eanUpc: '334455667788',
      weight: '5kg bag',
      origin: 'Kenya',
      packaging: '10 bags per carton, 25 cartons per pallet',
      leadTime: '3-5 days',
      shelfLife: '36 months',
      categoryId: 6,
      subcategoryId: 61
    }
  ];

  // Filter and paginate products
  const getFilteredProducts = () => {
    let filtered = sampleProducts;
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
      
      // Apply subcategory filter if selected
      if (selectedSubcategory) {
        filtered = filtered.filter(p => p.subcategoryId === selectedSubcategory);
      }
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'availability': return b.availability - a.availability;
        default: return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  
  // Get current page products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const products = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedSubcategory(null);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleSubcategorySelect = (subcategoryId: number) => {
    setSelectedSubcategory(selectedSubcategory === subcategoryId ? null : subcategoryId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">{startIndex + 1}</span> - 
          <span className="font-medium"> {Math.min(startIndex + itemsPerPage, total)}</span> of 
          <span className="font-medium"> {total}</span> products
        </p>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage <= 1}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-[2rem] ${pageNum === currentPage ? "bg-emerald-600 text-white" : ""}`}
                >
                  {pageNum}
                </Button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage >= totalPages}
            className="flex items-center"
          >
            Next <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        scrolled={scrolled}
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Agricultural Products
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto">
            Discover our globally sourced selection of the highest quality produce and food products
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-emerald-600" /> Filters
                </h2>
                {(selectedCategory || searchQuery) && (
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                      setSearchQuery('');
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-400 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" /> Clear
                  </button>
                )}
              </div>
              
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
              
              {/* Sorting */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                  Sort By
                </h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                  Categories
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <div key={category.id}>
                      <button
                        className={`w-full text-left p-2 rounded-lg flex justify-between items-center ${
                          selectedCategory === category.id 
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className={`transition-transform ${selectedCategory === category.id ? 'rotate-180' : ''}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      
                      {selectedCategory === category.id && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.subcategories.map(sub => (
                            <button
                              key={sub.id}
                              className={`block w-full text-left p-2 rounded-lg text-sm ${
                                selectedSubcategory === sub.id
                                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 font-medium'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              onClick={() => handleSubcategorySelect(sub.id)}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Promo Banner */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Bulk Orders</h3>
              <p className="mb-4">Special discounts for wholesale buyers</p>
              <Button variant="secondary" className="w-full bg-white text-amber-600 hover:bg-gray-100">
                Request Quote
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Page Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedCategory 
                    ? CATEGORIES.find(c => c.id === selectedCategory)?.name 
                    : 'All Products'}
                  {selectedSubcategory && 
                    `: ${CATEGORIES.flatMap(c => c.subcategories).find(s => s.id === selectedSubcategory)?.name}`
                  }
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Premium quality products sourced globally
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-medium">
                  {total} products
                </span>
              </div>
            </div>

            {/* Product Grid */}
            {products.length === 0 && !selectedCategory && searchQuery === '' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <Skeleton className="w-full h-48 mb-4 rounded-xl" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onViewDetails={() => handleProductSelect(product)}
                      darkMode={darkMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {renderPagination()}
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 sm:p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchQuery 
                      ? `No products match your search "${searchQuery}"`
                      : 'No products available in this category'
                    }
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Featured Categories */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our most sought-after product categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.slice(0, 4).map((category) => (
              <div key={category.id} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Premium quality selection</p>
                  <Button 
                    variant="link" 
                    className="p-0 text-emerald-600 dark:text-emerald-400 hover:text-glow"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    Explore Products <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
      
      {/* Product Detail Modal */}
      <ProductDetailModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        darkMode={darkMode}
      />
      
      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onPlaceOrder={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />
      
      {/* Order Form Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onOrderSuccess={handleClearCart}
      />
    </div>
  );
}

// Add this type definition if not already present
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  availability: number;
  eanUpc: string;
  weight: string;
  origin: string;
  packaging: string;
  leadTime: string;
  shelfLife: string;
  categoryId: number;
  subcategoryId: number;
};