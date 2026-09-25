import React from "react";
import { motion } from "framer-motion";
import { Apple, ShoppingBasket, Truck, Plus } from "lucide-react";

const fruits = [
  { name: "Organic Avocados", price: "$12/box", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=300&auto=format&fit=crop" },
  { name: "Fresh Berries Mix", price: "$15/box", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=300&auto=format&fit=crop" },
  { name: "Citrus Oranges", price: "$10/box", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=300&auto=format&fit=crop" },
  { name: "Green Apples", price: "$8/box", img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=300&auto=format&fit=crop" },
];

export default function FruitMarketplace() {
  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-16 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Main Container - Removed shadow-2xl, kept a soft minimal border */}
        <div className="bg-[#f8fafc] rounded-[40px] overflow-hidden border border-gray-100 relative flex flex-col lg:flex-row items-center p-4">
          
          {/* Background decorative shape */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 relative z-10">
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
              
              <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                Fuel your fitness journey and complement your AI meal plans with farm-fresh, organic fruits delivered straight to your door every morning.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 text-teal-600">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Daily Morning Delivery</h4>
                    <p className="text-gray-500 text-xs mt-1">Freshly picked and delivered by 7 AM.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                    <ShoppingBasket size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">AI Synced Portions</h4>
                    <p className="text-gray-500 text-xs mt-1">Automatically matched to your diet plan.</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-teal-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300">
                Start Fruit Subscription
              </button>
            </motion.div>
          </div>
          
          {/* Visual Content - Grid of multiple fruits */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              {fruits.map((fruit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3">
                    <img src={fruit.img} alt={fruit.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-600 shadow-sm hover:bg-teal-500 hover:text-white transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{fruit.name}</h4>
                  <p className="text-teal-600 text-xs font-semibold">{fruit.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
