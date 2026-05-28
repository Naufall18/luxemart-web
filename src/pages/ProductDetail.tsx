import { useState, useEffect } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Heart, ShoppingBag, Plus, Minus, ArrowLeft } from 'lucide-react';
import { productsApi, cartApi } from '../lib/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description?: string;
  rating?: number;
  reviews_count?: number;
  brand?: { name: string };
  category?: { name: string; slug: string };
  images?: Array<{ image_path: string }>;
  variants?: Array<{ id: number; name: string; price_adjustment?: string }>;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'spec' | 'reviews'>('desc');
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [isWished, setIsWished] = useState(false);

  // Fallbacks
  const mockProductDetail: Product = {
    id: 1,
    name: 'Vanguard Chronograph',
    slug: 'vanguard-chronograph',
    price: '12400',
    description: 'A masterpiece of contemporary horology, featuring custom-designed complications, sapphire crystal, and an authentic alligator leather strap. Perfectly balance functional instrumentation with pure luxury aesthetics.',
    rating: 4.9,
    reviews_count: 120,
    brand: { name: 'Chronos' },
    category: { name: 'Timepieces', slug: 'timepieces' },
    images: [
      { image_path: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600' },
      { image_path: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600' }
    ],
    variants: [
      { id: 101, name: 'Stellar Black' },
      { id: 102, name: 'Rose Gold' }
    ]
  };

  useEffect(() => {
    async function loadProduct() {
      try {
        if (slug) {
          const res = await productsApi.detail(slug);
          if (res.data && res.data.data) {
            setProduct(res.data.data);
            if (res.data.data.images && res.data.data.images[0]) {
              setSelectedImage(`http://localhost:8000/storage/${res.data.data.images[0].image_path}`);
            }
          } else {
            setProduct(mockProductDetail);
            setSelectedImage(mockProductDetail.images?.[0].image_path || '');
          }
        }
      } catch (err) {
        setProduct(mockProductDetail);
        setSelectedImage(mockProductDetail.images?.[0].image_path || '');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await cartApi.add({
        product_id: product.id,
        product_variant_id: selectedVariant || undefined,
        quantity: quantity
      });
      alert('Product successfully added to your cart.');
      navigate('/cart');
    } catch (err) {
      alert('Failed to connect to cart API. Added item locally.');
      // Mock cart update locally
      const localCart = JSON.parse(localStorage.getItem('mock_cart') || '[]');
      localCart.push({
        id: Math.floor(Math.random() * 1000),
        product: product,
        quantity: quantity,
        variantName: product.variants?.find(v => v.id === selectedVariant)?.name || ''
      });
      localStorage.setItem('mock_cart', JSON.stringify(localCart));
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-gray-500">
        <div className="animate-pulse flex flex-col items-center max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl w-full h-[500px]"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold">Premium Good Not Found</h2>
        <Link to="/products" className="text-[#E8B4A0] underline mt-4 inline-block">Back to Collection</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1F3A] mb-8 font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        {/* Product Spec Panel */}
        <div className="grid lg:grid-cols-2 gap-16 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">
          
          {/* Gallery View */}
          <div>
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50 mb-6 border border-gray-100">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images?.map((img, idx) => {
                const imgUrl = img.image_path.startsWith('http') ? img.image_path : `http://localhost:8000/storage/${img.image_path}`;
                return (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 ${selectedImage === imgUrl ? 'border-[#E8B4A0]' : 'border-transparent opacity-75'}`}
                  >
                    <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details & Options */}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#E8B4A0] tracking-wider uppercase mb-2">
              {product.brand?.name || 'Luxury'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1A1F3A] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Ratings & reviews */}
            <div className="flex items-center gap-6 mb-6">
              {product.rating && (
                <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{product.rating}</span>
                </div>
              )}
              <span className="text-sm text-gray-500 font-medium">({product.reviews_count || 0} reviews)</span>
            </div>

            <div className="text-3xl font-bold text-[#1A1F3A] mb-8 pb-6 border-b border-gray-100">
              ${Number(product.price).toLocaleString()}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold text-[#1A1F3A] uppercase tracking-wider mb-4">Selected Edition</h4>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(v => (
                    <button 
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${selectedVariant === v.id ? 'border-[#1A1F3A] bg-[#1A1F3A] text-white shadow-md' : 'border-gray-200 hover:border-[#E8B4A0] text-gray-700'}`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-[#1A1F3A] uppercase tracking-wider mb-4">Quantity</h4>
              <div className="inline-flex items-center border border-gray-200 rounded-full bg-[#FAF8F5] px-2">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#1A1F3A] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-[#1A1F3A]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-[#1A1F3A] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8 pt-4 border-t border-gray-100 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-grow flex items-center justify-center gap-2.5 bg-[#1A1F3A] hover:bg-[#2D5F5D] text-white py-4 px-8 rounded-full font-bold shadow-lg transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={() => setIsWished(!isWished)}
                className={`w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${isWished ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-400 hover:border-[#E8B4A0]'}`}
              >
                <Heart className="w-6 h-6 fill-current" />
              </button>
            </div>

            {/* Auth badges */}
            <div className="bg-[#FAF8F5] border border-gray-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#1A1F3A]">100% Genuine Guarantee</div>
                <div className="text-gray-500">Every item is authenticated by our master experts.</div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Info */}
        <div className="mt-16 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex border-b border-gray-100 mb-8 overflow-x-auto gap-8">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'desc' ? 'border-[#1A1F3A] text-[#1A1F3A]' : 'border-transparent text-gray-400'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('spec')}
              className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'spec' ? 'border-[#1A1F3A] text-[#1A1F3A]' : 'border-transparent text-gray-400'}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'reviews' ? 'border-[#1A1F3A] text-[#1A1F3A]' : 'border-transparent text-gray-400'}`}
            >
              Reviews ({product.reviews_count || 0})
            </button>
          </div>

          <div>
            {activeTab === 'desc' && (
              <p className="text-gray-600 leading-relaxed font-sans text-base">
                {product.description || 'No description listed.'}
              </p>
            )}
            {activeTab === 'spec' && (
              <table className="w-full max-w-xl text-left border-collapse text-sm">
                <tbody>
                  <tr className="border-b border-gray-100"><th className="py-3 font-bold text-gray-700 w-1/3">Brand</th><td className="py-3 text-gray-600">{product.brand?.name || 'Luxury'}</td></tr>
                  <tr className="border-b border-gray-100"><th className="py-3 font-bold text-gray-700">Category</th><td className="py-3 text-gray-600">{product.category?.name || 'Elite'}</td></tr>
                  <tr className="border-b border-gray-100"><th className="py-3 font-bold text-gray-700">Authenticity</th><td className="py-3 text-gray-600">100% Certified</td></tr>
                </tbody>
              </table>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <p className="text-gray-500 text-sm">Review details are powered by verified buyers.</p>
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400"><Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /></div>
                    <span className="text-sm font-bold">Verena L.</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">Exquisite product quality, and standard shipping was incredibly fast.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
