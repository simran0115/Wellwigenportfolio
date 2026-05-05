import React from 'react';
import { StatCard, AlertBanner, DashboardContainer } from './SharedUI';

const FreshProduceDashboard = () => {
  const orderQueue = [
    { name: 'Priya Sharma', items: '1kg Apple, 500g Spinach - 2.3km', price: '₹187', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700' },
    { name: 'Mohit Gupta', items: 'Seasonal Pack - 1.1km', price: '₹240', status: 'Out for delivery', statusColor: 'bg-blue-100 text-blue-700' },
  ];

  const inventory = [
    { name: 'Apples', level: 85, weight: '39 kg', color: 'bg-emerald-500' },
    { name: 'Bananas', level: 60, weight: '26 kg', color: 'bg-emerald-500' },
    { name: 'Oranges', level: 40, weight: '20 kg', color: 'bg-amber-500' },
    { name: 'Spinach', level: 10, weight: '4 kg', color: 'bg-rose-500' },
    { name: 'Strawberry', level: 5, weight: '2 kg', color: 'bg-rose-500' },
  ];

  return (
    <DashboardContainer 
      title="Fresh Produce Dashboard" 
      subtitle="Ramesh Fruits & Vegetables · Gomti Nagar, Lucknow"
      badgeText="FSSAI Verified"
      badgeColor="bg-emerald-100 text-emerald-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Today's Orders" value="34" subtext="↑ 8 vs yesterday" />
        <StatCard label="Pending" value="7" subtext="Dispatch by 10 AM" subtextColor="text-amber-600" />
        <StatCard label="This Week ₹" value="18.4k" subtext="↑ 12%" />
        <StatCard label="Avg Rating" value="4.6" subtext="↑ 0.2 pts" />
        <StatCard label="Accept Rate" value="94%" subtext="Above threshold" />
      </div>

      <AlertBanner 
        title="Low Stock Alert"
        message="Spinach and Strawberries below 5 kg. 12 subscribers have these in their weekly order. Update inventory or platform will auto-substitute."
        variant="amber"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Today's Order Queue */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-slate-900">Today's Order Queue</h3>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest">7 pending</span>
          </div>
          <div className="space-y-6">
            {orderQueue.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <span className="text-xl">🛒</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                    <span className="text-xs font-black text-slate-900">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400">{item.items}</p>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${item.statusColor}`}>{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Status */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Inventory Status</h3>
          <div className="space-y-6">
            {inventory.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500">{item.name}</span>
                  <span className="text-xs font-black text-slate-900">{item.weight}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full`} style={{ width: `${item.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default FreshProduceDashboard;
