import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const classesData = [
  {
    title: "Yoga Classes",
    desc: "Improve flexibility, balance, and mindfulness with expert-led virtual yoga.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Jungle Fit Classes",
    desc: "High-intensity functional movements designed to build raw strength and endurance.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Tabata Classes",
    desc: "Short, intense bursts of cardiovascular exercise for maximum calorie burn.",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Personal Training",
    desc: "1-on-1 online sessions perfectly tailored to your unique biological baseline.",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  }
];

export default function FitnessClasses() {
  const handleCardClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#f8fafc] py-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-teal-600 text-xs font-bold tracking-widest uppercase mb-4">
            Virtual Studio
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
            Transform With Our <br className="hidden md:block" /> Premium Classes
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Choose from a variety of expert-led online sessions tailored to your goals. Click on any class to reserve your spot!
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classesData.map((cls, idx) => (
            <motion.a
              key={idx}
              href="#contact"
              onClick={handleCardClick}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative h-[380px] rounded-[24px] overflow-hidden block shadow-lg bg-white border border-gray-100 cursor-pointer"
            >
              <img 
                src={cls.img} 
                alt={cls.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute inset-x-3 bottom-3 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left flex flex-col justify-end transform transition-all duration-500 group-hover:bg-white/20">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white tracking-wide">{cls.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed font-light transform h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
                  {cls.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
