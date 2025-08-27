import { Briefcase, Users, Award, Leaf, Clock, Star, Target, Shield, Globe, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('history');

  const stats = [
    { icon: <Briefcase className="w-8 h-8 text-blue-600" />, label: "Products Developed", value: "200+" },
    { icon: <Users className="w-8 h-8 text-blue-600" />, label: "Happy Clients", value: "500+" },
    { icon: <Award className="w-8 h-8 text-blue-600" />, label: "Quality Certifications", value: "10+" },
    { icon: <Leaf className="w-8 h-8 text-blue-600" />, label: "Years of Experience", value: "25+" },
  ];

  const timeline = [
    { year: "1998", title: "Company Founded", description: "SILAD was established in Tunisia as a specialist in lubricants and automotive accessories." },
    { year: "2003", title: "Product Range Expansion", description: "Expanded our product line to include industrial lubricants and specialized automotive fluids." },
    { year: "2008", title: "North African Market Entry", description: "Successfully entered new markets across North Africa, including Algeria, Morocco, and Libya." },
    { year: "2012", title: "Quality Certification", description: "Received ISO 9001 certification for our commitment to quality management systems." },
    { year: "2016", title: "Advanced Lubricant Development", description: "Launched our premium line of synthetic lubricants for high-performance vehicles and machinery." },
    { year: "2020", title: "Environmental Commitment", description: "Introduced eco-friendly lubricant options and sustainable packaging initiatives." },
    { year: "2024", title: "Digital Transformation", description: "Implemented comprehensive digital systems for improved customer service and supply chain management." }
  ];

  const leadership = [
    { name: "Mohamed Ben Ali", position: "Chief Executive Officer", background: "With over 30 years in the lubricants industry, Mohamed leads SILAD with vision and expertise. His extensive knowledge of oil formulations and market dynamics has positioned SILAD as a leader in the Tunisian market." },
    { name: "Leila Trabelsi", position: "Chief Technical Officer", background: "Leila brings 20 years of technical innovation to our team. Her specialization in lubricant chemistry has resulted in our most successful product formulations and quality control protocols." },
    { name: "Amir Kaddour", position: "Director of Operations", background: "Amir oversees all operational aspects of our business. His extensive experience in manufacturing and supply chain management ensures consistent product quality and timely delivery." },
    { name: "Samia Bouazizi", position: "Head of Research & Development", background: "Leading our R&D initiatives, Samia has developed several proprietary lubricant formulations that have set new industry standards for performance and durability." }
  ];

  const certifications = [
    { title: "ISO 9001:2015", description: "Quality Management System certification ensuring consistent, high-quality product manufacturing" },
    { title: "ISO 14001:2015", description: "Environmental Management System certification demonstrating our commitment to sustainability" },
    { title: "API Certification", description: "American Petroleum Institute certification for lubricant quality standards" },
    { title: "ACEA Compliance", description: "European Automobile Manufacturers Association standards compliance for automotive lubricants" },
    { title: "Tunisian Standards Certification", description: "NT certification for meeting national quality standards" }
  ];

  const services = [
    { icon: <Globe className="w-12 h-12 text-blue-600" />, title: "Automotive Lubricants", description: "High-performance engine oils, transmission fluids, and specialty automotive lubricants designed for optimal vehicle performance." },
    { icon: <Shield className="w-12 h-12 text-blue-600" />, title: "Industrial Solutions", description: "Specialized lubricants for manufacturing equipment, hydraulic systems, and industrial machinery to maximize efficiency and longevity." },
    { icon: <Target className="w-12 h-12 text-blue-600" />, title: "Technical Consultation", description: "Expert advice on lubricant selection, maintenance scheduling, and performance optimization for fleet managers and industrial clients." },
    { icon: <Globe className="w-12 h-12 text-blue-600" />, title: "Distribution Network", description: "Extensive distribution capabilities throughout North Africa, ensuring timely delivery and consistent product availability." }
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-orange-700 to-orange-500 text-white text-center px-6">
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            About <span className="text-yellow-300">SILAD</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8">
            Société Internationale de Lubrifiants et Accessoires Différents — delivering premium lubricant solutions across North Africa since 1998.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#mission" className="bg-white text-orange-600 hover:bg-orange-50 transition duration-300 py-3 px-6 rounded-full font-bold shadow-md">
              Our Mission
            </a>
            <a href="#contact" className="bg-transparent hover:bg-orange-700 border-2 border-white transition duration-300 py-3 px-6 rounded-full font-bold">
              Contact Us
            </a>
          </div>
        </div>
        {/* Overlay Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </section>

      {/* Stats Section - Moved up for immediate impact */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto space-y-20 px-6 py-16">
        {/* Mission & Vision */}
        <section id="mission" className="grid md:grid-cols-2 gap-12">
          <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-3xl font-bold mb-6 text-orange-600">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              At <strong>SILAD</strong>, our mission is to provide high-quality, reliable, and innovative lubricant solutions tailored to the specific needs of our clients across automotive and industrial sectors. We strive for excellence in every product, ensuring optimal performance, protection, and efficiency.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              We are committed to delivering lubricants that not only meet but exceed industry standards, while maintaining the highest level of integrity and professionalism in all our interactions with clients, partners, and employees.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-3xl font-bold mb-6 text-orange-600">Our Vision</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We aspire to be the leading lubricant provider in North Africa, recognized for our technical excellence, innovative formulations, and unwavering commitment to quality.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              Our vision encompasses a future where <strong>SILAD</strong> sets the industry standard for lubricant performance, environmentally responsible practices, and customer satisfaction, while fostering a culture of continuous improvement and professional growth for our team members.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-orange-600">Our Products & Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
                <div className="mb-4" >{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="p-10 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-4xl font-bold mb-10 text-orange-600 text-center">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Quality</h3>
              </div>
              <p className="text-gray-700">
                We pursue excellence in every formulation, ensuring that our lubricants meet the highest standards of performance, protection, and longevity for vehicles and machinery.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Integrity</h3>
              </div>
              <p className="text-gray-700">
                We operate with transparency, honesty, and ethical principles, building lasting relationships
                based on trust and mutual respect with our clients, distributors, and team members.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Innovation</h3>
              </div>
              <p className="text-gray-700">
                We embrace research and development, continuously seeking new formulations, technologies, and solutions to address evolving lubrication challenges and improve our products.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Customer Focus</h3>
              </div>
              <p className="text-gray-700">
                We prioritize the needs of our customers, offering tailored solutions, technical support, and responsive service to ensure complete satisfaction and optimal performance.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Sustainability</h3>
              </div>
              <p className="text-gray-700">
                We are committed to environmental responsibility, developing lubricant formulations and packaging solutions that minimize ecological impact while maximizing performance.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Reliability</h3>
              </div>
              <p className="text-gray-700">
                We deliver on our promises, ensuring consistent quality, timely availability, and dependability in all our products and services, building confidence with every purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Company Timeline & Leadership Tabs */}
        <section className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('history')}
                className={`${
                  activeTab === 'history' 
                    ? 'border-blue-600 text-orange-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-lg`}
              >
                Our History
              </button>
              <button
                onClick={() => setActiveTab('leadership')}
                className={`${
                  activeTab === 'leadership' 
                    ? 'border-blue-600 text-orange-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-lg`}
              >
                Leadership Team
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`${
                  activeTab === 'certifications' 
                    ? 'border-blue-600 text-orange-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-lg`}
              >
                Certifications
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'history' && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-orange-600">Our Journey Through the Years</h2>
                <div className="space-y-8">
                  {timeline.map((event, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div className="rounded-full bg-blue-600 text-white font-bold text-sm w-16 h-16 flex items-center justify-center">
                          {event.year}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="h-full w-0.5 bg-blue-300 my-2"></div>
                        )}
                      </div>
                      <div className="pt-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leadership' && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-orange-600">Our Leadership Team</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {leadership.map((person, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                      <p className="text-blue-600 font-medium mb-4">{person.position}</p>
                      <p className="text-gray-700">{person.background}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'certifications' && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-orange-600">Industry Certifications</h2>
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{cert.title}</h3>
                        <p className="text-gray-700">{cert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

    

        {/* Regional Presence */}
        <section className="p-10 bg-gray-50 rounded-2xl shadow-md">
          <h2 className="text-4xl font-bold mb-8 text-orange-600 text-center">Our Regional Presence</h2>
          <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
            With strategic operations across North Africa, SILAD delivers premium lubricant products to automotive and industrial
            clients throughout the region, combining technical expertise with local market knowledge.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tunisia</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Tunis (Headquarters)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Sfax (Manufacturing)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Sousse (Distribution)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Gabes (Storage Facility)
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">North Africa</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Algiers, Algeria
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Casablanca, Morocco
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Tripoli, Libya
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Cairo, Egypt
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Distribution Partners</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Automotive Retailers
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Industrial Suppliers
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Fleet Management Companies
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Service Centers
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-gradient-to-br from-orange-700 to-orange-500 text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Premium Lubricant Solutions?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Contact our team today to discuss how SILAD can provide the high-quality lubricants and technical expertise 
            you need for your vehicles or industrial equipment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-white text-orange-600 hover:bg-orange-50 transition duration-300 py-3 px-8 rounded-full font-bold shadow-md text-lg">
              Get in Touch
            </a>
            <a href="/products" className="bg-transparent hover:bg-orange-700 border-2 border-white transition duration-300 py-3 px-8 rounded-full font-bold text-lg">
              Explore Our Products
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}