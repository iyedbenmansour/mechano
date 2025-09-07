import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Mail, Phone, MapPin, Send, User, MessageSquare,
  Clock, Shield, Zap, CheckCircle, AlertCircle
} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({});

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

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setStatus("Veuillez remplir votre nom et votre message.");
      return;
    }
    setLoading(true);
    setStatus("");

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "nouveau"
      });
      setStatus("Merci ! Votre message a bien été envoyé.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l’enregistrement du message :", error);
      setStatus("Échec de l’envoi du message. Veuillez réessayer plus tard.");
    }
    setLoading(false);
  };

  const contactInfo = [
    { icon: <Phone className="w-8 h-8" />, title: "Appelez-nous", info: "+1 (555) 123-4567", subtitle: "Lun-Ven 8h-18h" },
    { icon: <Mail className="w-8 h-8" />, title: "Écrivez-nous", info: "info@mechpro.com", subtitle: "Réponse sous 24h" },
    { icon: <MapPin className="w-8 h-8" />, title: "Visitez-nous", info: "123 Zone Industrielle", subtitle: "Centre-ville" }
  ];

  const features = [
    { icon: <Clock className="w-6 h-6" />, text: "Support client 24/7" },
    { icon: <Shield className="w-6 h-6" />, text: "Communication sécurisée" },
    { icon: <Zap className="w-6 h-6" />, text: "Temps de réponse rapide" }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Fond clair */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white">
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Gauche */}
            <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h1 className="text-6xl md:text-7xl font-black mb-6 text-gray-900">
                PRENEZ
                <br />
                <span className="text-orange-600">CONTACT</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Prêt à transformer vos défis mécaniques en solutions innovantes ? 
                Notre équipe d’experts est là pour vous aider à atteindre l’excellence en ingénierie.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 hover:border-orange-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-blue-500">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-800 text-lg">{item.info}</p>
                        <p className="text-gray-500 text-sm">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <div className="text-blue-500 mr-4">{feature.icon}</div>
                    <span className="font-semibold">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Droite */}
            <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black mb-2">
                    Envoyez-nous un <span className="text-orange-600">Message</span>
                  </h2>
                  <p className="text-gray-600">Remplissez le formulaire ci-dessous et nous vous répondrons sous 24 heures</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Nom *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
                        placeholder="Votre nom complet"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
                        placeholder="votre.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Téléphone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
                        placeholder="+216 12 345 678"
                      />
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Sujet</label>
                    <input
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500"
                      placeholder="Résumé de votre demande"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Message *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 resize-none"
                        placeholder="Décrivez votre projet ou demande..."
                      />
                    </div>
                  </div>

                  {/* Statut */}
                  {status && (
                    <div className={`flex items-center space-x-2 p-4 rounded-xl ${
                      status.includes("Merci") 
                        ? "bg-green-50 border border-green-200 text-green-700" 
                        : "bg-orange-50 border border-orange-200 text-orange-700"
                    }`}>
                      {status.includes("Merci") ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      <p className="text-sm font-medium">{status}</p>
                    </div>
                  )}

                  {/* Bouton */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                      loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 shadow-lg shadow-orange-500/25"
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer
                          <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Formes flottantes */}
        <div className="absolute top-20 right-10 w-20 h-20 border-2 border-orange-300 rotate-45 animate-spin" style={{animationDuration: '20s'}} />
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-orange-200 to-transparent rounded-full animate-bounce" />
      </section>

      <Footer />
    </div>
  );
}
