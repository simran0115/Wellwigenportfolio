import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Yoga Enthusiast",
      content:
        "Wellwigen Fitness changed my life! The instructors are amazing and the convenience of booking sessions at home is unbeatable.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Michael Chen",
      role: "Weight Training",
      content:
        "I've seen incredible results in just 3 months. My trainer is knowledgeable and keeps me motivated every step of the way.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Emily Davis",
      role: "Post-Injury Recovery",
      content:
        "The physiotherapy sessions have been a game-changer for my recovery. Highly recommend Wellwigen Fitness to anyone!",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-teal-50/50 rounded-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 relative group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 text-teal-200 w-12 h-12 transform group-hover:scale-110 transition-transform" />

              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-1 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-teal-600 font-medium text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Star Ratings */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;