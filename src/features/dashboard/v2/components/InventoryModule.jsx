import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, ToggleLeft, ToggleRight, Search, Filter, Layers, Box, Loader2 } from 'lucide-react';
import axios from 'axios';
import AddProductModal from './AddProductModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const InventoryModule = ({ providerType }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDoctor = providerType === 'DOCTOR';

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('providerToken');
      if (!token) return;
      
      const res = await axios.get(`${API_URL}/product`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInventory(res.data || []);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = (newProduct) => {
    setInventory(prev => [newProduct, ...prev]);
  };

  return (
    <>
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden h-full flex flex-col">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{isDoctor ? 'Clinical Slots' : 'Product Node Inventory'}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {inventory?.length || 0} active resources
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
          >
            <Plus size={14} />
            {isDoctor ? 'Assign Slot' : 'Stock Node'}
          </button>
        </div>

        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex gap-2">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search catalog..." 
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400">
            <Filter size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {loading ? (
            <div className="h-40 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-blue-500" size={24} />
              <span className="text-[10px] font-black text-slate-400 uppercase">Syncing Registry...</span>
            </div>
          ) : inventory.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center gap-3 opacity-50">
              <Box size={32} className="text-slate-300" />
              <span className="text-[10px] font-black text-slate-400 uppercase">No Items Found</span>
            </div>
          ) : (
            inventory.map((item) => (
              <div key={item._id} className="p-4 bg-white border border-transparent hover:border-slate-100 rounded-2xl flex items-center justify-between hover:shadow-sm transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all overflow-hidden">
                    {item.images?.[0] ? (
                      <img src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}${item.images[0]}`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      isDoctor ? <Layers size={18} /> : <Box size={18} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-blue-600">₹{item.price}</span>
                      {!isDoctor && (
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest ${item.quantity > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                          {item.quantity > 0 ? `${item.quantity} Units` : 'Depleted'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className={`transition-all duration-300 ${item.status === 'approved' ? 'text-blue-500' : 'text-slate-200'}`}>
                    {item.status === 'approved' ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-slate-50/50 text-center border-t border-slate-50">
          <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Launch Catalog Manager</button>
        </div>
      </div>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        providerType={providerType}
        onProductAdded={handleProductAdded}
      />
    </>
  );
};

export default InventoryModule;


export default InventoryModule;
