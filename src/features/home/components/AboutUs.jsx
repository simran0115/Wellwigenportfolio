import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Users, Award } from "lucide-react";

export default function AboutUs() {
  const stats = [
    { label: "Active Members", value: "10k+", icon: <Users size={20} className="text-teal-600" /> },
    { label: "Clinical Experts", value: "50+", icon: <Award size={20} className="text-teal-600" /> },
    { label: "Health Scans", value: "1M+", icon: <Activity size={20} className="text-teal-600" /> },
    { label: "Data Security", value: "HIPAA", icon: <ShieldCheck size={20} className="text-teal-600" /> },
  ];

  return (
    <section id="about" className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-4"
          >
            Our Mission & Vision
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8"
          >
            Reimagining Healthcare <br className="hidden sm:block" /> for the Modern Era.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-light text-lg leading-relaxed"
          >
            Wellwigen was founded on a simple premise: your healthcare should be as advanced as the rest of your life. We are bridging the gap between clinical medicine, artificial intelligence, and everyday wellness to provide a proactive approach to human longevity. 
          </motion.p>
        </div>

        {/* Two Column Story */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Why We Exist</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Traditional healthcare is reactive—treating symptoms only after they appear. We believe in a proactive model. By continuously analyzing your bio-data, daily habits, and nutritional intake, our AI models and human doctors work together to prevent illness and optimize your daily performance.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              Whether you are an athlete looking to break records, or someone simply wanting more energy to play with their kids, our ecosystem adapts entirely to your biological needs.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-sm border border-gray-100"
          >
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop" 
              alt="Lab research" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-teal-900/10"></div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-extrabold text-gray-900">{stat.value}</h4>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
