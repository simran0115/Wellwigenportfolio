// Diet.jsx
import React, { useState } from "react";

const Diet = () => {
  const [activeTag, setActiveTag] = useState("");

  return (
    <section className="w-full bg-[#f5f7f8] px-4 sm:px-6 md:px-16 py-16">

      {/* TOP HEADING */}
      <p className="text-center text-xs sm:text-sm tracking-[0.3em] text-gray-400 mb-2 sm:mb-3">
        AUTONOMOUS SUSTENANCE
      </p>

      <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800">
        Smart Food & <span className="text-teal-500">Fruit System</span>
      </h2>

      <p className="text-center text-gray-500 mt-2 sm:mt-4 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
        AI-Powered Nutrition. Automatically Optimized for You.
      </p>

      {/* SUB HEADING */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 sm:mt-12 gap-4">

        <div>
          <p className="text-xs sm:text-sm text-teal-500 mb-1">PRECISION NUTRITION</p>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            AI-Powered Meal Recommendations
          </h3>
        </div>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          {["Diabetic-Friendly", "High Protein", "Vitamin-Rich"].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 text-xs sm:text-sm rounded-full transition ${
                activeTag === tag
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">

        {/* CARD 1 */}
        <div
          className={`bg-white rounded-2xl overflow-hidden transition-all duration-300
          ${activeTag === "Diabetic-Friendly" ? "scale-105 shadow-2xl ring-2 ring-teal-400 z-10" : "shadow-md"}`}
        >
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
            alt="salmon bowl"
            className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
          />

          <div className="p-4 sm:p-5">
            <span className="px-2 py-1 text-[10px] sm:text-xs bg-teal-100 text-teal-600 rounded-full">
              Diabetic-Friendly
            </span>

            <h4 className="text-gray-800 font-medium mt-2 sm:mt-3 text-sm sm:text-base">
              Omega Salmon Bowl
            </h4>
            <p className="text-xs sm:text-sm text-teal-500 mt-1">480 kcal</p>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 leading-relaxed">
              High in healthy fats and lean protein to support your active recovery phase.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div
          className={`bg-white rounded-2xl overflow-hidden transition-all duration-300
          ${activeTag === "High Protein" ? "scale-105 shadow-2xl ring-2 ring-teal-400 z-10" : "shadow-md"}`}
        >
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop"
            alt="salad"
            className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
          />

          <div className="p-4 sm:p-5">
            <span className="px-2 py-1 text-[10px] sm:text-xs bg-gray-100 text-gray-600 rounded-full">
              High Protein
            </span>

            <h4 className="text-gray-800 font-medium mt-2 sm:mt-3 text-sm sm:text-base">
              Zen Garden Salad
            </h4>
            <p className="text-xs sm:text-sm text-teal-500 mt-1">320 kcal</p>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 leading-relaxed">
              A nutrient-dense blend of leafy greens designed to stabilize glucose levels.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div
          className={`bg-white rounded-2xl overflow-hidden transition-all duration-300
          ${activeTag === "Vitamin-Rich" ? "scale-105 shadow-2xl ring-2 ring-teal-400 z-10" : "shadow-md"}`}
        >
          <img
            src="https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg"
            alt="grill"
            className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
          />

          <div className="p-4 sm:p-5">
            <span className="px-2 py-1 text-[10px] sm:text-xs bg-gray-100 text-gray-600 rounded-full">
              Vitamin-Rich
            </span>

            <h4 className="text-gray-800 font-medium mt-2 sm:mt-3 text-sm sm:text-base">
              Protein Power Grill
            </h4>
            <p className="text-xs sm:text-sm text-teal-500 mt-1">540 kcal</p>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 leading-relaxed">
              Lean poultry with mineral-rich roasted roots for sustained metabolic energy.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Diet;