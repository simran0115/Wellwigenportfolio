// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";

import { Droplet, Moon, Pill } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};
// sdfsd
const Ecosystem = () => {
  return (
    <section className="w-full min-h-screen bg-white px-4 sm:px-6 md:px-12 lg:px-16 py-16 relative overflow-hidden">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-80px] left-[-80px] w-60 sm:w-80 md:w-96 h-60 sm:h-80 md:h-96 bg-teal-200 blur-[120px] opacity-30 rounded-full" />
      <div className="absolute bottom-[-100px] right-[-60px] w-60 sm:w-80 md:w-96 h-60 sm:h-80 md:h-96 bg-blue-200 blur-[120px] opacity-30 rounded-full" />

      {/* TOP TEXT */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center text-[10px] sm:text-xs md:text-sm tracking-widest text-gray-400 mb-3"
      >
        INTELLIGENCE CORE
      </motion.p>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-800"
      >
        The Wellwigen <span className="text-teal-500">Health Engine</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center text-gray-500 mt-2 sm:mt-3 md:mt-4 max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-xs sm:text-sm md:text-base"
      >
        Beyond monitoring. Our neural architecture decodes biological markers in real-time to predict health trajectories before they manifest.
      </motion.p>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 md:mt-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* GRAPH CARD */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition"
          >
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
                  <div key={i} className="w-full h-[1px] bg-gray-300/50"></div>
                ))}
              </div>

              <div className="relative z-10 flex items-end justify-between h-full px-1 sm:px-2">
                {[40, 60, 90, 55, 70, 50, 85].map((h, i) => (
                  <div key={i} className="flex flex-col items-center justify-end h-full gap-1">
                    <span className="text-[8px] sm:text-[10px] text-gray-500">{h}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`w-5 sm:w-6 md:w-8 rounded-lg ${i === 2 ? "bg-teal-500" : i === 6 ? "bg-green-400" : "bg-gray-400"
                        } shadow-sm`}
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
          </motion.div>

          {/* BOTTOM CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Cognitive Efficiency */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white/70 backdrop-blur-md rounded-2xl p-3 sm:p-5 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-gray-800 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Cognitive Efficiency
              </h3>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-2 sm:mb-3">
                AI detected a 12% increase in beta-wave patterns during your morning work cycle. Focus state is peaking.
              </p>

              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1 }}
                  className="bg-teal-400 h-2 rounded-full"
                />
              </div>

              <p className="text-right text-[8px] sm:text-xs text-gray-400 mt-1">85%</p>
            </motion.div>

            {/* Recovery Gradient */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-white/70 backdrop-blur-md rounded-2xl p-3 sm:p-5 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-gray-800 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Recovery Gradient
              </h3>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-2 sm:mb-3">
                Metabolic recovery is accelerating. Recommendation: High-intensity interval training session tomorrow.
              </p>

              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "84%" }}
                  transition={{ duration: 1 }}
                  className="bg-green-400 h-2 rounded-full"
                />
              </div>

              <p className="text-right text-[8px] sm:text-xs text-gray-400 mt-1">84%</p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col mt-6 lg:mt-0 gap-6">

          {/* CRITICAL RISK VECTOR */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-xl transition"
          >
            <p className="text-[10px] sm:text-sm text-red-400 mb-1 sm:mb-2">▲ CRITICAL RISK VECTOR</p>

            <h3 className="text-gray-800 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
              Hydration Anomaly
            </h3>

            <p className="text-[10px] sm:text-sm text-gray-500 mb-3 sm:mb-4">
              Plasma osmality sensors indicate a trend toward cellular dehydration. Cognitive fatigue predicted within 45 minutes.
            </p>

            <button className="w-full bg-red-100 text-red-500 py-2 rounded-lg text-sm hover:bg-red-200 transition">
              Acknowledge Warning
            </button>
          </motion.div>

          {/* AI INTELLIGENCE LAYER */}
          <div className="bg-gradient-to-br from-white/80 to-teal-50/60 backdrop-blur-xl border border-teal-100 rounded-2xl p-3 shadow-md flex flex-col gap-3">

            {/* HEADER */}
            <div className="leading-tight">
              <p className="text-[8px] sm:text-[10px] tracking-widest text-teal-400 mb-1">AI INTELLIGENCE LAYER</p>
              <h3 className="text-[10px] sm:text-sm font-semibold text-gray-600">Real-Time Intervention System</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">Autonomous protocols stabilizing your biological systems.</p>
            </div>

            {/* AI PROTOCOL */}
            <div className="bg-white/80 rounded-xl p-2.5 shadow-sm hover:shadow-md transition">
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
            <div className="bg-white/80 rounded-2xl p-2 shadow-sm hover:shadow-md transition">
              <p className="text-xs sm:text-sm text-gray-600 mb-3">ENGINE STATUS</p>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative flex items-center justify-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} className="absolute w-12 h-12 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-full border border-teal-300/40" />
                  <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full border-2 border-teal-400/50" />
                  <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-teal-300 to-blue-400 shadow-lg" />
                  <div className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-teal-200/20 blur-xl"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-small text-gray-700">System Stable</p>
                  <p className="text-xs text-gray-400">Real-time processing active</p>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-teal-500">
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-ping"></span>
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