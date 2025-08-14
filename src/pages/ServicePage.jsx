import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  ShoppingCart, 
  Calendar, 
  ArrowRight, 
  Wrench, 
  Cog, 
  Shield,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function ServicePage() {
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  // Handle navigation with React Router
  const handleNavigation = (route) => {
    navigate(route);
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
      icon: <ShoppingCart className="w-12 h-12" />,
      features: [
        "OEM & Aftermarket Parts",
        "Industrial Components",
        "Professional Tools",
        "Quality Guaranteed"
      ],
      route: "/product",
      buttonText: "Explore Catalog"
    },
    {
      id: "appointment",
      title: "PROFESSIONAL SERVICES",
      subtitle: "Expert Maintenance & Repair",
      description: "Schedule comprehensive automotive services with our certified mechanics. From routine maintenance to complex repairs, we deliver precision workmanship with cutting-edge diagnostics.",
      icon: <Calendar className="w-12 h-12" />,
      features: [
        "Oil Changes & Tune-ups",
        "Diagnostic Services",
        "Engine Repairs",
        "24/7 Emergency Support"
      ],
      route: "/reservation",
      buttonText: "Book Appointment"
    }
  ];

  const additionalServices = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Custom Fabrication",
      description: "Bespoke mechanical solutions engineered to your exact specifications",
      features: ["Custom parts", "Precision engineering", "Quality materials"],
      route: "/custom-fabrication"
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Performance Upgrades",
      description: "Enhance your vehicle's performance with professional modifications",
      features: ["Engine tuning", "Suspension upgrades", "Exhaust systems"],
      route: "/performance-upgrades"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Warranty Coverage",
      description: "Comprehensive protection plans for all our services and parts",
      features: ["Extended warranties", "Satisfaction guarantee", "Parts coverage"],
      route: "/warranty"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Express Service",
      description: "Fast-track maintenance for urgent repairs and quick fixes",
      features: ["Same-day service", "Priority scheduling", "Rapid diagnostics"],
      route: "/express-service"
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      action: () => window.location.href = "tel:+15551234567"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      info: "service@autopro.com",
      action: () => window.location.href = "mailto:service@autopro.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      info: "123 Precision Drive, Metropolis",
      action: () => window.open("https://maps.google.com/?q=123+Precision+Drive+Metropolis", "_blank")
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 font-serif">
      <Navbar />
      
      {/* Hero Section */}
    <section
  id="hero"
  className="relative min-h-screen flex items-center bg-gray-900 bg-cover bg-center"
  style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdFWToo8o2Gn3Pc0O-iYF8nVChyOCQyFYstSnKKaw2LoJuxGrPSM5Z1H3gp9s3UqWwuM&usqp=CAU')" }} // change path
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>

  <div className="container mx-auto px-6 relative z-10 max-w-4xl">
    <h1 className="text-5xl font-semibold mb-6 leading-tight text-white">
      Our <span className="text-red-600">Professional</span> Services
    </h1>
    <div className="w-16 h-0.5 bg-red-600 mb-6"></div>
    <p className="text-xl text-gray-200 mb-8 leading-relaxed">
      Experience the pinnacle of mechanical excellence through our comprehensive suite of 
      professional services and premium parts solutions.
    </p>
    <div className="flex flex-wrap gap-4">
      <button 
        onClick={() => handleNavigation("/reservation")}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300">
        Schedule Service
      </button>
      <button 
        onClick={() => handleNavigation("/product")}
        className="border border-white hover:border-red-600 hover:text-red-600 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300">
        Browse Parts
      </button>
    </div>
  </div>
</section>


      {/* Main Services Section */}
      <section id="main-services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold">Primary Services</h2>
            <div className="w-16 h-0.5 bg-red-600 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core service offerings to meet your automotive needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                className={`bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden ${isVisible['main-services'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.3}s` }}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-red-600">
                      {service.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {service.subtitle}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <ChevronRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleNavigation(service.route)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center"
                  >
                    {service.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section id="additional" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold">Specialized Services</h2>
            <div className="w-16 h-0.5 bg-red-600 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Additional specialized solutions for your specific requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                <div className="text-red-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-600 text-sm">
                      <ChevronRight className="w-4 h-4 text-red-600 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
           
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold">Get In Touch</h2>
            <div className="w-16 h-0.5 bg-red-600 mx-auto my-4"></div>
            <p className="text-gray-600">Reach out to us for service inquiries or consultations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <button
                key={index}
                onClick={info.action}
                className="bg-gray-50 p-6 rounded-md shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 text-left w-full"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 p-3 rounded-full text-red-600">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{info.title}</h3>
                    <p className="text-gray-600">{info.info}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready For Service?</h2>
          <div className="w-16 h-0.5 bg-red-600 mx-auto mb-6"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation("/product")}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              Browse Parts
              <ShoppingCart className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNavigation("/reservation")}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              Book Service
              <Calendar className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}