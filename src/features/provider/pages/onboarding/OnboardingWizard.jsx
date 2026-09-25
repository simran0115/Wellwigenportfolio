import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  Store,
  ArrowLeft,
  Apple,
  Info,
  Scale,
  FileText,
  Building2,
  User,
  Briefcase,
  Dumbbell,
  Smartphone,
  Mail,
  Lock,
  Clock,
  MapPin,
  Globe
} from 'lucide-react';
import { PROVIDER_TYPES, PROVIDER_CONFIG } from '../../constants/providerTypes';
import { useProviderStore } from '../../store/useProviderStore';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';


const ROLE_IMAGES = {
  DOCTOR: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
  TRAINER: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
  PHARMACY: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=800&auto=format&fit=crop',
  LAB: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=800&auto=format&fit=crop',
  NUTRITION: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
  VENDOR: 'https://images.unsplash.com/photo-1511317559916-56d5ddb62563?q=80&w=800&auto=format&fit=crop'
};

const OnboardingWizard = () => {
  const { saveProgress, registerProvider, isLoading, provider } = useProviderStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStep = parseInt(searchParams.get('step')) || 1;
  const initialRole = searchParams.get('role') || null;

  const [step, setStep] = useState(initialStep);
  const [selectedType, setSelectedType] = useState(initialRole);

  // Keep URL perfectly in sync with the wizard state
  useEffect(() => {
    const params = new URLSearchParams();
    if (step > 1) params.set('step', step);
    if (selectedType) params.set('role', selectedType);
    
    // Only update if it actually changed to avoid unnecessary re-renders
    if (searchParams.get('step') !== params.get('step') || searchParams.get('role') !== params.get('role')) {
      setSearchParams(params, { replace: true });
    }
  }, [step, selectedType, setSearchParams, searchParams]);

  // Verification State
  const [verification, setVerification] = useState({
    phoneOtpSent: false,
    emailOtpSent: false,
    phoneVerified: false,
    emailVerified: false,
    phoneInputOtp: '',
    emailInputOtp: '',
    dummyPhoneOtp: '1234',
    dummyEmailOtp: '5678'
  });

  const [formData, setFormData] = useState({
    type: '',
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    companyType: 'Individual',
    experience: '1-3 Years',
    licenseNumber: '',
    address: { street: '', city: '', state: '', pincode: '' },
    verificationConsent: false,
    // Role specific
    specialization: '',
    consultationFee: '',
    hospitalName: '',
    labCategory: 'Pathology',
    homeCollection: 'Yes',
    shopCategory: 'General Wellness',
    deliveryRadius: '5km',
    is24x7: 'No',
    testList: '',
    pharmacistName: '',
    operatingHoursText: '',
    foodCategory: '',
    sourcing: '',
    deliveryType: '',
    dietaryFocus: '',
    onboardingStep: 1
  });

  // Load existing progress
  useEffect(() => {
    if (provider) {
      setFormData(prev => ({ ...prev, ...provider }));
      if (provider.onboardingStep) setStep(provider.onboardingStep);
      if (provider.type) setSelectedType(provider.type);
      
      if (provider.phone) setVerification(v => ({ ...v, phoneVerified: true }));
      if (provider.email) setVerification(v => ({ ...v, emailVerified: true }));
    }
  }, [provider]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAddress = (field, value) => {
    setFormData(prev => ({ ...prev, address: { ...prev.address, [field]: value } }));
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    updateField('type', type);
    
    const next = step + 1;
    setStep(next);
    saveProgress({ ...formData, type, onboardingStep: next });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    const next = step + 1;
    setStep(next);
    saveProgress({ ...formData, onboardingStep: next });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    const prev = Math.max(1, step - 1);
    setStep(prev);
    saveProgress({ ...formData, onboardingStep: prev });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // OTP Handlers
  const sendPhoneOtp = () => {
    if (!formData.phone) return toast.error("Enter phone number first");
    setVerification(v => ({ ...v, phoneOtpSent: true }));
    toast.success("OTP sent to your phone (Demo: 1234)");
  };

  const sendEmailOtp = () => {
    if (!formData.email) return toast.error("Enter email first");
    setVerification(v => ({ ...v, emailOtpSent: true }));
    toast.success("OTP sent to your email (Demo: 5678)");
  };

  const verifyPhone = () => {
    if (verification.phoneInputOtp === verification.dummyPhoneOtp) {
      setVerification(v => ({ ...v, phoneVerified: true, phoneOtpSent: false }));
      toast.success("Phone Verified Successfully");
    } else {
      toast.error("Invalid Phone OTP");
    }
  };

  const verifyEmail = () => {
    if (verification.emailInputOtp === verification.dummyEmailOtp) {
      setVerification(v => ({ ...v, emailVerified: true, emailOtpSent: false }));
      toast.success("Email Verified Successfully");
    } else {
      toast.error("Invalid Email OTP");
    }
  };

  const handleFinalSubmit = async () => {
    const loadingToast = toast.loading("Submitting final application...");
    try {
      await registerProvider({ ...formData, providerId: provider?._id, onboardingStep: 7 });
      toast.success("Application submitted! Our team will verify it within 48 hours.", { id: loadingToast });
      navigate('/provider/status');
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed", { id: loadingToast });
    }
  };

  const currentConfig = PROVIDER_CONFIG[selectedType];
  const STEPS = [
    { id: 1, label: 'Role Selection', icon: Briefcase },
    { id: 2, label: 'Roadmap', icon: Info },
    { id: 3, label: 'Business Profile', icon: Building2 },
    { id: 4, label: 'Professional Data', icon: User },
    { id: 5, label: 'Documentation', icon: FileText },
    { id: 6, label: 'Legal Terms', icon: Scale },
    { id: 7, label: 'Review', icon: CheckCircle2 }
  ];

  return (
    <div className={`min-h-screen bg-[#f8fafc] font-sans ${step > 1 ? 'flex overflow-hidden' : ''}`}>
      
      {/* Sidebar Stepper - Only shown from Step 2 onwards */}
      {step > 1 && (
        <div className="hidden lg:flex w-80 bg-white border-r border-gray-100 flex-col p-10 h-screen overflow-y-auto">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-100">W</div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Wellwigen</span>
          </div>

          <div className="space-y-1">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div key={s.id} className="relative">
                  {s.id !== STEPS.length && (
                    <div className={`absolute left-[15px] top-10 w-[2px] h-10 transition-colors duration-500 ${isCompleted ? 'bg-blue-600' : 'bg-gray-100'}`} />
                  )}
                  <div className="flex items-center gap-4 py-4 group">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 
                      ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 
                        isCompleted ? 'bg-blue-100 text-blue-600' : 'bg-white border-2 border-gray-100 text-gray-400'}`}>
                      {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={14} />}
                    </div>
                    <span className={`text-[11px] font-bold tracking-wider transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400 uppercase'}`}>
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 ${step > 1 ? 'h-screen overflow-y-auto' : ''}`}>
        
        {/* Global Progress Bar for Step 1 or Mobile */}
        {(step === 1 || window.innerWidth < 1024) && (
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${(step / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <main className={`max-w-7xl mx-auto px-6 py-12 lg:py-20 ${step === 1 ? 'text-center lg:text-left' : ''}`}>
          
          {/* Header Branding (only if no sidebar) */}
          {step === 1 && (
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-12">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-100">W</div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Wellwigen <span className="text-blue-600">Health</span></span>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {/* Step 1: Selection */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">How will you <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">serve?</span></h2>
                  <p className="text-gray-500 font-medium text-lg">Select your primary role in the Wellwigen health ecosystem.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-left">
                  {Object.entries(PROVIDER_CONFIG).map(([key, config]) => {
                    return (
                      <button 
                        key={key} 
                        onClick={() => handleTypeSelect(key)} 
                        className="group relative h-72 rounded-[2rem] overflow-hidden text-left focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-2xl transition-all duration-500"
                      >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img 
                            src={ROLE_IMAGES[key]} 
                            alt={config.label}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                        </div>
                        
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-gray-900/40 to-gray-900/95 transition-opacity duration-500 group-hover:opacity-90"></div>
                        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 border border-white/30 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-300 shadow-xl">
                            {key === 'VENDOR' && <Store size={26} strokeWidth={2.5} />}
                            {key === 'DOCTOR' && <Stethoscope size={26} strokeWidth={2.5} />}
                            {key === 'LAB' && <FlaskConical size={26} strokeWidth={2.5} />}
                            {key === 'PHARMACY' && <Pill size={26} strokeWidth={2.5} />}
                            {key === 'NUTRITION' && <Apple size={26} strokeWidth={2.5} />}
                            {key === 'TRAINER' && <Dumbbell size={26} strokeWidth={2.5} />}
                          </div>
                          
                          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="font-black text-white text-2xl mb-1 tracking-tight">{config.label}</h3>
                            <p className="text-xs text-gray-200 leading-relaxed font-bold uppercase tracking-wider opacity-90">{config.description}</p>
                          </div>
                          
                          {/* Animated Arrow */}
                          <div className="absolute bottom-8 right-8 w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-lg">
                            <ChevronRight size={20} strokeWidth={3} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Roadmap */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 max-w-3xl">
                <div className="flex items-center gap-2 text-teal-600 mb-2 cursor-pointer group w-max" onClick={prevStep}>
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                  <span className="text-[11px] font-black uppercase tracking-widest">Change Role</span>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Setup your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">workspace.</span></h2>
                  <p className="text-base text-gray-500 font-medium leading-relaxed max-w-xl">You are applying as a <strong className="text-gray-900">{currentConfig?.label}</strong>. {currentConfig?.instructions}</p>
                </div>
                
                <div className="relative bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden flex flex-col sm:flex-row min-h-[320px]">
                  {/* Left Side: Roadmap */}
                  <div className="p-8 sm:p-10 flex-1 relative z-10">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Application Roadmap</h3>
                    <div className="space-y-5">
                      {currentConfig?.onboardingSteps.map((s, i) => (
                        <div key={i} className="flex gap-4 items-start group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-400 group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300">
                            {i + 1}
                          </div>
                          <div className="pt-2.5">
                            <p className="text-sm font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{s}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right Side: Role Visual Context */}
                  <div className="hidden sm:block sm:w-5/12 relative">
                    <img src={ROLE_IMAGES[selectedType]} alt={currentConfig?.label} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3 border border-white/30 shadow-lg">
                          {selectedType === 'VENDOR' && <Store size={22} strokeWidth={2.5} />}
                          {selectedType === 'DOCTOR' && <Stethoscope size={22} strokeWidth={2.5} />}
                          {selectedType === 'LAB' && <FlaskConical size={22} strokeWidth={2.5} />}
                          {selectedType === 'PHARMACY' && <Pill size={22} strokeWidth={2.5} />}
                          {selectedType === 'NUTRITION' && <Apple size={22} strokeWidth={2.5} />}
                          {selectedType === 'TRAINER' && <Dumbbell size={22} strokeWidth={2.5} />}
                       </div>
                       <h4 className="text-white font-black text-xl drop-shadow-md tracking-tight">{currentConfig?.label}</h4>
                    </div>
                  </div>
                </div>
                
                <button onClick={nextStep} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 flex justify-center items-center gap-3 group">
                  Begin Application <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* Step 3: Business Information */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Business Profile</h2>
                  <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em]">Tell us about your organization.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InputGroup label="Business/Practice Name" placeholder="e.g. LifeCare Clinic" value={formData.businessName} onChange={(v) => updateField('businessName', v)} />
                  <InputGroup label="Primary Owner/Contact" placeholder="Full legal name" value={formData.ownerName} onChange={(v) => updateField('ownerName', v)} />
                  
                  <div className="space-y-2">
                    <VerifyInput label="Phone Number" placeholder="+91 00000 00000" icon={Smartphone} value={formData.phone} onChange={(v) => updateField('phone', v)} onVerify={sendPhoneOtp} isVerified={verification.phoneVerified} disabled={verification.phoneOtpSent} />
                    {verification.phoneOtpSent && (
                      <div className="flex gap-2 p-2 bg-blue-50 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <input type="text" placeholder="Enter OTP (1234)" className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-xs font-bold outline-none" value={verification.phoneInputOtp} onChange={(e) => setVerification(v => ({ ...v, phoneInputOtp: e.target.value }))} />
                        <button onClick={verifyPhone} className="bg-blue-600 text-white px-4 rounded-lg text-[10px] font-black uppercase tracking-widest">Confirm</button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <VerifyInput label="Email Address" placeholder="name@business.com" icon={Mail} value={formData.email} onChange={(v) => updateField('email', v)} onVerify={sendEmailOtp} isVerified={verification.emailVerified} disabled={verification.emailOtpSent} />
                    {verification.emailOtpSent && (
                      <div className="flex gap-2 p-2 bg-blue-50 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <input type="text" placeholder="Enter OTP (5678)" className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-xs font-bold outline-none" value={verification.emailInputOtp} onChange={(e) => setVerification(v => ({ ...v, emailInputOtp: e.target.value }))} />
                        <button onClick={verifyEmail} className="bg-blue-600 text-white px-4 rounded-lg text-[10px] font-black uppercase tracking-widest">Confirm</button>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 grid grid-cols-3 gap-4">
                    <div className="col-span-2"><InputGroup label="Office Address" placeholder="Street, Area, Building" value={formData.address.street} onChange={(v) => updateAddress('street', v)} /></div>
                    <InputGroup label="Pincode" placeholder="000000" value={formData.address.pincode} onChange={(v) => updateAddress('pincode', v)} />
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="px-10 py-4 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:text-gray-900 transition-all">Previous</button>
                  <button onClick={nextStep} disabled={!verification.phoneVerified || !verification.emailVerified} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-2xl shadow-blue-100 disabled:opacity-30 disabled:cursor-not-allowed">Save & Continue</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Professional Qualifications */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Qualifications</h2>
                  <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em]">Specific details for {currentConfig?.label} practice.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {selectedType === 'DOCTOR' && (
                    <>
                      <SelectGroup label="Specialization" options={['General Medicine', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Dentistry']} value={formData.specialization} onChange={(v) => updateField('specialization', v)} />
                      <SelectGroup label="Experience" options={['1-3 Years', '4-7 Years', '8-12 Years', '12+ Years']} value={formData.experience} onChange={(v) => updateField('experience', v)} />
                      <InputGroup label="Consultation Fee (₹)" placeholder="e.g. 500" value={formData.consultationFee} onChange={(v) => updateField('consultationFee', v)} />
                      <InputGroup label="Primary Clinic/Hospital" placeholder="Where you practice" value={formData.hospitalName} onChange={(v) => updateField('hospitalName', v)} />
                    </>
                  )}
                  {selectedType === 'LAB' && (
                    <>
                      <SelectGroup label="Lab Category" options={['Pathology', 'Radiology', 'Multi-Specialty', 'Blood Bank']} value={formData.labCategory} onChange={(v) => updateField('labCategory', v)} />
                      <SelectGroup label="Home Sample Collection" options={['Yes', 'No']} value={formData.homeCollection} onChange={(v) => updateField('homeCollection', v)} />
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Available Test Packages</label>
                        <textarea className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-xs font-bold text-gray-900 focus:bg-white outline-none focus:ring-4 focus:ring-blue-50 transition-all" rows={4} placeholder="e.g. CBC, Full Body Checkup, Thyroid..." value={formData.testList} onChange={(e) => updateField('testList', e.target.value)} />
                      </div>
                    </>
                  )}
                  {selectedType === 'VENDOR' && (
                    <>
                      <SelectGroup label="Shop Focus" options={['General Wellness', 'Supplements', 'Organic Foods', 'Beauty & Care']} value={formData.shopCategory} onChange={(v) => updateField('shopCategory', v)} />
                      <InputGroup label="GST Number" placeholder="22AAAAA0000A1Z5" value={formData.gstNo} onChange={(v) => updateField('gstNo', v)} />
                      <SelectGroup label="Local Delivery Radius" options={['3km', '5km', '10km', 'Statewide', 'National']} value={formData.deliveryRadius} onChange={(v) => updateField('deliveryRadius', v)} />
                      <InputGroup label="Warehouse/Store Location" placeholder="Main operating city" value={formData.warehouse} onChange={(v) => updateField('warehouse', v)} />
                    </>
                  )}
                  {selectedType === 'PHARMACY' && (
                    <>
                      <InputGroup label="Registered Pharmacist Name" placeholder="Name on license" value={formData.pharmacistName} onChange={(v) => updateField('pharmacistName', v)} />
                      <SelectGroup label="24/7 Availability" options={['No', 'Yes']} value={formData.is24x7} onChange={(v) => updateField('is24x7', v)} />
                      <InputGroup label="Operating Hours" placeholder="e.g. 9AM - 11PM" value={formData.operatingHoursText} onChange={(v) => updateField('operatingHoursText', v)} />
                      <SelectGroup label="Drug License Type" options={['Retail (Form 20/21)', 'Wholesale']} value={formData.drugLicenseType} onChange={(v) => updateField('drugLicenseType', v)} />
                    </>
                  )}
                  {selectedType === 'NUTRITION' && (
                    <>
                      <SelectGroup label="Food Category" options={['Fresh Fruits', 'Organic Veggies', 'Healthy Meals', 'Superfoods']} value={formData.foodCategory} onChange={(v) => updateField('foodCategory', v)} />
                      <SelectGroup label="Sourcing Mode" options={['Direct from Farmers', 'Local Markets', 'Warehouse Sync', 'Imported']} value={formData.sourcing} onChange={(v) => updateField('sourcing', v)} />
                      <SelectGroup label="Delivery Speed" options={['Instant (30-60m)', 'Same Day', 'Scheduled Only']} value={formData.deliveryType} onChange={(v) => updateField('deliveryType', v)} />
                      <SelectGroup label="Dietary Focus" options={['Vegan', 'Keto', 'Diabetes Friendly', 'Gluten Free', 'General']} value={formData.dietaryFocus} onChange={(v) => updateField('dietaryFocus', v)} />
                    </>
                  )}
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="px-10 py-4 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:text-gray-900 transition-all">Previous</button>
                  <button onClick={nextStep} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-2xl shadow-blue-100">Save & Next</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Documentation */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Legal Documents</h2>
                  <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em]">Required certifications for {currentConfig?.label}.</p>
                </div>
                <div className="space-y-8">
                  <InputGroup label="Primary License/Registration Number" placeholder="e.g. REG-0987654321" value={formData.licenseNumber} onChange={(v) => updateField('licenseNumber', v)} />
                  
                  <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group shadow-sm">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FileCheck size={32} />
                    </div>
                    <p className="text-base font-bold text-gray-900">Upload Registration Documents</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">Click to browse or drag and drop<br />PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="px-10 py-4 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:text-gray-900 transition-all">Previous</button>
                  <button onClick={nextStep} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-2xl shadow-blue-100">Save & Continue</button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Terms */}
            {step === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Legal & Consent</h2>
                  <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em]">Platform agreements.</p>
                </div>
                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-6">
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 text-xs font-medium text-gray-600 leading-relaxed scrollbar-hide">
                    <p>1. Wellwigen is a platform connecting health providers to users. We do not provide medical services directly.</p>
                    <p>2. Providers are responsible for the accuracy of their credentials and service quality.</p>
                    <p>3. Platform fees apply to transactions processed through our gateway.</p>
                    <p>4. Patient data must be handled in compliance with privacy laws (HIPAA/GDPR as applicable).</p>
                    <p>5. We reserve the right to suspend accounts providing false information.</p>
                  </div>
                  <label className="flex items-start gap-3 p-6 bg-gray-50 rounded-2xl cursor-pointer hover:bg-blue-50/50 transition-all">
                    <input type="checkbox" checked={formData.verificationConsent} onChange={(e) => updateField('verificationConsent', e.target.checked)} className="mt-1 w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs font-bold text-gray-900">I agree to the Provider Terms of Service and consent to document verification by the Wellwigen team.</span>
                  </label>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={prevStep} className="px-10 py-4 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:text-gray-900 transition-all">Back</button>
                  <button onClick={nextStep} disabled={!formData.verificationConsent} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-2xl shadow-blue-100 disabled:opacity-30">Review Application</button>
                </div>
              </motion.div>
            )}

            {/* Step 7: Review */}
            {step === 7 && (
              <motion.div key="s7" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Final Review</h2>
                  <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em]">Check your details before submitting.</p>
                </div>
                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-2">
                  <SummaryItem label="Practice Category" value={currentConfig?.label} />
                  <SummaryItem label="Business Name" value={formData.businessName} />
                  <SummaryItem label="Primary Owner" value={formData.ownerName} />
                  <SummaryItem label="Email" value={formData.email} />
                  <SummaryItem label="Phone" value={formData.phone} />
                  <SummaryItem label="Location" value={`${formData.address.city}, ${formData.address.state}`} />
                  <SummaryItem label="License No." value={formData.licenseNumber} />
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={prevStep} className="px-10 py-4 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:text-gray-900 transition-all">Back</button>
                  <button onClick={handleFinalSubmit} disabled={isLoading} className="flex-1 py-5 bg-emerald-600 text-white rounded-2xl font-bold text-base hover:bg-emerald-700 shadow-2xl shadow-emerald-100 transition-all flex justify-center items-center gap-2">
                    {isLoading ? 'Finalizing...' : 'Submit Application Now'} <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

/* --- Refined UI Components --- */

const InputGroup = ({ label, type = "text", placeholder, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all outline-none placeholder:text-gray-300"
    />
  </div>
);

const SelectGroup = ({ label, options, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <select 
        value={value || options[0]}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all outline-none appearance-none cursor-pointer"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const VerifyInput = ({ label, placeholder, value, onChange, onVerify, isVerified, disabled, icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
        <Icon size={14} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={isVerified || disabled}
        className={`w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-24 py-3 text-xs font-bold text-gray-900 focus:bg-white focus:ring-4 transition-all outline-none 
          ${isVerified ? 'border-emerald-200 bg-emerald-50/20 text-emerald-700' : 'focus:ring-blue-50/50'}`}
      />
      {!isVerified && (
        <button 
          onClick={onVerify}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
        >
          Verify
        </button>
      )}
      {isVerified && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center gap-1.5">
          <CheckCircle2 size={16} />
          <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
        </div>
      )}
    </div>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 last:pb-0">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold text-gray-900">{value || '---'}</span>
  </div>
);

export default OnboardingWizard;
