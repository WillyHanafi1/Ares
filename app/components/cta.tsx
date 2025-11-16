import React from 'react';
import { Rocket, Calendar, FileSearch } from 'lucide-react';

interface CTAOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonColor: string;
  href: string;
}

const CTA: React.FC = () => {
  const ctaOptions: CTAOption[] = [
    {
      title: "Konsultasi Gratis",
      description: "Diskusikan kebutuhan AI Anda dengan expert kami selama 30 menit",
      icon: <Calendar className="w-8 h-8" />,
      buttonText: "Jadwalkan Konsultasi Gratis",
      buttonColor: "from-cyan-500 to-blue-600",
      href: "#contact"
    },
    {
      title: "Audit Automasi Gratis",
      description: "Dapatkan analisis mendalam tentang peluang automasi di bisnis Anda",
      icon: <FileSearch className="w-8 h-8" />,
      buttonText: "Dapatkan Audit Gratis",
      buttonColor: "from-purple-500 to-pink-600",
      href: "#contact"
    },
    {
      title: "Mulai Proyek",
      description: "Sudah tahu apa yang Anda butuhkan? Mari langsung mulai!",
      icon: <Rocket className="w-8 h-8" />,
      buttonText: "Mulai Proyek Anda",
      buttonColor: "from-cyan-500 to-purple-600",
      href: "#contact"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Siap Untuk Memulai?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Pilih langkah pertama Anda menuju transformasi AI yang menguntungkan
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {ctaOptions.map((option, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-8 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-2 group text-center"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${option.buttonColor} mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                <div className="text-white">
                  {option.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                {option.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                {option.description}
              </p>

              {/* Button */}
              <a
                href={option.href}
                className={`inline-block w-full bg-gradient-to-r ${option.buttonColor} text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                {option.buttonText}
              </a>
            </div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="text-center">
          <div className="inline-block bg-gray-800 border border-cyan-500/30 rounded-full px-8 py-4">
            <p className="text-cyan-400 font-medium">
              ✨ 100% Gratis, Tanpa Komitmen - Konsultasi pertama tidak mengikat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
