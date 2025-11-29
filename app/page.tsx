import Services from "./components/services";
import Process from "./components/process";
import CTA from "./components/cta";
import Contact from "./components/contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8 hover-lift">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Automation Freelancer
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="block gradient-text animate-gradient">
                Seriaflow
              </span>
              <span className="block text-3xl md:text-5xl mt-4 text-gray-300 font-normal">
                Transformasi Bisnis dengan AI
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Otomatisasi proses bisnis Anda dengan solusi AI kustom yang dirancang khusus untuk kebutuhan perusahaan modern
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="group glass-strong px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 glow-cyan-sm hover:glow-cyan inline-flex items-center gap-2"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Jadwalkan Konsultasi Gratis
                </span>
                <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="px-8 py-4 rounded-xl font-semibold border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 text-gray-300 hover:text-white inline-flex items-center gap-2"
              >
                Lihat Layanan Kami
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
            {[
              { number: "5+", label: "Projects Delivered" },
              { number: "100%", label: "Satisfied Clients" },
              { number: "~1 Tahun", label: "Experience" }
            ].map((stat, index) => (
              <div key={index} className="glass text-center p-6 rounded-2xl hover-lift">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
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

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-gray-800/50 glass-strong">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-3">Seriaflow</h3>
              <p className="text-gray-400 text-sm">
                AI Automation Agency yang membantu bisnis Indonesia bertransformasi dengan teknologi AI
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Layanan</a></li>
                <li><a href="#process" className="hover:text-cyan-400 transition-colors">Proses</a></li>
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Kontak</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-3">Hubungi Kami</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="mailto:willy@seriaflow.com" className="hover:text-cyan-400 transition-colors">
                    willy@seriaflow.com
                  </a>
                </li>
                <li>Indonesia</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-gray-800/50">
            <p className="text-gray-500 text-sm">
              © 2025 Seriaflow. All rights reserved. Built with AI ✨
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
