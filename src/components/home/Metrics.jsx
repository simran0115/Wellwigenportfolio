import React from 'react';

const Metrics = () => {
    const metrics = [
        { value: '5000+', label: 'Trusted Clients' },
        { value: '500+', label: 'Verified Experts' },
        { value: '100k+', label: 'Sessions Delivered' },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-4">Our Impact in Numbers</h3>
                    <p className="text-gray-600 text-lg md:text-xxl">Trusted by thousands of clients and professionals worldwide</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border-t-4 border-teal-500"
                        >
                            {/* Decorative circle top-left */}
                            <div className="absolute -top-5 -left-5 w-12 h-12 bg-teal-100 rounded-full opacity-50"></div>
                            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-teal-50 rounded-full opacity-40"></div>

                            <div className="text-5xl md:text-6xl font-extrabold text-teal-600 mb-4">{metric.value}</div>
                            <p className="text-gray-700 text-xl font-semibold">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Metrics;