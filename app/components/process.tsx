import React from 'react';
import { Search, Lightbulb, Cog, HeadphonesIcon } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Penemuan",
      subtitle: "Discovery",
      description: "Kami memahami masalah Anda secara mendalam, menganalisis proses bisnis, dan mengidentifikasi peluang automasi terbaik.",
      icon: <Search className="w-10 h-10 text-cyan-400" />
    },
    {
      number: "02",
      title: "Strategi",
      subtitle: "Strategy",
      description: "Kami merancang solusi AI yang disesuaikan dengan kebutuhan spesifik bisnis Anda dan memetakan roadmap implementasi.",
      icon: <Lightbulb className="w-10 h-10 text-purple-400" />
    },
    {
      number: "03",
      title: "Implementasi",
      subtitle: "Implementation",
      description: "Kami membangun dan mengintegrasikan solusi AI ke dalam sistem Anda dengan minimal disruption pada operasional.",
      icon: <Cog className="w-10 h-10 text-cyan-400" />
    },
    {
      number: "04",
      title: "Dukungan",
      subtitle: "Support",
      description: "Kami memastikan semuanya berjalan lancar dengan monitoring berkelanjutan, training, dan support teknis 24/7.",
      icon: <HeadphonesIcon className="w-10 h-10 text-purple-400" />
    }
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Proses Kami
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            AI tidak harus rumit. Kami membuat prosesnya sederhana, jelas, dan bebas risiko untuk bisnis Anda.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-20" 
               style={{ top: '6rem' }} />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Step Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-2">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/50 z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 pt-4 transform transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-cyan-400 mb-4 font-medium">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Hidden on mobile and last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 text-cyan-500 opacity-30 z-20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Siap untuk memulai transformasi AI di bisnis Anda?
          </p>
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            Jadwalkan Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
