import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle
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
      setStatus("Please fill in your name and message.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      // Simulate Firebase operation - replace with your actual Firebase code
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus("Thank you! Your message has been sent.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error saving message:", error);
      setStatus("Failed to send message. Please try again later.");
    }

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 8AM-6PM"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      info: "info@mechpro.com",
      subtitle: "24/7 Response"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Us",
      info: "123 Industrial District",
      subtitle: "Downtown Location"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      text: "24/7 Customer Support"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Secure Communication"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      text: "Quick Response Time"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar Placeholder */}
        <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse"
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

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Contact Info */}
            <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                GET IN
                <br />
                <span className="text-white">TOUCH</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ready to transform your mechanical challenges into breakthrough solutions? 
                Our expert team is here to help you achieve engineering excellence.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-red-500/50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-red-500">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-300 text-lg">{item.info}</p>
                        <p className="text-gray-500 text-sm">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-300">
                    <div className="text-red-500 mr-4">{feature.icon}</div>
                    <span className="font-semibold">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-white mb-2">
                    Send Us a <span className="text-red-500">Message</span>
                  </h2>
                  <p className="text-gray-400">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>

                <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Brief summary of your inquiry"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-gray-500 w-5 h-5" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>
                  </div>

                  {/* Status Message */}
                  {status && (
                    <div className={`flex items-center space-x-2 p-4 rounded-xl ${
                      status.includes("Thank") 
                        ? "bg-green-500/20 border border-green-500/30 text-green-300" 
                        : "bg-red-500/20 border border-red-500/30 text-red-300"
                    }`}>
                      {status.includes("Thank") ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <p className="text-sm font-medium">{status}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                      loading 
                        ? "bg-gray-600 cursor-not-allowed" 
                        : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg shadow-red-500/25"
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
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
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 border-2 border-red-500/30 rotate-45 animate-spin" style={{animationDuration: '20s'}} />
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-red-500/20 to-transparent rounded-full animate-bounce" />
      </section>

      {/* Footer Placeholder */}
        <Footer />
    
        {/* Additional Sections */}
    </div>
  );
}