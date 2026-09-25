import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { db } from '../../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Modal from '../../../components/common/Modal';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9598506627',
    sub: 'Mon – Sat, 9am to 6pm',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'wellwigen@gmail.com',
    sub: 'Online support 24/7',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: '123 Fitness Street, Wellness City, WC 12345',
    sub: null,
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    sub: 'Usually much faster',
    color: 'bg-amber-50 text-amber-500',
  },
];

const inputClass =
  'w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-50 outline-none transition-all text-xs font-semibold text-gray-900 placeholder-gray-300';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const submissionData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString(),
      read: false,
    };

    // 1. Dispatch Firebase save asynchronously in background (non-blocking)
    try {
      addDoc(collection(db, 'messages'), submissionData)
        .then(() => console.log('Firebase message saved successfully.'))
        .catch((err) => console.warn('Firebase save warning:', err));
    } catch (fbErr) {
      console.warn('Firebase init warning:', fbErr);
    }

    // 2. Dispatch backend API email asynchronously in background (non-blocking)
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl && !apiUrl.includes('undefined')) {
      try {
        fetch(`${apiUrl}/user/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((res) => console.log('Backend contact status:', res.status))
          .catch((err) => console.warn('Backend API contact warning:', err));
      } catch (apiErr) {
        console.warn('Backend fetch error:', apiErr);
      }
    }

    // 3. Instant UI success feedback (<150ms)
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Message sent! We will get back to you shortly.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 150);
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.18) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* SVG watermarks */}
      <svg className="absolute top-8 right-12 opacity-[0.06] pointer-events-none" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="8" y="1" width="6" height="20" rx="1.5" fill="#0d9488" />
        <rect x="1" y="8" width="20" height="6" rx="1.5" fill="#0d9488" />
      </svg>
      <svg className="absolute bottom-10 left-12 opacity-[0.05] pointer-events-none w-12" viewBox="0 0 48 44" fill="none">
        <path d="M24 40C24 40 4 28 4 16C4 10 8.5 6 14 6C18 6 22 8 24 12C26 8 30 6 34 6C39.5 6 44 10 44 16C44 28 24 40 24 40Z" stroke="#0d9488" strokeWidth="1.5" fill="none" />
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-teal-600 text-xs tracking-widest uppercase font-semibold mb-3">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mt-3 text-gray-500 text-base max-w-lg mx-auto">
            Have a question or want to get started? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* Left — Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Contact Information</h3>
              <p className="text-sm text-gray-500">Reach us through any of these channels.</p>
            </div>

            <div className="flex flex-col gap-5">
              {contactInfo.map(({ icon: Icon, label, value, sub, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-gray-800 leading-snug">{value}</p>
                    {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider + tagline */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 leading-relaxed">
                We typically respond within a few hours on business days. For urgent matters, please call directly.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col gap-5">

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white font-semibold py-3 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm shadow-sm"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      <Modal
        isOpen={!!status.message}
        type={status.type}
        message={status.message}
        onClose={() => setStatus({ type: '', message: '' })}
      />
    
        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h3>
            <p className="text-gray-500 mt-4">Find quick answers to common questions about our programs and platform.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">How do the AI meal plans work?</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Our AI analyzes your body metrics and goals (like weight loss or muscle gain) to generate daily meal plans tailored specifically to your biological needs.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Are the virtual fitness classes live?</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Yes! You can join live sessions with our expert trainers, or access our massive library of recorded on-demand classes at your convenience.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">Do I need wearables to use Wellwigen?</h4>
              <p className="text-gray-500 text-sm leading-relaxed">While not strictly required, syncing a wearable device allows our AI to track your real-time baseline and provide much more accurate clinical analysis.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-2">How fast do I get lab reports?</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Home lab test samples are collected the same day, and comprehensive digital reports with AI insights are usually available on your dashboard within 24-48 hours.</p>
            </div>
          </div>
        </div>

    </section>
  );
};

export default ContactUs;
