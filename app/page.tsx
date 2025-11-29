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
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="block gradient-text animate-gradient">
                Seriaflow
              </span>
              <span className="block text-3xl md:text-5xl mt-4 text-gray-300 font-normal">
                AI Automation yang Menghemat Waktu untuk Bisnis Anda
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Dari WhatsApp automation sampai data processing, saya membantu bisnis automate proses repetitif
              agar Anda bisa fokus ke hal yang lebih penting
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/case-studies"
                className="group px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Lihat Portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="px-8 py-4 rounded-xl font-semibold glass-strong border border-cyan-500/30 text-white hover:border-cyan-500 transition-all duration-300"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
            {[
              { number: "20+", label: "Automations Deployed" },
              { number: "500+", label: "Hours Saved" },
              { number: "5", label: "Industries Served" }
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
                AI Automation specialist yang membantu bisnis di berbagai industri untuk automate proses repetitif
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
