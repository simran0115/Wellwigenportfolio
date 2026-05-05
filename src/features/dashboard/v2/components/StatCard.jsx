import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "teal" }) => {
  const colorMap = {
    teal: "from-teal-500/10 to-teal-500/5 text-teal-600 border-teal-500/10",
    blue: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-500/10",
    amber: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-500/10",
    rose: "from-rose-500/10 to-rose-500/5 text-rose-600 border-rose-500/10",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical size={16} className="text-slate-400" />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.teal} border shadow-sm`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {trend && (
              <div className={`flex items-center gap-0.5 text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {trendValue}%
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{value}</h3>
        <div className="w-12 h-6 flex items-end gap-0.5">
          {[40, 70, 45, 90, 65].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className={`flex-1 rounded-t-sm ${color === 'teal' ? 'bg-teal-500/20' : 'bg-slate-100'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
