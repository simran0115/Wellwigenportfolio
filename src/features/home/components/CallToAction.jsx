import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#0f172a',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* === SVG HEALTH VECTORS === */}

      {/* Shield — top right */}
      <svg className="absolute top-8 right-16 opacity-[0.08] pointer-events-none w-20" viewBox="0 0 80 96" fill="none">
        <path d="M40 6L10 18V44C10 62 23 79 40 88C57 79 70 62 70 44V18L40 6Z" stroke="#2dd4bf" strokeWidth="1.5" fill="none"/>
        <path d="M26 46l10 10 18-20" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* Medical cross — top left */}
      <svg className="absolute top-10 left-16 opacity-[0.07] pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="9" y="1" width="6" height="22" rx="2" fill="#2dd4bf"/>
        <rect x="1" y="9" width="22" height="6" rx="2" fill="#2dd4bf"/>
      </svg>

      {/* Heart outline — bottom left */}
      <svg className="absolute bottom-10 left-20 opacity-[0.07] pointer-events-none w-14" viewBox="0 0 56 52" fill="none">
        <path d="M28 48C28 48 4 34 4 18C4 10 10 4 18 4C22.5 4 27 7 28 12C29 7 33.5 4 38 4C46 4 52 10 52 18C52 34 28 48 28 48Z" stroke="#2dd4bf" strokeWidth="1.5" fill="none"/>
      </svg>

      {/* ECG line — bottom */}
      <svg className="absolute bottom-0 left-0 w-full opacity-[0.05] pointer-events-none" viewBox="0 0 1200 50" preserveAspectRatio="none" fill="none">
        <path d="M0,25 L200,25 L230,6 L260,44 L290,10 L320,40 L350,25 L700,25 L730,6 L760,44 L790,10 L820,40 L850,25 L1200,25" stroke="#2dd4bf" strokeWidth="1.5"/>
      </svg>

      {/* === CONTENT === */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        <p className="text-teal-400 text-xs tracking-widest uppercase font-semibold mb-4">Start Today</p>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Take Control<br />
          <span className="text-teal-400">of Your Health?</span>
        </h2>

        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
          Join thousands of users who have transformed their lives with Wellwigen. Your journey to better health starts with one step.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors shadow-sm text-sm"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate('/contactus')}
            className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors text-sm"
          >
            Book a Free Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
