import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  BellIcon, MagnifyingGlassIcon, PlusIcon, 
  ArrowRightOnRectangleIcon, QuestionMarkCircleIcon, 
  ShoppingBagIcon, ArchiveBoxIcon, PresentationChartLineIcon,
  TruckIcon, Bars3Icon, XMarkIcon, SparklesIcon
} from "@heroicons/react/24/outline";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import socket from "../socket"; 
import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const [showNotif, setShowNotif] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [analytics] = useState([
    { name: "Jan", sales: 60000 }, { name: "Feb", sales: 85000 },
    { name: "Mar", sales: 105000 }, { name: "Apr", sales: 120000 },
    { name: "May", sales: 95000 }, { name: "Jun", sales: 142000 }
  ]);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:8000/api";
  const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    if(!token) {
      navigate("/vendor/login");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    // Fetch Products
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/product`, config);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    
    // Fetch Deliveries
    const fetchDeliveries = async () => {
      try {
        const res = await axios.get(`${API}/vendor/deliveries`, config);
        setDeliveries(res.data.deliveries || []);
      } catch (err) {
        console.error("Error fetching deliveries", err);
      }
    };

    fetchProducts();
    fetchDeliveries();

    // Socket Connection
    const vendorId = JSON.parse(localStorage.getItem("vendorInfo") || "{}").id;
    if (vendorId) {
      socket.emit("registerUser", vendorId);
    }
    socket.on("vendorApproved", (data) => {
      alert(data.message);
    });

    return () => {
      socket.off("vendorApproved");
    };
  }, [navigate, API]);

  const today = new Date();
  
  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    navigate("/vendor/login");
  }

  const notifications = deliveries.map((d) => {
    if (!d.deliveryDate) return `Awaiting scheduling for ${d.customerName || 'Unknown'}`;
    const dDate = new Date(d.deliveryDate);
    const diff = Math.ceil((dDate - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return `Delivery TODAY for ${d.customerName}`;
    if (diff === 1) return `Reminder: Delivery tomorrow for ${d.customerName}`;
    if (diff > 1) return `Upcoming delivery for ${d.customerName} in ${diff} days`;
    return null;
  }).filter(Boolean);

  const stats = [
    { title: "Total Revenue", value: "₹2,34,500", trend: "+12%", isPositive: true },
    { title: "Active Orders", value: deliveries.length, trend: "+4%", isPositive: true },
    { title: "Monthly Growth", value: "14.5%", trend: "-2%", isPositive: false }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200/60 flex flex-col z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
        <div className="h-20 px-6 flex items-center justify-between lg:justify-start gap-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/20 ring-4 ring-blue-50">
              W
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight tracking-tight">Vendor Portal</h1>
              <p className="text-xs text-slate-500 font-medium">Store Management</p>
            </div>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(false)}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-6 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
          <NavItem id="dashboard" label="Dashboard" active={activeMenu === "dashboard"} onClick={() => {setActiveMenu("dashboard"); setIsSidebarOpen(false);}} icon={<PresentationChartLineIcon className="w-5 h-5"/>} />
          <NavItem id="products" label="Products" active={activeMenu === "products"} onClick={() => {setActiveMenu("products"); setIsSidebarOpen(false);}} icon={<ArchiveBoxIcon className="w-5 h-5"/>} />
          <NavItem id="orders" label="Orders" active={activeMenu === "orders"} onClick={() => {setActiveMenu("orders"); setIsSidebarOpen(false);}} icon={<ShoppingBagIcon className="w-5 h-5"/>} />
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all border border-transparent hover:border-slate-200">
            <QuestionMarkCircleIcon className="w-5 h-5 text-slate-400" /> Help & Support
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all">
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-rose-500" /> Sign out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-72 w-full flex flex-col min-h-screen relative">
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 w-full transition-all duration-300">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors border border-slate-200" onClick={() => setIsSidebarOpen(true)}>
              <Bars3Icon className="w-5 h-5" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 capitalize tracking-tight hidden sm:block">{activeMenu}</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden md:flex items-center bg-slate-100/80 rounded-full px-4 py-2 transition-all duration-300 border border-transparent focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 w-64">
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-500 shrink-0" />
              <input type="text" placeholder="Search orders or products..." className="bg-transparent border-none outline-none ml-2 text-sm w-full text-slate-800 placeholder-slate-400" />
            </div>

            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <BellIcon className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 py-2 z-50 transform origin-top-right transition-all animate-fade-in-down">
                  <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h4 className="font-semibold text-sm text-slate-800">Notifications</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-1 rounded-md">{notifications.length} New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? <p className="text-sm text-slate-500 text-center py-8">You're all caught up!</p> : 
                      notifications.map((n, i) => (
                        <div key={i} className="text-sm px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 text-slate-700 flex items-start gap-3 cursor-pointer transition-colors group">
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform"></div> 
                          <p className="leading-relaxed">{n}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>

            <div className="h-9 w-9 bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center rounded-full font-bold text-sm shrink-0 ring-2 ring-white shadow-sm cursor-pointer hover:shadow-md transition-all">
              V
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8 w-full">
          
          {/* STATS STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <SparklesIcon className="w-16 h-16 text-blue-600" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-medium text-slate-500">{s.title}</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${s.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {s.trend}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{s.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CHART */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg tracking-tight">Revenue Analytics</h3>
                  <p className="text-sm text-slate-500 mt-1">Monthly performance overview</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium cursor-pointer">
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics} onMouseMove={(state) => {
                    if (state.isTooltipActive) {
                      setActiveIndex(state.activeTooltipIndex);
                    } else {
                      setActiveIndex(null);
                    }
                  }} onMouseLeave={() => setActiveIndex(null)}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} dx={-10} width={50} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}} 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px 16px', fontWeight: 600}} 
                      itemStyle={{color: '#2563eb'}}
                    />
                    <Bar dataKey="sales" radius={[6, 6, 0, 0]} barSize={40}>
                      {analytics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={activeIndex === index ? '#1d4ed8' : '#3b82f6'} className="transition-all duration-300" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* LIVE DELIVERIES */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg tracking-tight">Recent Orders</h3>
                  <p className="text-sm text-slate-500 mt-1">Latest delivery schedules</p>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all">View All</button>
              </div>
              <div className="p-0 flex-1 overflow-y-auto max-h-80 lg:max-h-full">
                {deliveries.length === 0 ? (
                  <div className="text-center text-slate-400 py-16 flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <TruckIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-sm font-medium">No active orders</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {deliveries.slice(0, 5).map((d, i) => (
                      <li key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <TruckIcon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{d.customerName || `Order #${d._id.toString().substring(0,4)}`}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{new Date(d.deliveryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 shrink-0 ml-3 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                          {d.status || "Pending"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-bold text-slate-800 text-xl tracking-tight">Product Catalog</h3>
                <p className="text-sm text-slate-500 mt-1">Manage your inventory and pricing</p>
              </div>
              <button 
                onClick={() => navigate("/vendor/add-product")}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                <PlusIcon className="w-5 h-5" /> Add Product
              </button>
            </div>
            
            {products.length === 0 ? (
              <div className="w-full bg-white border border-slate-200 border-dashed rounded-2xl p-10 sm:p-16 text-center shadow-sm">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <ArchiveBoxIcon className="h-10 w-10 text-blue-500" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">Your catalog is empty</h4>
                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">Get started by creating your first product to display to customers.</p>
                <div className="mt-8">
                  <button onClick={() => navigate("/vendor/add-product")} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-slate-900 px-6 py-3 rounded-xl hover:bg-slate-800 hover:shadow-md transition-all">
                    <PlusIcon className="w-5 h-5" /> Create Product
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                    <div className="aspect-w-4 aspect-h-3 bg-slate-100 w-full relative overflow-hidden">
                      {p.imageUrl ? (
                        <img src={`${IMAGE_BASE_URL}${p.imageUrl}`} alt={p.name} className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="w-full h-48 sm:h-52 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                          <ShoppingBagIcon className="w-10 h-10 mb-2 opacity-50" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">No Image</span>
                        </div>
                      )}
                      
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {p.quantity <= 5 && (
                        <span className="absolute top-3 left-3 bg-rose-500/90 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg shadow-sm">Low Stock</span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors" title={p.name}>{p.name}</h4>
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md text-sm shrink-0">₹{p.price}</span>
                      </div>
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-sm text-slate-500 font-medium">Stock: <span className={`${p.quantity <= 5 ? "text-rose-600 font-bold" : "text-slate-900"}`}>{p.quantity}</span></p>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}

// Nav Item Helper Component
function NavItem({ id, label, icon, active, onClick }) {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-600 rounded-r-full"></span>
      )}
      <div className={`${active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} transition-colors`}>
        {icon}
      </div>
      {label}
    </button>
  )
}
