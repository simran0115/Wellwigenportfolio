import React from 'react';
import { StatCard, DashboardContainer } from './SharedUI';

const TrainerDashboard = () => {
  const sessions = [
    { time: '8:00 AM', name: 'Batch Yoga (5 members)', status: 'Done', desc: 'Society session · Sector 3 Park', statusColor: 'bg-teal-100 text-teal-700' },
    { time: '7:30 AM', name: 'Neha Srivastava', status: 'Done', desc: 'Weight loss · Home visit · Completed workout B', statusColor: 'bg-teal-100 text-teal-700' },
    { time: '9:00 AM', name: 'Rajan Khanna', status: 'In 45 min', desc: 'Strength training · Online video session', statusColor: 'bg-purple-100 text-purple-700' },
  ];

  const clients = [
    { name: 'Neha S.', goal: 'Weight Loss', streak: '14d', progress: '-3.2 kg', goalColor: 'bg-purple-50 text-purple-600', progColor: 'text-emerald-500' },
    { name: 'Rajan K.', goal: 'Strength', streak: '22d', progress: '+8 kg Bench', goalColor: 'bg-blue-50 text-blue-600', progColor: 'text-emerald-500' },
  ];

  return (
    <DashboardContainer 
      title="Fitness Trainer Dashboard" 
      subtitle="Vikram Tiwari · Certified Yoga & Strength Coach · ACE Certified"
      badgeText="ACE Certified"
      badgeColor="bg-purple-100 text-purple-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Sessions Today" value="6" subtext="↑ 1 vs plan" />
        <StatCard label="Active Clients" value="28" subtext="↑ 4 this month" />
        <StatCard label="This Month ₹" value="22.4k" subtext="↑ 9%" />
        <StatCard label="Avg Rating" value="4.9" subtext="Top trainer ⭐️" subtextColor="text-amber-600" />
        <StatCard label="Completion Rate" value="91%" subtext="Above avg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Sessions */}
        <div className="bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Today's Sessions</h3>
          <div className="space-y-8">
            {sessions.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <span className="text-[10px] font-black text-slate-400 uppercase mt-1 w-16">{item.time}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Progress Tracker */}
        <div className="bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Client Progress Tracker</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50">
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Goal</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Streak</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clients.map((client, idx) => (
                <tr key={idx}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-purple-600">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-black text-slate-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${client.goalColor}`}>
                      {client.goal}
                    </span>
                  </td>
                  <td className="py-4 text-xs font-bold text-slate-700">🔥 {client.streak}</td>
                  <td className={`py-4 text-right text-xs font-black ${client.progColor}`}>▲ {client.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default TrainerDashboard;
