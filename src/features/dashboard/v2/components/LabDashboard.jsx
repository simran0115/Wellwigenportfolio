import React from 'react';
import { StatCard, AlertBanner, DashboardContainer } from './SharedUI';

const LabDashboard = () => {
  const testQueue = [
    { name: 'Suresh Kumar', tests: 'HbA1c + FBS + Lipid Panel', price: '₹799', status: 'Report ready', statusColor: 'bg-emerald-100 text-emerald-700' },
    { name: 'Meera Jain', tests: 'CBC + Electrolytes - Home', price: '₹450', status: 'Report pending', statusColor: 'bg-amber-100 text-amber-700' },
  ];

  const categories = [
    { name: 'Diabetes panel', percentage: '32%', color: 'bg-amber-500' },
    { name: 'Full body', percentage: '20%', color: 'bg-orange-400' },
    { name: 'Thyroid', percentage: '12%', color: 'bg-yellow-300' },
    { name: 'Others', percentage: '36%', color: 'bg-orange-200' },
  ];

  return (
    <DashboardContainer 
      title="Diagnostic Lab Dashboard" 
      subtitle="PathCare Diagnostics · NABL Accredited · Hazratganj, Lucknow"
      badgeText="NABL Accredited"
      badgeColor="bg-amber-100 text-amber-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Tests Today" value="47" subtext="↑ 12 vs avg" />
        <StatCard label="Home Samples" value="18" subtext="3 pending pickup" subtextColor="text-amber-600" />
        <StatCard label="Reports Pending" value="9" subtext="SLA 4hr" subtextColor="text-rose-600" />
        <StatCard label="This Month ₹" value="68.2k" subtext="↑ 24%" />
        <StatCard label="Critical Alerts" value="2" subtext="Doctor notified" subtextColor="text-rose-600" />
      </div>

      <AlertBanner 
        title="Critical Value Alert — 2 patients"
        message="Suresh Kumar: HbA1c 8.4% (critical high). Meera Jain: Potassium 6.1 mEq/L (critical high). Assigned doctors have been notified automatically."
        variant="rose"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Today's Test Queue */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Today's Test Queue</h3>
          <div className="space-y-6">
            {testQueue.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <span className="text-xl">🧪</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                    <span className="text-xs font-black text-slate-900">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-400">{item.tests}</p>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${item.statusColor}`}>{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tests by Category */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Tests by Category (This Month)</h3>
          <div className="flex items-center justify-center mb-10 relative">
            <div className="w-32 h-32 rounded-full border-[14px] border-amber-500 border-t-orange-400 border-r-yellow-300 border-l-orange-200"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">312</span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${cat.color}`}></div>
                  <span className="text-xs font-bold text-slate-500">{cat.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{cat.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default LabDashboard;
