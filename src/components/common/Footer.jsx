import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-16 pb-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div>
                        <a href="/" className="text-2xl sm:text-3xl font-bold text-white mb-6 block">
                            Wellwigen<span className="text-teal-500">Fitness</span>
                        </a>
                        <p className="text-gray-400 text-sm sm:text-base mb-6">
                            Empowering you to live a healthier, happier life through personalized fitness solutions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/people/WellwiGen/61581029265086/?sk=about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="http://x.com/Wellwigen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.instagram.com/wellwigen_bodyfit/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm sm:text-base text-gray-400">
                            <li><a href="/" className="hover:text-teal-500 transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-teal-500 transition-colors">About Us</a></li>
                            <li><a href="#services" className="hover:text-teal-500 transition-colors">Services</a></li>
                            <li><a href="/join-as-trainer" className="hover:text-teal-500 transition-colors">Become a Trainer</a></li>
                            <li><a href="/provider/onboarding" className="hover:text-teal-500 transition-colors">Join as Provider</a></li>
                            <li><a href="/vendor/login" className="hover:text-teal-500 transition-colors">Provider Login</a></li>
                            <li><a href="/terms-and-conditions" className="hover:text-teal-500 transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Services</h4>
                        <ul className="space-y-3 text-sm sm:text-base text-gray-400">
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Personal Training</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Yoga Classes</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Physiotherapy</a></li>
                            <li><a href="#" className="hover:text-teal-500 transition-colors">Diet Consultation</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm sm:text-base text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                                <span>123 Fitness Street, Wellness City, WC 12345</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-teal-500 flex-shrink-0" />
                                <a href="https://wa.me/919598506627" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors">
                                    +91 9598506627
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-teal-500 flex-shrink-0" />
                                <span>wellwigen@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm sm:text-base text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Wellwigen Fitness. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;