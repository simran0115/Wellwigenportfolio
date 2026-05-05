import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, Edit2, Box, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import { DashboardContainer } from './SharedUI';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const MyProducts = ({ providerInfo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('providerToken') || localStorage.getItem('vendorToken');
      if (!token) {
        setError('Authorization token not found. Please log in.');
        setLoading(false);
        return;
      }

      console.log("[DEBUG] Fetching products from:", `${API_URL}/api/product`);
      const res = await axios.get(`${API_URL}/api/product`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data || []);
      setError('');
    } catch (err) {
      console.error("[DEBUG] Fetch Products Error:", err.response?.data || err.message);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('providerToken') || localStorage.getItem('vendorToken');
      await axios.delete(`${API_URL}/api/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };


  const handleProductAdded = (newProduct) => {
    // Immediately fetch products to ensure perfect sync with DB
    fetchProducts();
  };

  return (
    <DashboardContainer 
      title="My Products" 
      subtitle="Manage your catalog, inventory, and resource nodes."
      badgeText="Active Catalog"
      badgeColor="bg-emerald-100 text-emerald-700"
    >
      <div className="bg-white rounded-[2.5rem] border border-[#F1F1E6] shadow-sm overflow-hidden">
        {/* Table Header / Actions */}
        <div className="p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6 bg-[#F9F8F3]/30">
          <div className="flex-1 min-w-[300px] relative">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search catalog by name, category or ID..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
          >
            <Plus size={18} />
            Add New Product
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="m-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600">
            <AlertCircle size={18} />
            <p className="text-xs font-bold">{error}</p>
          </div>
        )}

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Info</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <Loader2 className="animate-spin text-blue-500 mx-auto mb-4" size={32} />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing with Registry...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <Box size={48} className="text-slate-200 mx-auto mb-4" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No products deployed yet</p>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4 text-xs font-black text-blue-600 hover:underline"
                    >
                      Deploy your first node
                    </button>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                          {product.images?.[0] ? (
                            <img 
                              src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}${product.images[0]}`} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Box size={20} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none mb-1">{product.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {product._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest">
                        {product.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900">₹{product.price}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Per Unit</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${product.quantity > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        <p className="text-sm font-black text-slate-900">{product.quantity}</p>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Available Stock</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                        product.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                        product.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 text-slate-400 hover:text-blue-600 transition-all">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 text-slate-400 hover:text-rose-600 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        providerType={providerInfo.type}
        onProductAdded={handleProductAdded}
      />
    </DashboardContainer>
  );
};

export default MyProducts;
