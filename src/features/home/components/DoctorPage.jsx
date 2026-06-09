import React from 'react';
import Hero from './Hero';
import Ecosystem from './Ecosystem';
import Pricing from '../../subscription/pages/PricingPage';
import ContactUs from './ContactUs';
import Footer from '../../../components/common/Footer';
import { Stethoscope, Users, Calendar, ShieldCheck } from 'lucide-react';

const DoctorPage = () => {
  return (
    <div className="bg-white">
      {/* Custom Doctor Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full -ml-64 -mb-64" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
              Clinical Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              Digital Practice. <br/>
              <span className="text-blue-500">Human Connection.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl">
              Elevate your medical practice with Wellwigen's AI-driven clinical tools. Telehealth, automated record management, and real-time patient vitals monitoring in one unified platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-900/20">
                Join the Network
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold border border-white/10 transition-all">
                Practice Management
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Stethoscope className="text-blue-600" />}
              title="Virtual Consults"
              desc="High-definition, encrypted video consultations with integrated clinical note-taking."
            />
            <FeatureCard 
              icon={<Users className="text-indigo-600" />}
              title="Patient Continuity"
              desc="Access unified medical histories and real-time biological data to make informed decisions."
            />
            <FeatureCard 
              icon={<Calendar className="text-sky-600" />}
              title="Smart Scheduling"
              desc="Automated appointment booking and follow-up reminders synced with your availability."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Medical Consultant Plans</h2>
            <p className="text-slate-500 mt-2">Manage your clinical practice digitally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Individual MD</h3>
              <p className="text-3xl font-black mb-6">₹2,499<span className="text-sm font-normal text-slate-500">/mo</span></p>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li>• Digital Prescriptions</li>
                <li>• Up to 50 consults/mo</li>
                <li>• Basic Patient Records</li>
              </ul>
              <button className="w-full py-3 border border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all">Get Started</button>
            </div>
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-600 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Recommended</div>
              <h3 className="text-xl font-bold mb-4">Premium Practice</h3>
              <p className="text-3xl font-black mb-6">₹4,999<span className="text-sm font-normal text-slate-500">/mo</span></p>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li>• Unlimited Consultations</li>
                <li>• Live Vitals Monitoring</li>
                <li>• AI Clinical Assistant</li>
                <li>• Priority Lab Sync</li>
              </ul>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Select Plan</button>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Clinical Group</h3>
              <p className="text-3xl font-black mb-6">Custom</p>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li>• Hospital Management</li>
                <li>• Multi-doctor Support</li>
                <li>• Enterprise Analytics</li>
              </ul>
              <button className="w-full py-3 border border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      <ContactUs />
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all group">
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default DoctorPage;
