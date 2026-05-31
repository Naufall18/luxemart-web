import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Percent } from 'lucide-react';
import { cartApi } from '../lib/api';

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    images?: Array<{ image_path: string }>;
    brand?: { name: string };
  };
  quantity: number;
  variantName?: string;
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await cartApi.list();
        if (res.data && res.data.data) {
          setCartItems(res.data.data);
        } else {
          loadLocalCart();
        }
       } catch {
         loadLocalCart();
       } finally {
        setLoading(false);
      }
    }

    function loadLocalCart() {
      const local = localStorage.getItem('mock_cart');
      if (local) {
        setCartItems(JSON.parse(local));
      }
    }

    loadCart();
  }, []);

  const saveLocalCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('mock_cart', JSON.stringify(items));
  };

  const handleUpdateQuantity = async (id: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      await cartApi.update(id, newQty);
      setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQty } : item));
     } catch {
       // Local fallback
       const updated = cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item);
      saveLocalCart(updated);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await cartApi.remove(id);
      setCartItems(items => items.filter(item => item.id !== id));
     } catch {
       // Local fallback
       const updated = cartItems.filter(item => item.id !== id);
      saveLocalCart(updated);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'VELVORIA10') {
      setDiscount(0.1); // 10% off
      alert('Promo code applied successfully!');
    } else {
      alert('Invalid promo code.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.product.price) * item.quantity), 0);
  const shippingFee = subtotal > 15000 || subtotal === 0 ? 0 : 350;
  const discountAmount = subtotal * discount;
  const total = subtotal + shippingFee - discountAmount;

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-gray-500">
        <div className="animate-pulse max-w-7xl mx-auto px-4">
          <div className="h-96 bg-white rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-serif font-bold text-[#1A1F3A] mb-10">Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F3A] mb-2">Your Bag is Empty</h3>
            <p className="text-gray-500 text-sm mb-8">Browse the collection to add premium goods.</p>
            <Link to="/products" className="px-8 py-3 bg-[#1A1F3A] text-white rounded-full font-bold hover:bg-[#E8B4A0] transition-colors inline-block">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => {
                const imgPath = item.product.images?.[0]?.image_path || 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=500';
                const imgUrl = imgPath.startsWith('http') ? imgPath : `http://localhost:8000/storage/${imgPath}`;
                return (
                  <div key={item.id || index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:row items-center gap-6">
                    <Link to={`/product/${item.product.slug}`} className="w-24 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={imgUrl} className="w-full h-full object-cover" alt={item.product.name} />
                    </Link>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <span className="text-xs font-bold text-[#E8B4A0] tracking-wider uppercase">
                        {item.product.brand?.name || 'Luxury'}
                      </span>
                      <Link to={`/product/${item.product.slug}`} className="text-lg font-bold text-[#1A1F3A] hover:text-[#E8B4A0] transition-colors block mb-1">
                        {item.product.name}
                      </Link>
                      {item.variantName && (
                        <div className="text-xs text-gray-500">Edition: {item.variantName}</div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-100 bg-[#FAF8F5] rounded-full px-2">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-500 hover:text-[#1A1F3A]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[#1A1F3A]">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-500 hover:text-[#1A1F3A]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-4 sm:gap-1">
                      <span className="text-lg font-bold text-[#1A1F3A]">
                        ${(Number(item.product.price) * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Summary Panel */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg lg:sticky lg:top-28">
              <h3 className="font-serif font-bold text-xl text-[#1A1F3A] mb-6">Summary</h3>

              {/* Promo input */}
              <div className="flex gap-2 mb-6 pb-6 border-b border-gray-100">
                <input 
                  type="text" 
                  placeholder="VELVORIA10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow border border-gray-100 rounded-xl px-4 py-2 text-sm bg-[#FAF8F5] focus:outline-none uppercase"
                />
                <button 
                  onClick={handleApplyPromo}
                  className="px-4 bg-[#1A1F3A] hover:bg-[#E8B4A0] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Percent className="w-3 h-3" /> Apply
                </button>
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1A1F3A]">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping fee</span>
                  <span className="font-bold text-[#1A1F3A]">
                    {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-bold">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-gray-700">Total</span>
                <span className="text-2xl font-bold text-[#1A1F3A]">${total.toLocaleString()}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#1A1F3A] hover:bg-[#2D5F5D] text-white py-4 px-6 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
