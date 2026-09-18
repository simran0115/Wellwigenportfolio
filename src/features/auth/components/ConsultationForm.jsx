// ConsultationForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Stethoscope, 
  Utensils, 
  Dumbbell, 
  Activity, 
  Clock, 
  Users, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Shield
} from 'lucide-react';
import Modal from '../../../components/common/Modal';
import useAppStore from '../../../store/useAppStore';

const ConsultationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    const auth = useAppStore((state) => state.auth);
    const register = useAppStore((state) => state.register);
    const clearAuthStatus = useAppStore((state) => state.clearAuthStatus);

    useEffect(() => {
        return () => clearAuthStatus();
    }, [clearAuthStatus]);

    // Handle input changes
    const handleChange = (e) => {
        const { id, name, type, checked, value } = e.target;
        const fieldName = id || name;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const updated = { ...prev, [fieldName]: newValue };
            
            // Clear password match error live if fixed
            if (fieldName === 'password' || fieldName === 'confirmPassword') {
                if (updated.confirmPassword && updated.password !== updated.confirmPassword) {
                    setValidationError('Passwords do not match');
                } else {
                    setValidationError('');
                }
            }
            return updated;
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        // Frontend validation
        if (!formData.name || !formData.mobile || !formData.email || !formData.password || !formData.confirmPassword) {
            setValidationError('Please fill in all required fields.');
            return useAppStore.setState({ auth: { ...auth, error: 'Please fill all fields', success: null } });
        }

        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match.');
            return useAppStore.setState({ auth: { ...auth, error: 'Passwords do not match', success: null } });
        }

        if (!formData.termsAccepted) {
            setValidationError('Please accept the Terms & Conditions to proceed.');
            return;
        }

        try {
            const data = await register({
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                password: formData.password,
            });

            // Clear any old local storage state to prevent testing leaks
            localStorage.clear();

            setFormData({
                name: '',
                mobile: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsAccepted: false,
            });

            setTimeout(() => navigate('/login'), 1500);
            return data;
        } catch {
            // Error state is handled by the store.
        }
    };

    const faqs = [
        {
            q: "Is creating an account on Wellwigen free?",
            a: "Yes! Registration is 100% free with no credit card required. You gain immediate access to health tracking, dietary calculators, and doctor directories."
        },
        {
            q: "How is my medical and biometric data protected?",
            a: "Your privacy is our priority. All personal and medical data is encrypted end-to-end using enterprise SSL standards and strictly complies with international HIPAA data privacy regulations."
        },
        {
            q: "Can I connect my fitness band or smartwatch?",
            a: "Absolutely. Wellwigen integrates with Apple Health, Google Fit, Fitbit, and popular biometric wearables to auto-sync steps, sleep, and heart rate."
        },
        {
            q: "How do virtual doctor consultations work?",
            a: "Once registered, navigate to the Services section to choose a verified doctor by specialty, view their available schedule, and initiate a secure online consultation."
        }
    ];

    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
            
            {/* Top Info Banner */}
            <div className="bg-teal-700 text-white text-xs sm:text-sm font-medium py-2.5 px-4 text-center border-b border-teal-800">
                <span className="font-semibold text-teal-100">🌿 Welcome to Wellwigen Fitness:</span> Join 10,000+ members transforming their health with personalized care.
            </div>

            {/* HERO & REGISTRATION SPLIT SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* LEFT COLUMN: Comprehensive Platform Information & Benefits */}
                    <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-4">
                        
                        <div>
                            <span className="inline-block px-3 py-1 rounded bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
                                Official Registration Portal
                            </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                Transform Your Health & Fitness with <span className="text-teal-600">Wellwigen</span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                                Access 24/7 doctor consultations, personalized AI diet plans, fitness tracking, and dedicated wellness coaching — all in one secure healthcare platform.
                            </p>
                        </div>

                        {/* Feature Highlights List */}
                        <div className="space-y-4 pt-2">
                            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                                What You Gain With Your Wellwigen Account:
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-teal-50 rounded-lg border border-teal-100 text-teal-700">
                                            <Stethoscope className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm">24/7 Telemedicine</h3>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-normal">
                                        Consult with verified doctors and certified medical specialists anytime via video or chat.
                                    </p>
                                </div>

                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-700">
                                            <Utensils className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm">Custom Diet Plans</h3>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-normal">
                                        AI-driven nutrition guidance tailored to your specific caloric needs, goals, and diet.
                                    </p>
                                </div>

                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-teal-50 rounded-lg border border-teal-100 text-teal-700">
                                            <Dumbbell className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm">Workouts & Tracking</h3>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-normal">
                                        Structured exercise routines for home or gym with real-time biometric progress charts.
                                    </p>
                                </div>

                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-700">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm">Wearable Sync</h3>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-normal">
                                        Seamless integration with Apple Health, Google Fit, and smart fitness devices.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust & Verification Metrics */}
                        <div className="p-5 bg-slate-100 rounded-xl border border-slate-200 grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">10,000+</div>
                                <div className="text-xs text-slate-600 font-medium mt-0.5">Active Members</div>
                            </div>
                            <div className="border-x border-slate-300">
                                <div className="text-xl sm:text-2xl font-extrabold text-teal-700">4.9 / 5.0</div>
                                <div className="text-xs text-slate-600 font-medium mt-0.5">Member Rating</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">100%</div>
                                <div className="text-xs text-slate-600 font-medium mt-0.5">HIPAA Compliant</div>
                            </div>
                        </div>

                        {/* Guarantee Badges */}
                        <div className="flex flex-wrap items-center gap-6 pt-1 text-xs font-semibold text-slate-600">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Free Registration
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Shield className="w-4 h-4 text-teal-600" /> Encrypted Data Protection
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-teal-600" /> Instant Access
                            </span>
                        </div>

                    </div>


                    {/* RIGHT COLUMN: Clean, Non-AI Registration Form */}
                    <div className="lg:col-span-5 w-full">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                            
                            {/* Form Header */}
                            <div className="border-b border-slate-200 pb-5 mb-6 text-left">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Create Your Free Account
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Enter your details below to set up your Wellwigen profile.
                                </p>
                            </div>

                            {validationError && (
                                <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                                    <span>{validationError}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                
                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Full Name<span className="text-red-500 ml-0.5">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-colors placeholder:text-slate-400"
                                            placeholder="e.g. Rajesh Kumar"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Mobile Number<span className="text-red-500 ml-0.5">*</span>
                                    </label>
                                    <div className="flex rounded-lg overflow-hidden border border-slate-300 focus-within:border-teal-600 focus-within:ring-1 focus-within:ring-teal-600">
                                        <span className="inline-flex items-center px-3 bg-slate-100 border-r border-slate-300 text-slate-700 font-semibold text-xs shrink-0">
                                            🇮🇳 +91
                                        </span>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                            placeholder="10-digit mobile number"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                        Email Address<span className="text-red-500 ml-0.5">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-colors placeholder:text-slate-400"
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password & Confirm Password Pair */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                            Password<span className="text-red-500 ml-0.5">*</span>
                                        </label>
                                        <div className="relative">
                                            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-colors placeholder:text-slate-400"
                                                placeholder="Password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                            >
                                                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                            Confirm<span className="text-red-500 ml-0.5">*</span>
                                        </label>
                                        <div className="relative">
                                            <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`w-full pl-9 pr-8 py-2.5 bg-white border rounded-lg text-slate-900 text-sm outline-none transition-colors placeholder:text-slate-400 ${
                                                    formData.confirmPassword && formData.password !== formData.confirmPassword
                                                        ? 'border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                                                        : 'border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
                                                }`}
                                                placeholder="Confirm"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms & Conditions */}
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        id="termsAccepted"
                                        type="checkbox"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-600 cursor-pointer"
                                        required
                                    />
                                    <label htmlFor="termsAccepted" className="text-xs text-slate-600 select-none">
                                        I agree to the{' '}
                                        <a href="/terms-and-conditions" className="text-teal-700 font-semibold underline">
                                            Terms & Conditions
                                        </a>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={auth.loading}
                                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                                >
                                    {auth.loading ? (
                                        <span className="inline-flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Registering...
                                        </span>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                {/* Login Redirect */}
                                <div className="pt-3 border-t border-slate-200 text-center">
                                    <p className="text-xs text-slate-600">
                                        Already registered?{' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login')}
                                            className="text-teal-700 font-bold hover:underline"
                                        >
                                            Login here
                                        </button>
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </section>


            {/* SECTION 2: HOW WELLWIGEN WORKS (3-STEP PROCESS) */}
            <section className="bg-white border-y border-slate-200 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Simple Onboarding</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-10">
                        How Wellwigen Works in 3 Easy Steps
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-left relative">
                            <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-bold text-sm flex items-center justify-center mb-4">
                                01
                            </div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">Create Your Profile</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Complete your 1-minute registration form with basic contact info and set up your fitness goals.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-left relative">
                            <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-bold text-sm flex items-center justify-center mb-4">
                                02
                            </div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">Receive Personalized Plans</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Get AI-curated nutrition charts, workout routines, and doctor consultation schedules instantly.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-left relative">
                            <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-bold text-sm flex items-center justify-center mb-4">
                                03
                            </div>
                            <h3 className="font-bold text-slate-900 text-base mb-2">Track & Achieve Goals</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Connect smart wearables, track daily metrics, consult doctors, and see lasting progress.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* SECTION 3: FREQUENTLY ASKED QUESTIONS (FAQ) */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Help & Clarifications</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                                className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                            >
                                <span className="flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5 text-teal-600 shrink-0" />
                                    {faq.q}
                                </span>
                                {openFaqIndex === idx ? (
                                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                                )}
                            </button>
                            
                            {openFaqIndex === idx && (
                                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>


            {/* SECTION 4: FINAL FOOTER CTA */}
            <section className="bg-slate-900 text-white py-10 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold">Ready to Begin Your Wellness Journey?</h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                        Join over 10,000 active members taking control of their health with Wellwigen today.
                    </p>
                    <div>
                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors inline-flex items-center gap-2"
                        >
                            <span>Fill Registration Form Above</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>


            {/* Feedback Modal */}
            <Modal
                isOpen={!!(auth.error || auth.success)}
                type={auth.error ? 'error' : auth.success ? 'success' : ''}
                message={auth.error || auth.success || ''}
                onClose={clearAuthStatus}
            />

        </div>
    );
};

export default ConsultationForm;