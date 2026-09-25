import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Dumbbell, HeartPulse, Sparkles } from 'lucide-react';

const programs = [
  {
    title: "Weight Loss Journey",
    desc: "Shed stubborn fat safely with AI-synced meal plans and cardio tracking.",
    icon: Flame,
    color: "from-orange-400 to-red-500",
    bg: "bg-orange-50",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Weight Gain & Muscle",
    desc: "Build lean muscle mass with high-protein diets and strength training.",
    icon: Dumbbell,
    color: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Metabolic Reset",
    desc: "Rebalance your hormones and gut health through clinical nutrition.",
    icon: HeartPulse,
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Holistic Wellness",
    desc: "Improve mental clarity and flexibility through guided yoga and meditation.",
    icon: Sparkles,
    color: "from-purple-400 to-pink-500",
    bg: "bg-purple-50",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop"
  }
];

export default function HealthPrograms() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#f8fafc] py-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-4">Targeted Goals</p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
            Explore Dedicated <br className="hidden md:block" /> Health Programs
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Whether you want to lose weight, build muscle, or simply live healthier, select a goal below to speak with our clinical experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, idx) => (
            <motion.a
              key={idx}
              href="#contact"
              onClick={scrollToContact}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group block bg-white rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className={`absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${prog.color} flex items-center justify-center text-white shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`}>
                  <prog.icon size={20} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{prog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{prog.desc}</p>
                <div className="flex items-center text-teal-600 font-semibold text-sm">
                  Consult Expert <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
