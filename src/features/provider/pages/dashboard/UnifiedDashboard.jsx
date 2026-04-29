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
  AlertCircle,
  Stethoscope,
  FlaskConical,
  Store,
  Pill,
  Apple,
  LogOut,
  ShoppingBag,
  Truck,
  MapPin,
  Calendar,
  User as UserIcon,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UnifiedDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  // Get dynamic data from localStorage
  const vendorInfo = JSON.parse(localStorage.getItem("vendorInfo") || "{}");
  const providerType = vendorInfo.type || 'VENDOR';
  const providerName = vendorInfo.name || 'Provider';
  const vendorId = vendorInfo.id;

  const API = "http://localhost:5000/api";

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("vendorStatus");
    navigate("/vendor/login");
  };

  // Mock data for Nutrition orders if backend is empty
  const mockOrders = [
    { id: '1', customer: 'Rajesh Kumar', plan: 'Total Wellness', product: 'Seasonal Fruit Box', date: '2026-04-29', status: 'Pending', type: 'Subscription' },
    { id: '2', customer: 'Simran Kumari', plan: 'Healthy Life', product: 'Organic Veggie Pack', date: '2026-04-29', status: 'Out for Delivery', type: 'Subscription' },
    { id: '3', customer: 'Amit Singh', plan: 'Fit Start', product: 'Post-Workout Meal', date: '2026-04-30', status: 'Delivered', type: 'One-time' },
  ];

  const getProviderIcon = () => {
    switch(providerType) {
      case 'DOCTOR': return <Stethoscope size={20} />;
      case 'LAB': return <FlaskConical size={20} />;
      case 'PHARMACY': return <Pill size={20} />;
      case 'NUTRITION': return <Apple size={20} />;
      default: return <Store size={20} />;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order status updated to ${newStatus}`);
  };

  useEffect(() => {
    // In real app: fetch from `${API}/delivery/vendor/${vendorId}`
    setOrders(mockOrders);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">W</div>
          <span className="font-bold text-gray-900 tracking-tight">Wellwigen</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          
          {providerType === 'NUTRITION' && (
            <NavItem icon={<ShoppingBag size={18} />} label="Subscription Orders" active={activeTab === 'Orders'} onClick={() => setActiveTab('Orders')} />
          )}

          <NavItem icon={<Package size={18} />} label={providerType === 'VENDOR' ? 'Inventory' : 'Services'} active={activeTab === 'Services'} onClick={() => setActiveTab('Services')} />
          <NavItem icon={<Users size={18} />} label="My Clients" active={activeTab === 'Clients'} onClick={() => setActiveTab('Clients')} />
          <NavItem icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          
          <div className="pt-8 px-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
            >
              <LogOut size={18} />
              Logout Session
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-white shadow-sm">
              <img src={`https://ui-avatars.com/api/?name=${providerName}&background=000&color=fff`} alt="Avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{providerName}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest truncate">{providerType}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome, {providerName.split(' ')[0]}</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Provider Portal &bull; {providerType}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search orders, clients..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-gray-50 transition-all w-64 shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black hover:bg-gray-50 transition-all shadow-sm">
              <Bell size={18} />
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
              <Plus size={16} /> New Entry
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'Overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard label="Total Earnings" value="₹45,280" trend="+12.5%" icon={<CheckCircle className="text-emerald-500" size={20} />} />
                <StatCard label={providerType === 'NUTRITION' ? 'Active Deliveries' : 'Active Appointments'} value="18" trend="+3" icon={<Truck className="text-blue-500" size={20} />} />
                <StatCard label="Customer Satisfaction" value="4.8/5" trend="Top Tier" icon={<Users className="text-purple-500" size={20} />} />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders / Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                      <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">
                        {providerType === 'NUTRITION' ? 'Today\'s Deliveries' : 'Recent Services'}
                      </h3>
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700">View History</button>
                    </div>
                    <div className="p-2">
                      <table className="w-full">
                        <tbody className="divide-y divide-gray-50">
                          {orders.map((order, idx) => (
                            <OrderRow key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar: Client Insights */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h3 className="font-black text-gray-900 text-[10px] uppercase tracking-widest mb-6">Upcoming Schedule</h3>
                    <div className="space-y-4">
                      {[1, 2].map(i => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 shadow-sm">
                            <Clock size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">Subscription Batch #{i}04</p>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Tomorrow &bull; 06:00 AM</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-3 border border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 transition-all">
                      View Full Calendar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Orders' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm">
                <div className="p-8 border-b border-gray-100">
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Subscription Orders</h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage daily fruit & meal dispatches</p>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 gap-4">
                    {orders.map(order => (
                      <div key={order.id} className="p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-xl transition-all flex flex-wrap lg:flex-nowrap items-center gap-6">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                          <Truck size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{order.product}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">{order.plan}</span>
                            <span className="text-xs text-gray-400 font-medium flex items-center gap-1"><UserIcon size={12} /> {order.customer}</span>
                          </div>
                        </div>
                        <div className="w-px h-10 bg-gray-100 hidden lg:block" />
                        <div className="text-center px-4">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                            order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                            order.status === 'Out for Delivery' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => updateOrderStatus(order.id, 'Out for Delivery')} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Out for Delivery</button>
                          <button onClick={() => updateOrderStatus(order.id, 'Delivered')} className="px-4 py-2 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Mark Delivered</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

/* --- Helper Components --- */

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${
      active 
        ? 'bg-black text-white shadow-xl shadow-gray-200' 
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
      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">{icon}</div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
        trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {trend}
      </span>
    </div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">{value}</h4>
  </div>
);

const OrderRow = ({ order, onUpdateStatus }) => (
  <tr className="group hover:bg-gray-50/50 transition-colors">
    <td className="py-5 px-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white shadow-sm">
          <Truck size={18} />
        </div>
        <div>
          <span className="text-sm font-bold text-gray-900">{order.product}</span>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{order.customer}</p>
        </div>
      </div>
    </td>
    <td className="py-5 px-4">
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
        order.status === 'Out for Delivery' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${
          order.status === 'Delivered' ? 'bg-emerald-500' : 
          order.status === 'Out for Delivery' ? 'bg-blue-500' : 'bg-amber-500'
        }`}></div>
        {order.status}
      </div>
    </td>
    <td className="py-5 px-4 text-xs font-bold text-gray-400">{order.plan}</td>
    <td className="py-5 px-4 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onUpdateStatus(order.id, 'Out for Delivery')} className="p-2 bg-white border border-gray-100 rounded-lg text-blue-600 shadow-sm hover:shadow-md"><Truck size={14} /></button>
        <button onClick={() => onUpdateStatus(order.id, 'Delivered')} className="p-2 bg-white border border-gray-100 rounded-lg text-emerald-600 shadow-sm hover:shadow-md"><CheckCircle size={14} /></button>
      </div>
    </td>
  </tr>
);

export default UnifiedDashboard;
