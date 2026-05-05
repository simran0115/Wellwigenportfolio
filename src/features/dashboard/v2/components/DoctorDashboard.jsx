import React from 'react';
import { StatCard, DashboardContainer } from './SharedUI';

const DoctorDashboard = () => {
  const schedule = [
    { time: '9:00 AM', name: 'Suresh Kumar', status: 'Done', desc: 'Diabetes follow-up. Reviewed sugar report' },
    { time: '9:30 AM', name: 'Meera Jain', status: 'Done', desc: 'Hypertension - BP 142/90. Adjusted medication' },
  ];

  const recentPatients = [
    { name: 'Suresh K.', condition: 'Diabetes', visit: 'Today', status: 'Stable', condColor: 'bg-amber-100 text-amber-700', statusColor: 'bg-emerald-100 text-emerald-700' },
    { name: 'Meera J.', condition: 'Hypertension', visit: 'Today', status: 'Monitor', condColor: 'bg-purple-100 text-purple-700', statusColor: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <DashboardContainer 
      title="Doctor Portal" 
      subtitle="Dr. Ananya Mishra · General Physician + Diabetologist · NMC# DL-2019-04821"
      badgeText="NMC Verified"
      badgeColor="bg-blue-100 text-blue-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Today's Consults" value="12" subtext="↑ 3 vs avg" />
        <StatCard label="Upcoming" value="5" subtext="Next in 24 min" subtextColor="text-blue-500" />
        <StatCard label="This Month ₹" value="41.6k" subtext="↑ 18%" />
        <StatCard label="Avg Rating" value="4.8" subtext="Top 10% doctors" />
        <StatCard label="Follow-ups Due" value="8" subtext="Action needed" subtextColor="text-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Today's Schedule</h3>
          <div className="space-y-8">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <span className="text-[10px] font-black text-slate-400 uppercase mt-1 w-16">{item.time}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-700 text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-3xl p-8 border border-[#F1F1E6] shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-8">Recent Patients</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50">
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Condition</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Visit</th>
                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentPatients.map((patient, idx) => (
                <tr key={idx}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-blue-600">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-black text-slate-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${patient.condColor}`}>
                      {patient.condition}
                    </span>
                  </td>
                  <td className="py-4 text-xs font-bold text-slate-400">{patient.visit}</td>
                  <td className="py-4 text-right">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${patient.statusColor}`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default DoctorDashboard;
