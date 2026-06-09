import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-16 pb-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="text-2xl sm:text-3xl font-bold text-white mb-6 block">
                            Wellwigen<span className="text-teal-500"> Health</span>
                        </Link>
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
                            <li><Link to="/" className="hover:text-teal-500 transition-colors">Home</Link></li>
                            <li><Link to="/testimonial" className="hover:text-teal-500 transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-teal-500 transition-colors">Services</Link></li>
                            <li><Link to="/join-as-trainer" className="hover:text-teal-500 transition-colors">Become a Trainer</Link></li>
                            <li><Link to="/provider/onboarding" className="hover:text-teal-500 transition-colors">Join as Provider</Link></li>
                            <li><Link to="/vendor/login" className="hover:text-teal-500 transition-colors">Provider Login</Link></li>
                            <li><Link to="/terms-and-conditions" className="hover:text-teal-500 transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Services</h4>
                        <ul className="space-y-3 text-sm sm:text-base text-gray-400">
                            <li><Link to="/services" className="hover:text-teal-500 transition-colors">Doctors Consultation</Link></li>
                            <li><Link to="/services" className="hover:text-teal-500 transition-colors">Fitness Training</Link></li>
                            <li><Link to="/services" className="hover:text-teal-500 transition-colors">Lab Tests</Link></li>
                            <li><Link to="/services" className="hover:text-teal-500 transition-colors">Medicine Delivery</Link></li>
                            <li><Link to="/services" className="hover:text-teal-500 transition-colors">Nutrition & Food</Link></li>
                            <li><Link to="/services" className="hover:text-teal-500 transition-colors">Fruit Marketplace</Link></li>
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
                    <p>&copy; {new Date().getFullYear()} Wellwigen. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;