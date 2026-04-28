import React from 'react';
import { Dumbbell, Heart, Activity, Users } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'Personal Training',
            description: 'One-on-one sessions tailored to your fitness goals, whether weight loss, muscle gain, or endurance.',
            icon: <Dumbbell className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
        {
            title: 'Yoga & Meditation',
            description: 'Find your inner peace and improve flexibility with our expert yoga instructors.',
            icon: <Heart className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
        {
            title: 'Physiotherapy',
            description: 'Recover from injuries and improve mobility with certified physiotherapists.',
            icon: <Activity className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
        {
            title: 'Group Classes',
            description: 'Join our energetic group classes for a fun and motivating workout experience.',
            icon: <Users className="w-8 h-8 text-white" />,
            image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
        },
    ];

    return (
        <section
          id="services"
          className="py-20 relative"
          style={{
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        >
            {/* Health vector watermarks */}
            <svg className="absolute top-8 left-10 opacity-[0.06] pointer-events-none" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="8" y="1" width="6" height="20" rx="1.5" fill="#0d9488"/>
              <rect x="1" y="8" width="20" height="6" rx="1.5" fill="#0d9488"/>
            </svg>
            <svg className="absolute bottom-10 right-10 opacity-[0.05] pointer-events-none w-14" viewBox="0 0 56 52" fill="none">
              <path d="M28 48C28 48 4 34 4 18C4 10 10 4 18 4C22.5 4 27 7 28 12C29 7 33.5 4 38 4C46 4 52 10 52 18C52 34 28 48 28 48Z" stroke="#0d9488" strokeWidth="1.5" fill="none"/>
            </svg>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-teal-600 text-xs tracking-widest uppercase font-semibold mb-3">What We Offer</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We offer a wide range of fitness and wellness services designed to help you achieve your best self.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="relative h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <div className="bg-primary/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
