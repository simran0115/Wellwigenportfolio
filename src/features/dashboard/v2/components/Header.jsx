import React from 'react';
import { Search, Bell, Plus, ChevronDown, Command, Globe, Activity } from 'lucide-react';

const Header = ({ providerInfo }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-md bg-white/80">
      {/* Left: Breadcrumbs & Context */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
          <Command size={14} className="text-slate-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Terminal 01</span>
        </div>
        <div className="h-4 w-[1px] bg-slate-200"></div>
        <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
          <span className="text-slate-400">Core</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900">Operations</span>
        </nav>
      </div>

      {/* Middle: Search (Data Dense) */}
      <div className="flex-1 max-w-xl px-12">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all shadow-inner"
            placeholder="Search resources, nodes, or operational logs..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-400 shadow-sm">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-400 shadow-sm">K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Operational Status & Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Protocol Sync: 100%</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl relative transition-all border border-transparent hover:border-slate-200">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm"></span>
          </button>
        </div>

        <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

        <button className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
          <div className="text-right">
            <p className="text-xs font-black text-slate-900 leading-none mb-0.5 uppercase tracking-tighter">{providerInfo?.name?.split(' ')[0] || "Provider"}</p>
            <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">Node Admin</p>
          </div>
          <div className="relative">
            <img 
              src={providerInfo?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"} 
              alt="Avatar" 
              className="w-9 h-9 rounded-xl border border-slate-200 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
              <ChevronDown size={10} className="text-slate-400" />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
