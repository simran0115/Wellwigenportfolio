import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ShieldCheck, ArrowRight, Activity, Heart, Stethoscope, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

import { providerService } from "../services/providerService";
import { requestNotificationPermission } from "../../../services/notificationService";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const navigate = useNavigate();

  // Redirect provider if they are already logged in
  useEffect(() => {
    const providerToken = localStorage.getItem("providerToken") || localStorage.getItem("vendorToken");
    const providerInfoRaw = localStorage.getItem("providerInfo") || localStorage.getItem("vendorInfo");
    if (providerToken && providerInfoRaw) {
      try {
        const info = JSON.parse(providerInfoRaw);
        const type = (info.type || info.role || info.category || "").toLowerCase();
        if (type) {
          navigate(`/${type}/dashboard`, { replace: true });
        } else {
          navigate("/provider/dashboard", { replace: true });
        }
      } catch (e) {
        console.error("Error redirecting provider from provider login page:", e);
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await providerService.login(form);
      localStorage.setItem("providerToken", res.token);
      localStorage.setItem("providerInfo", JSON.stringify(res.provider));
      localStorage.setItem("providerStatus", res.provider.verificationStatus);

      // We can also set vendor tokens for legacy compatibility temporarily
      localStorage.setItem("vendorToken", res.token);
      localStorage.setItem("vendorInfo", JSON.stringify(res.provider));
      localStorage.setItem("vendorStatus", res.provider.verificationStatus);

      toast.success("Welcome back to Wellwigen Portal");
      
      try {
        await requestNotificationPermission(res.token, res.provider.type || 'provider');
      } catch (err) {
        console.warn("Failed to request notification permission:", err);
      }

      const type = res.provider.type.toLowerCase();
      if (["doctor", "vendor", "lab", "nutrition", "pharmacy", "trainer"].includes(type)) {
        navigate(`/${type}/dashboard`);
      } else {
        navigate("/provider/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!form.email) return toast.error("Please enter your business email first.");
    setLoading(true);
    
    // Simulating API call for password reset
    setTimeout(() => {
      toast.success("If your email is registered, a reset link has been sent.");
      setIsForgotPassword(false);
      setLoading(false);
      setForm({ ...form, password: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden">
        
        {/* Left Side: Premium Brand Visual */}
        <div className="w-full lg:w-[45%] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white">
          
          {/* Abstract Dark Mode Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
              <Activity size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight">Wellwigen <span className="text-teal-400">Portal</span></span>
          </div>

          <div className="relative z-10 space-y-10 my-16">
            <div className="relative w-full max-w-[280px] mx-auto lg:mx-0">
              {/* Glassmorphism Icon Card */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center text-teal-300 shadow-2xl mx-auto lg:mx-0"
              >
                <Stethoscope size={64} strokeWidth={1.5} />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl shadow-xl flex items-center justify-center text-white"
              >
                <ShieldCheck size={28} />
              </motion.div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Secure access to the <br /> <span className="text-teal-400">health ecosystem.</span>
              </h2>
              <p className="text-base text-gray-400 font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
                Manage your clinical data, patient records, and practice inventory in one enterprise-grade environment.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center lg:justify-start gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-teal-400" /> HIPAA Compliant</span>
            <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-teal-400" /> SSL Encrypted</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-[55%] p-10 lg:p-20 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full space-y-10">

            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {isForgotPassword ? "Reset Password" : "Welcome Back"}
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {isForgotPassword 
                  ? "Enter your email to receive a secure reset link." 
                  : "Sign in to access your professional workspace."}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isForgotPassword ? (
                <motion.form 
                  key="reset"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleResetPassword} 
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest ml-1">Business Email</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                        <Mail size={18} strokeWidth={2} />
                      </div>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all outline-none"
                        placeholder="doctor@clinic.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-[12px] font-extrabold uppercase tracking-widest rounded-2xl transition-all disabled:opacity-50"
                    >
                      {loading ? 'Sending Link...' : 'Send Reset Link'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="w-full py-4 px-4 bg-transparent hover:bg-gray-50 text-gray-600 text-[12px] font-extrabold uppercase tracking-widest rounded-2xl transition-all"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest ml-1">Business Email</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                          <Mail size={18} strokeWidth={2} />
                        </div>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="block w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all outline-none"
                          placeholder="doctor@clinic.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">Password</label>
                        <button type="button" onClick={() => setIsForgotPassword(true)} className="text-[11px] font-extrabold text-teal-600 hover:text-teal-700 uppercase tracking-widest">Forgot?</button>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                          <Lock size={18} strokeWidth={2} />
                        </div>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={form.password}
                          onChange={handleChange}
                          className="block w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all outline-none"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gray-900 hover:bg-black text-white text-[12px] font-extrabold uppercase tracking-widest rounded-2xl transition-all disabled:opacity-50 mt-4"
                  >
                    {loading ? 'Authenticating...' : (
                      <>
                        Sign in to Portal <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

             <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col items-center gap-3">
               <p className="text-[12px] text-gray-500 font-medium">
                 New to the platform?{' '}
                 <a href="/provider/onboarding" className="text-teal-600 font-bold hover:underline">Apply for an account</a>
               </p>
               <p className="text-[12px] text-gray-500 font-medium">
                 Looking for user login?{' '}
                 <span onClick={() => navigate("/login")} className="text-blue-600 font-bold hover:underline cursor-pointer">User Portal</span>
               </p>
             </div>
          </div>
        </div>
    </div>
  );
}

export default Login;
