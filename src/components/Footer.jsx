"use client";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/95 text-gray-300 py-6 mt-12 border-t border-red-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Copyright */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <Link to="/" className="text-2xl font-black text-red-500 hover:text-red-400 transition-colors duration-300">
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              MechanicalCo
            </span>
          </Link>
          <p className="text-sm mt-2 md:mt-0 opacity-70">&copy; {new Date().getFullYear()} MechanicalCo. All rights reserved.</p>
        </div>

        {/* Footer Navigation */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link
            to="/"
            className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
            aria-label="Home"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
            aria-label="About Us"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/services"
            className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
            aria-label="Services"
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/contact"
            className="relative text-gray-300 hover:text-red-400 transition-all duration-300 font-semibold group"
            aria-label="Contact"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </div>
    </footer>
  );
}