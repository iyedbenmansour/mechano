import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  ChevronRight, Wrench, Cog, Shield, Star, Phone, Mail, MapPin,
  Send, User, MessageSquare, Clock, Zap, CheckCircle, AlertCircle
} from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase"; // Make sure you have firebase config set up
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const services = [
  {
    icon: <Wrench size={24} />,
    title: "Oil Change & Maintenance",
    description: "Regular oil changes and preventative maintenance to keep your vehicle running smoothly and extend its lifespan.",
    features: ["Engine check", "Fluid top-ups", "Tire rotation"]
  },
  {
    icon: <Cog size={24} />,
    title: "Engine Diagnostics",
    description: "Advanced engine diagnostics to accurately identify and fix issues, ensuring optimal performance and safety.",
    features: ["Check engine light", "Performance testing", "Sensor analysis"]
  },
  {
    icon: <Shield size={24} />,
    title: "Brake Inspection",
    description: "Thorough brake inspections and repairs to ensure your safety on the road with reliable stopping power.",
    features: ["Pad replacement", "Rotor resurfacing", "Brake fluid flush"]
  },
  {
    icon: <Star size={24} />,
    title: "Battery & Electrical",
    description: "Expert battery testing and electrical system repairs to resolve power issues and ensure reliable starting.",
    features: ["Battery replacement", "Alternator repair", "Wiring diagnostics"]
  },
  {
    icon: <Wrench size={24} />,
    title: "Transmission Service",
    description: "Comprehensive transmission fluid flush and repairs to maintain smooth gear shifting and prevent costly damage.",
    features: ["Fluid change", "Filter replacement", "Leak repair"]
  },
  {
    icon: <Cog size={24} />,
    title: "AC & Heating",
    description: "Full-service AC and heating system repairs to keep you comfortable in your car year-round.",
    features: ["Recharge service", "System diagnostics", "Heater core repair"]
  }
];

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Business Owner",
    rating: 5,
    comment: "The team at AutoPro was incredibly professional and knowledgeable. They fixed my engine issue quickly and the price was very reasonable. Highly recommended!"
  },
  {
    name: "Maria Smith",
    role: "Fleet Manager",
    rating: 5,
    comment: "I always take my company vehicles here for service. They're honest, efficient, and always go the extra mile. Great customer service!"
  },
  {
    name: "David Chen",
    role: "Luxury Car Owner",
    rating: 5,
    comment: "Fast and reliable service. I had a complex electrical issue and they were able to diagnose and fix it when other shops couldn't. Thanks, AutoPro!"
  }
];

const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
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
      setStatus("Please fill in your name and message.");
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
      
      setStatus("Thank you! Your service request has been submitted.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        message: "",
      });
    } catch (error) {
      console.error("Error saving request:", error);
      setStatus("Failed to submit request. Please try again later.");
    }

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 8AM-6PM"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      info: "service@autopro.com",
      subtitle: "24/7 Response"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Visit Us",
      info: "123 Precision Drive, Metropolis",
      subtitle: "Downtown Location"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-5 h-5" />,
      text: "24/7 Customer Support"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Secure Communication"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Quick Response Time"
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
  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-70"></div>
  <div className="container mx-auto px-6 relative z-10 max-w-4xl">
    <h1 className="text-5xl font-semibold mb-6 leading-tight">
      Precision <span className="text-red-600">Automotive</span> Engineering
    </h1>
    <div className="w-16 h-0.5 bg-red-600 mb-6"></div>
    <p className="text-xl text-gray-200 mb-8 leading-relaxed">
      Expert diagnostics, meticulous service, and guaranteed satisfaction. Your trusted partner for sophisticated automotive solutions.
    </p>
    <div className="flex space-x-4">
      <button        onClick={() => handleNavigation("/reservation")}
 className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300">
        Schedule Service
      </button>
      <button 
              onClick={() => handleNavigation("/services")}
className="border border-white hover:border-red-600 hover:text-red-600 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300">
        Our Services
      </button>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold">Our Services</h2>
            <div className="w-16 h-0.5 bg-red-600 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive automotive solutions utilizing advanced diagnostics and precision engineering.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <div className="mb-4 text-red-600">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 text-gray-600">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <ChevronRight className="w-4 h-4 text-red-600 mr-2" />
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
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-md overflow-hidden shadow-md">
              <img 
                src="https://t3.ftcdn.net/jpg/00/34/18/76/360_F_34187663_IB1vXgpqtRnnXkWfwmRsjNeLc2Ou2UTA.jpg" 
                alt="Auto repair shop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-gray-900 to-transparent text-white">
                <div className="text-3xl font-semibold">15<span className="text-red-500">+</span> Years of Excellence</div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-semibold mb-6">About AutoPro</h2>
              <div className="w-16 h-0.5 bg-red-600 mb-6"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With over 15 years of experience in automotive engineering, AutoPro has established itself as an industry leader in precision diagnostics and quality repairs. Our team of certified master technicians employs advanced methodology and state-of-the-art equipment to deliver superior results.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We specialize in both domestic and foreign vehicles, with particular expertise in high-performance and luxury automobiles. Our commitment to excellence has earned us recognition as the preferred service provider for discerning clients.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-semibold">3000<span className="text-red-500">+</span></div>
                  <div className="text-gray-500">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold">98<span className="text-red-500">%</span></div>
                  <div className="text-gray-500">Client Retention</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold">24<span className="text-red-500">/7</span></div>
                  <div className="text-gray-500">Premium Support</div>
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
            <h2 className="text-4xl font-semibold">Client Testimonials</h2>
            <div className="w-16 h-0.5 bg-red-600 mx-auto my-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The feedback from our valued clients reflects our commitment to excellence in automotive care.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-md shadow-sm">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 my-4">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-semibold mb-6">Get in Touch</h2>
              <div className="w-16 h-0.5 bg-red-600 mb-6"></div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ready to schedule your next service or have questions about your vehicle? Our expert team is here to help you with all your automotive needs.
              </p>
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
                    <div className="text-red-600">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.info}</p>
                      <p className="text-gray-500 text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-600">
                    <div className="text-red-600 mr-3">{feature.icon}</div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-md shadow-md border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Service Request</h3>
                <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-600 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-600 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-600 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Vehicle Information *</label>
                    <input
                      name="vehicle"
                      type="text"
                      value={formData.vehicle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="Year, Make, Model"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Service Details *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-600 transition-colors resize-none"
                        placeholder="Tell us about the service you need..."
                      />
                    </div>
                  </div>
                  {status && (
                    <div className={`flex items-center p-3 rounded-md ${
                      status.includes("Thank") 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {status.includes("Thank") ? (
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
                    className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors duration-300 ${
                      loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {loading ? "Sending..." : "Send Request"}
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