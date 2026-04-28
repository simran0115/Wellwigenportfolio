import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, FileText, Building, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useProviderStore } from '../store/useProviderStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VendorRegister = () => {
  const [step, setStep] = useState(1);
  const { registerProvider, isLoading: loading } = useProviderStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'FRUIT_VEG_SHOP',
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: { street: '', city: '', state: '', pincode: '' },
    licenseNumber: '',
    bankDetails: { accountNo: '', ifsc: '', accountName: '' }
  });

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateNested = (parent, key, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value }
    }));
  };

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    toast.loading("Submitting application...", { id: "reg" });
    try {
      await registerProvider(formData);
      toast.success("Application Submitted successfully!", { id: "reg" });
      navigate('/vendor/dashboard');
    } catch (err) {
      toast.error(err.message || "Registration failed", { id: "reg" });
    }
  };

  const steps = [
    { num: 1, title: 'Business Info', icon: <Store className="w-5 h-5" /> },
    { num: 2, title: 'Documents', icon: <FileText className="w-5 h-5" /> },
    { num: 3, title: 'Bank Details', icon: <Building className="w-5 h-5" /> },
    { num: 4, title: 'Review', icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">

        {/* Progress Header */}
        <div className="flex justify-between items-center mb-10 relative z-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${step >= s.num ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-gray-800 text-gray-400'
                }`}>
                {s.icon}
              </div>
              <span className={`text-xs font-semibold ${step >= s.num ? 'text-green-400' : 'text-gray-500'}`}>
                {s.title}
              </span>
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className={`absolute top-6 left-12 w-full h-[2px] -z-10 ${step > s.num ? 'bg-green-500' : 'bg-gray-800'
                  }`} style={{ width: 'calc(100% + 40px)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Tell us about your business</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm text-gray-400 mb-1 block">Provider Type</label>
                    <select value={formData.type} onChange={e => updateForm('type', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none">
                      <option value="FRUIT_VEG_SHOP">Fresh Produce Shop</option>
                      <option value="DOCTOR">Doctor / Specialist</option>
                      <option value="LAB">Diagnostic Lab</option>
                      <option value="TRAINER">Fitness Trainer</option>
                      <option value="PHARMACY">Pharmacy</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Business Name</label>
                    <input type="text" value={formData.businessName} onChange={e => updateForm('businessName', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none" placeholder="Green Grocers" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Owner Name</label>
                    <input type="text" value={formData.ownerName} onChange={e => updateForm('ownerName', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Phone Number</label>
                    <input type="text" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none" placeholder="+91" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">City</label>
                    <input type="text" value={formData.address.city} onChange={e => updateNested('address', 'city', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none" placeholder="Lucknow" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Verification Documents</h2>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">License Number (FSSAI / NMC / NABL)</label>
                  <input type="text" value={formData.licenseNumber} onChange={e => updateForm('licenseNumber', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none" placeholder="Enter Registration Number" />
                </div>

                <div className="mt-6 border-2 border-dashed border-gray-700 rounded-xl p-8 text-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer">
                  <FileText className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-300 font-medium">Click to upload document PDF/Image</p>
                  <p className="text-gray-500 text-sm mt-1">Max file size 5MB</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Payout Information</h2>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Account Holder Name</label>
                  <input type="text" value={formData.bankDetails.accountName} onChange={e => updateNested('bankDetails', 'accountName', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none" placeholder="As per bank records" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Account Number</label>
                  <input type="password" value={formData.bankDetails.accountNo} onChange={e => updateNested('bankDetails', 'accountNo', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none" placeholder="••••••••••••" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">IFSC Code</label>
                  <input type="text" value={formData.bankDetails.ifsc} onChange={e => updateNested('bankDetails', 'ifsc', e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-green-500 outline-none uppercase" placeholder="HDFC0001234" />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Review your Application</h2>
                <div className="bg-black/40 rounded-xl p-6 border border-gray-800 space-y-4">
                  <div className="flex justify-between border-b border-gray-800 pb-3">
                    <span className="text-gray-400">Business Name</span>
                    <span className="text-white font-medium">{formData.businessName || '-'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-3">
                    <span className="text-gray-400">Category</span>
                    <span className="text-white font-medium">{formData.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-3">
                    <span className="text-gray-400">Phone</span>
                    <span className="text-white font-medium">{formData.phone || '-'}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-400">License No.</span>
                    <span className="text-white font-medium">{formData.licenseNumber || '-'}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">By submitting, you agree to our Vendor Terms & Conditions.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 border-t border-gray-800 pt-6">
          <button
            onClick={handlePrev}
            disabled={step === 1 || loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-green-500 text-black hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Application'} <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default VendorRegister;
