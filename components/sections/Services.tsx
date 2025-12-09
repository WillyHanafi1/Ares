import React from 'react';
import { MessageSquare, Phone, Rocket, DollarSign } from 'lucide-react';

// Interface untuk tipe data service item
interface ServiceItem {
    title: string;
    problem: string;
    outcome: string;
    icon: React.ReactNode;
}

const Services: React.FC = () => {
    // Data untuk kartu layanan - fokus pada dream outcome
    const services: ServiceItem[] = [
        {
            title: "Outbound Messaging",
            problem: "Pipeline prospek kosong dan outreach manual memakan waktu berlebihan",
            outcome: "Pipeline penuh dengan qualified leads yang sudah ter-engage dan siap untuk follow-up—tanpa Anda menghabiskan waktu satu per satu",
            icon: <MessageSquare className="w-12 h-12 text-cyan-400" />
        },
        {
            title: "Lead Qualifying",
            problem: "Sales team menghabiskan waktu untuk prospek yang tidak qualified dan tidak jadi closing",
            outcome: "Sales team Anda hanya berbicara dengan prospek yang ready to buy dengan budget yang sesuai. Eliminasi time-wasters sepenuhnya",
            icon: <Phone className="w-12 h-12 text-purple-400" />
        },
        {
            title: "Client Onboarding",
            problem: "Klien churn di bulan pertama karena tidak merasakan value dengan cepat",
            outcome: "Klien merasakan quick win dalam minggu pertama. Retention meningkat karena mereka sudah invested dari awal",
            icon: <Rocket className="w-12 h-12 text-cyan-400" />
        },
        {
            title: "Financial Dashboard",
            problem: "Tidak mengetahui kondisi keuangan real-time, keputusan bisnis dibuat berdasarkan asumsi",
            outcome: "Anda mengetahui exact cash flow setiap saat. Keputusan bisnis diambil berdasarkan data, bukan perkiraan",
            icon: <DollarSign className="w-12 h-12 text-purple-400" />
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
                        <span className="gradient-text">Automation Solutions</span>
                        <span className="block text-gray-300 mt-2 text-3xl">Yang Benar-Benar Solve Problems</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Ini bukan tentang teknologi. Ini tentang hasil yang Anda dapatkan untuk bisnis Anda
                    </p>
                </div>

                {/* Services Grid - 1x4 horizontal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group perspective-1000"
                        >
                            <div className="glass-strong rounded-2xl p-8 transition-all duration-500 hover:-translate-y-3 hover:glow-cyan-sm relative overflow-hidden h-full flex flex-col">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon Container */}
                                <div className="relative mb-6 inline-flex p-4 rounded-xl glass transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 w-fit">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-6 text-white group-hover:gradient-text transition-all duration-300">
                                    {service.title}
                                </h3>

                                {/* Problem */}
                                <div className="mb-6">
                                    <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">❌ Masalah</span>
                                    <p className="text-gray-400 mt-2 leading-relaxed">
                                        {service.problem}
                                    </p>
                                </div>

                                {/* Dream Outcome */}
                                <div className="mt-auto">
                                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">✨ Hasil yang Anda Dapatkan</span>
                                    <p className="text-gray-100 mt-2 leading-relaxed font-medium">
                                        {service.outcome}
                                    </p>
                                </div>

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
