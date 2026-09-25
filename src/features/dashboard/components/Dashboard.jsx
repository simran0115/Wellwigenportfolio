import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const dotGrid = {
  backgroundColor: '#ffffff',
  backgroundImage: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

const Dashboard = () => {
  return (
    <section className="w-full text-gray-900 py-24 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden relative" style={dotGrid}>
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-teal-600 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Smart Connect Care
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            Complete Integrated <br className="hidden sm:block" /> Ecosystem
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Seamlessly connecting every facet of your clinical journey through a single intelligent portal. Backed by elite doctors, coaches, and scientists.
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Coaches (Left, larger) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="relative md:col-span-7 rounded-[32px] overflow-hidden group bg-white shadow-xl h-[450px] flex flex-col justify-end border border-gray-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop" 
              alt="Fitness Coaches" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-12 text-left flex flex-col items-start">
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">Coach</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Fitness & Nutrition <br/> Coach</h3>
              <p className="text-gray-300 text-sm max-w-sm mb-8 leading-relaxed">
                Your perfect coach is just a few steps away. Find the ideal coach for your unique biological goals & interests.
              </p>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-all text-sm font-semibold shadow-lg shadow-teal-900/20">
                Enroll with a Coach <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Doctors (Right, narrower) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="relative md:col-span-5 rounded-[32px] overflow-hidden group bg-white shadow-xl h-[450px] flex flex-col justify-start border border-gray-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop" 
              alt="Doctor Consultation" 
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/20 to-gray-900/90"></div>
            
            <div className="relative z-10 p-8 md:p-10 text-center flex flex-col items-center pt-16">
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">Expert Doctors</p>
              <h3 className="text-3xl font-bold mb-4 text-white">24/7 Doctor <br/> Consultation</h3>
              <p className="text-gray-300 text-sm max-w-xs mb-8">
                Immediate virtual care with board-certified specialists. Secure video calls & digital prescriptions.
              </p>
              <button className="px-6 py-3 rounded-full bg-white text-teal-700 font-bold hover:bg-gray-100 transition-all text-sm shadow-xl">
                Book Consultation
              </button>
            </div>
          </motion.div>

          {/* Card 3: Diagnostic Labs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="relative md:col-span-7 rounded-[32px] overflow-hidden group shadow-xl h-[450px] flex items-center border border-gray-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1500&auto=format&fit=crop" 
              alt="Diagnostic Labs" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-12 flex flex-col items-start max-w-md">
              <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-2">Home Lab Tests</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Diagnostic <br/> Labs</h3>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                Know your body from within. Convenient home blood sample collection and diagnostic lab tests with comprehensive AI reporting.
              </p>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-teal-700 hover:bg-gray-100 transition-all text-sm font-semibold shadow-lg">
                Book a Lab Test <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Card 4: Online Classes at Home */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="relative md:col-span-5 rounded-[32px] overflow-hidden group shadow-xl h-[450px] flex items-end border border-gray-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=800&auto=format&fit=crop" 
              alt="Online Classes" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/50 to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-10 flex flex-col items-start text-left">
              <p className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-2">Virtual Studio</p>
              <h3 className="text-3xl font-bold mb-4 text-white">Online Classes <br/> At Home</h3>
              <p className="text-teal-50 text-sm mb-6 leading-relaxed">
                Join live Yoga, Tabata, and Jungle Fit classes directly from your living room. Real-time instructor feedback and community support.
              </p>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-400 transition-all text-sm font-semibold shadow-lg">
                Explore Classes <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;
