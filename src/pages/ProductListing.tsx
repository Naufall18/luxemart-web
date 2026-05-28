import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid, List, Search, Star, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { productsApi, categoriesApi } from '../lib/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  rating?: number;
  reviews_count?: number;
  images?: Array<{ image_path: string }>;
  brand?: { name: string };
  category?: { name: string; slug: string };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(15000);
  const [sortBy, setSortBy] = useState('relevance');

  // Fallbacks
  const mockCategories = [
    { id: 1, name: 'Timepieces', slug: 'timepieces' },
    { id: 2, name: 'Leather Goods', slug: 'leather-goods' },
    { id: 3, name: 'Fragrance', slug: 'fragrance' },
    { id: 4, name: 'Jewelry', slug: 'jewelry' }
  ];

  const mockProducts: Product[] = [
    { id: 1, name: 'Vanguard Chronograph', slug: 'vanguard-chronograph', price: '12400', brand: { name: 'Chronos' }, rating: 4.9, reviews_count: 120, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=500', category: { name: 'Timepieces', slug: 'timepieces' } } as any,
    { id: 2, name: 'Heritage Leather Tote', slug: 'heritage-leather-tote', price: '4500', brand: { name: 'Aurelia' }, rating: 4.8, reviews_count: 85, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=500', category: { name: 'Leather Goods', slug: 'leather-goods' } } as any,
    { id: 3, name: 'Oud Imperial Extrait', slug: 'oud-imperial', price: '3200', brand: { name: 'Maison D\'Or' }, rating: 5.0, reviews_count: 42, image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=500', category: { name: 'Fragrance', slug: 'fragrance' } } as any,
    { id: 4, name: 'Infinity Diamond Studs', slug: 'infinity-diamonds', price: '18900', brand: { name: 'Carat & Co' }, rating: 4.9, reviews_count: 67, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=500', category: { name: 'Jewelry', slug: 'jewelry' } } as any,
    { id: 5, name: 'Royal Gold Chrono', slug: 'royal-gold-chrono', price: '15500', brand: { name: 'Chronos' }, rating: 4.7, reviews_count: 31, image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=500', category: { name: 'Timepieces', slug: 'timepieces' } } as any,
    { id: 6, name: 'Signature Clutch', slug: 'signature-clutch', price: '2800', brand: { name: 'Aurelia' }, rating: 4.9, reviews_count: 53, image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a7a0?auto=format&fit=crop&q=80&w=500', category: { name: 'Leather Goods', slug: 'leather-goods' } } as any,
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const catRes = await categoriesApi.list();
        if (catRes.data && catRes.data.data) {
          setCategories(catRes.data.data);
        }
      } catch (err) {
        setCategories(mockCategories);
      }

      try {
        const prodRes = await productsApi.list();
        if (prodRes.data && prodRes.data.data) {
          setProducts(prodRes.data.data);
        } else {
          setProducts(mockProducts);
        }
      } catch (err) {
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update selected category if query parameter changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat !== null) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Client-side filtering logic
  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || prod.category?.slug === selectedCategory;
    const matchesPrice = Number(prod.price) <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
    if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
    return 0; // Default relevance
  });

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setSearchParams(slug ? { category: slug } : {});
  };

  return (
    <div className="pt-28 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-8 font-sans">
          <Link to="/" className="hover:text-[#E8B4A0]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1F3A] font-medium">Collections</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <span className="font-serif font-bold text-lg text-[#1A1F3A]">Filters</span>
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-bold text-sm text-[#1A1F3A] uppercase tracking-wider mb-3">Category</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleCategorySelect('')}
                  className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedCategory === '' ? 'bg-[#E8B4A0]/10 text-[#E8B4A0] font-bold' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedCategory === cat.slug ? 'bg-[#E8B4A0]/10 text-[#E8B4A0] font-bold' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-bold text-sm text-[#1A1F3A] uppercase tracking-wider mb-3">Max Price</h4>
              <input 
                type="range" 
                min="1000" 
                max="20000" 
                step="500"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#1A1F3A] cursor-pointer mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>$1,000</span>
                <span className="text-[#1A1F3A] font-bold">${priceRange.toLocaleString()}</span>
              </div>
            </div>

            {/* Reset Button */}
            <button 
              onClick={() => {
                setSearchQuery('');
                handleCategorySelect('');
                setPriceRange(20000);
                setSortBy('relevance');
              }}
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Main Results Content */}
          <main className="flex-grow">
            
            {/* Header controls */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:row justify-between items-center gap-4 mb-8">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-2xl bg-[#FAF8F5] focus:outline-none focus:border-[#E8B4A0] text-sm"
                />
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div className="text-xs text-gray-500 font-medium">
                  Showing <span className="text-[#1A1F3A] font-bold">{filteredProducts.length}</span> results
                </div>
                
                <div className="flex items-center gap-3">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-100 bg-[#FAF8F5] rounded-xl px-3 py-2 text-xs font-bold text-[#1A1F3A] focus:outline-none cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  <div className="flex border border-gray-100 rounded-xl overflow-hidden bg-[#FAF8F5]">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#1A1F3A] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#1A1F3A] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Listing grid/list */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse bg-white rounded-3xl border border-gray-100 h-96"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 font-medium mb-4">No premium goods match your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    handleCategorySelect('');
                    setPriceRange(20000);
                  }}
                  className="px-6 py-2.5 bg-[#1A1F3A] text-white text-xs font-bold rounded-full hover:bg-[#E8B4A0] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((prod, i) => (
                  <motion.div 
                    key={prod.id || i}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full"
                  >
                    <Link to={`/product/${prod.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-gray-100">
                      <img 
                        src={(prod as any).image || (prod.images && prod.images[0] ? `http://localhost:8000/storage/${prod.images[0].image_path}` : 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=500')} 
                        alt={prod.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <button className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      {prod.rating && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                          <span>{prod.rating}</span>
                        </div>
                      )}
                    </Link>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs font-bold text-[#E8B4A0] tracking-wider uppercase mb-1">
                        {prod.brand?.name || 'Luxury'}
                      </span>
                      <Link to={`/product/${prod.slug}`} className="text-base font-bold text-[#1A1F3A] hover:text-[#E8B4A0] transition-colors mb-2 line-clamp-1">
                        {prod.name}
                      </Link>
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-lg font-bold text-[#1A1F3A]">
                          ${Number(prod.price).toLocaleString()}
                        </span>
                        <Link to={`/product/${prod.slug}`} className="text-xs font-bold bg-[#1A1F3A] text-white px-4 py-2 rounded-full hover:bg-[#E8B4A0] hover:text-white transition-all">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((prod, i) => (
                  <motion.div 
                    key={prod.id || i}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex p-4 gap-6 items-center"
                  >
                    <Link to={`/product/${prod.slug}`} className="w-36 h-44 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                      <img 
                        src={(prod as any).image || (prod.images && prod.images[0] ? `http://localhost:8000/storage/${prod.images[0].image_path}` : 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=500')} 
                        alt={prod.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </Link>
                    <div className="flex-grow">
                      <span className="text-xs font-bold text-[#E8B4A0] tracking-wider uppercase mb-1 block">
                        {prod.brand?.name || 'Luxury'}
                      </span>
                      <Link to={`/product/${prod.slug}`} className="text-xl font-bold text-[#1A1F3A] hover:text-[#E8B4A0] transition-colors mb-2 block">
                        {prod.name}
                      </Link>
                      {prod.rating && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-700">{prod.rating}</span>
                          <span>({prod.reviews_count} reviews)</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-2xl font-bold text-[#1A1F3A]">
                          ${Number(prod.price).toLocaleString()}
                        </span>
                        <Link to={`/product/${prod.slug}`} className="px-6 py-2.5 bg-[#1A1F3A] text-white text-xs font-bold rounded-full hover:bg-[#E8B4A0] transition-colors">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
