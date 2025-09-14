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
      title: "BOUTIQUE DE PIÈCES MÉCANIQUES",
      subtitle: "Composants de Qualité Supérieure",
      description: "Découvrez notre vaste catalogue de pièces mécaniques de haute performance, de composants de précision et d'accessoires de qualité professionnelle pour les applications automobiles et industrielles.",
      icon: <ShoppingCart className="w-12 h-12" />,
      features: [
        "Pièces OEM & de rechange",
        "Composants industriels",
        "Outils professionnels",
        "Qualité garantie"
      ],
      route: "/product",
      buttonText: "Explorer le Catalogue"
    },
    {
      id: "appointment",
      title: "SERVICES PROFESSIONNELS",
      subtitle: "Entretien et Réparation par des Experts",
      description: "Planifiez des services automobiles complets avec nos mécaniciens certifiés. De l'entretien de routine aux réparations complexes, nous offrons un travail de précision avec des diagnostics de pointe.",
      icon: <Calendar className="w-12 h-12" />,
      features: [
        "Vidanges & mises au point",
        "Services de diagnostic",
        "Réparations de moteur",
        "Assistance d'urgence 24/7"
      ],
      route: "/reservation",
      buttonText: "Prendre Rendez-vous"
    }
  ];

  const additionalServices = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Fabrication sur Mesure",
      description: "Solutions mécaniques sur mesure conçues selon vos spécifications exactes",
      features: ["Pièces personnalisées", "Ingénierie de précision", "Matériaux de qualité"],
      route: "/custom-fabrication"
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Améliorations de Performance",
      description: "Améliorez les performances de votre véhicule grâce à des modifications professionnelles",
      features: ["Tuning moteur", "Améliorations de suspension", "Systèmes d'échappement"],
      route: "/performance-upgrades"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Couverture de Garantie",
      description: "Plans de protection complets pour tous nos services et pièces",
      features: ["Garanties prolongées", "Satisfaction garantie", "Couverture des pièces"],
      route: "/warranty"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Service Express",
      description: "Entretien rapide pour les réparations urgentes et les correctifs rapides",
      features: ["Service le jour même", "Planification prioritaire", "Diagnostics rapides"],
      route: "/express-service"
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Appelez-nous",
      info: "28 980 943",
      action: () => window.location.href = "tel:+216 28 980 943"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Envoyez-nous un Email",
      info: "siladlubrifiants@gmail.com",
      action: () => window.location.href = "mailto:siladlubrifiants@gmail.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Rendez-nous Visite",
      info: "9042 jebel jloud, Tunis, Tunisia",
      action: () => window.open("https://maps.app.goo.gl/ahDMmxPZiFW7Ef4P8", "_blank")
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 font-serif">
      <Navbar />
      
      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center bg-gray-900 bg-cover bg-center"
        style={{ backgroundImage: "url('/bgs.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-transparent opacity-80"></div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <h1 className="text-5xl font-semibold mb-6 leading-tight text-white">
            Nos Services <span className="text-orange-400">Professionnels</span>
          </h1>
          <div className="w-16 h-0.5 bg-orange-500 mb-6"></div>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Découvrez le summum de l'excellence mécanique grâce à notre gamme complète de services professionnels et de solutions de pièces de première qualité.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleNavigation("/reservation")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-lg hover:shadow-xl">
              Planifier un Service
            </button>
            <button 
              onClick={() => handleNavigation("/product")}
              className="border border-white hover:border-orange-400 hover:text-orange-400 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300">
              Parcourir les Pièces
            </button>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="main-services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-blue-900">Services Principaux</h2>
            <div className="w-16 h-0.5 bg-orange-500 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nos services principaux pour répondre à vos besoins automobiles
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                className={`bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-200 hover:border-orange-200 overflow-hidden ${isVisible['main-services'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.3}s` }}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-blue-600">
                      {service.icon}
                    </div>
                    <div className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                      {service.subtitle}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-blue-900">{service.title}</h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <ChevronRight className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleNavigation(service.route)}
                    className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
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
      <section id="additional" className="py-24 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-blue-900">Services Spécialisés</h2>
            <div className="w-16 h-0.5 bg-orange-500 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solutions spécialisées supplémentaires pour vos besoins spécifiques
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200 hover:border-orange-200"
              >
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-600 text-sm">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2" />
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
      <section className="py-16 bg-white border-t border-blue-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-blue-900">Contactez-nous</h2>
            <div className="w-16 h-0.5 bg-orange-500 mx-auto my-4"></div>
            <p className="text-gray-600">Contactez-nous pour des demandes de service ou des consultations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <button
                key={index}
                onClick={info.action}
                className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200 hover:border-orange-300 text-left w-full"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-100 to-orange-100 p-3 rounded-full text-blue-600">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-blue-900">{info.title}</h3>
                    <p className="text-gray-600">{info.info}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Prêt pour un Service ?</h2>
          <div className="w-16 h-0.5 bg-orange-500 mx-auto mb-6"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation("/product")}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              Parcourir les Pièces
              <ShoppingCart className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNavigation("/reservation")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Réserver un Service
              <Calendar className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}