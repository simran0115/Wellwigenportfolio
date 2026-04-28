import React from "react";
import { Droplet, Moon, Pill } from "lucide-react";

const Ecosystem = () => {
  return (
    <section
      className="w-full py-16 relative overflow-hidden"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: `
          linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >

      {/* === SVG HEALTH VECTORS === */}
      {/* Brain / neural cluster — top right */}
      <svg className="absolute top-8 right-10 opacity-[0.06] pointer-events-none w-20" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="30" stroke="#0d9488" strokeWidth="1.5" fill="none"/>
        <circle cx="40" cy="40" r="18" stroke="#0d9488" strokeWidth="1" fill="none"/>
        <circle cx="40" cy="40" r="6" stroke="#0d9488" strokeWidth="1" fill="none"/>
        <line x1="40" y1="10" x2="40" y2="22" stroke="#0d9488" strokeWidth="1"/>
        <line x1="40" y1="58" x2="40" y2="70" stroke="#0d9488" strokeWidth="1"/>
        <line x1="10" y1="40" x2="22" y2="40" stroke="#0d9488" strokeWidth="1"/>
        <line x1="58" y1="40" x2="70" y2="40" stroke="#0d9488" strokeWidth="1"/>
      </svg>

      {/* Medical cross — bottom left */}
      <svg className="absolute bottom-10 left-10 opacity-[0.06] pointer-events-none" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="8" y="1" width="6" height="20" rx="1.5" fill="#0d9488"/>
        <rect x="1" y="8" width="20" height="6" rx="1.5" fill="#0d9488"/>
      </svg>

      {/* TOP TEXT */}
      <div className="text-center relative z-10 px-4 max-w-3xl mx-auto">
        <p className="text-teal-600 text-xs tracking-widest uppercase font-semibold mb-3">
          Intelligence Core
        </p>

        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          The Wellwigen <span className="text-teal-600">Health Engine</span>
        </h1>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
          Beyond monitoring. Our neural architecture decodes biological markers in real-time to predict health trajectories before they manifest.
        </p>
      </div>

      {/* MAIN GRID — full width with edge padding only */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 md:mt-12 relative z-10 px-4 sm:px-6 lg:px-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* GRAPH CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
              <div>
                <h3 className="text-gray-800 font-medium text-sm sm:text-base">
                  Weekly Neuro-Vascular Load
                </h3>
                <p className="text-[10px] sm:text-sm text-gray-400">
                  Synthetic analysis based on circadian alignment
                </p>
              </div>
              <span className="text-[10px] sm:text-sm px-2 py-1 bg-teal-100 text-teal-600 rounded-full whitespace-nowrap">
                OPTIMAL RANGE
              </span>
            </div>

            {/* GRAPH */}
            <div className="relative h-36 sm:h-44 md:h-48 w-full">
              <div className="absolute inset-0 flex flex-col justify-between z-0">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-[1px] bg-gray-200" />
                ))}
              </div>
              <div className="relative z-10 flex items-end justify-between h-full px-1 sm:px-2">
                {[40, 60, 90, 55, 70, 50, 85].map((h, i) => (
                  <div key={i} className="flex flex-col items-center justify-end h-full gap-1">
                    <span className="text-[8px] sm:text-[10px] text-gray-500">{h}</span>
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-5 sm:w-6 md:w-8 rounded-lg ${
                        i === 2 ? "bg-teal-500" : i === 6 ? "bg-green-400" : "bg-gray-300"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mt-3 sm:mt-5">
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400">AVG HRV</p>
                <p className="font-semibold text-sm sm:text-base">72 ms</p>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400">DEEP SLEEP</p>
                <p className="font-semibold text-sm sm:text-base">2.4 hrs</p>
              </div>
            </div>

            <div className="text-right mt-2 sm:mt-3">
              <button className="text-teal-500 text-sm hover:underline">
                View Detailed Report →
              </button>
            </div>
          </div>

          {/* BOTTOM CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Cognitive Efficiency */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5">
              <h3 className="text-gray-800 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Cognitive Efficiency
              </h3>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-2 sm:mb-3">
                AI detected a 12% increase in beta-wave patterns during your morning work cycle. Focus state is peaking.
              </p>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div style={{ width: "85%" }} className="bg-teal-400 h-2 rounded-full" />
              </div>
              <p className="text-right text-[8px] sm:text-xs text-gray-400 mt-1">85%</p>
            </div>

            {/* Recovery Gradient */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5">
              <h3 className="text-gray-800 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Recovery Gradient
              </h3>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-2 sm:mb-3">
                Metabolic recovery is accelerating. Recommendation: High-intensity interval training session tomorrow.
              </p>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div style={{ width: "84%" }} className="bg-green-400 h-2 rounded-full" />
              </div>
              <p className="text-right text-[8px] sm:text-xs text-gray-400 mt-1">84%</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col mt-6 lg:mt-0 gap-6">

          {/* CRITICAL RISK VECTOR */}
          <div className="bg-white border border-red-100 rounded-2xl p-4 sm:p-5 shadow-sm">
            <p className="text-[10px] sm:text-sm text-red-400 mb-1 sm:mb-2">▲ CRITICAL RISK VECTOR</p>
            <h3 className="text-gray-800 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
              Hydration Anomaly
            </h3>
            <p className="text-[10px] sm:text-sm text-gray-500 mb-3 sm:mb-4">
              Plasma osmality sensors indicate a trend toward cellular dehydration. Cognitive fatigue predicted within 45 minutes.
            </p>
            <button className="w-full bg-red-50 text-red-500 py-2 rounded-lg text-sm hover:bg-red-100 transition-colors">
              Acknowledge Warning
            </button>
          </div>

          {/* AI INTELLIGENCE LAYER */}
          <div className="bg-white border border-teal-100 rounded-2xl p-3 shadow-sm flex flex-col gap-3">

            <div className="leading-tight">
              <p className="text-[8px] sm:text-[10px] tracking-widest text-teal-400 mb-1">AI INTELLIGENCE LAYER</p>
              <h3 className="text-[10px] sm:text-sm font-semibold text-gray-600">Real-Time Intervention System</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">Autonomous protocols stabilizing your biological systems.</p>
            </div>

            {/* AI PROTOCOL */}
            <div className="bg-gray-50 rounded-xl p-2.5">
              <p className="text-[8px] sm:text-[10px] text-teal-400 mb-1">✦ AI Protocol</p>
              <ul className="text-[9px] sm:text-sm text-gray-700 space-y-1.5">
                <li className="flex items-center gap-1">
                  <div className="p-1 bg-teal-100 rounded-md">
                    <Droplet size={12} className="text-teal-600" />
                  </div>
                  Intake 500ml H2O
                </li>
                <li className="flex items-center gap-1">
                  <div className="p-1 bg-indigo-100 rounded-md">
                    <Moon size={12} className="text-indigo-500" />
                  </div>
                  Blue Light Shield
                </li>
                <li className="flex items-center gap-1">
                  <div className="p-1 bg-purple-100 rounded-md">
                    <Pill size={12} className="text-purple-500" />
                  </div>
                  Magnesium L-Threonate
                </li>
              </ul>
              <p className="text-[8px] sm:text-[10px] text-gray-400 mt-1">Immediate stabilization required</p>
            </div>

            {/* ENGINE STATUS */}
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs sm:text-sm text-gray-600 mb-3">ENGINE STATUS</p>
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-300 to-blue-400 shadow-md" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">System Stable</p>
                  <p className="text-xs text-gray-400">Real-time processing active</p>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-teal-500">
                  <span className="w-2 h-2 bg-teal-400 rounded-full" />
                  LIVE
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Ecosystem;
