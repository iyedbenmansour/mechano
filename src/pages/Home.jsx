import React from 'react';
import { ChevronRight, Wrench, Cog, Shield, Star, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from "../components/Navbar"; // Assuming these components exist
import Footer from "../components/Footer"; // Assuming these components exist

const services = [
  {
    icon: <Wrench size={32} />,
    title: "Oil Change & Maintenance",
    description: "Regular oil changes and preventative maintenance to keep your vehicle running smoothly and extend its lifespan.",
    features: ["Engine check", "Fluid top-ups", "Tire rotation"]
  },
  {
    icon: <Cog size={32} />,
    title: "Engine Diagnostics",
    description: "Advanced engine diagnostics to accurately identify and fix issues, ensuring optimal performance and safety.",
    features: ["Check engine light", "Performance testing", "Sensor analysis"]
  },
  {
    icon: <Shield size={32} />,
    title: "Brake Inspection",
    description: "Thorough brake inspections and repairs to ensure your safety on the road with reliable stopping power.",
    features: ["Pad replacement", "Rotor resurfacing", "Brake fluid flush"]
  },
  {
    icon: <Star size={32} />,
    title: "Battery & Electrical",
    description: "Expert battery testing and electrical system repairs to resolve power issues and ensure reliable starting.",
    features: ["Battery replacement", "Alternator repair", "Wiring diagnostics"]
  },
  {
    icon: <Wrench size={32} />,
    title: "Transmission Service",
    description: "Comprehensive transmission fluid flush and repairs to maintain smooth gear shifting and prevent costly damage.",
    features: ["Fluid change", "Filter replacement", "Leak repair"]
  },
  {
    icon: <Cog size={32} />,
    title: "AC & Heating",
    description: "Full-service AC and heating system repairs to keep you comfortable in your car year-round.",
    features: ["Recharge service", "System diagnostics", "Heater core repair"]
  }
];

const testimonials = [
  {
    name: "Alex Johnson",
    rating: 5,
    comment: "The team at AutoPro was incredibly professional and knowledgeable. They fixed my engine issue quickly and the price was very reasonable. Highly recommended!"
  },
  {
    name: "Maria Smith",
    rating: 5,
    comment: "I always take my car here for service. They're honest, efficient, and always go the extra mile. Great customer service!"
  },
  {
    name: "David Chen",
    rating: 5,
    comment: "Fast and reliable service. I had a complex electrical issue and they were able to diagnose and fix it when other shops couldn't. Thanks, AutoPro!"
  }
];

const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} strokeWidth={1} />
    ))}
  </div>
);

export default function Home() {
  return (
    <div className="bg-[#0d0d0d] text-white font-poppins">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(/heroImage.png)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Professional <span className="text-[#d9534f]">Auto</span>
              <br />
              Repair Services
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Expert diagnostics, quality service, and 100% client satisfaction. Your trusted partner for all automotive needs.
            </p>
            <button className="bg-[#d9534f] hover:bg-[#c24641] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300">
              Schedule Service
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Complete automotive solutions, with the latest technologies and state-of-the-art equipment.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-[#1f1f1f] p-8 rounded-lg border border-[#2c2c2c] hover:border-[#d9534f] transition-colors duration-300">
                <div className="text-[#d9534f] mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <ul className="text-left space-y-1 text-gray-300">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <ChevronRight className="w-4 h-4 text-[#d9534f] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Stats Section */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <div>
              <h2 className="text-4xl font-bold mb-4">
                About <span className="text-[#d9534f]">AutoPro</span>
              </h2>
              <p className="text-gray-300 mb-6">
                With over 15 years of experience in automotive repair, AutoPro has become a trusted name for quality and reliability. Our team of certified technicians is dedicated to providing superior service, from routine maintenance to complex repairs. We use only the highest quality parts and equipment to ensure your vehicle is safe and performs at its best.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-[#1a1a1a] p-4 rounded-md text-center">
                  <div className="text-3xl font-bold text-[#d9534f]">15+</div>
                  <div className="text-sm text-gray-400">Years of experience</div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-md text-center">
                  <div className="text-3xl font-bold text-[#d9534f]">3000+</div>
                  <div className="text-sm text-gray-400">Happy customers</div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-md text-center">
                  <div className="text-3xl font-bold text-[#d9534f]">98%</div>
                  <div className="text-sm text-gray-400">Satisfaction Rate</div>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-md text-center">
                  <div className="text-3xl font-bold text-[#d9534f]">24/7</div>
                  <div className="text-sm text-gray-400">Emergency Services</div>
                </div>
              </div>
            </div>
            
            {/* About Image */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582210515152-44f2e0326442?q=80&w=1974&auto=format&fit=crop" 
                alt="Auto repair shop" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-2">What Our <span className="text-[#d9534f]">Customers</span> Say</h2>
          <p className="text-gray-400 mb-12">
            Read what our satisfied customers have to say about our services.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#1f1f1f] p-8 rounded-lg border border-[#2c2c2c]">
                <div className="flex items-center mb-4">
                  <img src={`https://i.pravatar.cc/50?u=${testimonial.name}`} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch / Contact Section */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold mb-4">Get in <span className="text-[#d9534f]">Touch</span></h2>
              <p className="text-gray-300 mb-8">
                Ready to get your car serviced? Contact us today for a free estimate and to schedule your appointment.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone size={24} className="text-[#d9534f] mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={24} className="text-[#d9534f] mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">info@autopro.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={24} className="text-[#d9534f] mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-300">123 Auto Lane, Cityville, State 12345</p>
                  </div>
                </div>
              </div>
              <button className="bg-[#d9534f] hover:bg-[#c24641] text-white font-semibold py-3 px-6 rounded-md mt-8 transition-colors duration-300">
                Get Directions
              </button>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1a1a1a] p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="bg-[#2c2c2c] border border-[#444] p-3 rounded-md focus:outline-none focus:border-[#d9534f]" />
                  <input type="text" placeholder="Last Name" className="bg-[#2c2c2c] border border-[#444] p-3 rounded-md focus:outline-none focus:border-[#d9534f]" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-[#2c2c2c] border border-[#444] p-3 rounded-md focus:outline-none focus:border-[#d9534f]" />
                <input type="text" placeholder="Subject" className="w-full bg-[#2c2c2c] border border-[#444] p-3 rounded-md focus:outline-none focus:border-[#d9534f]" />
                <textarea rows="4" placeholder="Information for car services and service you need..." className="w-full bg-[#2c2c2c] border border-[#444] p-3 rounded-md focus:outline-none focus:border-[#d9534f]"></textarea>
                <button type="submit" className="w-full bg-[#d9534f] hover:bg-[#c24641] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}