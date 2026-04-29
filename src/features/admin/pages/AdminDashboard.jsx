import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Store, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight,
  UserPlus,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full py-10 px-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Overview</h1>
          <p className="text-gray-500 mt-1">Platform performance and administrative control center.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Patients" 
            value="12,840" 
            trend="+12%" 
            icon={<Users className="text-blue-600" size={20} />} 
          />
          <StatCard 
            title="Active Providers" 
            value="452" 
            trend="+5%" 
            icon={<Store className="text-emerald-600" size={20} />} 
          />
          <StatCard 
            title="Pending Verifications" 
            value="3" 
            trend="Action Required" 
            icon={<Clock className="text-amber-600" size={20} />}
            isAlert
            link="/admin/verification"
          />
          <StatCard 
            title="System Uptime" 
            value="99.9%" 
            trend="Stable" 
            icon={<Activity className="text-purple-600" size={20} />} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Registrations</h3>
              <button className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline">View All</button>
            </div>
            
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
              <ActivityRow name="Dr. Julianne Smith" type="Doctor" time="2 minutes ago" status="Verified" />
              <ActivityRow name="Apollo Diagnostics" type="Lab" time="1 hour ago" status="Pending" isPending />
              <ActivityRow name="Wellness Pharmacy" type="Pharmacy" time="3 hours ago" status="Verified" />
              <ActivityRow name="Rajesh Kumar" type="Patient" time="5 hours ago" status="Verified" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Administrative Tasks</h3>
            <div className="space-y-3">
              <QuickAction 
                title="Verify Providers" 
                desc="3 applications awaiting review" 
                icon={<ShieldCheck size={18} />} 
                link="/admin/verification"
                count={3}
              />
              <QuickAction 
                title="Manage Vendors" 
                desc="Review inventory & products" 
                icon={<Store size={18} />} 
                link="/admin/vendors"
              />
              <QuickAction 
                title="Platform Settings" 
                desc="Configure system parameters" 
                icon={<Activity size={18} />} 
                link="/admin/settings"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Helper Components --- */

const StatCard = ({ title, value, trend, icon, isAlert, link }) => (
  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-gray-50 rounded-xl">{icon}</div>
      {link && (
        <Link to={link}>
          <ArrowUpRight size={16} className="text-gray-300 hover:text-blue-600 cursor-pointer transition-colors" />
        </Link>
      )}
    </div>
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <h4 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h4>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
        isAlert ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
      }`}>
        {trend}
      </span>
    </div>
  </div>
);

const ActivityRow = ({ name, type, time, status, isPending }) => (
  <div className="p-4 flex items-center justify-between border-b border-white last:border-0 hover:bg-white/50 transition-all">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        <UserPlus size={14} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 tracking-tight">{name}</p>
        <p className="text-[11px] text-gray-500 font-medium">{type} • {time}</p>
      </div>
    </div>
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
      isPending ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
    }`}>
      {status}
    </span>
  </div>
);

const QuickAction = ({ title, desc, icon, link, count }) => (
  <Link 
    to={link}
    className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-sm transition-all group"
  >
    <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-bold text-gray-900 truncate">{title}</h4>
        {count && <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{count}</span>}
      </div>
      <p className="text-[11px] text-gray-500 truncate">{desc}</p>
    </div>
  </Link>
);

export default AdminDashboard;
