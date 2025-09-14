import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, Wrench, Cog, Shield, Star, Phone, Mail, MapPin,
  Send, User, MessageSquare, Clock, Zap, CheckCircle, AlertCircle
} from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const services = [
  {
    icon: <Wrench size={24} />,
    title: "Vidange & Entretien",
    description: "Vidanges régulières et entretien préventif pour assurer le bon fonctionnement de votre véhicule et prolonger sa durée de vie.",
    features: ["Vérification du moteur", "Niveaux des fluides", "Permutation des pneus"]
  },
  {
    icon: <Cog size={24} />,
    title: "Diagnostic Moteur",
    description: "Diagnostics moteur avancés pour identifier et résoudre avec précision les problèmes, garantissant des performances et une sécurité optimales.",
    features: ["Voyant moteur", "Tests de performance", "Analyse des capteurs"]
  },
  {
    icon: <Shield size={24} />,
    title: "Inspection des Freins",
    description: "Inspections et réparations complètes des freins pour assurer votre sécurité sur la route avec une puissance de freinage fiable.",
    features: ["Remplacement des plaquettes", "Surfaçage des disques", "Purge du liquide de frein"]
  },
  {
    icon: <Star size={24} />,
    title: "Batterie & Électrique",
    description: "Tests de batterie experts et réparations du système électrique pour résoudre les problèmes d'alimentation et assurer un démarrage fiable.",
    features: ["Remplacement de batterie", "Réparation d'alternateur", "Diagnostic du câblage"]
  },
  {
    icon: <Wrench size={24} />,
    title: "Service de Transmission",
    description: "Vidange complète du liquide de transmission et réparations pour maintenir des changements de vitesse fluides et prévenir les dommages coûteux.",
    features: ["Changement de fluide", "Remplacement du filtre", "Réparation de fuite"]
  },
  {
    icon: <Cog size={24} />,
    title: "Climatisation & Chauffage",
    description: "Services complets de réparation des systèmes de climatisation et de chauffage pour vous garder à l'aise dans votre voiture toute l'année.",
    features: ["Service de recharge", "Diagnostic du système", "Réparation du noyau de chauffage"]
  }
];

const testimonials = [
  {
    name: "Ahmed ben yedder",
    role: "Propriétaire d'entreprise",
    rating: 5,
    comment: "L'équipe de Silad a été incroyablement professionnelle et compétente. Ils ont résolu mon problème de moteur rapidement et le prix était très raisonnable. Hautement recommandé !"
  },
  {
    name: "Mohamed ali",
    role: "Gestionnaire de flotte",
    rating: 5,
    comment: "Je confie toujours les véhicules de mon entreprise ici pour l'entretien. Ils sont honnêtes, efficaces et font toujours un effort supplémentaire. Excellent service client !"
  },
  {
    name: "BEN mustapha",
    role: "Propriétaire de voiture de luxe",
    rating: 5,
    comment: "Service rapide et fiable. J'avais un problème électrique complexe qu'ils ont pu diagnostiquer et résoudre alors que d'autres garages n'y arrivaient pas. Merci, Silad !"
  }
];

const StarRating = ({ rating }) => (
  <div className="flex text-orange-400">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} strokeWidth={1.5} />
    ))}
  </div>
);

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.message.trim()) {
      setStatus("Veuillez remplir votre nom et votre message.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      // Save to Firestore
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "new"
      });
      
      setStatus("Merci ! Votre demande de service a été soumise.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la demande :", error);
      setStatus("Échec de la soumission de la demande. Veuillez réessayer plus tard.");
    }

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Appelez-nous",
      info: "+216 28 980 943",
      subtitle: "Lun-Sam 8h-18h"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Envoyez-nous un e-mail",
      info: "siladlubrifiants@gmail.com",
      subtitle: "Réponse 24/7"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visitez-nous",
      info: "19042 jebel jloud, Tunis, Tunisia",
  
    }
  ];

  const features = [
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Support client 24/7"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Communication sécurisée"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Temps de réponse rapide"
    }
  ];

    // Handle navigation with React Router
  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-serif">
      <Navbar />

      {/* Hero Section */}
