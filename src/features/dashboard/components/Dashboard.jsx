import React from "react";
import { Stethoscope, Dumbbell, FlaskConical, Pill, Apple, ShoppingBasket } from "lucide-react";

const dotGrid = {
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
};

const Dashboard = () => {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20">

        {/* Heading */}
        <p className="text-center text-teal-600 text-xs tracking-widest uppercase font-semibold mb-3">
          Smart Connect Care
        </p>
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
          Complete Integrated <br className="hidden sm:block" /> Ecosystem
        </h2>
        <p className="text-center text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Seamlessly connecting every facet of your clinical journey through a single intelligent portal.
        </p>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">

          {/* HERO CARD — Doctors Consultation (teal) */}
          <div
            className="sm:col-span-2 lg:col-span-2 relative rounded-2xl p-7 sm:p-8 flex flex-col justify-end text-white shadow-lg overflow-hidden min-h-[240px]"
            style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 60%, #134e4a 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.12]" style={dotGrid} />
            {/* decorative ring */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 border-white/20" />
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-white/10" />

            <div className="relative flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                <Stethoscope size={22} />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Doctors Consultation</h3>
            </div>
            <p className="relative text-sm text-white/80 max-w-md leading-relaxed">
              24/7 access to board-certified specialists via secure, lag-free clinical uplinks. Instant prescriptions and referrals.
            </p>
            <button className="relative mt-5 text-sm font-semibold flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg w-fit transition-colors border border-white/20">
              CONNECT NOW →
            </button>
          </div>

          {/* Fitness Training — dark slate */}
          <div
            className="relative rounded-2xl p-6 flex flex-col justify-end text-white shadow-lg overflow-hidden min-h-[240px]"
            style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.08]" style={dotGrid} />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-teal-500/20" />

            <p className="relative text-[10px] text-teal-400 mb-2 tracking-widest uppercase font-semibold">
              Biometric Linked
            </p>
            <div className="relative flex items-center gap-2 mb-2">
              <div className="bg-teal-500/20 p-2 rounded-lg border border-teal-500/30">
                <Dumbbell size={18} className="text-teal-400" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">Fitness Training</h3>
            </div>
            <p className="relative text-xs text-gray-400 leading-relaxed">
              Movement protocols that adapt dynamically to your morning HRV and recovery metrics.
            </p>
          </div>

          {/* Lab Tests — violet */}
          <div
            className="relative rounded-2xl p-5 sm:p-6 flex flex-col justify-end text-white shadow-lg overflow-hidden min-h-[160px]"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.12]" style={dotGrid} />
            <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-white/15" />

            <div className="relative flex items-center gap-2 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <FlaskConical size={16} />
              </div>
              <h3 className="text-base font-bold tracking-tight">Lab Tests</h3>
            </div>
            <p className="relative text-xs text-white/75 leading-relaxed">
              Advanced diagnostics powered by AI.
            </p>
          </div>

          {/* Medicine Delivery — blue */}
          <div
            className="relative rounded-2xl p-5 sm:p-6 flex flex-col justify-end text-white shadow-lg overflow-hidden min-h-[160px]"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.12]" style={dotGrid} />
            <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-white/15" />

            <div className="relative flex items-center gap-2 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Pill size={16} />
              </div>
              <h3 className="text-base font-bold tracking-tight">Medicine Delivery</h3>
            </div>
            <p className="relative text-xs text-white/75 leading-relaxed">
              Cold-chain pharmaceutical delivery tracked in real-time to your door.
            </p>
          </div>

          {/* Nutrition & Fruit — stacked */}
          <div className="flex flex-col gap-4">

            {/* Nutrition — orange */}
            <div
              className="relative flex-1 rounded-xl p-4 sm:p-5 flex flex-col justify-end text-white shadow-md overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.12]" style={dotGrid} />
              <div className="relative flex items-center gap-2 mb-1">
                <div className="bg-white/20 p-1.5 rounded-md">
                  <Apple size={14} />
                </div>
                <h4 className="text-sm font-bold tracking-tight">Nutrition & Food</h4>
              </div>
              <p className="relative text-xs text-white/80 leading-snug">
                Macronutrient-aligned meal planning
              </p>
            </div>

            {/* Fruit Marketplace — emerald */}
            <div
              className="relative flex-1 rounded-xl p-4 sm:p-5 flex flex-col justify-end text-white shadow-md overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.12]" style={dotGrid} />
              <div className="relative flex items-center gap-2 mb-1">
                <div className="bg-white/20 p-1.5 rounded-md">
                  <ShoppingBasket size={14} />
                </div>
                <h4 className="text-sm font-bold tracking-tight">Fruit Marketplace</h4>
              </div>
              <p className="relative text-xs text-white/80 leading-snug">
                Fresh organic supply chain
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;
