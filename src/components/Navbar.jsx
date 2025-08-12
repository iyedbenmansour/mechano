"use client";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Close dropdown if clicked outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-red-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-black text-red-500 hover:text-red-400 transition-colors duration-300">
              <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                MechanicalCo
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/about" 
              className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative flex items-center" ref={dropdownRef}>
              <Link
                to="/services"
                className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
                onClick={() => setServicesOpen(false)}
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="ml-2 focus:outline-none flex items-center text-gray-300 hover:text-red-400 transition-colors duration-300"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                aria-label="Toggle Services dropdown"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    servicesOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full mt-2 w-56 bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-xl shadow-2xl z-10 right-0 overflow-hidden">
                  <Link
                    to="/product"
                    onClick={() => setServicesOpen(false)}
                    className="block px-6 py-3 text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-400 transition-all duration-300 font-medium"
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-70"></span>
                      Shop Mechanical Stuff
                    </div>
                  </Link>
                  <Link
                    to="/reservation"
                    onClick={() => setServicesOpen(false)}
                    className="block px-6 py-3 text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-400 transition-all duration-300 font-medium border-t border-gray-800"
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3 opacity-70"></span>
                      Make Rendez-vous
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/contact" 
              className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="focus:outline-none focus:ring-2 focus:ring-red-500 p-2 rounded-lg text-gray-300 hover:text-red-400 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-900 to-black border-t border-red-500/20 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-400 transition-all duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-400 transition-all duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>

            {/* Mobile Services with sub-links */}
            <div className="space-y-1">
              <Link
                to="/services"
                className="block px-4 py-3 rounded-lg text-red-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-300 transition-all duration-300 font-bold border border-red-500/30"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <div className="ml-4 space-y-1">
                <Link
                  to="/product"
                  className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 hover:text-red-400 transition-all duration-300 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Shop Mechanical Stuff
                  </span>
                </Link>
                <Link
                  to="/reservation"
                  className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-400/10 hover:text-red-400 transition-all duration-300 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Make Rendez-vous
                  </span>
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-400 transition-all duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
       
          </div>
        </div>
      )}
    </nav>
  );
}