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
        <section className="relative py-24 px-4">
            {/* Gradient Background Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 fade-in-up">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="gradient-text">Siap Untuk Memulai?</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Pilih langkah pertama Anda menuju transformasi AI yang menguntungkan
                    </p>
                </div>

                {/* CTA Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {ctaOptions.map((option, index) => (
                        <div
                            key={index}
                            className="group text-center"
                        >
                            <div className="glass-strong rounded-2xl p-8 transition-all duration-500 hover:-translate-y-3 hover:glow-purple-sm relative overflow-hidden h-full flex flex-col">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon */}
                                <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${option.buttonColor} mb-6 mx-auto animate-pulse-glow group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                                    <div className="text-white">
                                        {option.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:gradient-text transition-all duration-300">
                                    {option.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                                    {option.description}
                                </p>

                                {/* Button */}
                                <a
                                    href={option.href}
                                    className={`relative inline-block w-full bg-gradient-to-r ${option.buttonColor} text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden group/btn`}
                                >
                                    <span className="relative z-10">{option.buttonText}</span>
                                    {/* Button shimmer */}
                                    <div className="absolute inset-0 shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Guarantee Badge */}
                <div className="text-center fade-in-up">
                    <div className="inline-flex items-center gap-3 glass-strong px-8 py-5 rounded-full border border-cyan-500/30 hover-lift">
                        <span className="text-2xl">✨</span>
                        <p className="text-cyan-400 font-medium">
                            100% Gratis, Tanpa Komitmen - Konsultasi pertama tidak mengikat
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
