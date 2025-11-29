import { Target, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const values = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Fokus pada Impact",
            description: "Bukan hanya membuat automation, tapi memastikan setiap solusi deliver real value dan measurable results untuk bisnis Anda"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Practical & Scalable",
            description: "Solusi yang tidak hanya work hari ini, tapi bisa scale seiring bisnis Anda berkembang—tanpa perlu rebuild dari nol"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Quality over Quantity",
            description: "Saya selektif dengan project yang diambil untuk memastikan hasil maksimal. Setiap client mendapat perhatian penuh"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative px-4">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="gradient-text">Tentang Seriaflow</span>
                    <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                        AI Automation untuk Business yang Ingin Scaling
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Saya membantu berbagai bisnis mengotomatiskan proses repetitif dengan solusi AI automation yang praktis dan terjangkau
                </p>
            </section>

            <section className="max-w-4xl mx-auto mb-20">
                <div className="glass-strong rounded-3xl p-12">
                    <h2 className="text-4xl font-bold gradient-text mb-6">Kenapa Seriaflow Ada</h2>
                    <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                        <p>
                            Terlalu banyak bisnis yang stuck dengan pekerjaan repetitif. Mereka tahu otomasi bisa membantu,
                            tapi solusi enterprise terlalu mahal, dan agency besar tidak menawarkan solusi untuk kebutuhan yang
                            lebih sederhana namun tetap efektif.
                        </p>
                        <p>
                            Saya percaya <span className="text-cyan-400 font-semibold">AI automation seharusnya accessible untuk semua bisnis</span>,
                            bukan hanya untuk korporat dengan budget besar. Itulah kenapa saya fokus membuat solusi praktis yang
                            benar-benar solve real problems—tanpa over-engineering atau harga yang tidak masuk akal.
                        </p>
                        <p>
                            Sejauh ini, saya sudah deploy 20+ automation systems untuk berbagai klien di 5 industri berbeda.
                            Dari e-commerce, professional services, sampai tech startups—semuanya dengan satu tujuan:
                            <span className="text-purple-400 font-semibold"> save time, increase efficiency, dan let businesses fokus ke hal yang penting</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="max-w-4xl mx-auto mb-20">
                <div className="glass-strong rounded-3xl p-12">
                    <div className="inline-flex p-4 rounded-xl glass text-cyan-400 mb-6">
                        <Target className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">Misi Saya</h2>
                    <p className="text-gray-400 leading-relaxed text-lg">
                        Membuat AI automation yang powerful, terjangkau, dan mudah diimplementasikan untuk berbagai
                        jenis bisnis. Saya ingin membantu founders dan business owners fokus pada growth dan strategy,
                        bukan menghabiskan waktu untuk manual tasks yang seharusnya bisa diotomatisasi.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-5xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    <span className="gradient-text">Yang Saya Pegang</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <div key={index} className="glass-strong rounded-2xl p-8 hover-lift">
                            <div className="inline-flex p-4 rounded-xl glass text-cyan-400 mb-4">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Simple Stats */}
            <section className="max-w-4xl mx-auto mb-20">
                <div className="glass-strong rounded-3xl p-12">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        <span className="gradient-text">Track Record</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold gradient-text mb-2">20+</div>
                            <div className="text-gray-400">Automations Deployed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold gradient-text mb-2">500+</div>
                            <div className="text-gray-400">Hours Saved for Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold gradient-text mb-2">5</div>
                            <div className="text-gray-400">Industries Served</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center">
                <h2 className="text-4xl font-bold mb-6">
                    <span className="gradient-text">Mari Diskusikan Projekt Anda</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                    Saya siap membantu bisnis Anda dengan solusi otomasi yang tepat dan terjangkau
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
                    >
                        Hubungi Saya
                    </Link>
                    <Link
                        href="/case-studies"
                        className="px-8 py-4 rounded-xl font-semibold glass-strong border border-cyan-500/30 text-white hover:border-cyan-500 transition-all duration-300"
                    >
                        Lihat Portfolio
                    </Link>
                </div>
            </section>
        </main>
    );
}
