// Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Sparkles,
  Calendar,
  Info,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "How it Works", path: "/ecosystem", icon: <Calendar size={18} /> },
    { name: "Pricing", path: "/pricing", icon: <CreditCard size={18} /> },
    { name: "Services", path: "/dashboard", icon: <Sparkles size={18} /> },
    { name: "About Us", path: "/testimonial", icon: <Info size={18} /> },
    { name: "Contact Us", path: "/contactus", icon: <MessageCircle size={18} /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-3">
        <div className="flex justify-between items-center">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-semibold text-lg sm:text-xl cursor-pointer text-gray-900"
          >
            <div className="bg-teal-500 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">
              W
            </div>
            <span className="hidden sm:inline">WellWigen</span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
                    isActive
                      ? "bg-teal-500 text-white shadow"
                      : "text-gray-700 hover:text-teal-500 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP BUTTON */}
          <div className="hidden md:flex">
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
            >
              Register
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[500px] mt-4" : "max-h-0"
          }`}
        >
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md space-y-3">

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm ${
                    isActive
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </button>
              );
            })}

            {/* MOBILE REGISTER */}
            <button
              onClick={() => {
                navigate("/register");
                setIsOpen(false);
              }}
              className="w-full py-2 rounded-lg text-sm bg-teal-500 text-white hover:bg-teal-600 transition"
            >
              Register
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;