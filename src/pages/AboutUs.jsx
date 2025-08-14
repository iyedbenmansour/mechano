import { Briefcase, Users, Award, Leaf, Clock, Star, Target, Shield, Globe, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('history');

  const stats = [
    { icon: <Briefcase className="w-8 h-8 text-red-500" />, label: "Projects Completed", value: "500+" },
    { icon: <Users className="w-8 h-8 text-red-500" />, label: "Happy Clients", value: "300+" },
    { icon: <Award className="w-8 h-8 text-red-500" />, label: "Industry Awards", value: "15+" },
    { icon: <Leaf className="w-8 h-8 text-red-500" />, label: "Years of Experience", value: "20+" },
  ];

  const timeline = [
    { year: "2005", title: "Company Founded", description: "Mechanical Solutions Inc. was established as a small workshop by a team of passionate engineers." },
    { year: "2008", title: "First Major Contract", description: "Secured our first major industrial contract, marking the beginning of our growth trajectory." },
    { year: "2012", title: "International Expansion", description: "Expanded operations to serve international clients across Europe and Asia." },
    { year: "2015", title: "R&D Department Launch", description: "Established a dedicated Research & Development department to foster innovation." },
    { year: "2018", title: "Industry Recognition", description: "Received our first major industry award for excellence in mechanical engineering." },
    { year: "2022", title: "Sustainability Initiative", description: "Launched our comprehensive sustainability program, committing to eco-friendly practices." },
    { year: "2025", title: "Digital Transformation", description: "Completed company-wide digital transformation to enhance service delivery and efficiency." }
  ];

  const leadership = [
    { name: "Jonathan Reynolds", position: "Chief Executive Officer", background: "With over 25 years in mechanical engineering, Jonathan leads our company with vision and expertise. His background includes leadership roles at major engineering firms and a Ph.D. in Mechanical Engineering." },
    { name: "Elena Vasquez", position: "Chief Technical Officer", background: "Elena brings 20 years of technical innovation to our team. Her specialization in precision manufacturing has revolutionized our production processes and quality standards." },
    { name: "Marcus Chen", position: "Director of Operations", background: "Marcus oversees all operational aspects of our business. His extensive experience in project management ensures that we deliver excellence consistently across all projects." },
    { name: "Sophia Williams", position: "Head of Research & Development", background: "Leading our R&D initiatives, Sophia has pioneered several patented technologies that have become industry standards. Her innovative approach drives our technical advancement." }
  ];

  const certifications = [
    { title: "ISO 9001:2015", description: "Quality Management System certification ensuring consistent, high-quality service delivery" },
    { title: "ISO 14001:2015", description: "Environmental Management System certification demonstrating our commitment to sustainability" },
    { title: "ASME Certification", description: "American Society of Mechanical Engineers certification for pressure equipment" },
    { title: "AWS Certification", description: "American Welding Society certification for welding processes and procedures" },
    { title: "API Certification", description: "American Petroleum Institute certification for oil and gas industry standards" }
  ];

  const services = [
    { icon: <Globe className="w-12 h-12 text-red-500" />, title: "Custom Fabrication", description: "Tailored mechanical solutions designed and manufactured to precise specifications for unique industrial applications." },
    { icon: <Shield className="w-12 h-12 text-red-500" />, title: "Maintenance & Repair", description: "Comprehensive maintenance services and expert repairs to ensure your equipment performs optimally throughout its lifecycle." },
    { icon: <Target className="w-12 h-12 text-red-500" />, title: "Engineering Consultation", description: "Expert advice and guidance on mechanical design, efficiency improvements, and technical problem-solving." },
    { icon: <Globe className="w-12 h-12 text-red-500" />, title: "Global Solutions", description: "International service capabilities with local expertise, delivering consistent quality worldwide." }
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-red-600 to-red-400 text-white text-center px-6">
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            About <span className="text-white-200">Mechanical Solutions Inc.</span>
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-8">
            Engineering excellence through innovation, precision, and dedication — serving industries worldwide since 2005.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#mission" className="bg-white text-red-600 hover:bg-white-200 transition duration-300 py-3 px-6 rounded-full font-bold shadow-md">
              Our Mission
            </a>
            <a href="#contact" className="bg-transparent hover:bg-red-700 border-2 border-white transition duration-300 py-3 px-6 rounded-full font-bold">
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
            <h2 className="text-3xl font-bold mb-6 text-red-600">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              At <strong>Mechanical Solutions Inc.</strong>, our mission is to provide high-quality, reliable, and
              innovative mechanical engineering services tailored to the unique needs of our clients. We strive for
              excellence in every project, ensuring precision, efficiency, and sustainability.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              We are committed to delivering solutions that not only meet but exceed industry standards, while maintaining
              the highest level of integrity and professionalism in all our interactions with clients, partners, and employees.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-3xl font-bold mb-6 text-red-600">Our Vision</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We aspire to be the global leader in mechanical engineering solutions, recognized for our technical excellence,
              innovative approaches, and unwavering commitment to quality.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              Our vision encompasses a future where <strong>Mechanical Solutions Inc.</strong> sets the industry standard for
              precision engineering, sustainable practices, and client satisfaction, while fostering a culture of continuous
              improvement and professional growth for our team members.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-red-600">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="p-10 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-4xl font-bold mb-10 text-red-600 text-center">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Excellence</h3>
              </div>
              <p className="text-gray-700">
                We pursue excellence in everything we do, from the smallest component to the largest project, 
                ensuring that our work meets the highest standards of quality and precision.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Integrity</h3>
              </div>
              <p className="text-gray-700">
                We operate with transparency, honesty, and ethical principles, building lasting relationships
                based on trust and mutual respect with our clients, partners, and team members.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Innovation</h3>
              </div>
              <p className="text-gray-700">
                We embrace creativity and forward-thinking, continuously seeking new technologies, methodologies,
                and solutions to address complex engineering challenges and improve our services.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Collaboration</h3>
              </div>
              <p className="text-gray-700">
                We believe in the power of teamwork, fostering an environment where diverse perspectives and 
                skills come together to create comprehensive solutions that exceed expectations.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Sustainability</h3>
              </div>
              <p className="text-gray-700">
                We are committed to environmental responsibility, designing and implementing solutions that 
                minimize ecological impact while maximizing efficiency and performance.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Reliability</h3>
              </div>
              <p className="text-gray-700">
                We deliver on our promises, ensuring consistent quality, timeliness, and dependability in all 
                our projects and services, building confidence and trust with every interaction.
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
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-lg`}
              >
                Our History
              </button>
              <button
                onClick={() => setActiveTab('leadership')}
                className={`${
                  activeTab === 'leadership' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-lg`}
              >
                Leadership Team
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`${
                  activeTab === 'certifications' 
                    ? 'border-red-500 text-red-600' 
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
                <h2 className="text-3xl font-bold mb-8 text-red-600">Our Journey Through the Years</h2>
                <div className="space-y-8">
                  {timeline.map((event, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div className="rounded-full bg-red-500 text-white font-bold text-sm w-16 h-16 flex items-center justify-center">
                          {event.year}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="h-full w-0.5 bg-red-300 my-2"></div>
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
                <h2 className="text-3xl font-bold mb-8 text-red-600">Our Leadership Team</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {leadership.map((person, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                      <p className="text-red-600 font-medium mb-4">{person.position}</p>
                      <p className="text-gray-700">{person.background}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'certifications' && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-red-600">Industry Certifications</h2>
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="w-6 h-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
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

    

        {/* Global Presence */}
        <section className="p-10 bg-gray-50 rounded-2xl shadow-md">
          <h2 className="text-4xl font-bold mb-8 text-red-600 text-center">Our Global Presence</h2>
          <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
            With operations spanning multiple continents, Mechanical Solutions Inc. delivers consistent quality and expertise
            to clients worldwide, combining global capabilities with local knowledge.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">North America</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Chicago, USA (Headquarters)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Toronto, Canada
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Houston, USA
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Mexico City, Mexico
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Europe & Middle East</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Frankfurt, Germany
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Manchester, UK
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Dubai, UAE
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Milan, Italy
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Asia Pacific</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Singapore
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Shanghai, China
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Tokyo, Japan
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-red-500 mr-2" />
                  Sydney, Australia
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-gradient-to-br from-red-600 to-red-400 text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Engineering Challenges?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Contact our team today to discuss how Mechanical Solutions Inc. can provide the expertise, 
            innovation, and quality you need for your next project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-white text-red-600 hover:bg-white-200 transition duration-300 py-3 px-8 rounded-full font-bold shadow-md text-lg">
              Get in Touch
            </a>
            <a href="/services" className="bg-transparent hover:bg-red-700 border-2 border-white transition duration-300 py-3 px-8 rounded-full font-bold text-lg">
              Explore Our Services
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}