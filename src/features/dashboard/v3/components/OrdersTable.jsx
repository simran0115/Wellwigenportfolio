import React, { useMemo, useState, useEffect } from 'react';
import { Clock, ArrowRight, CheckCircle2, XCircle, Play, Loader2 } from 'lucide-react';

const statusMap = {
  Pending: 'bg-amber-100 text-amber-700',
  Accepted: 'bg-sky-100 text-sky-700',
  'In Progress': 'bg-teal-100 text-teal-700',
  Completed: 'bg-emerald-100 text-emerald-700',
};

const tabs = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed'];

const OrdersTable = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [expanded, setExpanded] = useState(null);
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const initialCountdown = orders.reduce((acc, order) => ({ ...acc, [order.id]: order.countdown }), {});
    setCountdown(initialCountdown);
  }, [orders]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = {};
        Object.entries(prev).forEach(([key, value]) => {
          next[key] = value > 0 ? value - 1 : 0;
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'All') return orders;
    return orders.filter((order) => order.status === activeTab);
  }, [activeTab, orders]);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Order Management</p>
          <h2 className="mt-3 text-xl font-black text-slate-900">Live requests and queue control</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-3xl border px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-900">
                  <span>{order.customer}</span>
                  <span className="text-slate-400">•</span>
                  <span>{order.service}</span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Slot</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{order.slot}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Distance</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{order.distance}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Priority</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{order.priority}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Status</p>
                    <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusMap[order.status] || 'bg-slate-100 text-slate-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <div className="rounded-3xl bg-white border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span>Response</span>
                  </div>
                  <p className="mt-2 text-lg font-black text-slate-900">{formatCountdown(countdown[order.id] || 0)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 transition">
                    <XCircle className="h-4 w-4 text-rose-500" /> Reject
                  </button>
                  {order.status === 'Pending' && (
                    <button className="inline-flex items-center gap-2 rounded-3xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition">
                      <CheckCircle2 className="h-4 w-4" /> Accept
                    </button>
                  )}
                  {order.status === 'Accepted' && (
                    <button className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
                      <Play className="h-4 w-4" /> In Progress
                    </button>
                  )}
                  {order.status !== 'Completed' && (
                    <button className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 transition">
                      <ArrowRight className="h-4 w-4" /> Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            <p className="font-semibold">No orders found in this category.</p>
            <p className="mt-2 text-sm">Switch tabs to view a different order status.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
