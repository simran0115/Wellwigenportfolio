import React from "react";

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
    <section className="w-full bg-[#030303] text-white py-32 relative font-sans">
      
      {/* Top Header */}
      <div className="text-center mb-24 px-4">
        <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-4">
          Introducing Wellwigen's
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl mx-auto">
          Future-ready <br className="hidden md:block"/> Framework
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Vertical Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-24 md:gap-40">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Center Node */}
                <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#111] border border-white/20 rotate-45 flex items-center justify-center shadow-2xl">
                    <span className="text-white text-xs md:text-sm font-bold -rotate-45">{step.id}</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-24 text-left' : 'md:pl-24 md:text-left'} flex flex-col justify-center`}>
                  <h3 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">{step.title}</h3>
                  <p className="text-teal-500 text-xs font-medium uppercase tracking-widest mb-6">"{step.subtitle}"</p>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                    {step.desc}
                  </p>
                  <div>
                    <button className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors">
                      {step.button}
                    </button>
                  </div>
                </div>

                {/* Image Content */}
                <div className={`w-full md:w-1/2 mt-12 md:mt-0 pl-16 md:pl-0 ${isEven ? 'md:pl-24' : 'md:pr-24'}`}>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#111] border border-white/5 relative group">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
