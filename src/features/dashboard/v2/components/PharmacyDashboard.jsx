import React from 'react';
import { StatCard, AlertBanner, DashboardContainer } from './SharedUI';

const PharmacyDashboard = () => {
  const prescriptionQueue = [
    { name: 'Suresh Kumar — Auto-Refill', meds: 'Metformin 500mg x 60 tabs · Insulin 10ml x 2', price: '₹342', status: 'Rx verified', statusColor: 'bg-amber-100 text-amber-700' },
  ];

  const stockAlerts = [
    { name: 'Metformin 500', stock: 90, unit: 'tabs', level: 30, color: 'bg-rose-500' },
  ];

  return (
    <DashboardContainer 
      title="Pharmacy Dashboard" 
      subtitle="Health First Pharmacy · Drug License #UP-LKO-2018-0341 · Indira Nagar"
      badgeText="License Verified"
      badgeColor="bg-rose-100 text-rose-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Orders Today" value="52" subtext="↑ 6 vs avg" />
        <StatCard label="Auto-Refills" value="18" subtext="Chronic patients" subtextColor="text-slate-500" />
        <StatCard label="Pending RX" value="11" subtext="Verification needed" subtextColor="text-rose-600" />
        <StatCard label="This Month ₹" value="84.1k" subtext="↑ 15%" />
        <StatCard label="Drug Alerts" value="1" subtext="Interaction flagged" subtextColor="text-rose-600" />
      </div>

      <AlertBanner 
        title="Drug Interaction Alert"
        message="Warfarin + Aspirin flagged for patient Ravi Mehta. Prescription from Dr. Mehta, NMC #DL-2021. Review required before dispensing. Order held automatically."
        variant="rose"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Prescription Queue */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Active Prescription Queue</h3>
          <div className="space-y-6">
            {prescriptionQueue.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                  <span className="text-xl">💊</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                    <span className="text-xs font-black text-slate-900">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400">{item.meds}</p>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${item.statusColor}`}>{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900">Stock Alerts — Low Inventory</h3>
          </div>
          <div className="space-y-8">
            {stockAlerts.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-end">
                  <h4 className="text-sm font-bold text-slate-700">{item.name}</h4>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-900">{item.stock}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{item.unit}</p>
                  </div>
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

export default PharmacyDashboard;
