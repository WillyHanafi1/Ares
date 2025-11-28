import React from 'react';
import { Cpu, Bot, BarChart } from 'lucide-react';

// Interface untuk tipe data service item
interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Services: React.FC = () => {
  // Data untuk kartu layanan
  const services: ServiceItem[] = [
    {
      title: "Automasi Proses Bisnis (BPA)",
      description: "Kami mengotomatiskan tugas manual berulang seperti entri data, alur kerja, dan pelaporan, membebaskan waktu tim Anda.",
      icon: <Cpu className="w-12 h-12 text-cyan-400" />
    },
    {
      title: "Chatbot & Asisten Virtual Cerdas",
      description: "Membangun agen percakapan AI yang memberikan layanan pelanggan 24/7, memahami konteks, dan terintegrasi dengan sistem Anda.",
      icon: <Bot className="w-12 h-12 text-purple-400" />
    },
    {
      title: "Analisis & Prediksi Data",
      description: "Mengubah tumpukan data Anda menjadi insight yang dapat ditindaklanjuti. Kami membuat model prediktif untuk membantu Anda mengambil keputusan.",
      icon: <BarChart className="w-12 h-12 text-cyan-400" />
    }
  ];

  return (
    <section id="services" className="relative py-24 px-4">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Solusi AI</span>
            <span className="block text-gray-300 mt-2">untuk Setiap Kebutuhan</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Kami merancang dan mengimplementasikan solusi AI kustom yang mendorong efisiensi nyata bagi bisnis Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group perspective-1000"
            >
              <div className="glass-strong rounded-2xl p-8 transition-all duration-500 hover:-translate-y-3 hover:glow-cyan-sm transform-3d hover:rotate-y-5 relative overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container */}
                <div className="relative mb-6 inline-flex p-4 rounded-xl glass transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:gradient-text transition-all duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.3)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
