import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageSquare, ShieldAlert, CreditCard, Activity, History } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'order': return { icon: ShoppingBag, color: 'text-teal-600', bg: 'bg-teal-500/10', border: 'border-teal-500/20' };
      case 'review': return { icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
      case 'system': return { icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
      case 'payout': return { icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
      default: return { icon: ShoppingBag, color: 'text-slate-600', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Event Stream</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Operational Audit Log</p>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl">
          <History size={16} className="text-slate-400" />
        </div>
      </div>

      <div className="space-y-8 relative">
        <div className="absolute left-[23px] top-2 bottom-2 w-[1px] bg-slate-100"></div>
        {activities.map((item, index) => {
          const config = getIcon(item.type);
          return (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-5 relative z-10"
            >
              <div className={`w-[46px] h-[46px] rounded-2xl ${config.bg} ${config.border} border flex items-center justify-center flex-shrink-0 shadow-sm bg-white`}>
                <config.icon size={18} className={config.color} />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight line-clamp-1">{item.message}</p>
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">{item.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <button className="w-full mt-10 py-4 rounded-2xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-slate-900 transition-all">
        Open Audit Terminal
      </button>
    </div>
  );
};

export default ActivityFeed;
