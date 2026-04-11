// ContactUs.jsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Modal from '../common/Modal';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await addDoc(collection(db, 'messages'), {
                ...formData,
                createdAt: serverTimestamp(),
                read: false
            });
            setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you shortly.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error("Error sending message: ", error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 sm:py-24 bg-gray-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-52 h-52 sm:w-64 sm:h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-52 h-52 sm:w-64 sm:h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Get in Touch
                    </h2>
                    <p className="mt-4 max-w-xl text-lg sm:text-xl text-gray-500 mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 sm:mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-md sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Phone</h3>
                            <p className="text-gray-600 text-sm sm:text-base">+91 9598506627</p>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">Mon-Sat 9am to 6pm</p>
                        </div>

                        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-3 sm:mb-4">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-md sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Email</h3>
                            <p className="text-gray-600 text-sm sm:text-base">wellwigen@gmail.com</p>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">Online support 24/7</p>
                        </div>

                        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 mb-3 sm:mb-4">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-md sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Office</h3>
                            <p className="text-gray-600 text-sm sm:text-base">
                                123 Fitness Street,<br />Wellness City, WC 12345
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
                            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Wellwigen Fitness"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="wellwigen@example.com"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <label htmlFor="subject" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white text-sm sm:text-base"
                                />
                            </div>

                            <div className="mb-6 sm:mb-8">
                                <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about your inquiry..."
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none text-sm sm:text-base"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-dark text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {loading ? 'Sending...' : <>
                                    Send Message <Send size={20} />
                                </>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={!!status.message}
                type={status.type}
                message={status.message}
                onClose={() => setStatus({ type: '', message: '' })}
            />
        </section>
    );
};

export default ContactUs;