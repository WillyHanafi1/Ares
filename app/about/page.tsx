import { Target, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const values = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Fokus pada Hasil",
            description: "Saya tidak hanya membuat bot, tapi memastikan solusi benar-benar menyelesaikan masalah bisnis Anda"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Komunikasi Jelas",
            description: "Tidak ada istilah teknis yang membingungkan. Saya menjelaskan semuanya dengan bahasa yang mudah dipahami"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Harga Terjangkau",
            description: "Solusi AI automation tidak harus mahal. Cocok untuk bisnis kecil yang ingin berkembang dengan teknologi"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative px-4">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="gradient-text">Tentang Seriaflow</span>
                    <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                        AI Automation untuk Bisnis Kecil
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Saya membantu bisnis kecil di Indonesia mengotomatiskan pekerjaan repetitif dengan solusi WhatsApp Bot dan AI yang terjangkau
                </p>
            </section>

            {/* Story Section */}
            <section className="max-w-4xl mx-auto mb-20">
                <div className="glass-strong rounded-3xl p-12">
                    <h2 className="text-4xl font-bold gradient-text mb-6">Cerita Saya</h2>
                    <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                        <p>
                            Seriaflow dimulai dari pengalaman pribadi saya melihat banyak pemilik bisnis kecil yang kerepotan
                            dengan chat WhatsApp yang tidak pernah berhenti. Mereka tahu teknologi bisa membantu, tapi
                            solusi yang ada terlalu mahal atau terlalu rumit.
                        </p>
                        <p>
                            Saya yakin <span className="text-cyan-400 font-semibold">otomasi AI seharusnya bisa diakses oleh semua orang</span>,
                            bukan hanya perusahaan besar. Dengan pengalaman belajar mandiri dan tutorial, saya mulai membuat
                            solusi sederhana yang benar-benar membantu bisnis kecil.
                        </p>
                        <p>
                            Hari ini, saya sudah membantu beberapa klien menghemat waktu dan meningkatkan layanan mereka.
                            Ini masih permulaan, dan saya terus belajar untuk memberikan solusi yang lebih baik.
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
                        Membuat otomasi AI yang terjangkau dan mudah digunakan untuk bisnis kecil di Indonesia.
                        Saya ingin membantu pemilik bisnis fokus pada hal yang penting, bukan menghabiskan waktu
                        untuk pekerjaan berulang yang bisa diotomatisasi.
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
                        <span className="gradient-text">Pencapaian Sejauh Ini</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold gradient-text mb-2">5+</div>
                            <div className="text-gray-400">Project Selesai</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold gradient-text mb-2">100%</div>
                            <div className="text-gray-400">Klien Puas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold gradient-text mb-2">~1 Tahun</div>
                            <div className="text-gray-400">Pengalaman</div>
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
