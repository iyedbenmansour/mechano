import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  ShoppingCart, 
  Calendar, 
  ArrowRight, 
  Wrench, 
  Car, 
  Cog, 
  Star,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Zap
} from "lucide-react";

export default function ServicePage() {
  const [isVisible, setIsVisible] = useState({});

  // Simulate navigation - replace with your actual navigation logic
  const handleNavigation = (route) => {
    console.log(`Navigating to: ${route}`);
    // Your navigation logic here, e.g., window.location.href = route;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const mainServices = [
    {
      id: "shop",
      title: "MECHANICAL PARTS STORE",
      subtitle: "Premium Quality Components",
      description: "Discover our extensive catalog of high-performance mechanical parts, precision-engineered components, and professional-grade accessories for automotive and industrial applications.",
      icon: <ShoppingCart className="w-16 h-16" />,
      features: [
        "OEM & Aftermarket Parts",
        "Industrial Components",
        "Professional Tools",
        "Quality Guaranteed"
      ],
      color: "from-blue-600 to-blue-500",
      hoverColor: "hover:from-blue-500 hover:to-blue-400",
      borderColor: "border-blue-500/50",
      shadowColor: "shadow-blue-500/25",
      route: "/product",
      buttonText: "Explore Catalog"
    },
    {
      id: "appointment",
      title: "PROFESSIONAL SERVICES",
      subtitle: "Expert Maintenance & Repair",
      description: "Schedule comprehensive automotive services with our certified mechanics. From routine maintenance to complex repairs, we deliver precision workmanship with cutting-edge diagnostics.",
      icon: <Calendar className="w-16 h-16" />,
      features: [
        "Oil Changes & Tune-ups",
        "Diagnostic Services",
        "Engine Repairs",
        "24/7 Emergency Support"
      ],
      color: "from-red-600 to-red-500",
      hoverColor: "hover:from-red-500 hover:to-red-400",
      borderColor: "border-red-500/50",
      shadowColor: "shadow-red-500/25",
      route: "/reservation",
      buttonText: "Book Appointment"
    }
  ];

  const additionalServices = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Custom Fabrication",
      description: "Bespoke mechanical solutions engineered to your exact specifications"
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Performance Upgrades",
      description: "Enhance your vehicle's performance with professional modifications"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Warranty Coverage",
      description: "Comprehensive protection plans for all our services and parts"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Express Service",
      description: "Fast-track maintenance for urgent repairs and quick fixes"
    }
  ];

  const stats = [
    { number: "10K+", label: "Parts in Stock" },
    { number: "500+", label: "Services Completed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
        <Navbar />
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-10">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-red-500 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5" 
               style={{
                 backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
              OUR
              <br />
              <span className="text-white">SERVICES</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Experience the pinnacle of mechanical excellence through our comprehensive suite of 
              professional services and premium parts solutions.
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-red-500/20 rotate-45 animate-spin" style={{animationDuration: '30s'}} />
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full animate-bounce" />
      </section>

      {/* Main Services Section */}
      <section id="main-services" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible['main-services'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-red-500">PREMIUM</span> SOLUTIONS
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose your path to mechanical excellence with our flagship services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                onClick={() => handleNavigation(service.route)}
                className={`group relative cursor-pointer bg-gradient-to-br from-gray-900 to-black border-2 ${service.borderColor} hover:border-opacity-100 border-opacity-30 rounded-3xl p-10 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${service.shadowColor} ${isVisible['main-services'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.3}s` }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleNavigation(service.route)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-red-500 group-hover:text-white mb-8 transform group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-red-400 text-lg font-semibold mt-2">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`group-hover:scale-105 bg-gradient-to-r ${service.color} ${service.hoverColor} text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg ${service.shadowColor} flex items-center justify-center w-full`}>
                    <span className="flex items-center">
                      {service.buttonText}
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${isVisible['main-services'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-6xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-red-100 font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="additional" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.additional ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">ADDITIONAL</span>
              <br />
              <span className="text-red-500">EXPERTISE</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions that go beyond the ordinary
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-red-500/50 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/10 ${isVisible.additional ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible['why-choose'] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="text-red-500">WHY CHOOSE</span>
                <br />
                <span className="text-white">OUR SERVICES?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience the difference that comes from working with industry-leading professionals 
                who are passionate about mechanical excellence and customer satisfaction.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Star className="w-6 h-6" />, title: "Premium Quality", desc: "Only the finest components and materials" },
                  { icon: <Users className="w-6 h-6" />, title: "Expert Team", desc: "Certified professionals with decades of experience" },
                  { icon: <Zap className="w-6 h-6" />, title: "Fast Service", desc: "Efficient solutions without compromising quality" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 bg-black/50 rounded-xl border border-gray-800">
                    <div className="text-red-500 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 ${isVisible['why-choose'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-3xl p-8 border border-red-500/30">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-black/70 rounded-xl backdrop-blur-sm">
                      <Car className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <div className="text-3xl font-black text-white mb-2">AUTO</div>
                      <div className="text-gray-400">Services</div>
                    </div>
                    <div className="text-center p-6 bg-black/70 rounded-xl backdrop-blur-sm">
                      <Cog className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <div className="text-3xl font-black text-white mb-2">PARTS</div>
                      <div className="text-gray-400">Catalog</div>
                    </div>
                    <div className="text-center p-6 bg-black/70 rounded-xl backdrop-blur-sm col-span-2">
                      <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <div className="text-3xl font-black text-white mb-2">GUARANTEED</div>
                      <div className="text-gray-400">Quality & Satisfaction</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements around the grid */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500/30 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500/30 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible['why-choose'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-white">READY TO</span>
              <br />
              <span className="text-red-500">GET STARTED?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their mechanical needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavigation("/product")}
                className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/25"
              >
                <span className="flex items-center justify-center">
                  Browse Parts
                  <ShoppingCart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => handleNavigation("/reservation")}
                className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-red-500/25"
              >
                <span className="flex items-center justify-center">
                  Book Service
                  <Calendar className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Placeholder - Replace with your actual Footer component */}
        <Footer />
    </div>
  );
}