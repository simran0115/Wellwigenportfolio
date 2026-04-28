import React from "react";
import { Activity, Brain, BriefcaseMedical, Utensils, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  { step: "01", title: "Track Health", subtitle: "Wearables & real-time sync", icon: Activity },
  { step: "02", title: "AI Analysis", subtitle: "Advanced clinical intelligence", icon: Brain },
  { step: "03", title: "Expert Support", subtitle: "24/7 doctor monitoring", icon: BriefcaseMedical },
  { step: "04", title: "Nutrition Plan", subtitle: "Personalized diet optimization", icon: Utensils },
  { step: "05", title: "Monitoring", subtitle: "Real-time adaptive tracking", icon: HeartPulse },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: "#f8fafc",
        backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.2) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* === SVG HEALTH VECTORS (decorative watermarks) === */}

      {/* ECG / Heartbeat line — top right */}
      <svg
        className="absolute top-20 right-0 w-80 opacity-[0.07] pointer-events-none"
        viewBox="0 0 320 60"
        fill="none"
      >
        <path
          d="M0,30 L55,30 L70,6 L85,54 L100,14 L115,46 L130,30 L320,30"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Medical cross — top left */}
      <svg
        className="absolute top-28 left-14 opacity-[0.08] pointer-events-none"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <rect x="11" y="2" width="8" height="26" rx="2" fill="#0d9488" />
        <rect x="2" y="11" width="26" height="8" rx="2" fill="#0d9488" />
      </svg>

      {/* Small cross — mid left */}
      <svg
        className="absolute top-1/2 left-8 opacity-[0.06] pointer-events-none"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <rect x="7" y="1" width="4" height="16" rx="1.5" fill="#0d9488" />
        <rect x="1" y="7" width="16" height="4" rx="1.5" fill="#0d9488" />
      </svg>

      {/* Small cross — bottom right area */}
      <svg
        className="absolute bottom-32 right-28 opacity-[0.06] pointer-events-none"
        width="14"
        height="14"
        viewBox="0 0 18 18"
        fill="none"
      >
        <rect x="7" y="1" width="4" height="16" rx="1.5" fill="#0d9488" />
        <rect x="1" y="7" width="16" height="4" rx="1.5" fill="#0d9488" />
      </svg>

      {/* Shield with checkmark — right side */}
      <svg
        className="absolute top-1/3 right-14 opacity-[0.06] pointer-events-none w-20"
        viewBox="0 0 80 96"
        fill="none"
      >
        <path
          d="M40 6L10 18V44C10 62 23 79 40 88C57 79 70 62 70 44V18L40 6Z"
          stroke="#0d9488"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M26 46l10 10 18-20"
          stroke="#0d9488"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Heart outline — bottom left */}
      <svg
        className="absolute bottom-36 left-20 opacity-[0.06] pointer-events-none w-14"
        viewBox="0 0 56 52"
        fill="none"
      >
        <path
          d="M28 48C28 48 4 34 4 18C4 10 10 4 18 4C22.5 4 27 7 28 12C29 7 33.5 4 38 4C46 4 52 10 52 18C52 34 28 48 28 48Z"
          stroke="#0d9488"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* DNA ellipses — far left */}
      <svg
        className="absolute left-4 top-40 opacity-[0.05] pointer-events-none w-10"
        viewBox="0 0 40 130"
        fill="none"
      >
        {[14, 38, 62, 86, 110].map((cy, i) => (
          <ellipse key={i} cx="20" cy={cy} rx="16" ry="7" stroke="#0d9488" strokeWidth="1.2" fill="none" />
        ))}
        <line x1="4" y1="14" x2="4" y2="110" stroke="#0d9488" strokeWidth="1.2" />
        <line x1="36" y1="14" x2="36" y2="110" stroke="#0d9488" strokeWidth="1.2" />
      </svg>

      {/* Tiny plus — mid area */}
      <svg
        className="absolute top-44 left-1/3 opacity-[0.04] pointer-events-none"
        width="12"
        height="12"
        viewBox="0 0 18 18"
        fill="none"
      >
        <rect x="7" y="1" width="4" height="16" rx="1.5" fill="#0d9488" />
        <rect x="1" y="7" width="16" height="4" rx="1.5" fill="#0d9488" />
      </svg>

      {/* === MAIN CONTENT === */}
      <div className="pt-32 pb-14 px-4 flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">

        {/* Platform badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-teal-100 text-teal-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 shadow-sm">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
          AI-Powered Health Platform
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
          Handover Your Health<br />
          <span className="text-teal-600">to Wellwigen</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-9 leading-relaxed">
          A premium clinical ecosystem that monitors, guides, and adapts to your biology for total peace of mind.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            onClick={() => navigate("/register")}
            className="px-7 py-3 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate("/ecosystem")}
            className="px-7 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            See How It Works →
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                src={`https://i.pravatar.cc/32?img=${i}`}
                alt={`user${i}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            Join <strong className="text-gray-800">6,000+</strong> users already on Wellwigen
          </span>
        </div>
      </div>

      {/* === STEPS GRID === */}
      <div className="w-full max-w-6xl mx-auto px-4 pb-16 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {steps.map(({ step, title, subtitle, icon: Icon }, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-3"
            >
              <span className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">
                Step {step}
              </span>
              <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
                <Icon size={18} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
