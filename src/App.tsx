import { ShoppingBag, Star, Zap, ShieldCheck, ArrowRight, Menu, X, Play } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#2C2C2C]">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1A1F3A] rounded-xl flex items-center justify-center">
                <ShoppingBag className="text-[#E8B4A0] w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#1A1F3A] font-serif">VELVORIA</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium hover:text-[#E8B4A0] transition-colors">Categories</a>
              <a href="#" className="text-sm font-medium hover:text-[#E8B4A0] transition-colors">Live Shopping</a>
              <a href="#" className="text-sm font-medium hover:text-[#E8B4A0] transition-colors">Brands</a>
              <a href="#" className="text-sm font-medium hover:text-[#E8B4A0] transition-colors">Sell on Velvoria</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-6 py-2 text-sm font-medium text-[#1A1F3A] hover:text-[#E8B4A0] transition-colors">Login</button>
              <button className="px-6 py-2.5 text-sm font-medium bg-[#1A1F3A] text-white rounded-full hover:bg-[#2D5F5D] transition-all shadow-lg shadow-blue-900/10">Get Started</button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B4A0]/10 border border-[#E8B4A0]/20 mb-6">
              <Zap className="w-4 h-4 text-[#E8B4A0]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8B4A0]">New Generation Marketplace</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#1A1F3A] leading-tight mb-6">
              Elevate Your <span className="text-[#E8B4A0]">Lifestyle</span> With Premium Goods.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Velvoria connects you with world-class artisan brands and luxury vendors. Experience shopping like never before with AR Try-on and Live commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1A1F3A] text-white rounded-full font-bold hover:bg-[#2D5F5D] transition-all group shadow-xl shadow-blue-900/20">
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1A1F3A] border border-gray-200 rounded-full font-bold hover:border-[#E8B4A0] transition-all">
                <Play className="w-5 h-5 fill-current" />
                Watch Demo
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-[#1A1F3A]">50k+</div>
                <div className="text-sm text-gray-500">Premium Products</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="text-3xl font-bold text-[#1A1F3A]">2.4k+</div>
                <div className="text-sm text-gray-500">Global Brands</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-3xl font-bold text-[#1A1F3A]">4.9</span>
                </div>
                <div className="text-sm text-gray-500">Trust Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Shopping" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E8B4A0] rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#2D5F5D] rounded-full blur-3xl opacity-20" />
            
            {/* Float Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-10 -right-4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <ShieldCheck className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold">Verified Luxury</div>
                <div className="text-xs text-gray-500">100% Authentication</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#1A1F3A] mb-4">Shop by Category</h2>
              <p className="text-gray-500">Discover handpicked items for your refined taste.</p>
            </div>
            <button className="text-[#E8B4A0] font-bold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Timepieces', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', count: '1.2k Items' },
              { name: 'Leather Goods', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400', count: '850 Items' },
              { name: 'Fragrance', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400', count: '420 Items' },
              { name: 'Jewelry', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400', count: '2.1k Items' }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F3A]/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-xl font-bold mb-1">{cat.name}</div>
                    <div className="text-xs opacity-80">{cat.count}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Shopping Teaser */}
      <section className="py-20 bg-[#1A1F3A] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-500">Live Shopping</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Interactive Shopping Experience.</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Join exclusive live sessions with brand representatives. Ask questions, see product details in real-time, and get special live-only offers.
            </p>
            <button className="px-8 py-4 bg-[#E8B4A0] text-[#1A1F3A] rounded-full font-bold hover:bg-white transition-all">
              Browse Live Sessions
            </button>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover opacity-50" 
                alt="Live stream" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="px-3 py-1 bg-red-600 rounded text-xs font-bold">LIVE</div>
                <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded text-xs font-medium">2.4k Viewers</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[120px]" />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#1A1F3A] rounded-xl flex items-center justify-center">
                <ShoppingBag className="text-[#E8B4A0] w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-[#1A1F3A] font-serif uppercase">VELVORIA</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              The world's premier multi-vendor marketplace for luxury and lifestyle goods. Redefining excellence in e-commerce.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'TW', 'LI'].map(social => (
                <div key={social} className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-sm font-bold hover:border-[#E8B4A0] hover:text-[#E8B4A0] cursor-pointer transition-colors">
                  {social}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#1A1F3A] mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#E8B4A0]">Categories</a></li>
              <li><a href="#" className="hover:text-[#E8B4A0]">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#E8B4A0]">Featured Brands</a></li>
              <li><a href="#" className="hover:text-[#E8B4A0]">Live Shopping</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1F3A] mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#E8B4A0]">About Us</a></li>
              <li><a href="#" className="hover:text-[#E8B4A0]">Sell on Velvoria</a></li>
              <li><a href="#" className="hover:text-[#E8B4A0]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#E8B4A0]">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 Velvoria Marketplace. All rights reserved.</p>
          <div className="flex gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="Paypal" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;