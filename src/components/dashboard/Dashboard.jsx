// Dashboard.jsx
import React from "react";
import {
  Stethoscope,
  Dumbbell,
  FlaskConical,
  Pill,
  Apple,
  ShoppingBasket
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#f5f7f8]">

      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20">

        {/* Heading */}
        <p className="text-center text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] text-gray-400 mb-2">
          SMART CONNECT CARE
        </p>

        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-snug">
          Complete Integrated <br className="hidden sm:block" /> Ecosystem
        </h2>

        <p className="text-center text-gray-500 mt-3 sm:mt-4 max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Seamlessly connecting every facet of your clinical journey through a
          single intelligent portal.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-10 sm:mt-12 md:mt-14">

          {/* LEFT BIG CARD */}
          <div className="relative sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-teal-300 to-teal-600 rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col justify-end text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/20 backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)]">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-2xl"></div>

            <div className="relative flex items-center gap-2 sm:gap-3 mb-1">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Stethoscope size={20} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                Doctors Consultation
              </h3>
            </div>

            <p className="relative text-sm sm:text-base mt-1 text-white/85 max-w-md leading-relaxed">
              24/7 access to board-certified specialists via secure, lag-free
              clinical uplinks. Instant prescriptions and referrals.
            </p>

            <button className="relative mt-3 sm:mt-4 text-sm sm:text-base font-medium flex items-center gap-2 bg-white/25 hover:bg-white/35 px-3 sm:px-4 py-2 rounded-lg w-fit transition-all duration-300">
              CONNECT NOW →
            </button>
          </div>

          {/* RIGHT CARD */}
          <div className="relative bg-gray-900 rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col justify-end text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/10 overflow-hidden group transition-all duration-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5 blur-2xl"></div>

            <p className="relative text-xs sm:text-sm text-teal-300 mb-1 tracking-wide">
              BIOMETRIC LINKED
            </p>

            <div className="relative flex items-center gap-2 sm:gap-3">
              <div className="bg-teal-500/20 p-2 rounded-lg">
                <Dumbbell size={18} />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold tracking-tight">
                Fitness Training
              </h3>
            </div>

            <p className="relative text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 leading-relaxed">
              Movement protocols that adapt dynamically to your morning HRV and recovery metrics.
            </p>
          </div>

          {/* BOTTOM LEFT */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-end shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-teal-100 p-2 rounded-lg">
                <FlaskConical size={16} className="text-teal-600" />
              </div>
              <h3 className="text-gray-800 text-sm sm:text-base font-medium tracking-tight">
                Lab Tests
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
              Advanced diagnostics powered by AI.
            </p>
          </div>

          {/* MIDDLE CARD */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Pill size={16} className="text-teal-600" />
                </div>
                <h3 className="text-gray-800 text-sm sm:text-base font-medium tracking-tight">
                  Medicine Delivery
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                Cold-chain pharmaceutical delivery tracked in real-time to your door.
              </p>
            </div>
          </div>

          {/* RIGHT STACK */}
          <div className="flex flex-col gap-3 sm:gap-4">

            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-2">
                <div className="bg-teal-100 p-2 rounded-md">
                  <Apple size={14} className="text-teal-600" />
                </div>
                <h4 className="text-gray-800 text-sm sm:text-base font-medium tracking-tight">
                  Nutrition & Food
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                Macronutrient-aligned meal planning
              </p>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-2">
                <div className="bg-teal-100 p-2 rounded-md">
                  <ShoppingBasket size={14} className="text-teal-600" />
                </div>
                <h4 className="text-gray-800 text-sm sm:text-base font-medium tracking-tight">
                  Fruit Marketplace
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
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