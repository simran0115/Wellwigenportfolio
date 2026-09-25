import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="w-full bg-[#050505] text-white py-20 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            The Wellwigen Ecosystem
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-6">
            <span className="text-white">Empowering people to</span><br />
            <span className="text-gray-500">take control of their health</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md">
            Backed by elite doctors, coaches, and scientists who have helped thousands of people worldwide optimize their biology.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Coaches (Left, larger) */}
          <div className="relative md:col-span-7 rounded-[24px] overflow-hidden group bg-[#111] h-[450px] md:h-[550px] flex flex-col justify-end">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop" 
              alt="Fitness Coaches" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-12 text-center flex flex-col items-center">
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase mb-2">Coach</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Fitness & Nutrition <br/> Coach</h3>
              <p className="text-gray-300 text-sm max-w-xs mb-8">
                Your perfect coach is just a few steps away. Find the ideal coach for your goals & interests.
              </p>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-500 hover:border-white hover:bg-white hover:text-black transition-all text-sm font-medium">
                Enroll with a Coach <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2: Doctors (Right, narrower) */}
          <div className="relative md:col-span-5 rounded-[24px] overflow-hidden group bg-[#111] h-[450px] md:h-[550px] flex flex-col justify-start">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop" 
              alt="Doctor Consultation" 
              className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80"></div>
            
            <div className="relative z-10 p-8 md:p-12 text-center flex flex-col items-center pt-16">
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase mb-2">Expert Doctors</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Doctor <br/> consultation</h3>
              <p className="text-gray-300 text-sm max-w-xs mb-8">
                Get medical insights from qualified doctors who understand your health goals and lifestyle.
              </p>
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all text-sm">
                Book Consultation
              </button>
            </div>
          </div>

          {/* Card 3: Diagnostic Labs (Full width) */}
          <div className="relative md:col-span-12 rounded-[24px] overflow-hidden group bg-[#111] h-[400px] flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2000&auto=format&fit=crop" 
              alt="Diagnostic Labs" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-16 flex flex-col items-start max-w-lg">
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase mb-2">Diagnostic Test</p>
              <h3 className="text-3xl md:text-5xl font-bold mb-4">Diagnostic <br/> Labs</h3>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                Know your body from within — uncover what's hidden with precise diagnostics and advanced biomarker analysis.
              </p>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-500 hover:border-white hover:bg-white hover:text-black transition-all text-sm font-medium">
                Book a Lab Test <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 4: Smart Scale */}
          <div className="relative md:col-span-6 rounded-[24px] overflow-hidden group bg-[#0d0d0d] border border-white/5 h-[350px] flex flex-col items-center justify-start p-10">
            <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2">Smart Hardware</p>
            <h3 className="text-3xl font-black tracking-widest mb-4">SENSE</h3>
            <p className="text-gray-400 text-sm text-center max-w-xs mb-6">
              Tracks 50+ body metrics — from fat and muscle mass to injury risks and hydration.
            </p>
            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-600 hover:border-white transition-all text-xs font-medium z-10">
              Buy Now <ArrowRight size={14} />
            </button>
            
            {/* Device Mockup Graphic */}
            <div className="absolute -bottom-16 w-[70%] h-[150px] bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-[40px] opacity-20 blur-sm"></div>
            <div className="absolute -bottom-10 w-[60%] h-[140px] bg-[#1a1a1a] border-t-4 border-gray-600 rounded-t-[30px] flex justify-center pt-4 shadow-2xl">
              <div className="w-16 h-8 bg-black rounded flex items-center justify-center text-green-400 font-mono text-xs">82.4</div>
            </div>
          </div>

          {/* Card 5: Smart Ring */}
          <div className="relative md:col-span-6 rounded-[24px] overflow-hidden group bg-[#0d0d0d] border border-white/5 h-[350px] flex flex-col items-center justify-start p-10">
            <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-2">Smart Wearable</p>
            <h3 className="text-3xl font-black tracking-widest mb-4 uppercase">BioRing</h3>
            <p className="text-gray-400 text-sm text-center max-w-xs mb-6">
              Monitor your body 24x7 — From sleep, HRV, stress, activity, recovery and more.
            </p>
            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-600 hover:border-white transition-all text-xs font-medium z-10">
              Buy Now <ArrowRight size={14} />
            </button>

            {/* Device Mockup Graphic */}
            <div className="absolute -bottom-20 w-48 h-48 rounded-full border-[12px] border-gray-800 shadow-[0_0_50px_rgba(255,255,255,0.05)] transform rotate-45 flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border-4 border-gray-600/50"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;
