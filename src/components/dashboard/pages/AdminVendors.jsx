import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon, CheckIcon, XMarkIcon, BuildingStorefrontIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", storeName: "", storeAddress: "", phone: ""
  });
  const [activeTab, setActiveTab] = useState("pending");

  const API = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:8000/api";

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${API}/vendor/all`);
      setVendors(res.data.vendors || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchVendors();
  }, []);

  const handleApprove = async (id, status) => {
    try {
      await axios.put(`${API}/vendor/approve/${id}`, { status });
      fetchVendors(); // refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Error updating status");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/vendor/admin/add`, form);
      setShowAddModal(false);
      fetchVendors();
      setForm({ name: "", email: "", password: "", storeName: "", storeAddress: "", phone: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding vendor");
    }
  };

  const pendingVendors = vendors.filter(v => v.status === "pending");
  const approvedVendors = vendors.filter(v => v.status === "approved");

  return (
    <div className="flex-1 w-full h-full flex flex-col pt-2 bg-slate-50 min-h-screen px-4 md:px-8">
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Vendor Management</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg">
            Review and approve vendor store applications, or manually onboard new partners.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="group flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-[0_4px_14px_0_rgb(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] transition duration-200"
        >
          <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
          Manually Add Store
        </button>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <BuildingStorefrontIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Active Stores</p>
            <h3 className="text-2xl font-bold text-slate-800">{approvedVendors.length}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pending Approvals</p>
            <h3 className="text-2xl font-bold text-slate-800">{pendingVendors.length}</h3>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-center relative overflow-hidden text-white">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <h3 className="font-semibold text-lg relative z-10">Expand Your Reach</h3>
          <p className="text-sm text-slate-300 mt-1 relative z-10">Invite local businesses to scale the platform.</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab("pending")}
          className={`pb-4 px-4 text-sm font-medium transition-all ${activeTab === "pending" ? "text-teal-600 border-b-2 border-teal-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          Pending Requests
          {pendingVendors.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {pendingVendors.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab("approved")}
          className={`pb-4 px-4 text-sm font-medium transition-all ${activeTab === "approved" ? "text-teal-600 border-b-2 border-teal-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          Active Stores
        </button>
      </div>

      {/* TABLE CONTENT */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Store Identity</th>
                <th className="px-6 py-4">Vendor Details</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === "pending" ? (
                pendingVendors.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-12 text-slate-400">No pending requests at this time.</td></tr>
                ) : (
                  pendingVendors.map((vendor) => (
                    <tr key={vendor._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                            {(vendor.storeName || vendor.name || "V").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-teal-700 transition">{vendor.storeName || "Unknown Store"}</p>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{vendor.storeAddress}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{vendor.name}</td>
                      <td className="px-6 py-4">
                        <p>{vendor.email}</p>
                        <p className="text-xs text-slate-400">{vendor.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          Reviewing
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleApprove(vendor._id, 'approved')} className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors tooltip" title="Approve">
                            <CheckIcon className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleApprove(vendor._id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip" title="Reject">
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                approvedVendors.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-12 text-slate-400">No active stores yet.</td></tr>
                ) : (
                  approvedVendors.map((vendor) => (
                    <tr key={vendor._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold shadow-sm">
                            {(vendor.storeName || vendor.name || "V").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-teal-700 transition">{vendor.storeName || "Unknown Store"}</p>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{vendor.storeAddress}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{vendor.name}</td>
                      <td className="px-6 py-4">
                        <p>{vendor.email}</p>
                        <p className="text-xs text-slate-400">{vendor.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20">
                          <CheckBadgeIcon className="w-4 h-4 text-teal-600" />
                          Live Store
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-sm font-medium text-slate-500 hover:text-teal-600 transition">View Details</button>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] relative transform transition-all">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-2 transition">
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="mb-8">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-4">
                <BuildingStorefrontIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Add New Store</h3>
              <p className="text-sm text-slate-500 mt-1">Pre-approve and create an account for a new vendor.</p>
            </div>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Vendor Name</label>
                  <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-xl outline-none transition text-sm text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email</label>
                  <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="vendor@store.com" type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-xl outline-none transition text-sm text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Initial Password</label>
                <input required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" type="password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-xl outline-none transition text-sm text-slate-800" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Store Name</label>
                  <input required value={form.storeName} onChange={e=>setForm({...form,storeName:e.target.value})} placeholder="Fresh Grocers" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-xl outline-none transition text-sm text-slate-800" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Store Address</label>
                  <input required value={form.storeAddress} onChange={e=>setForm({...form,storeAddress:e.target.value})} placeholder="123 Market St." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-xl outline-none transition text-sm text-slate-800" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 9999999999" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-xl outline-none transition text-sm text-slate-800" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition">Cancel</button>
                <button type="submit" className="px-6 py-3 text-sm font-semibold bg-teal-600 text-white rounded-xl shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition">Create Store Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
