import React, { useState, useEffect } from "react";
import {
  Activity,
  Brain,
  BriefcaseMedical,
  Utensils,
  HeartPulse
} from "lucide-react";

const cardsData = [
  { step: "STEP 01", title: "Track your health", subtitle: "Wearables & real-time data sync", gradient: "from-blue-200 to-blue-300", icon: Activity },
  { step: "STEP 02", title: "AI analyzes your body", subtitle: "Advanced clinical intelligence", gradient: "from-green-200 to-green-300", icon: Brain },
  { step: "STEP 03", title: "Doctors & labs support", subtitle: "24/7 expert monitoring", gradient: "from-purple-200 to-purple-300", icon: BriefcaseMedical },
  { step: "STEP 04", title: "Nutrition auto-adjusts", subtitle: "Personalized diet optimization", gradient: "from-orange-200 to-orange-300", icon: Utensils },
  { step: "STEP 05", title: "Continuous monitoring", subtitle: "Real-time adaptive tracking", gradient: "from-indigo-200 to-indigo-300", icon: HeartPulse }
];

export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive sizes
  const cardHeight =
    windowWidth < 640 ? 180 : windowWidth < 1024 ? 220 : 250;

  const verticalOffset = windowWidth < 640 ? 8 : 15;

  // Balanced container height
  const containerHeight = cardHeight + verticalOffset * 2 + 60;

  // Fit all cards horizontally
  const cardWidth = Math.floor((windowWidth * 0.9) / cardsData.length);

  return (
    <section className="w-full bg-white flex flex-col items-center justify-center pt-20 pb-24 overflow-hidden relative">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[300px] bg-blue-300 rounded-full blur-[120px] opacity-40"/>
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[250px] bg-blue-300 rounded-full blur-[120px] opacity-40"/>

      {/* SOCIAL PROOF */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="flex -space-x-2">
          <img className="w-8 h-8 rounded-full border-2 border-skyblue" src="https://i.pravatar.cc/32?img=1" alt="user1"/>
          <img className="w-8 h-8 rounded-full border-2 border-teal teal" src="https://i.pravatar.cc/32?img=2" alt="user2"/>
          <img className="w-8 h-8 rounded-full border-2 border-blue" src="https://i.pravatar.cc/32?img=3" alt="user3"/>
        </div>
        <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
          Join 6,000+ users
        </span>
      </div>

      {/* TEXT (reduced spacing) */}
      <div className="text-center mb-6 md:mb-8 px-6 max-w-3xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Handover Your Health <br /> to Wellwigen
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          A premium clinical ecosystem that monitors, guides, and adapts to your biology for total peace of mind.
        </p>
      </div>

      {/* CONTAINER (pulled up slightly) */}
      <div className="w-full max-w-[1200px] px-4 mx-auto -mt-4 md:-mt-12">
        <div
          className="flex items-center justify-center gap-1 relative z-15 overflow-hidden"
          style={{ height: `${containerHeight}px` }}
        >
          {cardsData.map((card, index) => {
            const Icon = card.icon;
            const offsetY =
              index % 2 === 0 ? -verticalOffset : verticalOffset;

            return (
              <div
                key={index}
                className={`relative rounded-2xl p-5 flex flex-col justify-between text-gray-900 overflow-hidden bg-gradient-to-br ${card.gradient}`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translateY(${offsetY}px)`,
                  marginTop: `${verticalOffset}px`,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                  willChange: "transform"
                }}
              >
                {/* CONTENT */}
                <div>
                  <p className="text-xs tracking-wider text-gray-700/80 mb-1 font-medium">
                    {card.step}
                  </p>
                  <h2 className="text-lg font-semibold leading-snug">
                    {card.title}
                  </h2>
                  <p className="text-sm text-gray-700/90 mt-1">
                    {card.subtitle}
                  </p>
                </div>

                {/* PREMIUM ICON */}
                <div className="flex justify-center items-center flex-1 mt-2">
                  <div className="bg-white/60 backdrop-blur-md p-3 rounded-xl flex justify-center items-center border border-white/40 shadow-sm">
                    <Icon size={30} className="text-gray-800" />
                  </div>
                </div>

                {/* BOTTOM FADE */}
                {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/90 to-transparent pointer-events-none rounded-b-2xl"></div> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}