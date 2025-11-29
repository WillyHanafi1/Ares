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
      description: "Saya memahami masalah Anda secara mendalam, menganalisis proses bisnis, dan mengidentifikasi peluang automasi yang paling impactful.",
      icon: <Search className="w-10 h-10 text-cyan-400" />
    },
    {
      number: "02",
      title: "Strategi",
      subtitle: "Strategy",
      description: "Saya merancang solusi automation yang sesuai dengan kebutuhan spesifik bisnis Anda dan memetakan roadmap implementasi yang jelas.",
      icon: <Lightbulb className="w-10 h-10 text-purple-400" />
    },
    {
      number: "03",
      title: "Implementasi",
      subtitle: "Implementation",
      description: "Saya membangun dan mengintegrasikan solusi ke dalam sistem Anda dengan minimal disruption pada operasional.",
      icon: <Cog className="w-10 h-10 text-cyan-400" />
    },
    {
      number: "04",
      title: "Dukungan",
      subtitle: "Support",
      description: "Saya memastikan semuanya berjalan lancar dengan monitoring berkelanjutan dan support responsif untuk menjaga performa optimal.",
      icon: <HeadphonesIcon className="w-10 h-10 text-purple-400" />
    }
  ];

  return (
    <section id="process" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Bagaimana Saya Bekerja</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Automation tidak harus rumit. Proses yang sederhana, jelas, dan terukur untuk bisnis Anda
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Animated Connection Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 overflow-hidden" style={{ top: '6rem' }}>
            <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-30 animate-gradient" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Step Card */}
                <div className="glass-strong rounded-2xl p-8 min-h-[320px] h-full flex flex-col transition-all duration-500 hover:-translate-y-3 hover:glow-purple-sm relative overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Number Badge */}
                  <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl z-10 animate-pulse-glow"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 100%)'
                    }}>
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div className="mb-6 pt-8 relative">
                    <div className="inline-flex p-3 rounded-xl glass transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:gradient-text transition-all duration-300">
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-cyan-400 mb-4 font-medium uppercase tracking-wide">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed relative z-10 flex-grow">
                    {step.description}
                  </p>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
                      border: '1px solid rgba(168, 85, 247, 0.3)'
                    }}
                  />
                </div>

                {/* Arrow Connector - Hidden on mobile and last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 z-20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 opacity-50 animate-pulse">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center fade-in-up">
          <p className="text-gray-400 mb-6 text-lg">
            Siap untuk memulai automation di bisnis Anda?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 glass-strong px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 glow-cyan-sm hover:glow-cyan"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Diskusi Project Anda
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
