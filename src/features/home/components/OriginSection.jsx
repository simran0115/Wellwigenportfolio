import React from 'react';

const OriginSection = () => {
  return (
    <section className="w-full py-20 px-6 lg:px-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Image Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div className="relative w-[320px] sm:w-[400px] h-[480px] sm:h-[550px] bg-[#2a2315] rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-end p-8 border border-white/5">
            {/* Background Gold Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[300px] h-[300px] bg-[#d3a152] rounded-full opacity-80 blur-[2px]"></div>
            
            {/* Person Image (Placeholder / Add correct src) */}
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600&h=800" 
              alt="Founder"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] object-cover object-bottom"
              style={{ maxHeight: '85%' }}
            />
            
            {/* Text at Bottom */}
            <div className="relative z-10 mt-auto">
              <p className="text-[#d3a152] text-xs font-bold tracking-widest uppercase mb-1">Founder</p>
              <h3 className="text-white text-2xl font-bold tracking-tight">John Doe</h3>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[#d3a152] text-xs font-bold tracking-widest uppercase">The Origin</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="text-white">Born from frustration</span><br/>
              <span className="text-gray-500">with the healthcare industry.</span>
            </h2>
          </div>

          <div className="text-gray-300 text-base sm:text-lg leading-relaxed flex flex-col gap-6 font-light mt-4">
            <p>
              Wellwigen started with a simple observation: <strong className="text-white font-medium">most people who struggle with health aren't careless. They're unsupported.</strong> Generic plans, random web searches, and doctors who disappear after the consultation.
            </p>
            <p>
              Our founder built Wellwigen to solve exactly that. A structured, accountable ecosystem modeled after how elite professionals are cared for: but designed for the real life of everyday people.
            </p>
            <p>
              What started as small personalized care plans has grown into a <strong className="text-white font-medium">global holistic health platform</strong> serving clients across 15+ countries, all following the same proven system.
            </p>
            <p>
              <strong className="text-[#d3a152] font-medium">The mission hasn't changed:</strong> give every client a clear roadmap, real accountability, and health results they can measure.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default OriginSection;
