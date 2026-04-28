// ConsultationForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const auth = useAppStore((state) => state.auth);
    const register = useAppStore((state) => state.register);
    const clearAuthStatus = useAppStore((state) => state.clearAuthStatus);

    useEffect(() => {
        return () => clearAuthStatus();
    }, [clearAuthStatus]);

    // Handle input changes
    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.id || e.target.name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!formData.name || !formData.mobile || !formData.email || !formData.password || !formData.confirmPassword) {
            return useAppStore.setState({ auth: { ...auth, error: 'Please fill all fields', success: null } });
        }

        if (formData.password !== formData.confirmPassword) {
            return useAppStore.setState({ auth: { ...auth, error: 'Passwords do not match', success: null } });
        }

        try {
            const data = await register({
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                password: formData.password,
            });

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
        <section className="py-24 bg-gradient-to-b from-light to-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                            Register for <span className="text-primary">Wellwigen Fitness</span>
                        </h2>
                        <p className="text-text text-lg">
                            Create your account to start your fitness journey.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Info */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Name*</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Mobile*</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-medium">
                                        🇮🇳 +91
                                    </span>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 rounded-r-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        placeholder="10-digit mobile number"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark uppercase tracking-wider">Password*</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-dark uppercase tracking-wider">Confirm Password*</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Confirm password"
                                required
                            />
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input
                                    id="termsAccepted"
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                                    required
                                />
                            </div>
                            <label htmlFor="termsAccepted" className="text-sm text-gray-500">
                                I agree to the <a href="/terms-and-conditions" className="text-primary hover:underline">Terms & Conditions</a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={auth.loading}
                            className="w-full bg-dark text-white font-bold py-5 rounded-xl hover:bg-opacity-90 transition-all shadow-xl text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {auth.loading ? 'Registering...' : 'Register'}
                        </button>

                        {/* Login Link */}
                        <p className="text-center mt-4 text-gray-600">
                            Already have an account?{' '}
                            <span
                                className="text-primary cursor-pointer font-semibold"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </span>
                        </p>
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