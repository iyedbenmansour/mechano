import { Briefcase, Users, Award, Leaf, Clock, Star, Target, Shield, Globe, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('history');

  const stats = [
    { icon: <Briefcase className="w-8 h-8 text-blue-600" />, label: "Produits Développés", value: "200+" },
    { icon: <Users className="w-8 h-8 text-blue-600" />, label: "Clients Heureux", value: "500+" },
    { icon: <Award className="w-8 h-8 text-blue-600" />, label: "Certifications de Qualité", value: "10+" },
    { icon: <Leaf className="w-8 h-8 text-blue-600" />, label: "Années d'Expérience", value: "25+" },
  ];

  const timeline = [
    { year: "1998", title: "Fondation de l'Entreprise", description: "SILAD a été créée en Tunisie en tant que spécialiste des lubrifiants et accessoires automobiles." },
    { year: "2003", title: "Extension de la Gamme de Produits", description: "Nous avons élargi notre gamme de produits pour inclure des lubrifiants industriels et des fluides automobiles spécialisés." },
    { year: "2008", title: "Entrée sur le Marché Nord-Africain", description: "Nous avons réussi à pénétrer de nouveaux marchés en Afrique du Nord, notamment en Algérie, au Maroc et en Libye." },
    { year: "2012", title: "Certification de Qualité", description: "Obtention de la certification ISO 9001 pour notre engagement envers les systèmes de gestion de la qualité." },
    { year: "2016", title: "Développement de Lubrifiants Avancés", description: "Lancement de notre gamme premium de lubrifiants synthétiques pour les véhicules et machines de haute performance." },
    { year: "2020", title: "Engagement Environnemental", description: "Introduction d'options de lubrifiants écologiques et d'initiatives d'emballage durable." },
    { year: "2024", title: "Transformation Numérique", description: "Mise en œuvre de systèmes numériques complets pour améliorer le service client et la gestion de la chaîne d'approvisionnement." }
  ];

  const leadership = [
    { name: "Mohamed Ben Ali", position: "Directeur Général", background: "Avec plus de 30 ans dans l'industrie des lubrifiants, Mohamed dirige SILAD avec vision et expertise. Sa connaissance approfondie des formulations d'huiles et des dynamiques du marché a positionné SILAD comme un leader sur le marché tunisien." },
    { name: "Leila Trabelsi", position: "Directrice Technique", background: "Leila apporte 20 ans d'innovation technique à notre équipe. Sa spécialisation en chimie des lubrifiants a donné lieu à nos formulations de produits les plus réussies et à nos protocoles de contrôle qualité." },
    { name: "Amir Kaddour", position: "Directeur des Opérations", background: "Amir supervise tous les aspects opérationnels de notre entreprise. Sa vaste expérience en fabrication et en gestion de la chaîne d'approvisionnement assure une qualité de produit constante et une livraison rapide." },
    { name: "Samia Bouazizi", position: "Chef de la Recherche & Développement", background: "À la tête de nos initiatives de R&D, Samia a développé plusieurs formulations de lubrifiants exclusives qui ont établi de nouvelles normes de performance et de durabilité dans l'industrie." }
  ];

  const certifications = [
    { title: "ISO 9001:2015", description: "Certification du système de gestion de la qualité garantissant une fabrication de produits cohérente et de haute qualité." },
    { title: "ISO 14001:2015", description: "Certification du système de gestion environnementale démontrant notre engagement envers le développement durable." },
    { title: "Certification API", description: "Certification de l'American Petroleum Institute pour les normes de qualité des lubrifiants." },
    { title: "Conformité ACEA", description: "Conformité aux normes de l'Association des Constructeurs Européens d'Automobiles pour les lubrifiants automobiles." },
    { title: "Certification des Normes Tunisiennes", description: "Certification NT pour le respect des normes de qualité nationales." }
  ];

  const services = [
    { icon: <Globe className="w-12 h-12 text-blue-600" />, title: "Lubrifiants Automobiles", description: "Huiles moteur, fluides de transmission et lubrifiants automobiles spécialisés de haute performance conçus pour une performance optimale des véhicules." },
    { icon: <Shield className="w-12 h-12 text-blue-600" />, title: "Solutions Industrielles", description: "Lubrifiants spécialisés pour les équipements de fabrication, les systèmes hydrauliques et les machines industrielles afin de maximiser l'efficacité et la longévité." },
    { icon: <Target className="w-12 h-12 text-blue-600" />, title: "Conseil Technique", description: "Conseils d'experts sur la sélection des lubrifiants, la planification de l'entretien et l'optimisation des performances pour les gestionnaires de flotte et les clients industriels." },
    { icon: <Globe className="w-12 h-12 text-blue-600" />, title: "Réseau de Distribution", description: "Capacités de distribution étendues dans toute l'Afrique du Nord, garantissant une livraison rapide et une disponibilité constante des produits." }
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-orange-700 to-orange-500 text-white text-center px-6">
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            À Propos de <span className="text-yellow-300">SILAD</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8">
            Société Internationale de Lubrifiants et Accessoires Différents — offrant des solutions de lubrifiants premium à travers l'Afrique du Nord depuis 1998.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#mission" className="bg-white text-orange-600 hover:bg-orange-50 transition duration-300 py-3 px-6 rounded-full font-bold shadow-md">
              Notre Mission
            </a>
            <a href="#contact" className="bg-transparent hover:bg-orange-700 border-2 border-white transition duration-300 py-3 px-6 rounded-full font-bold">
              Contactez-nous
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
            <h2 className="text-3xl font-bold mb-6 text-orange-600">Notre Mission</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Chez <strong>SILAD</strong>, notre mission est de fournir des solutions de lubrifiants de haute qualité, fiables et innovantes, adaptées aux besoins spécifiques de nos clients dans les secteurs automobile et industriel. Nous visons l'excellence dans chaque produit, garantissant une performance, une protection et une efficacité optimales.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              Nous nous engageons à livrer des lubrifiants qui non seulement respectent, mais dépassent les normes de l'industrie, tout en maintenant le plus haut niveau d'intégrité et de professionnalisme dans toutes nos interactions avec les clients, les partenaires et les employés.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-3xl font-bold mb-6 text-orange-600">Notre Vision</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Nous aspirons à être le principal fournisseur de lubrifiants en Afrique du Nord, reconnu pour notre excellence technique, nos formulations innovantes et notre engagement inébranlable envers la qualité.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              Notre vision englobe un avenir où <strong>SILAD</strong> établit la norme de l'industrie en matière de performance des lubrifiants, de pratiques respectueuses de l'environnement et de satisfaction client, tout en favorisant une culture d'amélioration continue et de croissance professionnelle pour les membres de notre équipe.
            </p>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-orange-600">Nos Produits & Services</h2>
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
          <h2 className="text-4xl font-bold mb-10 text-orange-600 text-center">Nos Valeurs Fondamentales</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Qualité</h3>
              </div>
              <p className="text-gray-700">
                Nous recherchons l'excellence dans chaque formulation, garantissant que nos lubrifiants répondent aux normes les plus élevées de performance, de protection et de longévité pour les véhicules et les machines.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Intégrité</h3>
              </div>
              <p className="text-gray-700">
                Nous agissons avec transparence, honnêteté et principes éthiques, en construisant des relations durables
                basées sur la confiance et le respect mutuel avec nos clients, distributeurs et membres de l'équipe.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Innovation</h3>
              </div>
              <p className="text-gray-700">
                Nous privilégions la recherche et le développement, en recherchant continuellement de nouvelles formulations, technologies et solutions pour relever les défis de lubrification en constante évolution et améliorer nos produits.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Orientation Client</h3>
              </div>
              <p className="text-gray-700">
                Nous priorisons les besoins de nos clients, en proposant des solutions sur mesure, un support technique et un service réactif pour garantir une satisfaction totale et des performances optimales.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Durabilité</h3>
              </div>
              <p className="text-gray-700">
                Nous sommes engagés envers la responsabilité environnementale, en développant des formulations de lubrifiants et des solutions d'emballage qui minimisent l'impact écologique tout en maximisant les performances.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Fiabilité</h3>
              </div>
              <p className="text-gray-700">
                Nous tenons nos promesses, garantissant une qualité constante, une disponibilité rapide et une fiabilité dans tous nos produits et services, renforçant la confiance à chaque achat.
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
                Notre Histoire
              </button>
              <button
                onClick={() => setActiveTab('leadership')}
                className={`${
                  activeTab === 'leadership' 
                    ? 'border-blue-600 text-orange-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-lg`}
              >
                Équipe de Direction
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
                <h2 className="text-3xl font-bold mb-8 text-orange-600">Notre Parcours au Fil des Ans</h2>
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
                <h2 className="text-3xl font-bold mb-8 text-orange-600">Notre Équipe de Direction</h2>
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
                <h2 className="text-3xl font-bold mb-8 text-orange-600">Certifications de l'Industrie</h2>
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
          <h2 className="text-4xl font-bold mb-8 text-orange-600 text-center">Notre Présence Régionale</h2>
          <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
            Avec des opérations stratégiques à travers l'Afrique du Nord, SILAD fournit des produits lubrifiants premium aux clients automobiles et industriels de toute la région, combinant expertise technique et connaissance du marché local.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tunisie</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Tunis (Siège Social)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Sfax (Fabrication)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Sousse (Distribution)
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Gabès (Installation de Stockage)
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Afrique du Nord</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Alger, Algérie
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Casablanca, Maroc
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Tripoli, Libye
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Le Caire, Égypte
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partenaires de Distribution</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Détaillants automobiles
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Fournisseurs industriels
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Entreprises de gestion de flotte
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-orange-600 mr-2" />
                  Centres de service
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-gradient-to-br from-orange-700 to-orange-500 text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Découvrir des Solutions de Lubrifiants Premium ?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Contactez notre équipe dès aujourd'hui pour discuter de la manière dont SILAD peut fournir les lubrifiants de haute qualité et l'expertise technique
            dont vous avez besoin pour vos véhicules ou votre équipement industriel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-white text-orange-600 hover:bg-orange-50 transition duration-300 py-3 px-8 rounded-full font-bold shadow-md text-lg">
              Contactez-nous
            </a>
            <a href="/products" className="bg-transparent hover:bg-orange-700 border-2 border-white transition duration-300 py-3 px-8 rounded-full font-bold text-lg">
              Découvrez nos Produits
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}