"use client";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Menu, X, Wrench, Calendar, ShoppingCart } from "lucide-react";

// Cart utility functions using sessionStorage (consistent with other components)
const CartUtils = {
  CART_KEY: 'shopping_cart',
  
  getCart: () => {
    try {
      const cartData = sessionStorage.getItem(CartUtils.CART_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error reading cart from sessionStorage:', error);
      return [];
    }
  },
  
  getTotalItems: () => {
    const cart = CartUtils.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotal: () => {
    const cart = CartUtils.getCart();
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const dropdownRef = useRef(null);
  const cartPreviewRef = useRef(null);

  // Update cart count and total when component mounts and when cart changes
  useEffect(() => {
    const updateCartData = () => {
      const itemCount = CartUtils.getTotalItems();
      const total = CartUtils.getTotal();
      
      setCartItemsCount(itemCount);
      setCartTotal(total);
    };

    // Initial load
    updateCartData();

    // Listen for cart updates
    const handleCartUpdate = (event) => {
      if (event.detail) {
        setCartItemsCount(event.detail.cartCount || CartUtils.getTotalItems());
        setCartTotal(event.detail.cartTotal || CartUtils.getTotal());
      } else {
        updateCartData();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Also listen for storage events (for cross-tab updates)
    const handleStorageChange = (event) => {
      if (event.key === CartUtils.CART_KEY) {
        updateCartData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Periodic check as fallback (reduced frequency)
    const interval = setInterval(updateCartData, 5000);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (cartPreviewRef.current && !cartPreviewRef.current.contains(event.target)) {
        setShowCartPreview(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    setServicesOpen(false);
    setShowCartPreview(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setShowCartPreview(false);
  };

  const toggleCartPreview = () => {
    setShowCartPreview(!showCartPreview);
  };

  const getCartPreviewItems = () => {
    const cart = CartUtils.getCart();
    return cart.slice(0, 3); // Show only first 3 items
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
       {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={handleLinkClick} className="flex items-center">
              <img 
                src="/logo.jpg" 
                alt="Silad Logo" 
                className="h-10 w-auto object-contain "
              />
              {/* Optional: Keep text as fallback or secondary branding */}
              {/* <span className="ml-2 text-2xl font-black tracking-tight text-blue-900">
                S<span className="text-orange-500">ilad</span>
              </span> */}
            </Link>
          </div>


          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group py-2"
            >
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
           

            {/* Services Dropdown */}
            <div className="relative group" ref={dropdownRef}>
              <Link
                to="/services"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium py-2"
              >
                Services
                <ChevronRight className="w-4 h-4 ml-2 group-hover:rotate-90 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="absolute top-full mt-2 w-64 bg-white border border-blue-200 rounded-lg shadow-xl z-10 -right-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 animate-fade-in overflow-hidden">
                <Link
                  to="/product"
                  onClick={handleLinkClick}
                  className="flex items-center px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600 transition-all duration-300 font-medium"
                >
                  <Wrench size={20} className="mr-3 text-orange-500" />
                  Boutique
                </Link>
                <Link
                  to="/reservation"
                  onClick={handleLinkClick}
                  className="flex items-center px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600 transition-all duration-300 font-medium border-t border-blue-100"
                >
                  <Calendar size={20} className="mr-3 text-orange-500" />
                  Prendre rendez-vous
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Shopping Cart Button - Desktop with Preview */}
            <div className="relative" ref={cartPreviewRef}>
              <button
                onClick={toggleCartPreview}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 group focus:outline-none"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                      {cartItemsCount > 99 ? '99+' : cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Cart Preview Dropdown */}
              {showCartPreview && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Mon Panier</h3>
                      <span className="text-sm text-gray-600">
                        {cartItemsCount} article{cartItemsCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {cartItemsCount === 0 ? (
                    <div className="p-6 text-center">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">Votre panier est vide</p>
                      <Link
                        to="/product"
                        onClick={handleLinkClick}
                        className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Voir les produits
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-64 overflow-y-auto">
                        {getCartPreviewItems().map((item) => (
                          <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-center space-x-3">
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-10 h-10 object-contain rounded border"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                  <Wrench className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {item.quantity} × {parseFloat(item.price).toFixed(2)} TND
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-gray-900">
                                {(parseFloat(item.price) * item.quantity).toFixed(2)} TND
                              </span>
                            </div>
                          </div>
                        ))}
                        
                        {cartItemsCount > 3 && (
                          <div className="p-3 text-center border-b border-gray-100 bg-gray-50">
                            <span className="text-xs text-gray-600">
                              +{cartItemsCount - 3} article{cartItemsCount - 3 !== 1 ? 's' : ''} supplémentaire{cartItemsCount - 3 !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-900">Total:</span>
                          <span className="font-bold text-lg text-gray-900">
                            {cartTotal.toFixed(2)} TND
                          </span>
                        </div>
                        <Link
                          to="/panier"
                          onClick={handleLinkClick}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block"
                        >
                          Voir le panier
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Shopping Cart Button - Mobile */}
            <Link
              to="/panier"
              onClick={handleLinkClick}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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

      {/* Menu mobile */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-gradient-to-br from-blue-50 to-orange-50 shadow-inner border-t border-blue-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-4 py-3 rounded-md text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium shadow-sm"
              onClick={handleLinkClick}
            >
              Accueil
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-md text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium shadow-sm"
              onClick={handleLinkClick}
            >
              À propos
            </Link>

            {/* Services mobile */}
            <div className="space-y-1">
              <Link
                to="/services"
                className="flex items-center justify-between px-4 py-3 rounded-md text-blue-600 hover:bg-white transition-all duration-300 font-semibold border border-blue-300 bg-white bg-opacity-80 shadow-sm"
                onClick={handleLinkClick}
              >
                <span>Services</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
              <div className="ml-4 space-y-1">
                <Link
                  to="/product"
                  className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm shadow-sm"
                  onClick={handleLinkClick}
                >
                  <Wrench size={16} className="mr-2 text-orange-500" />
                  Boutique
                </Link>
                <Link
                  to="/reservation"
                  className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm shadow-sm"
                  onClick={handleLinkClick}
                >
                  <Calendar size={16} className="mr-2 text-orange-500" />
                  Prendre rendez-vous
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className="block px-4 py-3 rounded-md text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium shadow-sm"
              onClick={handleLinkClick}
            >
              Contact
            </Link>

            {/* Shopping Cart Mobile Menu Item */}
            <Link
              to="/panier"
              className="flex items-center justify-between px-4 py-3 rounded-md text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium shadow-sm border-t border-blue-200 mt-2"
              onClick={handleLinkClick}
            >
              <div className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-3 text-orange-500" />
                <div>
                  <span className="block">Mon Panier</span>
                  {cartItemsCount > 0 && (
                    <span className="text-xs text-gray-600">
                      {cartItemsCount} article{cartItemsCount !== 1 ? 's' : ''} • {cartTotal.toFixed(2)} TND
                    </span>
                  )}
                </div>
              </div>
              {cartItemsCount > 0 && (
                <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}