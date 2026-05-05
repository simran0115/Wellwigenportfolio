import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  PlusIcon, 
  PhotoIcon, 
  ArrowLeftIcon,
  SparklesIcon,
  BeakerIcon,
  CheckBadgeIcon,
  CurrencyRupeeIcon,
  CubeIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    benefits: "",
    healthGoal: "Immunity Boost"
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/category`);
        setCategories(res.data);
        if (res.data.length > 0) {
          setProduct(prev => ({ ...prev, category: res.data[0]._id }));
        }
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [API]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("vendorToken") || localStorage.getItem("providerToken");

    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    if (image) formData.append("image", image);

    try {
      // 1. Attempt API submission
      await axios.post(`${API}/product/add`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Product published to backend!");
    } catch (err) {
      console.error("API failed, using local persistence fallback:", err);
      // 2. Mock Persistence Fallback for Demo
      const newProduct = {
        id: `local-${Date.now()}`,
        name: product.name,
        category: product.category, // You might want to map this to name if needed
        price: Number(product.price),
        stock: Number(product.quantity),
        healthGoal: product.healthGoal,
        benefits: product.benefits
      };

      // Add to local products list for dashboard to consume
      const existingProducts = JSON.parse(localStorage.getItem("vendorProducts") || "[]");
      localStorage.setItem("vendorProducts", JSON.stringify([...existingProducts, newProduct]));
      
      toast.success("Product added locally (Demo Mode)");
    } finally {
      setLoading(false);
      navigate("/vendor/dashboard", { state: { activeTab: 'Customization' } });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-4 md:p-10 font-sans selection:bg-teal-100 selection:text-teal-900">
      <div className="max-w-5xl mx-auto">
        {/* BACK BUTTON & HEADER */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-bold text-sm"
          >
            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeftIcon className="w-4 h-4" />
            </div>
            Back to Catalog
          </button>
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400">
            <CheckBadgeIcon className="w-3 h-3 text-emerald-500" />
            Verified Vendor Portal
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT FORM SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/30 rounded-full -mr-32 -mt-32 blur-3xl -z-10"></div>
            
            <header className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Create <br/><span className="text-teal-600">Health Product</span></h1>
              <p className="text-slate-400 mt-2 font-medium">List your premium item with detailed health benefits.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <SparklesIcon className="w-3 h-3" /> Product Name
                  </label>
                  <input 
                    name="name" 
                    required 
                    placeholder="e.g. Organic Pomegranate" 
                    value={product.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <TagIcon className="w-3 h-3" /> Category
                  </label>
                  <select 
                    name="category" 
                    required 
                    value={product.category}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-medium text-slate-800 appearance-none"
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price/Qty Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <CurrencyRupeeIcon className="w-3 h-3" /> Price per Unit (₹)
                  </label>
                  <input 
                    name="price" 
                    type="number" 
                    required 
                    placeholder="0.00" 
                    value={product.price}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <CubeIcon className="w-3 h-3" /> Initial Stock
                  </label>
                  <input 
                    name="quantity" 
                    type="number" 
                    required 
                    placeholder="0" 
                    value={product.quantity}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Health Group */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  <BeakerIcon className="w-3 h-3" /> Primary Health Goal
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Immunity Boost", "Weight Loss", "Muscle Gain", "Diabetes Control"].map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setProduct({...product, healthGoal: goal})}
                      className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                        product.healthGoal === goal 
                          ? "bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-200" 
                          : "bg-white text-slate-500 border-slate-200 hover:border-teal-300"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Health Benefits & Nutrition
                </label>
                <textarea 
                  name="benefits" 
                  rows="4" 
                  required 
                  placeholder="Describe how this helps the customer (e.g., High in antioxidants, good for digestion)..." 
                  value={product.benefits}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-medium text-slate-800 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg tracking-tight hover:bg-teal-600 hover:shadow-2xl hover:shadow-teal-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Publish to Platform <PlusIcon className="w-6 h-6" /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* RIGHT PREVIEW SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-10">
              <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
                
                <h4 className="text-xs font-black text-teal-400 uppercase tracking-[0.2em] mb-8">Live Preview</h4>
                
                <div className="space-y-8">
                  <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden group cursor-pointer relative">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6">
                        <PhotoIcon className="w-12 h-12 mx-auto mb-4 text-slate-600 group-hover:text-teal-400 transition-colors" />
                        <p className="text-sm font-bold text-slate-400">Upload Product Image</p>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-black">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest">
                        {product.healthGoal}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">{product.name || "Product Name"}</h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                      "{product.benefits || "Health benefits will appear here..."}"
                    </p>
                    
                    <div className="flex items-end justify-between pt-6 border-t border-white/10">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Price per unit</p>
                        <p className="text-3xl font-black tracking-tighter">₹{product.price || "0"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Available Stock</p>
                        <p className="text-xl font-bold">{product.quantity || "0"} <span className="text-xs text-slate-600 font-medium">Units</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tip Card */}
              <div className="mt-6 bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                <div className="p-3 bg-amber-50 rounded-2xl">
                  <SparklesIcon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900 mb-1 tracking-tight">Human-Made Hint</h5>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Items with clear, specific benefits (like "Good for heart health") sell <span className="text-teal-600 font-bold">40% faster</span> than generic ones.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}