import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  MoreVertical,
  CheckCircle,
  Clock,
  Apple,
  LogOut,
  ShoppingBag,
  Truck,
  Calendar,
  User as UserIcon,
  ChevronRight,
  UserCircle,
  X,
  PlusCircle,
  Trash2,
  Edit2,
  ShoppingBasket,
  Minus,
  ArrowRight,
  Star,
  Activity,
  Heart,
  Zap,
  ShieldCheck
} from 'lucide-react';
import AccountProfile from '../../components/AccountProfile';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const NutritionDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Overview');
  const [storeActive, setStoreActive] = useState(() => {
    const saved = localStorage.getItem("storeActive");
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  // States for Vendor view
  const [orders, setOrders] = useState([
    { id: '1', customer: 'Rajesh Kumar', plan: 'Total Wellness', product: 'Seasonal Fruit Box', date: '2026-04-29', status: 'Pending', type: 'Subscription' },
    { id: '2', customer: 'Simran Kumari', plan: 'Healthy Life', product: 'Organic Veggie Pack', date: '2026-04-29', status: 'Out for Delivery', type: 'Subscription' },
  ]);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("vendorProducts");
    const locals = saved ? JSON.parse(saved) : [];
    return [
      { id: '1', name: 'Seasonal Fruit Box', category: 'Fruits', price: 450, stock: 25 },
      { id: '2', name: 'Organic Citrus Pack', category: 'Citrus', price: 320, stock: 15 },
      { id: '3', name: 'Tropical Wellness Tray', category: 'Exotic', price: 850, stock: 10 },
      ...locals
    ];
  });
  
  // States for Marketplace view (User Customization)
  const [categories, setCategories] = useState([{ _id: '1', name: 'All' }, { _id: '2', name: 'Organic' }, { _id: '3', name: 'Seasonal' }]);
  const [marketProducts, setMarketProducts] = useState(() => {
    const saved = localStorage.getItem("vendorProducts");
    const locals = (saved ? JSON.parse(saved) : []).map(p => ({ ...p, _id: p.id })); // Map id to _id for marketplace consistency
    return [
      { _id: 'm1', name: 'Premium Alphonso Mangoes', price: 450, healthGoal: 'Vitality', images: [] },
      { _id: 'm2', name: 'Fuji Apples (Global)', price: 180, healthGoal: 'Immunity', images: [] },
      { _id: 'm3', name: 'Honey Pineapple', price: 120, healthGoal: 'Digestion', images: [] },
      { _id: 'm4', name: 'Organic Blueberries', price: 550, healthGoal: 'Brain Health', images: [] },
      ...locals
    ];
  });
  const [activeGoal, setActiveGoal] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const token = localStorage.getItem("vendorToken") || localStorage.getItem("providerToken");

  useEffect(() => {
    const fetchData = async () => {
      // Sync store status
      localStorage.setItem("storeActive", JSON.stringify(storeActive));
      
      try {
        const vendorData = JSON.parse(localStorage.getItem("providerInfo") || localStorage.getItem("vendorInfo") || "{}");
        const vendorId = vendorData._id || 'demo-vendor-id';

        const [catRes, prodRes, orderRes] = await Promise.all([
          axios.get(`${API}/category`),
          axios.get(`${API}/product`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/orders/vendor/${vendorId}`).catch(() => ({ data: [] }))
        ]);
        
        setCategories(catRes.data);
        
        // Products for Vendor Management
        setProducts(prodRes.data.map(p => ({
          id: p._id,
          name: p.name,
          price: `₹${p.price}`,
          category: p.category?.name || 'General',
          status: p.quantity > 0 ? 'In Stock' : 'Out of Stock'
        })));

        // Products for Marketplace/Customization
        setMarketProducts(prodRes.data);

        // Fetch Live Orders (Fallback to dummy data if DB is empty as requested)
        if (orderRes.data && orderRes.data.length > 0) {
          const liveOrders = orderRes.data.map(o => ({
            id: o._id,
            customer: o.userId?.name || 'Live Customer',
            plan: 'Automated Order',
            product: o.productId?.name || o.type || 'Fresh Produce',
            date: new Date(o.scheduledFor || o.createdAt).toLocaleDateString(),
            status: o.status === 'pending' ? 'Pending' : o.status === 'delivered' ? 'Delivered' : 'Pending',
            type: 'Subscription'
          }));
          setOrders(liveOrders);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API, token]);

  const filteredMarketProducts = marketProducts.filter(p => {
    const matchesGoal = activeGoal === "All" || p.healthGoal === activeGoal;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
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
    if (Object.keys(cart).length === 0) return;
    
    // Create order object with details
    const orderDetails = Object.keys(cart).map(id => {
      const p = marketProducts.find(prod => prod._id === id);
      return {
        id: id,
        name: p?.name,
        quantity: cart[id],
        price: p?.price,
        total: p?.price * cart[id]
      };
    });

    // Save to localStorage for the User Dashboard to pick up
    localStorage.setItem("latestOrder", JSON.stringify({
      items: orderDetails,
      date: new Date().toLocaleString(),
      status: "Placed",
      orderId: "#WL-" + Math.floor(1000 + Math.random() * 9000)
    }));

    toast.loading("Placing your order...", { id: "order" });
    
    setTimeout(() => {
      toast.success("Order placed successfully!", { id: "order" });
      setCart({});
      // Redirect to User Dashboard as requested
      navigate('/dashboard', { state: { activeTab: 'Overview' } });
    }, 1500);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    const saved = JSON.parse(localStorage.getItem("vendorProducts") || "[]");
    localStorage.setItem("vendorProducts", JSON.stringify(saved.filter(p => p.id !== id)));
    toast.success("Product removed from catalog");
  };
  
  const vendorInfo = JSON.parse(localStorage.getItem("providerInfo") || localStorage.getItem("vendorInfo") || "{}");
  const providerName = vendorInfo.ownerName || vendorInfo.name || 'Ramesh Fruits & Vegetables';
  const vendorLocation = vendorInfo.location || vendorInfo.storeAddress || 'Gomti Nagar, Lucknow';

  const dashboardMetrics = [
    { label: "Today's Orders", value: '34', note: '+8 vs yesterday', positive: true },
    { label: 'Pending', value: '7', note: 'Dispatch by 10 AM', positive: false },
    { label: 'This Week', value: '18.4k', note: '+12%', positive: true },
    { label: 'Avg Rating', value: '4.6', note: '+0.2 pts', positive: true },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/vendor/login");
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const goals = [
    { name: "All", icon: Star },
    { name: "Immunity Boost", icon: ShieldCheck },
    { name: "Weight Loss", icon: Activity },
    { name: "Muscle Gain", icon: Zap },
    { name: "Heart Health", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] flex font-sans text-slate-900 overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
          <span className="font-bold text-gray-900 tracking-tight">Wellwigen <span className="text-teal-600">Market</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <NavItem icon={<ShoppingBasket size={18} />} label="Place Products" active={activeTab === 'Customization'} onClick={() => setActiveTab('Customization')} />
          <NavItem icon={<ShoppingBag size={18} />} label="Subscriptions" active={activeTab === 'Orders'} onClick={() => setActiveTab('Orders')} />
          <NavItem icon={<Users size={18} />} label="My Clients" active={activeTab === 'Clients'} onClick={() => setActiveTab('Clients')} />
          <NavItem icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          
          <div className="pt-4 mt-4 border-t border-gray-50">
            <button 
              onClick={() => navigate('/vendor/add-product')}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-white bg-teal-600 hover:bg-teal-700 transition-all font-black text-xs uppercase tracking-widest shadow-lg shadow-teal-100 group"
            >
              <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
              Add Product
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <button 
            onClick={() => setActiveTab('Account')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              activeTab === 'Account' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0">
              <img 
                src={vendorInfo.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-200 object-cover"
              />
            </div>
            <div className="flex flex-col items-start overflow-hidden text-left">
              <span className="text-sm font-semibold truncate w-full">My Account</span>
              <span className="text-xs text-gray-500">Settings</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen relative">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              {activeTab === 'Customization' ? 'Place Products' : 'Vendor Dashboard'}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {activeTab === 'Customization' ? 'Pick items and place your product order' : `${providerName} · ${vendorLocation}`}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-3 bg-white border border-gray-100 rounded-2xl text-slate-400 hover:text-teal-600 transition shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={handleLogout} className="p-3 bg-white border border-gray-100 rounded-2xl text-slate-400 hover:text-red-600 transition shadow-sm"><LogOut size={20} /></button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'Overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              {/* Store Status Card */}
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-colors ${storeActive ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'}`}>
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Store Visibility</h3>
                    <p className="text-sm text-slate-500 font-medium">Control whether your products are visible to users.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setStoreActive(!storeActive)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all shadow-lg ${
                    storeActive 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-teal-100' 
                      : 'bg-white border-amber-200 text-amber-600 shadow-amber-50'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${storeActive ? 'bg-white animate-pulse' : 'bg-amber-600'}`}></div>
                  <span className="text-xs font-black uppercase tracking-widest">
                    {storeActive ? 'Store is Live' : 'Store is Offline'}
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
                {dashboardMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{metric.label}</p>
                    <div className="mt-4 flex flex-col gap-3">
                      <p className="text-3xl font-black text-slate-900">{metric.value}</p>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${metric.positive ? 'text-teal-600' : 'text-amber-600'}`}>
                        {metric.note}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Recent Orders</h3>
                    </div>
                    <div className="p-2">
                      <table className="w-full">
                        <tbody className="divide-y divide-gray-50">
                          {orders.map((order) => (
                            <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                              <td className="py-5 px-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><Truck size={18} /></div>
                                  <div>
                                    <span className="text-sm font-bold text-gray-900">{order.product}</span>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{order.customer}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-5 px-4">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                  order.status === 'Delivered' ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-5 px-4 text-xs font-bold text-gray-400 text-right"><ChevronRight size={16} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden h-fit">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <h3 className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] mb-8">Place Products</h3>
                  <p className="text-slate-400 text-sm mb-8 font-medium">Quickly pick fruits and place a new product order for your clients.</p>
                  <button 
                    onClick={() => setActiveTab('Customization')}
                    className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-sm transition-all"
                  >
                    Place Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'Customization' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 pb-32">
              {!storeActive ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] bg-white rounded-[3rem] border border-gray-100 shadow-sm text-center p-10">
                   <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center mb-8">
                      <Clock className="text-amber-600" size={48} />
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 mb-4">Store is Currently Closed</h2>
                   <p className="text-slate-400 max-w-md mx-auto mb-8 font-medium">The vendor has temporarily disabled product placement. Please check back later or contact support if you have an urgent delivery request.</p>
                   <button 
                     onClick={() => navigate('/dashboard')}
                     className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-200"
                   >
                     Back to Dashboard
                   </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                      {goals.map(g => (
                        <button 
                          key={g.name}
                          onClick={() => setActiveGoal(g.name)}
                          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                            activeGoal === g.name ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border border-gray-100 hover:border-teal-300'
                          }`}
                        >
                          {g.name}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {localStorage.getItem("vendorToken") && (
                        <button 
                          onClick={() => navigate('/vendor/add-product')}
                          className="px-6 py-4 bg-teal-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-teal-100 flex items-center gap-2 whitespace-nowrap"
                        >
                          <PlusCircle size={18} /> Add Product
                        </button>
                      )}
                      <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          type="text" 
                          placeholder="Search fruits..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-1 focus:ring-teal-600 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMarketProducts.map(p => (
                      <div key={p._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                        <div className="aspect-square bg-slate-50 rounded-3xl mb-6 overflow-hidden relative">
                           {p.images?.[0] ? <img src={`http://localhost:8000${p.images[0]}`} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl">🍎</div>}
                           <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-[9px] font-black text-teal-600 uppercase tracking-widest">{p.healthGoal}</div>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-xl font-black text-slate-900 leading-none">{p.name}</h4>
                          {localStorage.getItem("vendorToken") && (
                            <button 
                              onClick={() => handleDeleteProduct(p._id.startsWith('local-') ? p._id.replace('local-', '') : p._id)} 
                              className="text-slate-300 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">₹{p.price}/kg</p>
                        
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                          <div className="flex items-center bg-gray-50 rounded-xl p-1 gap-2">
                             {cart[p._id] > 0 && (
                               <>
                                 <button onClick={() => updateQuantity(p._id, -1)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 text-slate-900"><Minus size={14} /></button>
                                 <span className="w-6 text-center text-sm font-black">{cart[p._id]}</span>
                               </>
                             )}
                             <button onClick={() => updateQuantity(p._id, 1)} className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"><Plus size={14} /></button>
                          </div>
                          <span className="text-xs font-black text-slate-900">Total: ₹{(cart[p._id] || 0) * p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Order Bar */}
                  {Object.keys(cart).length > 0 && (
                    <motion.div 
                      initial={{ y: 100 }} animate={{ y: 0 }}
                      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-400px)] max-w-2xl bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg"><ShoppingBasket size={24} /></div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-teal-400">Order Summary</p>
                          <h5 className="text-lg font-black">{Object.values(cart).reduce((a, b) => a + b, 0)} Items Selected</h5>
                        </div>
                      </div>
                      <button onClick={handlePlaceOrder} className="px-10 py-4 bg-teal-600 hover:bg-teal-500 rounded-2xl font-black text-sm transition-all flex items-center gap-2">Place Order <ArrowRight size={18} /></button>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}


          {activeTab === 'Orders' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black text-slate-900">Active Subscriptions</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest">Live: 12</span>
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">Pending: 3</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="p-6 border border-gray-50 rounded-3xl hover:border-teal-100 hover:bg-teal-50/10 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                          <ShoppingBag size={20} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{order.customer}</h4>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.product} · {order.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-teal-50 text-teal-600'
                        }`}>
                          {order.status}
                        </span>
                        <p className="text-[10px] text-slate-300 font-bold mt-1 uppercase tracking-widest">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Clients' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Rajesh Kumar', goal: 'Weight Loss', active: true, joined: 'Jan 2026' },
                  { name: 'Simran Kumari', goal: 'Immunity', active: true, joined: 'Feb 2026' },
                  { name: 'Amit Sharma', goal: 'Diabetes', active: false, joined: 'Dec 2025' }
                ].map((client, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all font-black text-xl">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900">{client.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Joined {client.joined}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                      <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest">{client.goal}</span>
                      <button className="text-slate-400 hover:text-teal-600 transition-colors"><ChevronRight size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Settings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl">
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-10">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-6">Store Preferences</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="text-sm font-black text-slate-900">Email Notifications</p>
                        <p className="text-xs text-slate-400 font-medium">Receive alerts for new orders</p>
                      </div>
                      <div className="w-12 h-6 bg-teal-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="text-sm font-black text-slate-900">Auto-Approve Orders</p>
                        <p className="text-xs text-slate-400 font-medium">Automatically accept subscription requests</p>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-teal-100">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Account' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AccountProfile />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${
      active 
        ? 'bg-teal-600 text-white shadow-xl shadow-teal-100' 
        : 'text-gray-400 hover:bg-gray-50 hover:text-black'
    }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ label, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-all">{icon}</div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
        trend.includes('+') ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {trend}
      </span>
    </div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">{value}</h4>
  </div>
);

export default NutritionDashboard;
