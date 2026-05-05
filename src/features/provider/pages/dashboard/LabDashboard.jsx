import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Users, 
  Settings, 
  Bell, 
  Plus, 
  Clock, 
  CheckCircle,
  LogOut,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LabDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();
  
  const vendorInfo = JSON.parse(localStorage.getItem("providerInfo") || localStorage.getItem("vendorInfo") || "{}");
  const providerName = vendorInfo.ownerName || vendorInfo.name || 'Lab';

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("vendorStatus");
    localStorage.removeItem("providerToken");
    localStorage.removeItem("providerInfo");
    localStorage.removeItem("providerStatus");
    navigate("/vendor/login");
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex font-sans">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
          <span className="font-bold text-gray-900 tracking-tight">Wellwigen <span className="text-purple-600">Lab</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <NavItem icon={<FileText size={18} />} label="Test Requests" active={activeTab === 'Requests'} onClick={() => setActiveTab('Requests')} />
          <NavItem icon={<FlaskConical size={18} />} label="Lab Inventory" active={activeTab === 'Inventory'} onClick={() => setActiveTab('Inventory')} />
          <NavItem icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          
          <div className="pt-8 px-2">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
              <LogOut size={18} /> Logout Session
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 border border-white shadow-sm">
              <FlaskConical size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{providerName}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest truncate">Diagnostics Portal</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Diagnostic Hub, {providerName.split(' ')[0]}</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Status: Operational &bull; {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-xl shadow-purple-100">
              <Plus size={16} /> New Report
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Pending Samples" value="24" trend="+4" icon={<Clock className="text-purple-500" size={20} />} />
          <StatCard label="Completed Today" value="18" trend="+2" icon={<CheckCircle className="text-emerald-500" size={20} />} />
          <StatCard label="Critical Alerts" value="0" trend="All clear" icon={<Bell className="text-rose-500" size={20} />} />
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="text-center py-12">
                <FlaskConical size={48} className="mx-auto text-purple-100 mb-4" />
                <h3 className="text-lg font-bold text-gray-900">Lab Queue Overview</h3>
                <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">Samples are currently being processed. You will be notified of any critical findings.</p>
            </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-purple-600 text-white shadow-xl shadow-purple-100' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}>
    {icon} {label}
  </button>
);

const StatCard = ({ label, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-all">{icon}</div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
        {trend}
      </span>
    </div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">{value}</h4>
  </div>
);

export default LabDashboard;
