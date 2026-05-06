import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  UserPlus,
  Clock,
  ExternalLink,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  BarChart3,
  Globe,
  Database,
  Settings,
  Menu,
  X as CloseIcon,
  LayoutDashboard,
  ShoppingBag
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

// Realistic live data generator
const generateLiveData = () => {
  const data = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      load: Math.floor(Math.random() * 30) + 40,
      requests: Math.floor(Math.random() * 200) + 500,
    });
  }
  return data;
};

const AdminNavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
      active 
        ? 'bg-[#eef2ff] text-blue-700' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    {label}
  </button>
);

const MetricCard = ({ title, value, sub, icon, trend, status }) => (
  <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
    <div className={`absolute -right-2 -top-2 w-16 h-16 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    
    <div className="flex justify-between items-start mb-6">
      <div className="p-2.5 bg-slate-50 text-slate-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md uppercase tracking-widest ${
        status === 'up' ? 'text-emerald-500 bg-emerald-50' : 
        status === 'down' ? 'text-rose-500 bg-rose-50' : 'text-slate-500 bg-slate-50'
      }`}>
        {trend}
      </span>
    </div>
    
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-semibold text-slate-900 tracking-tighter">{value}</h4>
        <span className="text-sm font-semibold text-slate-400">{sub}</span>
      </div>
    </div>
  </div>
);

