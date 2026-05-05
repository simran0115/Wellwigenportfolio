import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  BarChart, 
  Award, 
  HelpCircle, 
  LogOut,
  ShieldCheck,
  ChevronRight,
  Activity,
  User
} from 'lucide-react';

const Sidebar = ({ providerInfo, currentView, setCurrentView }) => {
  const role = providerInfo?.type || 'PROVIDER';

  const navItems = [
    { id: 'overview', name: "Command Center", icon: LayoutDashboard },
    { id: 'orders', name: role === 'DOCTOR' ? "Consultations" : role === 'LAB' ? "Test Queue" : "Operations", icon: ShoppingBag, badge: "3" },
    { id: 'products', name: "My Products", icon: Package },
    { id: 'analytics', name: "Growth Insights", icon: BarChart },
    { id: 'performance', name: "Performance Score", icon: Award },
  ];

  const secondaryItems = [
    { id: 'support', name: "Support Terminal", icon: HelpCircle },
    { id: 'settings', name: "Infrastructure", icon: ShieldCheck },
  ];

  const handleNavClick = (id) => {
    if (id === 'overview' || id === 'products') {
      setCurrentView(id);
    } else {
      // Logic for other routes if needed, or stay on current
      console.log(`Navigating to ${id}`);
    }
  };

  return (
    <aside className="w-72 h-screen bg-white flex flex-col sticky top-0 overflow-hidden z-30 border-r border-[#F1F1E6] shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Branding Section */}
      <div className="p-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tighter leading-none">Wellwigen</h1>
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-1.5">{role.replace('_', ' ')} Portal</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4">
        <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Operations Control</p>
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black transition-all duration-300 group relative
                ${isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon size={16} className="group-hover:scale-110 transition-transform" />
              <span className="flex-1 text-left tracking-wide">{item.name}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-600 text-[9px] font-black">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={12} className={`opacity-0 group-hover:opacity-40 transition-opacity ${isActive ? 'opacity-40' : ''}`} />
            </button>
          );
        })}

        <div className="pt-8">
          <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Maintenance</p>
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black transition-all duration-300 group text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            >
              <item.icon size={16} />
              <span className="tracking-wide">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Profile Footer */}
      <div className="p-6 border-t border-[#F1F1E6] bg-[#F9F8F3]/50">
        <div className="flex items-center gap-3 mb-6 p-1">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#F1F1E6] flex items-center justify-center shadow-sm overflow-hidden">
             {providerInfo?.avatar ? (
               <img src={providerInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <User className="text-slate-400" size={20} />
             )}
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-black text-slate-900 truncate uppercase tracking-tight">{providerInfo?.name || "Dr. Sarah Mitchell"}</p>
            <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mt-0.5">Verified Partner</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#F1F1E6] bg-white text-slate-500 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all text-[9px] font-black uppercase tracking-widest">
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
