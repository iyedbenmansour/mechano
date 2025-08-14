"use client";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Menu, X, Wrench, Calendar } from "lucide-react";

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

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    setServicesOpen(false); // Close services dropdown when toggling mobile menu
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={handleLinkClick} className="text-3xl font-black tracking-tight text-gray-900">
              Auto<span className="text-red-600">Pro</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="relative text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/about"
              className="relative text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium group py-2"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Services Dropdown (Redesigned for Hover) */}
            <div className="relative group" ref={dropdownRef}>
              <Link
                to="/services"
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium py-2"
              >
                Services
                <ChevronRight className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 -right-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 animate-fade-in overflow-hidden">
                <Link
                  to="/product"
                  onClick={handleLinkClick}
                  className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-all duration-300 font-medium"
                >
                  <Wrench size={20} className="mr-3 text-red-600" />
                  Shop
                </Link>
                <Link
                  to="/reservation"
                  onClick={handleLinkClick}
                  className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-all duration-300 font-medium border-t border-gray-200"
                >
                  <Calendar size={20} className="mr-3 text-red-600" />
                  Make Rendez-vous
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className="relative text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium group py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu content */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-white shadow-inner border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-4 py-3 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-medium"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-medium"
              onClick={handleLinkClick}
            >
              About Us
            </Link>

            {/* Mobile Services with sub-links */}
            <div className="space-y-1">
              <Link
                to="/services"
                className="flex items-center justify-between px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold border border-red-200"
                onClick={handleLinkClick}
              >
                <span>Services</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
              <div className="ml-4 space-y-1">
                <Link
                  to="/product"
                  className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-sm"
                  onClick={handleLinkClick}
                >
                  <Wrench size={16} className="mr-2 text-red-600" />
                  Shop 
                </Link>
                <Link
                  to="/reservation"
                  className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-sm"
                  onClick={handleLinkClick}
                >
                  <Calendar size={16} className="mr-2 text-red-600" />
                  Make Rendez-vous
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className="block px-4 py-3 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-medium"
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}