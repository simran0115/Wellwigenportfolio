import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Search, 
  Filter,
  Sparkles,
  Heart,
  Zap,
  ShieldCheck,
  Smile,
  Activity,
  ShoppingBag,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
  ShoppingBasket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeGoal, setActiveGoal] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Cart State
  const [cart, setCart] = useState({});

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  const goals = [
    { name: "All", icon: Sparkles, color: "bg-slate-100 text-slate-600" },
    { name: "Immunity Boost", icon: ShieldCheck, color: "bg-teal-100 text-teal-700" },
    { name: "Weight Loss", icon: Smile, color: "bg-amber-100 text-amber-700" },
    { name: "Muscle Gain", icon: Zap, color: "bg-blue-100 text-blue-700" },
    { name: "Diabetes Control", icon: Activity, color: "bg-purple-100 text-purple-700" },
    { name: "Heart Health", icon: Heart, color: "bg-rose-100 text-rose-700" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API}/category`),
          axios.get(`${API}/product`)
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error("Error fetching catalog", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API]);

  const filteredProducts = products.filter(p => {
    const matchesGoal = activeGoal === "All" || p.healthGoal === activeGoal;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (p.benefits && p.benefits.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGoal && matchesSearch;
  });

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: next };
    });
  };

  const handlePlaceOrder = () => {
    const orderItems = Object.keys(cart).map(id => {
      const product = products.find(p => p._id === id);
      return { ...product, quantity: cart[id] };
    });

    if (orderItems.length === 0) {
      toast.error("Please add items to your box first!");
      return;
    }

    toast.loading("Placing your order...", { id: "order" });
    
    // Simulate order placement
    setTimeout(() => {
      toast.success("Order placed successfully!", { id: "order" });
      navigate('/dashboard', { state: { activeTab: 'Overview' } });
    }, 1500);
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#fcfdfe] font-sans selection:bg-teal-900 selection:text-white overflow-x-hidden">
      
      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* HERO SECTION */}
        <header className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-teal-600"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Premium Health Store</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
                Fresh. Daily.<br/>
                <span className="text-teal-600 italic">Delivered.</span>
              </h1>
              <p className="text-slate-500 mt-8 text-xl font-medium leading-relaxed max-w-lg">
                Pick your fresh produce directly from verified local vendors. Customized for your health goals.
              </p>
            </div>
            
            <div className="w-full lg:w-[450px]">
              <div className="group relative">
                <div className="absolute inset-0 bg-teal-600 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-10 transition-opacity"></div>
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-teal-600 transition-colors" />
                <input 
                  type="text"
                  placeholder="What is your body seeking?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-7 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-100/50 focus:outline-none focus:ring-1 focus:ring-teal-600 transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>
        </header>

        {/* GOAL FILTERS HUB */}
        <div className="mb-24 flex items-center justify-between">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 ml-2">Filter by Biological Goal</h4>
            <div className="flex flex-wrap gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.name}
                  onClick={() => setActiveGoal(goal.name)}
                  className={`group flex items-center gap-3 px-8 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all duration-500 border ${
                    activeGoal === goal.name 
                      ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-300 -translate-y-1" 
                      : `bg-white text-slate-500 border-slate-100 hover:border-teal-300 hover:bg-teal-50`
                  }`}
                >
                  <goal.icon className={`w-4 h-4 ${activeGoal === goal.name ? "text-teal-400" : "text-slate-400"}`} />
                  {goal.name}
                </button>
              ))}
            </div>
          </div>
          
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                onClick={handlePlaceOrder}
                className="fixed bottom-10 right-10 z-50 bg-teal-600 text-white px-10 py-6 rounded-[2.5rem] font-black shadow-2xl flex items-center gap-4 hover:bg-teal-700 transition-all active:scale-95 group"
              >
                <div className="relative">
                  <ShoppingBasket size={24} />
                  <span className="absolute -top-3 -right-3 w-6 h-6 bg-slate-900 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-teal-600 font-black">{totalItems}</span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-teal-100 leading-none mb-1">Place Your Box Order</p>
                  <p className="text-lg leading-none tracking-tight">Checkout Now &rarr;</p>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* CATALOG SECTIONS */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-16 h-16 border-[6px] border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 animate-pulse">Scanning Bio-Library</p>
          </div>
        ) : (
          <div className="space-y-32">
            {categories.map((category) => {
              const categoryProducts = filteredProducts.filter(p => p.category === category._id);
              if (categoryProducts.length === 0) return null;

              return (
                <section key={category._id} className="relative">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-50 pb-8">
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">{category.name}</h2>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{category.description || "Premium Selection"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {categoryProducts.map((product) => (
                      <div key={product._id} className="group relative">
                        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700 flex flex-col h-full relative overflow-hidden">
                          
                          {/* Card Accent */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[60px] -mr-12 -mt-12 group-hover:bg-teal-600 transition-colors duration-700"></div>

                          <div className="mb-8 relative">
                            <div className="aspect-square bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100/50 group-hover:scale-[1.02] transition-transform duration-700 shadow-inner">
                              {product.images && product.images[0] ? (
                                <img src={`http://localhost:8000${product.images[0]}`} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-200 text-4xl">🍎</div>
                              )}
                            </div>
                            <div className="absolute -bottom-4 left-6 px-4 py-2 bg-white rounded-xl shadow-lg border border-slate-50 text-[10px] font-black uppercase tracking-widest text-teal-600">
                              {product.healthGoal}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-teal-600 transition-colors leading-none">{product.name}</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Stock: {product.quantity} kg</p>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
                              {product.benefits}
                            </p>
                          </div>

                          <div className="pt-8 border-t border-slate-50 flex items-center justify-between mt-auto">
                            <div>
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 text-center">Unit price</p>
                              <span className="text-3xl font-black text-slate-900 tracking-tighter italic">₹{product.price}<span className="text-xs text-slate-300 font-bold not-italic">/kg</span></span>
                            </div>
                            
                            <div className="flex items-center bg-slate-100 rounded-[20px] p-1.5 gap-1">
                              {cart[product._id] > 0 && (
                                <>
                                  <button onClick={() => updateQuantity(product._id, -1)} className="w-10 h-10 bg-white text-slate-900 rounded-[15px] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                                    <Minus size={18} />
                                  </button>
                                  <span className="w-8 text-center font-black text-slate-900">{cart[product._id]}</span>
                                </>
                              )}
                              <button onClick={() => updateQuantity(product._id, 1)} className="w-10 h-10 bg-slate-900 text-white rounded-[15px] flex items-center justify-center hover:bg-teal-600 transition-all shadow-md">
                                <Plus size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* FOOTER CALLOUT */}
        <div className="mt-40 bg-slate-900 rounded-[50px] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-8">Fresh Produce <br/>Direct from Vendor</h3>
            <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">Every item you select is sourced directly from our verified vendors and delivered within hours of harvest.</p>
            <button className="flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-teal-600 hover:text-white transition-all shadow-2xl">
              Become a Provider <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCatalog;
