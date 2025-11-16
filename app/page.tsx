import Services from "./components/services";
import Process from "./components/process";
import CTA from "./components/cta";
import Contact from "./components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section - Placeholder */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Seriaflow
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            AI Automation Agency untuk Bisnis Modern
          </p>
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            Jadwalkan Konsultasi Gratis
          </a>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Process Section */}
      <Process />

      {/* CTA Section */}
      <CTA />

      {/* Contact Section */}
      <Contact />

      {/* Footer Placeholder */}
      <footer className="py-8 px-4 border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Seriaflow. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
