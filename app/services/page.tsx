import { Cpu, Bot, BarChart, Workflow, Database, Brain, Zap, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    benefits: string[];
}

export default function ServicesPage() {
    const services: Service[] = [
        {
            icon: <Bot className="w-12 h-12" />,
            title: "AI Chatbot & Virtual Assistant",
            description: "Chatbot cerdas yang memberikan customer service 24/7 dengan pemahaman konteks natural dan integrasi penuh dengan sistem bisnis Anda.",
            features: [
                "Natural Language Processing (NLP)",
                "Multi-channel support (Web, WhatsApp, Telegram)",
                "Context-aware conversations",
                "CRM integration",
                "Analytics dashboard"
            ],
            benefits: [
                "Respon instan 24/7",
                "Hemat biaya customer service hingga 70%",
                "Tingkatkan customer satisfaction"
            ]
        },
        {
            icon: <Workflow className="w-12 h-12" />,
            title: "Business Process Automation",
            description: "Otomatisasi tugas manual berulang seperti data entry, workflow approval, dan reporting untuk meningkatkan efisiensi operasional.",
            features: [
                "Automated data entry & validation",
                "Workflow automation",
                "Email & notification automation",
                "Document processing",
                "API integrations"
            ],
            benefits: [
                "Hemat waktu tim hingga 80%",
                "Eliminasi human error",
                "Fokus pada pekerjaan strategis"
            ]
        },
        {
            icon: <BarChart className="w-12 h-12" />,
            title: "Predictive Analytics & Data Insights",
            description: "Transform raw data menjadi predictive insights yang actionable untuk decision making yang lebih baik dan forecasting akurat.",
            features: [
                "Machine learning models",
                "Trend analysis & forecasting",
                "Custom dashboards",
                "Real-time data processing",
                "Predictive modeling"
            ],
            benefits: [
                "Data-driven decisions",
                "Identifikasi opportunities lebih cepat",
                "Forecast accuracy hingga 95%"
            ]
        },
        {
            icon: <Database className="w-12 h-12" />,
            title: "Intelligent Data Processing",
            description: "Ekstraksi, processing, dan analisis data otomatis dari berbagai sumber untuk insights yang lebih cepat dan akurat.",
            features: [
                "OCR & document scanning",
                "Data extraction & cleansing",
                "Automated classification",
                "Multi-source data integration",
                "Data quality monitoring"
            ],
            benefits: [
                "Process 1000x lebih cepat",
                "Akurasi hingga 99%",
                "Reduce operational cost"
            ]
        },
        {
            icon: <Brain className="w-12 h-12" />,
            title: "Custom AI Development",
            description: "Solusi AI custom-built yang disesuaikan dengan kebutuhan spesifik bisnis Anda, dari ideation hingga deployment.",
            features: [
                "Custom ML model development",
                "AI strategy consulting",
                "Model training & optimization",
                "Deployment & monitoring",
                "Ongoing support"
            ],
            benefits: [
                "Solution yang fit 100% dengan kebutuhan",
                "Competitive advantage",
                "ROI measurable"
            ]
        },
        {
            icon: <Zap className="w-12 h-12" />,
            title: "AI-Powered Marketing Automation",
            description: "Otomatisasi marketing campaign dengan AI untuk targeting yang lebih presisi dan conversion yang lebih tinggi.",
            features: [
                "Automated lead scoring",
                "Personalized content delivery",
                "Campaign optimization",
                "Customer segmentation",
                "Performance analytics"
            ],
            benefits: [
                "Conversion rate naik hingga 300%",
                "Marketing ROI lebih tinggi",
                "Personalization at scale"
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative">
            {/* Hero Section */}
            <section className="px-4 mb-20">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6">
                        <span className="gradient-text">AI Solutions</span>
                        <span className="block text-gray-300 text-4xl md:text-5xl mt-4">
                            untuk Setiap Kebutuhan Bisnis
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                        Berbagai solusi automation yang saya tawarkan untuk membantu bisnis Anda lebih efisien—dari chatbot sampai data processing
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                        {[
                            { number: "20+", label: "Automations Deployed" },
                            { number: "500+", label: "Hours Saved for Clients" },
                            { number: "5", label: "Industries Served" }
                        ].map((stat, index) => (
                            <div key={index} className="glass-strong p-6 rounded-2xl">
                                <div className="text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="px-4 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group glass-strong rounded-2xl p-8 hover-lift hover:glow-cyan-sm transition-all duration-500">
                                {/* Icon */}
                                <div className="inline-flex p-4 rounded-xl glass mb-6 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:gradient-text transition-all">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="mb-6">
                                    <h4 className="text-cyan-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Features
                                    </h4>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                                                <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Benefits */}
                                <div className="pt-6 border-t border-gray-700/50">
                                    <h4 className="text-purple-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                                        Benefits
                                    </h4>
                                    <ul className="space-y-2">
                                        {service.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm font-medium">
                                                <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4">
                <div className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="gradient-text">Siap Transform Bisnis Anda?</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Diskusi gratis untuk explore solusi automation yang paling cocok untuk bisnis Anda
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
                        >
                            Hubungi Saya
                        </Link>
                        <Link
                            href="/pricing"
                            className="px-8 py-4 rounded-xl font-semibold glass-strong border border-cyan-500/30 text-white hover:border-cyan-500 transition-all duration-300"
                        >
                            Lihat Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
