import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Mail, Lock, ShieldCheck, ArrowRight, Activity, Heart, Stethoscope } from 'lucide-react';
import toast from 'react-hot-toast';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/vendor/login`, form);
      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem("vendorInfo", JSON.stringify(res.data.vendor));
      localStorage.setItem("vendorStatus", res.data.vendor.status);

      toast.success("Welcome back to Wellwigen Portal");
      navigate("/provider/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex items-center justify-center p-4 md:p-8 font-sans selection:bg-blue-100 overflow-hidden">

      {/* Main Container */}
      <div className="w-full max-w-5xl h-full max-h-[700px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2rem] border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Left Side: Illustration & Value Prop */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#fcfdfe] border-r border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xl shadow-blue-100">
              <Activity size={16} strokeWidth={3} />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">Wellwigen <span className="text-blue-600">Portal</span></span>
          </div>

          <div className="space-y-6">
            <div className="relative">
              {/* Minimalist Clinical Illustration */}
              <div className="w-full aspect-square max-w-[240px] bg-blue-50 rounded-full flex items-center justify-center relative mx-auto">
                <div className="absolute inset-0 border-2 border-dashed border-blue-100 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="w-36 h-36 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-blue-600 z-10">
                  <Stethoscope size={60} strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 right-6 w-12 h-12 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center text-white z-20"
                >
                  <Heart size={18} fill="currentColor" />
                </motion.div>
              </div>
            </div>

            <div className="space-y-3 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                Secure access for health professionals.
              </h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
                Manage your clinical data, patient records, and inventory in one secure enterprise environment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-500" /> HIPAA Compliant</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-500" /> SSL Encrypted</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full space-y-8">

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sign in</h1>
              <p className="text-xs text-gray-500 font-medium">Enter your credentials to access your workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Business Email</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <Mail size={16} strokeWidth={2} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 placeholder-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                      placeholder="e.g. dr.smith@wellwigen.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Password</label>
                    <a href="#" className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock size={16} strokeWidth={2} />
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 placeholder-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gray-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-gray-200 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : (
                  <>
                    Sign in to Portal <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-[11px] text-gray-500 font-medium text-center">
                New to the platform?{' '}
                <a href="/provider/onboarding" className="text-blue-600 font-bold hover:underline">Apply for an account</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
