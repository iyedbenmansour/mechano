import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Navbar />
      <main className="px-6 py-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg pt-16">
          About Us
        </h1>

        <section className="mb-12 p-6 bg-gray-800/50 rounded-xl shadow-xl border border-red-500/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            At Mechanical Solutions Inc., our mission is to provide high-quality, reliable, and innovative mechanical engineering services tailored to the unique needs of our clients. We strive for excellence in every project, ensuring precision, efficiency, and sustainability.
          </p>
        </section>

        <section className="mb-12 p-6 bg-gray-800/50 rounded-xl shadow-xl border border-red-500/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Our History</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Founded over 20 years ago, Mechanical Solutions Inc. has grown from a small local workshop to a full-service engineering firm. Our team’s deep expertise spans custom fabrication, maintenance, repair, and engineering consulting — serving industries from manufacturing to infrastructure.
          </p>
        </section>

        <section className="mb-12 p-6 bg-gray-800/50 rounded-xl shadow-xl border border-red-500/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Our Values</h2>
          <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed text-gray-300">
            <li>
              <strong className="text-red-400">Precision:</strong> We deliver products and services that meet the highest engineering standards.
            </li>
            <li>
              <strong className="text-red-400">Integrity:</strong> Transparency and trustworthiness guide every client interaction.
            </li>
            <li>
              <strong className="text-red-400">Innovation:</strong> We embrace new technologies and methods to optimize solutions.
            </li>
            <li>
              <strong className="text-red-400">Customer Focus:</strong> Tailored solutions that address the exact needs of our clients.
            </li>
            <li>
              <strong className="text-red-400">Safety & Sustainability:</strong> Prioritizing safe operations and environmentally responsible practices.
            </li>
          </ul>
        </section>

      </main>
      <Footer />
    </div>
  );
}