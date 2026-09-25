import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";

const trainers = [
  {
    name: "Alex Rivera",
    role: "Jungle Fit & Tabata Expert",
    rating: "4.9",
    reviews: "120+",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Sarah Jenkins",
    role: "Holistic Yoga & Mindfulness",
    rating: "5.0",
    reviews: "200+",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "David Chen",
    role: "Personal Strength Coach",
    rating: "4.8",
    reviews: "95+",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mia Rodriguez",
    role: "Pilates & Core Dynamics",
    rating: "4.9",
    reviews: "150+",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
  }
];

export default function VerifiedTrainers() {
  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BadgeCheck className="text-teal-500 w-6 h-6" />
            <p className="text-teal-600 text-xs font-bold tracking-widest uppercase">Verified Professionals</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
            Train With Our <br className="hidden md:block" /> Elite Instructors
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Every trainer on our platform undergoes a rigorous clinical and professional verification process. You are in expert hands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#f8fafc] rounded-[24px] p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 right-0 bg-teal-500 p-1.5 rounded-full border-2 border-white">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{trainer.name}</h3>
              <p className="text-teal-600 text-sm font-medium mb-4">{trainer.role}</p>
              
              <div className="flex items-center justify-center gap-2 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">{trainer.rating}</span>
                <span className="text-gray-400">({trainer.reviews} Reviews)</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
