import React from 'react';
import { Users, Award, Activity } from 'lucide-react';

const metrics = [
  { value: '5,000+', label: 'Trusted Clients', sub: 'Active users on the platform', icon: Users },
  { value: '500+', label: 'Verified Experts', sub: 'Certified professionals', icon: Award },
  { value: '100k+', label: 'Sessions Delivered', sub: 'Health sessions completed', icon: Activity },
];

const Metrics = () => {
  return (
    <section
      className="py-20 relative overflow-hidden"
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

      {/* ECG watermark — full width bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-[0.05] pointer-events-none"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,30 L180,30 L210,8 L240,52 L270,14 L300,46 L330,30 L580,30 L610,8 L640,52 L670,14 L700,46 L730,30 L980,30 L1010,8 L1040,52 L1070,14 L1100,46 L1130,30 L1200,30"
          stroke="#2dd4bf"
          strokeWidth="1.5"
        />
      </svg>

      {/* Medical cross — top left */}
      <svg
        className="absolute top-8 left-10 opacity-[0.08] pointer-events-none"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <rect x="9" y="1" width="8" height="24" rx="2" fill="#2dd4bf" />
        <rect x="1" y="9" width="24" height="8" rx="2" fill="#2dd4bf" />
      </svg>

      {/* Medical cross — bottom right */}
      <svg
        className="absolute bottom-8 right-10 opacity-[0.06] pointer-events-none"
        width="18"
        height="18"
        viewBox="0 0 26 26"
        fill="none"
      >
        <rect x="9" y="1" width="8" height="24" rx="2" fill="#2dd4bf" />
        <rect x="1" y="9" width="24" height="8" rx="2" fill="#2dd4bf" />
      </svg>

      {/* Shield — top right */}
      <svg
        className="absolute top-6 right-16 opacity-[0.06] pointer-events-none w-16"
        viewBox="0 0 64 80"
        fill="none"
      >
        <path
          d="M32 4L8 14V36C8 54 18 68 32 76C46 68 56 54 56 36V14L32 4Z"
          stroke="#2dd4bf"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M20 38l10 10 16-18"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* === CONTENT === */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <p className="text-teal-400 text-xs tracking-widest uppercase font-semibold mb-3">Our Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Thousands</h2>
          <p className="text-gray-400 mt-3 text-base">Clients and professionals worldwide rely on Wellwigen.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {metrics.map(({ value, label, sub, icon: Icon }, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-2xl p-8 bg-white/5"
            >
              <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center mb-5">
                <Icon size={20} className="text-teal-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">{value}</div>
              <p className="text-white font-semibold text-lg mb-1">{label}</p>
              <p className="text-gray-400 text-sm">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