const LogRow = ({ name, type, time, status, id, isPending }) => (
  <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <UserPlus size={18} />
      </div>
      <div>
        <p className="text-base font-bold text-slate-900 tracking-tight leading-none mb-1">{name}</p>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{type} • {id}</p>
      </div>
    </div>
    
    <div className="flex items-center gap-8">
      <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{time}</span>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md uppercase tracking-widest border ${
        isPending ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
      }`}>
        {status}
      </span>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 transition-all" />
    </div>
  </div>
);

const QuickTask = ({ title, count, icon, link, highlight }) => (
  <Link 
    to={link}
    className={`flex items-center gap-4 p-4 rounded-lg border border-white/5 transition-all group ${
      highlight ? 'bg-blue-600/10 border-blue-600/20' : 'bg-white/5 hover:bg-white/10'
    }`}
  >
    <div className={`p-2 rounded-lg ${highlight ? 'text-blue-500 bg-blue-600/10' : 'text-slate-500 bg-white/5 group-hover:text-white'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-xs font-semibold tracking-widest uppercase">{title}</h4>
      {count && <p className="text-xs text-slate-500 font-bold">{count} tasks remaining</p>}
    </div>
    <ExternalLink size={14} className="text-slate-600 group-hover:text-white" />
  </Link>
);

const RegionProgress = ({ name, value }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-sm font-semibold uppercase tracking-widest">
      <span className="text-slate-500">{name}</span>
      <span className="text-slate-900">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className="h-full bg-blue-600"
      />
    </div>
  </div>
);

const AdminDashboard = () => {
  const [chartData, setChartData] = useState(generateLiveData());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          load: Math.floor(Math.random() * 30) + 40,
          requests: Math.floor(Math.random() * 200) + 500,
        });
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#f9fafb] font-sans text-slate-900 overflow-hidden">
      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#f8f9fa] border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">W</div>
            <span className="font-bold text-gray-900 tracking-tight">Wellwigen <span className="text-blue-600 font-semibold">Admin</span></span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-500 hover:bg-white rounded">
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          <AdminNavItem icon={<LayoutDashboard size={18} />} label="System Overview" active={activeTab === 'Overview'} onClick={() => { setActiveTab('Overview'); setIsSidebarOpen(false); }} />
          <AdminNavItem icon={<Users size={18} />} label="User Management" active={activeTab === 'Users'} onClick={() => { setActiveTab('Users'); setIsSidebarOpen(false); }} />
          <AdminNavItem icon={<ShoppingBag size={18} />} label="Order Monitor" active={activeTab === 'Orders'} onClick={() => { setActiveTab('Orders'); setIsSidebarOpen(false); }} />
          <AdminNavItem icon={<ShieldCheck size={18} />} label="Security" active={activeTab === 'Security'} onClick={() => { setActiveTab('Security'); setIsSidebarOpen(false); }} />
          <AdminNavItem icon={<Settings size={18} />} label="System Settings" active={activeTab === 'Settings'} onClick={() => { setActiveTab('Settings'); setIsSidebarOpen(false); }} />
        </nav>

        <div className="p-4 border-t border-gray-200 bg-[#f8f9fa]">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100">
            <div className="w-10 h-10 rounded bg-slate-900 flex items-center justify-center text-white font-bold text-xs">AD</div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">System Admin</span>
              <span className="text-xs text-blue-600 font-semibold uppercase">Superuser</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        {/* TOP STRIP / COMMAND BAR */}
        <div className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4 lg:gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-500">
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Node: Central-Alpha</span>
            </div>
            <div className="hidden md:block h-4 w-[1px] bg-slate-200"></div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Database size={14} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-500">DB Sync: 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={14} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-500">Latency: 24ms</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all w-32 md:w-64"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-widest rounded-md">Master Overview</span>
              <span className="text-slate-300">/</span>
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Real-time Telemetry</span>
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight flex items-center gap-3">
              Operational Command Center
              <Zap size={24} className="text-blue-600 fill-blue-600" />
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-slate-300 transition-all flex items-center gap-2">
              <Activity size={14} />
              Export Metrics
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
              <ShieldCheck size={14} />
              Security Audit
            </button>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="System Throughput" value="1.2M" sub="Requests / hour" icon={<Activity size={18} />} trend="+8.2%" status="up" />
          <MetricCard title="Active Connections" value="4,821" sub="Live sessions" icon={<Users size={18} />} trend="+142" status="up" />
          <MetricCard title="Resource Load" value="42%" sub="Compute efficiency" icon={<Zap size={18} />} trend="-2.4%" status="down" />
          <MetricCard title="Network Latency" value="12ms" sub="Response time" icon={<BarChart3 size={18} />} trend="Stable" status="stable" />
        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LIVE GRAPH */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm border border-gray-200 p-6 relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">System Load Telemetry</h3>
                  <p className="text-xs font-medium text-slate-400 mt-1">Live data feed from global clusters</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    <span className="text-sm font-semibold text-slate-500 uppercase">Requests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <span className="text-sm font-semibold text-slate-500 uppercase">Load</span>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        padding: '12px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="requests" 
                      stroke="#14B8A6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRequests)" 
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* LOWER LOGS TABLE */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest">Network Inbound Log</h3>
                <button className="text-xs font-semibold text-blue-600 uppercase tracking-widest hover:underline">See full log</button>
              </div>
              <div className="divide-y divide-slate-50">
                <LogRow name="Dr. Julianne Smith" type="Physician" time="2m ago" status="Success" id="REG-4291" />
                <LogRow name="Apollo Diagnostics" type="Laboratory" time="12m ago" status="Pending" id="REG-4292" isPending />
                <LogRow name="Wellness Pharmacy" type="Pharmacy" time="28m ago" status="Success" id="REG-4293" />
                <LogRow name="Rajesh Kumar" type="Patient" time="45m ago" status="Success" id="REG-4294" />
              </div>
            </div>
          </div>

          {/* SIDE PANEL: QUICK TASKS & HEALTH */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* ACTION PANEL */}
            <div className="bg-slate-900 rounded-lg p-8 text-white relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[60px]"></div>
              
              <h3 className="text-lg font-semibold mb-6 tracking-tight flex items-center gap-2">
                System Controls
                <MoreHorizontal size={18} className="text-slate-500" />
              </h3>
              
              <div className="space-y-3 relative z-10">
                <QuickTask title="Pending Verifications" count="12" icon={<ShieldCheck size={18} />} link="/admin/verification" highlight />
                <QuickTask title="Inventory Management" count="340" icon={<Database size={18} />} link="/admin/categories" />
                <QuickTask title="System Configuration" icon={<Settings size={18} />} link="/admin/settings" />
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Cluster Health</span>
                  <span className="text-sm font-semibold text-blue-500 uppercase">99.8% Nominal</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99.8%' }}
                    className="h-full bg-blue-600"
                  />
                </div>
                <button className="w-full mt-4 py-4 bg-white text-slate-900 rounded-lg font-semibold text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-lg">
                  Initiate System Sync
                </button>
              </div>
            </div>

            {/* PERFORMANCE RADAR / MINI CHART */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-widest mb-6">Regional Distribution</h3>
              <div className="space-y-4">
                <RegionProgress name="Asia Pacific" value={78} />
                <RegionProgress name="North America" value={45} />
                <RegionProgress name="Europe" value={62} />
                <RegionProgress name="Middle East" value={15} />
              </div>
            </div>

          </div>

        </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;
