import React, { useState } from "react";
import axios from "axios";
import { PlusIcon, PhotoIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:8000/api";

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price) {
      return alert("Please fill all required fields");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity || 1);
      if (image) formData.append("image", image);

      await axios.post(`${API}/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully!");
      navigate("/vendor/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error adding product: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] p-6 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate("/vendor/dashboard")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-8"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Add New Product</h1>
            <p className="text-slate-500 mt-2">Fill in the details below to add a new product to your catalogue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Area */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-2xl hover:bg-slate-50 transition group cursor-pointer relative overflow-hidden">
                {preview ? (
                  <div className="relative w-full h-48">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-medium text-sm">Click to change image</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-slate-300 group-hover:text-teal-500 transition" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label className="relative cursor-pointer rounded-md bg-transparent font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:text-teal-500">
                        <span>Upload a file</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFile} accept="image/*" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name <span className="text-rose-500">*</span></label>
                <input 
                  required
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="e.g. Fresh Organic Apples"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Base Price (₹) <span className="text-rose-500">*</span></label>
                <input 
                  required
                  name="price"
                  type="number"
                  min="0"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Available Stock</label>
                <input 
                  name="quantity"
                  type="number"
                  min="0"
                  value={product.quantity}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition outline-none text-slate-800"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-4 mt-8">
              <button 
                type="button" 
                onClick={() => navigate("/vendor/dashboard")}
                className="px-6 py-3 text-sm font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-3 flex items-center justify-center gap-2 text-sm font-semibold bg-teal-600 text-white rounded-xl shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : <><PlusIcon className="w-5 h-5" /> Publish Product</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}