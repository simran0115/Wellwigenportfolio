import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { Eye, EyeOff } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const auth = useAppStore((state) => state.auth);
    const login = useAppStore((state) => state.login);
    const clearAuthStatus = useAppStore((state) => state.clearAuthStatus);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return useAppStore.setState({
                auth: { ...auth, error: 'Please fill all fields', success: null },
            });
        }

        try {
            await login(formData);
            setTimeout(() => navigate('/dashboard', { replace: true }), 1200);
        } catch (error) {
            // Error state is managed by zustand store.
        }
    };

    const statusType = auth.error ? 'error' : auth.success ? 'success' : '';
    const statusMessage = auth.error || auth.success || '';

    return (
        <section className="py-24 bg-gradient-to-b from-light to-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                            Login to <span className="text-primary">Wellwigen Fitness</span>
                        </h2>
                        <p className="text-text text-lg">
                            Enter your credentials to access your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Email */}
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

                        {/* Password */}
                        <div className="space-y-2 relative">
                            <label className="block text-sm font-bold text-dark uppercase tracking-wider">Password*</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={auth.loading}
                            className="w-full bg-dark text-white font-bold py-5 rounded-xl hover:bg-opacity-90 transition-all shadow-xl text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {auth.loading ? 'Logging in...' : 'Login'}
                        </button>

                        <p className="text-center mt-4 text-gray-600">
                            Don't have an account?{' '}
                            <span
                                className="text-primary cursor-pointer font-semibold"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </span>
                        </p>
                    </form>
                </div>
            </div>

            <Modal isOpen={!!statusMessage} type={statusType} message={statusMessage} onClose={clearAuthStatus} />
        </section>
    );
};

export default Login;