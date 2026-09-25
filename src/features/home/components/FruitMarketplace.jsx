import React from "react";
import { motion } from "framer-motion";
import { Apple, ShoppingBasket, Truck } from "lucide-react";

export default function FruitMarketplace() {
  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-16 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="bg-[#f8fafc] rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl relative flex flex-col lg:flex-row items-center">
          
          {/* Background decorative shape */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 p-10 md:p-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest mb-6">
                <Apple size={14} /> Fruit Marketplace
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Fresh Organic Fruits, <br />
                <span className="text-teal-600">Delivered Daily.</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
                Fuel your fitness journey and complement your AI meal plans with farm-fresh, organic fruits delivered straight to your door every morning.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm">Daily Morning Delivery</h4>
                    <p className="text-gray-500 text-xs mt-1">Freshly picked and delivered by 7 AM.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <ShoppingBasket size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm">AI Synced Portions</h4>
                    <p className="text-gray-500 text-xs mt-1">Automatically matched to your diet plan.</p>
                  </div>
                </div>
              </div>

              <button className="px-8 py-3.5 bg-teal-600 text-white rounded-full font-bold shadow-lg shadow-teal-600/30 hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300">
                Start Fruit Subscription
              </button>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative">
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop"
              alt="Fresh Organic Fruits"
              className="absolute inset-0 w-full h-full object-cover rounded-b-[40px] lg:rounded-bl-none lg:rounded-r-[40px]"
            />
            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#f8fafc] via-transparent to-transparent opacity-80 pointer-events-none"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
