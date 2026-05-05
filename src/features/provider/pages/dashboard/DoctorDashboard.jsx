import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Stethoscope,
  LogOut,
  Calendar,
  User as UserIcon,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import AccountProfile from '../../components/AccountProfile';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();
  
  const vendorInfo = JSON.parse(localStorage.getItem("providerInfo") || localStorage.getItem("vendorInfo") || "{}");
  const providerName = vendorInfo.ownerName || vendorInfo.name || 'Doctor';

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("vendorStatus");
    localStorage.removeItem("providerToken");
    localStorage.removeItem("providerInfo");
    localStorage.removeItem("providerStatus");
    navigate("/vendor/login");
  };

  const appointments = [
    { id: '1', customer: 'Rajesh Kumar', service: 'General Consultation', time: '10:00 AM', status: 'Confirmed' },
    { id: '2', customer: 'Simran Kumari', service: 'Follow-up', time: '11:30 AM', status: 'Pending' },
    { id: '3', customer: 'Amit Singh', service: 'Prescription Renewal', time: '02:00 PM', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">W</div>
          <span className="font-bold text-gray-900 tracking-tight">Wellwigen <span className="text-blue-600">MD</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <NavItem icon={<Calendar size={18} />} label="Appointments" active={activeTab === 'Appointments'} onClick={() => setActiveTab('Appointments')} />
          <NavItem icon={<Users size={18} />} label="Patients" active={activeTab === 'Patients'} onClick={() => setActiveTab('Patients')} />
          <NavItem icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <button 
            onClick={() => setActiveTab('Account')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              activeTab === 'Account' ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0">
              <img 
                src={vendorInfo.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-200 object-cover"
              />
            </div>
            
            <div className="flex flex-col items-start overflow-hidden text-left">
              <span className={`text-sm font-semibold truncate w-full ${
                activeTab === 'Account' ? 'text-gray-900' : 'text-gray-700'
              }`}>
                My Account
              </span>
              <span className="text-xs text-gray-500">Settings</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {activeTab === 'Overview' && (
          <>
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Good Morning, {providerName.split(' ')[0]}</h1>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Medical Center &bull; Today is {new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all shadow-sm">
                  <Bell size={18} />
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                  <Plus size={16} /> New Appointment
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatCard label="Patients Today" value="12" trend="+2" icon={<Users className="text-blue-500" size={20} />} />
              <StatCard label="Pending Reports" value="5" trend="-1" icon={<Clock className="text-amber-500" size={20} />} />
              <StatCard label="Monthly Revenue" value="₹84,000" trend="+8%" icon={<CheckCircle className="text-emerald-500" size={20} />} />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Today's Appointments</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">View All</button>
            </div>
            <div className="p-2">
              <table className="w-full">
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                            <UserIcon size={18} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-gray-900">{apt.customer}</span>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{apt.service}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-xs font-bold text-gray-600">{apt.time}</td>
                      <td className="py-5 px-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                          apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                          apt.status === 'Confirmed' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-right">
                        <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-blue-600"><MoreVertical size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h3 className="font-black text-gray-900 text-[10px] uppercase tracking-widest mb-6">Patient Feedback</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/30 border border-blue-100">
                <p className="text-xs text-gray-700 italic">"Excellent consultation, very thorough and explained everything clearly."</p>
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-3">- Rajesh Kumar</p>
              </div>
            </div>
          </div>
          {activeTab === 'Account' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AccountProfile />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
        : 'text-gray-400 hover:bg-gray-50 hover:text-black'
    }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ label, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">{icon}</div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
        trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {trend}
      </span>
    </div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</p>
    <h4 className="text-3xl font-black text-gray-900 mt-2 tracking-tight">{value}</h4>
  </div>
);

export default DoctorDashboard;
