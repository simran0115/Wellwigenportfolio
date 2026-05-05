import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ label, value, subtext, subtextColor = 'text-emerald-500' }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white rounded-3xl p-6 border border-[#F1F1E6] shadow-sm flex flex-col justify-between"
  >
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 leading-none">{value}</h3>
    </div>
    {subtext && (
      <p className={`text-[10px] font-bold mt-4 uppercase tracking-wider ${subtextColor}`}>
        {subtext}
      </p>
    )}
  </motion.div>
);

export const AlertBanner = ({ title, message, variant = 'rose' }) => {
  const styles = {
    rose: 'bg-rose-50 border-l-4 border-rose-500 text-rose-900',
    amber: 'bg-amber-50 border-l-4 border-amber-500 text-amber-900',
    blue: 'bg-blue-50 border-l-4 border-blue-500 text-blue-900',
  };

  return (
    <div className={`p-5 rounded-2xl ${styles[variant]} mb-8`}>
      <p className="text-xs font-black uppercase tracking-widest mb-1">{title}</p>
      <p className="text-xs font-medium leading-relaxed">{message}</p>
    </div>
  );
};

export const DashboardContainer = ({ children, title, subtitle, badgeText, badgeColor = 'bg-blue-100 text-blue-700' }) => (
  <div className="flex-1 overflow-y-auto p-10 bg-[#F9F8F3] min-h-screen font-sans">
    <div className="max-w-7xl mx-auto">
      <header className="mb-10 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{title}</h1>
          <p className="text-sm font-bold text-slate-500 tracking-wide">{subtitle}</p>
          <div className="flex items-center gap-3 mt-5">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${badgeColor}`}>
              ● {badgeText}
            </span>
            <button className="px-4 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
              Get Tips ↗
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  </div>
);
