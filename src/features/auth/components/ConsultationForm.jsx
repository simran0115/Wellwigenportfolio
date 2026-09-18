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
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight 
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

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-50/70 via-slate-50 to-emerald-50/50 relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center justify-center">
            {/* Ambient Background Glows */}
            <div className="absolute top-12 left-1/4 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-teal-900/10 p-6 sm:p-10 border border-slate-100/90 relative overflow-hidden transition-all duration-300">
                    {/* Top Decorative Brand Gradient Bar */}
                    <div className="h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-400 absolute top-0 left-0 right-0"></div>

                    {/* Header */}
                    <div className="text-center mb-8 pt-2">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/60 mb-3 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Wellwigen Health & Fitness
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Register for <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Wellwigen Fitness</span>
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base mt-2">
                            Create your account to start your personalized fitness journey.
                        </p>
                    </div>

                    {validationError && (
                        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{validationError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Row 1: Name & Mobile */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Full Name<span className="text-teal-600 ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all shadow-sm placeholder:text-slate-400"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mobile */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Mobile Number<span className="text-teal-600 ml-0.5">*</span>
                                </label>
                                <div className="flex rounded-xl shadow-sm overflow-hidden border border-slate-200 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/15 transition-all">
                                    <span className="inline-flex items-center px-3.5 bg-slate-100 border-r border-slate-200 text-slate-600 font-semibold text-xs shrink-0 gap-1">
                                        🇮🇳 +91
                                    </span>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-3.5 py-3 bg-slate-50/80 text-slate-800 text-sm focus:bg-white outline-none transition-all placeholder:text-slate-400"
                                        placeholder="10-digit mobile number"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Email (Full Width) */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Email Address<span className="text-teal-600 ml-0.5">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all shadow-sm placeholder:text-slate-400"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 3: Password & Confirm Password (PARALLEL PAIR) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Password<span className="text-teal-600 ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 outline-none transition-all shadow-sm placeholder:text-slate-400"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Confirm Password<span className="text-teal-600 ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <ShieldCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full pl-11 pr-11 py-3 rounded-xl bg-slate-50/80 border text-slate-800 text-sm focus:bg-white focus:ring-4 outline-none transition-all shadow-sm placeholder:text-slate-400 ${
                                            formData.confirmPassword && formData.password !== formData.confirmPassword
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/15'
                                                : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/15'
                                        }`}
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors"
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-center gap-2.5 pt-2">
                            <input
                                id="termsAccepted"
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 cursor-pointer accent-teal-600"
                                required
                            />
                            <label htmlFor="termsAccepted" className="text-xs sm:text-sm text-slate-600 select-none">
                                I agree to the{' '}
                                <a href="/terms-and-conditions" className="text-teal-600 font-semibold hover:underline">
                                    Terms & Conditions
                                </a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={auth.loading}
                            className="w-full bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-base flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group mt-2"
                        >
                            {auth.loading ? (
                                <span className="inline-flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Registering...
                                </span>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="pt-4 border-t border-slate-100 text-center">
                            <p className="text-xs sm:text-sm text-slate-500">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-teal-600 font-bold hover:text-teal-700 hover:underline inline-flex items-center gap-0.5 ml-1 transition-colors"
                                >
                                    Login to your account
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={!!(auth.error || auth.success)}
                type={auth.error ? 'error' : auth.success ? 'success' : ''}
                message={auth.error || auth.success || ''}
                onClose={clearAuthStatus}
            />
        </section>
    );
};

export default ConsultationForm;