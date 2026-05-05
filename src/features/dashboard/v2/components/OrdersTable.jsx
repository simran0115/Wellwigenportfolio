import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, ChevronRight, CheckCircle, XCircle, Play, ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';

const OrdersTable = ({ orders: initialOrders }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [orders, setOrders] = useState(initialOrders);

  const tabs = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed'];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-400/10 text-amber-600 border-amber-400/20';
      case 'accepted': return 'bg-blue-400/10 text-blue-600 border-blue-400/20';
      case 'in-progress': return 'bg-teal-400/10 text-teal-600 border-teal-400/20';
      case 'completed': return 'bg-emerald-400/10 text-emerald-600 border-emerald-400/20';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const filteredOrders = activeTab === 'All' 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase().replace(' ', '-'));

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      {/* Utility Header */}
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Operations</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Request Stream</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Filter stream..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-teal-500/5 transition-all w-48" />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-50 px-8 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-5 text-[11px] font-black uppercase tracking-widest transition-all relative ${
              activeTab === tab ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="tab-underline-v" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="p-4">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} getStatusStyle={getStatusStyle} />
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <ArrowUpRight size={24} className="text-slate-200" />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No active nodes in this segment</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order, getStatusStyle }) => {
  const [timeLeft, setTimeLeft] = useState(order.timeLeft);

  useEffect(() => {
    if (order.status !== 'pending' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [order.status, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="p-4 border border-transparent hover:border-slate-100 hover:bg-slate-50/50 rounded-2xl transition-all group"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 flex-1">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-teal-600 group-hover:border-teal-100 transition-all shadow-sm">
            <Clock size={20} />
          </div>
          
          <div className="flex-1 grid grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-[13px] font-black text-slate-900 tracking-tight">{order.customer}</h4>
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{order.id}</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span className="flex items-center gap-1"><MapPin size={10} /> {order.distance}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service Matrix</p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-700">{order.service}</span>
                <span className={`px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest`}>
                  {order.priority}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Window</p>
              <p className="text-[11px] font-black text-slate-900">{order.time}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Value</p>
            <p className="text-sm font-black text-teal-600">{order.amount}</p>
          </div>

          {order.status === 'pending' && (
            <div className="flex flex-col items-center px-4 py-2 bg-rose-500/5 rounded-xl border border-rose-500/10 min-w-[90px]">
              <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-0.5">Time Left</p>
              <p className="text-xs font-black text-rose-600 tabular-nums">{formatTime(timeLeft)}</p>
            </div>
          )}

          <div className="flex gap-2">
            {order.status === 'pending' && (
              <>
                <button className="p-2.5 rounded-xl border border-rose-100 text-rose-500 hover:bg-rose-50 transition-all">
                  <XCircle size={18} />
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-teal-600 hover:shadow-teal-100 transition-all">
                  Accept Node
                </button>
              </>
            )}
            {order.status === 'accepted' && (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                <Play size={14} /> Initiate
              </button>
            )}
            {order.status === 'in-progress' && (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-100 hover:bg-teal-700 transition-all">
                <CheckCircle size={14} /> Finalize
              </button>
            )}
            <button className="p-2.5 text-slate-300 hover:bg-slate-100 hover:text-slate-600 rounded-xl transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrdersTable;
