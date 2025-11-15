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
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Solusi AI untuk Setiap Kebutuhan
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Kami merancang dan mengimplementasikan solusi AI kustom yang mendorong efisiensi nyata bagi bisnis Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className="mb-5 transform transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
