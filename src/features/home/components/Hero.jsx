import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const categories = [
  "Wellwigen",
  "Yoga Classes",
  "Tabata Classes",
  "Jungle Fit Classes",
  "Personal Online Training"
];

const sliderImages = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526506118393-27e4ee640825?q=80&w=800&auto=format&fit=crop"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function Hero() {
  const navigate = useNavigate();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const sliderX1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const sliderX2 = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: "radial-gradient(circle, rgba(13, 148, 136, 0.1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* === SVG HEALTH VECTORS === */}
        <svg className="absolute top-20 right-0 w-80 opacity-[0.07]" viewBox="0 0 320 60" fill="none">
          <path d="M0,30 L55,30 L70,6 L85,54 L100,14 L115,46 L130,30 L320,30" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="absolute top-28 left-14 opacity-[0.08]" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <rect x="11" y="2" width="8" height="26" rx="2" fill="#0d9488" />
          <rect x="2" y="11" width="26" height="8" rx="2" fill="#0d9488" />
        </svg>
        <svg className="absolute top-1/3 right-14 opacity-[0.06] w-20" viewBox="0 0 80 96" fill="none">
          <path d="M40 6L10 18V44C10 62 23 79 40 88C57 79 70 62 70 44V18L40 6Z" stroke="#0d9488" strokeWidth="2" fill="none" />
          <path d="M26 46l10 10 18-20" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* === MAIN CONTENT === */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-32 pb-14 px-4 flex flex-col items-center text-center max-w-full mx-auto relative z-10"
      >
        
        {/* Platform badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 shadow-sm">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
          AI-Powered Telehealth & Wellness Platform
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-5 tracking-tight">
          Handover Your Health<br />
          <span className="inline-flex items-center justify-center flex-wrap gap-x-3 mt-1 sm:mt-2">
            <span>to</span>
            <span className="text-teal-600 text-left min-w-[220px] sm:min-w-[320px] md:min-w-[480px] relative h-[48px] sm:h-[60px] md:h-[84px] inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentCategoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-0 w-full whitespace-nowrap"
                >
                  {categories[currentCategoryIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p variants={itemVariants} className="text-gray-500 text-lg md:text-xl max-w-2xl mb-9 leading-relaxed">
          Access immediate <strong>online doctor consultations</strong>, automated <strong>AI meal plans</strong>, and certified <strong>virtual fitness training</strong> in a single integrated telehealth platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mb-10">
          <Link
            to="/register"
            className="px-8 py-3.5 bg-teal-600 text-white text-sm font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/30 flex items-center justify-center hover:-translate-y-1 transform duration-200"
          >
            Get Started Free
          </Link>
          <Link
            to="/ecosystem"
            className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center hover:-translate-y-1 transform duration-200"
          >
            See How It Works →
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                src={`https://i.pravatar.cc/40?img=${i}`}
                alt={`Wellwigen active user avatar ${i}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            Join <strong className="text-gray-900">6,000+</strong> users already on Wellwigen
          </span>
        </motion.div>
      </motion.div>

      {/* === IMAGE SLIDER (PARALLAX + MARQUEE) === */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full overflow-hidden relative z-10 mb-16 space-y-4"
      >
        <motion.div style={{ x: sliderX1 }} className="flex animate-marquee gap-4 px-4 w-[200%]">
          {[...sliderImages, ...sliderImages].map((imgUrl, idx) => (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              key={`row1-${idx}`} 
              className="w-48 h-32 md:w-72 md:h-48 flex-shrink-0 rounded-[24px] overflow-hidden shadow-xl"
            >
              <img src={imgUrl} alt="Wellness Activity" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