<section
  id="hero"
  className="relative h-screen flex items-center bg-cover bg-center"
  style={{ backgroundImage: `url(/heroImage.png)` }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-transparent opacity-80"></div>
  <div className="container mx-auto px-6 relative z-10 max-w-4xl">
    <h1 className="text-5xl font-semibold mb-6 leading-tight text-white">
      Ingénierie <span className="text-orange-400">Automobile</span> de Précision
    </h1>
    <div className="w-16 h-0.5 bg-orange-500 mb-6"></div>
    <p className="text-xl text-gray-200 mb-8 leading-relaxed">
      Diagnostic expert, service méticuleux et satisfaction garantie. Votre partenaire de confiance pour des solutions automobiles sophistiquées.
    </p>
    <div className="flex space-x-4">
      <button onClick={() => handleNavigation("/reservation")}
className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-lg hover:shadow-xl">
        Prendre un rendez-vous
      </button>
      <button 
          onClick={() => handleNavigation("/services")}
className="border border-white hover:border-orange-400 hover:text-orange-400 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300">
        Nos Services
      </button>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-blue-900">Nos Services</h2>
            <div className="w-16 h-0.5 bg-orange-500 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solutions automobiles complètes utilisant des diagnostics avancés et une ingénierie de précision.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-orange-200">
                <div className="mb-4 text-blue-600">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 text-gray-600">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <ChevronRight className="w-4 h-4 text-orange-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://media.istockphoto.com/id/1306896540/photo/truck-driver.jpg?s=612x612&w=0&k=20&c=jzaX_gShRnz1lLHuh_B5_idVLMcJ1HPfDW3OTuRwDyU=" 
                alt="Atelier de réparation automobile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-blue-900 to-transparent text-white">
                <div className="text-3xl font-semibold">15<span className="text-orange-400">+</span> Ans d'Excellence</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-semibold mb-6 text-blue-900">À Propos de Silad</h2>
              <div className="w-16 h-0.5 bg-orange-500 mb-6"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Avec plus de 15 ans d'expérience en ingénierie automobile, Silad s'est imposé comme un leader de l'industrie en matière de diagnostics de précision et de réparations de qualité. Notre équipe de techniciens certifiés utilise une méthodologie avancée et des équipements de pointe pour offrir des résultats supérieurs.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nous sommes spécialisés dans les véhicules nationaux et étrangers, avec une expertise particulière dans les automobiles de haute performance et de luxe. Notre engagement envers l'excellence nous a valu la reconnaissance en tant que fournisseur de services privilégié pour une clientèle exigeante.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-blue-900">3000<span className="text-orange-500">+</span></div>
                  <div className="text-gray-500">Clients Satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-blue-900">98<span className="text-orange-500">%</span></div>
                  <div className="text-gray-500">Fidélisation de la Clientèle</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-blue-900">24<span className="text-orange-500">/7</span></div>
                  <div className="text-gray-500">Support Premium</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-blue-900">Témoignages de Clients</h2>
            <div className="w-16 h-0.5 bg-orange-500 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les commentaires de nos précieux clients reflètent notre engagement envers l'excellence dans l'entretien automobile.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 my-4">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 text-white flex items-center justify-center font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-semibold mb-6 text-blue-900">Contactez-nous</h2>
              <div className="w-16 h-0.5 bg-orange-500 mb-6"></div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Prêt à planifier votre prochain service ou avez des questions sur votre véhicule ? Notre équipe d'experts est là pour vous aider avec tous vos besoins automobiles.
              </p>
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                    <div className="text-blue-600">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-blue-900">{item.title}</h3>
                      <p className="text-gray-600">{item.info}</p>
                      <p className="text-gray-500 text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-600">
                    <div className="text-orange-500 mr-3">{feature.icon}</div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-100">
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">Demande de Service</h3>
                <p className="text-gray-600 mb-6">Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Nom *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Votre nom complet"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">E-mail</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Téléphone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="+216 24425908 "
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Informations sur le véhicule *</label>
                    <input
                      name="vehicle"
                      type="text"
                      value={formData.vehicle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Année, Marque, Modèle"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Détails du service *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                        placeholder="Décrivez le service dont vous avez besoin..."
                      />
                    </div>
                  </div>
                  {status && (
                    <div className={`flex items-center p-3 rounded-md ${
                      status.includes("Merci") 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                      {status.includes("Merci") ? (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mr-2" />
                      )}
                      {status}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-md font-medium text-white transition-all duration-300 ${
                      loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer la demande"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}