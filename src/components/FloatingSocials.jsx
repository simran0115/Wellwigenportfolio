import React from 'react';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';

const FloatingSocials = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            <a href="#" className="bg-[#25D366] p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center w-12 h-12">
                <MessageCircle className="w-6 h-6" />
            </a>
            <a href="#" className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center w-12 h-12">
                <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="bg-[#1877F2] p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center w-12 h-12">
                <Facebook className="w-6 h-6" />
            </a>
        </div>
    );
};

export default FloatingSocials;
