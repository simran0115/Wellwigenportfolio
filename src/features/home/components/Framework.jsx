import React from "react";
import { motion } from "framer-motion";

const steps = [
  { 
    id: "01", 
    title: "First, We Track Your Baseline", 
    subtitle: "Wearables & real-time sync", 
    desc: "Your health starts with accessing your current baseline. We use a combination of continuous glucose monitors, smart rings, and lab biomarkers to build your digital twin.",
    button: "Connect Wearable >",
    img: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "02", 
    title: "Second, AI Clinical Analysis", 
    subtitle: "Advanced clinical intelligence", 
    desc: "Our neural architecture processes your bio-data in real-time, decoding biological markers to predict health trajectories and metabolic dysfunctions before they manifest.",
    button: "View AI Insights >",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop"
  },
  { 
    id: "03", 
    title: "Third, 24/7 Expert Support", 
    subtitle: "Doctor monitoring", 
    desc: "A dedicated team of board-certified specialists and nutritionists monitor your vitals, providing immediate telemedicine interventions exactly when your body needs them.",
    button: "Meet Your Doctor >",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Framework() {
  return (
    <section id="howitworks" className="w-full bg-[#f8fafc] text-gray-900 py-32 relative font-sans overflow-hidden">
      
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24 px-4 relative z-10"
      >
        <p className="text-teal-600 text-sm font-bold tracking-widest uppercase mb-4">
          Introducing Wellwigen's
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 max-w-2xl mx-auto">
          Future-ready <br className="hidden md:block"/> Framework
        </h2>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vertical Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-teal-100 md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-24 md:gap-40">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Center Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-teal-500 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-teal-600 text-xs md:text-sm font-black">{step.id}</span>
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-24 text-left' : 'md:pl-24 md:text-left'} flex flex-col justify-center`}
                >
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-gray-900">{step.title}</h3>
                  <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-6">"{step.subtitle}"</p>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                    {step.desc}
                  </p>
                  <div>
                    <button className="px-6 py-2.5 rounded-full bg-white border-2 border-teal-100 text-teal-700 font-bold text-xs hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm">
                      {step.button}
                    </button>
                  </div>
                </motion.div>

                {/* Image Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`w-full md:w-1/2 mt-12 md:mt-0 pl-16 md:pl-0 ${isEven ? 'md:pl-24' : 'md:pr-24'}`}
                >
                  <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-white shadow-2xl relative group">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
