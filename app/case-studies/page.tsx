import { TrendingUp, Users, Clock, DollarSign, ArrowRight, Building2, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

interface CaseStudy {
    company: string;
    industry: string;
    industryIcon: React.ReactNode;
    challenge: string;
    solution: string;
    results: {
        metric: string;
        value: string;
        icon: React.ReactNode;
    }[];
    testimonial: {
        quote: string;
        author: string;
        position: string;
    };
    tags: string[];
}

export default function CaseStudiesPage() {
    const caseStudies: CaseStudy[] = [
        {
            company: "Toko Sepatu Online (Jakarta)",
            industry: "E-Commerce",
            industryIcon: <ShoppingCart className="w-6 h-6" />,
            challenge: "Owner sibuk mengurus packing dan gudang, sering terlambat membalas WhatsApp customer yang bertanya 'Ready stok berapa?' atau 'Ongkir ke Bandung berapa?'. Banyak yang akhirnya beli di toko lain karena respons lambat.",
            solution: "Membuat WhatsApp Bot yang terhubung ke Google Sheet inventory. Customer bisa menanyakan stok real-time, cek ongkir otomatis, dan bot langsung membuatkan nota pembayaran. Owner tinggal approve order yang masuk.",
            results: [
                { metric: "Response Time", value: "2-3 jam → 1 menit", icon: <Clock className="w-6 h-6" /> },
                { metric: "Chat Handled", value: "~50-70 chat/hari", icon: <Users className="w-6 h-6" /> },
                { metric: "Time Saved", value: "~3 jam/hari", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Owner Review", value: "Worth it!", icon: <DollarSign className="w-6 h-6" /> }
            ],
            testimonial: {
                quote: "Sebelumnya sangat lelah membalas chat satu per satu, sekarang bot yang menanganinya. Saya fokus packing saja. Customer juga senang karena jawaban langsung. Sangat direkomendasikan!",
                author: "Budi (Owner)",
                position: "Toko Sepatu Online Jakarta"
            },
            tags: ["WhatsApp Bot", "E-Commerce", "Inventory Check"]
        },
        {
            company: "Barbershop & Salon (Surabaya)",
            industry: "Jasa Kecantikan",
            industryIcon: <Heart className="w-6 h-6" />,
            challenge: "Resepsionis sering missed call karena sedang sibuk memotong rambut. Double booking sering terjadi karena pencatatan manual di buku. Customer juga suka lupa jadwal dan tidak datang.",
            solution: "Membuat sistem booking via WhatsApp yang sync ke Google Calendar. Customer tinggal chat 'Mau book besok jam 3', bot mengecek slot kosong dan langsung booking. H-1 otomatis mengirim reminder via WhatsApp.",
            results: [
                { metric: "No-Show Rate", value: "~25% → ~8%", icon: <Users className="w-6 h-6" /> },
                { metric: "Double Booking", value: "Hampir ilang", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Admin Time", value: "2 jam/hari saved", icon: <Clock className="w-6 h-6" /> },
                { metric: "Customer Feedback", value: "Lebih praktis!", icon: <DollarSign className="w-6 h-6" /> }
            ],
            testimonial: {
                quote: "Sekarang customer bisa booking sendiri tanpa harus menelepon atau datang langsung. Reminder otomatis membuat mereka tidak lupa. Double booking juga sudah jarang sekali. Terima kasih!",
                author: "Rani (Manager)",
                position: "Salon & Barbershop Surabaya"
            },
            tags: ["Booking System", "WhatsApp", "Google Calendar"]
        },
        {
            company: "Freelance Property Agent (Tangerang)",
            industry: "Real Estate",
            industryIcon: <Building2 className="w-6 h-6" />,
            challenge: "Kebanyakan chat WhatsApp ternyata hanya 'Nanya-nanya saja' (window shopping). Buang waktu banyak untuk qualify lead, jadi yang serius malah terlewat karena respons lambat.",
            solution: "Membuat bot qualifier yang menanyakan budget, lokasi yang dicari, dan timeline beli. Bot memberikan rekomendasi property dari Google Sheet. Kalau prospek serius (budget cocok), baru otomatis diteruskan ke agent.",
            results: [
                { metric: "Lead Filtered", value: "~40-50 chat/minggu", icon: <Users className="w-6 h-6" /> },
                { metric: "Serious Leads", value: "~10-15 qualified", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Time Saved", value: "5-7 jam/minggu", icon: <Clock className="w-6 h-6" /> },
                { metric: "Closing Rate", value: "Lebih fokus ke hot leads", icon: <DollarSign className="w-6 h-6" /> }
            ],
            testimonial: {
                quote: "Bot ini sangat membantu memfilter mana yang benar-benar mau beli, mana yang iseng. Saya jadi bisa fokus follow-up yang serius. Hemat waktu dan tenaga!",
                author: "Agus (Agent)",
                position: "Freelance Property Agent Tangerang"
            },
            tags: ["Lead Qualification", "WhatsApp", "CRM"]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative px-4">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="gradient-text">Freelance Projects</span>
                    <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                        Real Projects, Real Solutions
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                    Berikut beberapa project freelance yang saya kerjakan. Sederhana namun sangat membantu klien kecil yang membutuhkan otomasi
                </p>

                {/* Overall Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { number: "5+", label: "Projects Delivered" },
                        { number: "100%", label: "Client Satisfaction" },
                        { number: "~1 Tahun", label: "Experience" }
                    ].map((stat, index) => (
                        <div key={index} className="glass-strong p-6 rounded-2xl">
                            <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Case Studies */}
            <section className="max-w-7xl mx-auto space-y-12 mb-20">
                {caseStudies.map((study, index) => (
                    <div key={index} className="glass-strong rounded-3xl p-8 md:p-12">
                        {/* Company Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl glass text-cyan-400">
                                {study.industryIcon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{study.company}</h2>
                                <p className="text-cyan-400 font-medium">{study.industry}</p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {study.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-1 rounded-full glass text-sm text-cyan-400 border border-cyan-500/30"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Challenge & Solution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div>
                                <h3 className="text-xl font-bold text-red-400 mb-4">❌ Challenge</h3>
                                <p className="text-gray-400 leading-relaxed">{study.challenge}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">✅ Solution</h3>
                                <p className="text-gray-400 leading-relaxed">{study.solution}</p>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold gradient-text mb-6">📊 Results</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {study.results.map((result, idx) => (
                                    <div key={idx} className="glass p-6 rounded-xl text-center hover-lift">
                                        <div className="flex justify-center text-purple-400 mb-3">
                                            {result.icon}
                                        </div>
                                        <div className="text-sm text-gray-400 mb-2">{result.metric}</div>
                                        <div className="text-2xl font-bold gradient-text">{result.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial */}
                        <div className="glass rounded-2xl p-8 border-l-4 border-cyan-500">
                            <p className="text-lg text-gray-300 italic mb-6">&quot;{study.testimonial.quote}&quot;</p>
                            <div>
                                <p className="font-bold text-white">{study.testimonial.author}</p>
                                <p className="text-sm text-cyan-400">{study.testimonial.position}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* CTA Section */}
            <section className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center">
                <h2 className="text-4xl font-bold mb-6">
                    <span className="gradient-text">Siap Jadi Success Story Berikutnya?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    Konsultasi gratis untuk explore bagaimana AI automation bisa transform bisnis Anda
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
                    >
                        Schedule Consultation
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/services"
                        className="px-8 py-4 rounded-xl font-semibold glass-strong border border-cyan-500/30 text-white hover:border-cyan-500 transition-all duration-300"
                    >
                        Explore Services
                    </Link>
                </div>
            </section>
        </main>
    );
}

