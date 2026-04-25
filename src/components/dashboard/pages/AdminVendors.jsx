import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", storeName: "", storeAddress: "", phone: ""
  });

  const API = "http://localhost:8000/api";

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${API}/vendor/all`);
      setVendors(res.data.vendors || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
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

  return (
    <div className="flex-1 w-full h-full flex flex-col pt-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[24px] font-[700] text-[#0B5B77]">Vendors</h2>
          <p className="text-[14px] text-[#5E7285] mt-1">Manage platform vendors and approvals</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#005D86] text-white text-[14px] font-[500] rounded-full hover:bg-[#004869] shadow-sm transition-all"
        >
          <PlusIcon className="w-5 h-5" /> Add Vendor
        </button>
      </div>

      <div className="bg-white rounded-[24px] border border-[#E8EEF0] shadow-sm flex-1 p-6 overflow-y-auto">
        <table className="w-full text-left text-[14px] text-[#5E7285]">
          <thead className="border-b border-[#E8EEF0]">
            <tr>
              <th className="pb-4 font-[600] text-[#0B5B77]">Store Name</th>
              <th className="pb-4 font-[600] text-[#0B5B77]">Vendor Name</th>
              <th className="pb-4 font-[600] text-[#0B5B77]">Contact</th>
              <th className="pb-4 font-[600] text-[#0B5B77]">Status</th>
              <th className="pb-4 font-[600] text-[#0B5B77] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id} className="border-b border-[#E8EEF0] last:border-0 hover:bg-[#F8FAFB] transition-colors">
                <td className="py-4 font-[500] text-[#0B5B77]">{vendor.storeName}</td>
                <td className="py-4">{vendor.name}</td>
                <td className="py-4">{vendor.email}<br/><span className="text-xs">{vendor.phone}</span></td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    vendor.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    vendor.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {vendor.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 text-right space-x-2">
                  {vendor.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(vendor._id, 'approved')} className="text-green-600 hover:text-green-800">
                        <CheckCircleIcon className="w-6 h-6 inline" />
                      </button>
                      <button onClick={() => handleApprove(vendor._id, 'rejected')} className="text-red-600 hover:text-red-800">
                        <XCircleIcon className="w-6 h-6 inline" />
                      </button>
                    </>
                  )}
                  {vendor.status === 'rejected' && (
                    <button onClick={() => handleApprove(vendor._id, 'approved')} className="text-green-600 hover:bg-green-50 px-2 py-1 flex-1 rounded border border-green-200">
                      Re-Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {vendors.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8">No vendors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-[24px] w-[90%] max-w-md shadow-xl">
            <h3 className="text-xl font-bold text-[#0B5B77] mb-6">Add Approved Vendor</h3>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Vendor Name" className="p-3 border rounded-xl" />
              <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email Address" type="email" className="p-3 border rounded-xl" />
              <input required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" type="password" className="p-3 border rounded-xl" />
              <input required value={form.storeName} onChange={e=>setForm({...form,storeName:e.target.value})} placeholder="Store Name" className="p-3 border rounded-xl" />
              <input required value={form.storeAddress} onChange={e=>setForm({...form,storeAddress:e.target.value})} placeholder="Store Address" className="p-3 border rounded-xl" />
              <input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone Number" className="p-3 border rounded-xl" />
              <div className="flex gap-2 justify-end mt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-800">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#005D86] text-white rounded-full hover:bg-[#004869]">Add Vendor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
