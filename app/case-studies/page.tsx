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
            company: "TechMart Indonesia",
            industry: "E-Commerce",
            industryIcon: <ShoppingCart className="w-6 h-6" />,
            challenge: "Customer service team kewalahan handle 500+ daily inquiries tentang product info, order status, dan return policy. Response time rata-rata 4 jam, menyebabkan customer frustration dan cart abandonment yang tinggi.",
            solution: "Implemented AI-powered chatbot yang terintegrasi dengan inventory system dan order management. Chatbot handle FAQ, product recommendations, dan order tracking secara real-time dengan natural conversation flow.",
            results: [
                { metric: "Response Time", value: "4 jam → 30 detik", icon: <Clock className="w-6 h-6" /> },
                { metric: "Customer Satisfaction", value: "+45%", icon: <Users className="w-6 h-6" /> },
                { metric: "Conversion Rate", value: "+32%", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Cost Savings", value: "Rp 35 Juta/bulan", icon: <DollarSign className="w-6 h-6" /> }
            ],
            testimonial: {
                quote: "Seriaflow chatbot transform customer experience kami completely. Customer sekarang dapat instant answers 24/7, dan team bisa fokus pada complex issues. ROI tercapai dalam 3 bulan!",
                author: "Michael Tan",
                position: "CTO, TechMart Indonesia"
            },
            tags: ["Chatbot", "E-Commerce", "Customer Service"]
        },
        {
            company: "FinCorp Asia",
            industry: "Financial Services",
            industryIcon: <Building2 className="w-6 h-6" />,
            challenge: "Manual processing 1,000+ loan applications per week memakan waktu 5-7 hari. Data entry errors mencapai 15%, menyebabkan delays dan customer complaints.",
            solution: "Deployed AI document processing system dengan OCR untuk extract data dari aplikasi, automated validation rules, dan intelligent routing ke appropriate officers. Predictive model assess risk scores automatically.",
            results: [
                { metric: "Processing Time", value: "7 hari → 4 jam", icon: <Clock className="w-6 h-6" /> },
                { metric: "Error Rate", value: "-92%", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Approval Rate", value: "+28%", icon: <Users className="w-6 h-6" /> },
                { metric: "Operational Cost", value: "-65%", icon: <DollarSign className="w-6 h-6" /> }
            ],
            testimonial: {
                quote: "Game changer untuk operations kami. Processing time drop drastis, accuracy meningkat, dan customer dapat approval jauh lebih cepat. Team sekarang handle 3x lebih banyak applications dengan resource yang sama.",
                author: "Sarah Lim",
                position: "Operations Director, FinCorp Asia"
            },
            tags: ["Automation", "Document Processing", "Finance"]
        },
        {
            company: "HealthPlus Clinics",
            industry: "Healthcare",
            industryIcon: <Heart className="w-6 h-6" />,
            challenge: "Appointment no-shows mencapai 30% karena reminder manual yang tidak efektif. Staff menghabiskan 3 jam/hari untuk appointment coordination dan follow-ups.",
            solution: "Implemented intelligent appointment management system dengan multi-channel automated reminders (WhatsApp, SMS, Email), predictive no-show alerts, dan smart rescheduling recommendations berdasarkan patient history.",
            results: [
                { metric: "No-Show Rate", value: "30% → 8%", icon: <Users className="w-6 h-6" /> },
                { metric: "Staff Time Saved", value: "15 jam/week", icon: <Clock className="w-6 h-6" /> },
                { metric: "Patient Satisfaction", value: "+52%", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Revenue Increase", value: "+Rp 125 Juta/bulan", icon: <DollarSign className="w-6 h-6" /> }
            ],
            testimonial: {
                quote: "Automation ini incredible impact-nya. No-shows turun drastis, patients love automated reminders, dan staff bisa fokus pada patient care instead of administrative tasks. Best investment ever.",
                author: "Dr. James Wong",
                position: "Medical Director, HealthPlus Clinics"
            },
            tags: ["Healthcare", "Automation", "Patient Engagement"]
        },
        {
            company: "RetailMax Chain",
            industry: "Retail",
            industryIcon: <ShoppingCart className="w-6 h-6" />,
            challenge: "15 stores dengan inventory management manual menyebabkan stockouts frequent dan overstock di berbagai locations. Demand forecasting inaccurate leading to Rp 200 Juta/month waste.",
            solution: "Built predictive analytics system yang analyze sales patterns, seasonal trends, local events, dan weather data untuk forecast demand per store. Automated inventory reordering dengan smart distribution algorithms.",
            results: [
                { metric: "Stockout Incidents", value: "-78%", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Inventory Waste", value: "-68%", icon: <DollarSign className="w-6 h-6" /> },
                { metric: "Forecast Accuracy", value: "+89%", icon: <TrendingUp className="w-6 h-6" /> },
                { metric: "Revenue Impact", value: "+Rp 450 Juta/bulan", icon: <DollarSign className="w-6 h-6" /> }
            ],
            testimonial: {
                quote: "Kami sekarang punya crystal ball untuk inventory management. System predict demand dengan accuracy yang amazing, stockouts turun drastis, dan waste berkurang significantly. Profitability naik double digit!",
                author: "Linda Chen",
                position: "COO, RetailMax Chain"
            },
            tags: ["Predictive Analytics", "Inventory", "Retail"]
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative px-4">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="gradient-text">Success Stories</span>
                    <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                        Real Results from Real Businesses
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                    Lihat bagaimana businesses across industries transform operations mereka dengan AI automation solutions kami
                </p>

                {/* Overall Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {[
                        { number: "50+", label: "Successful Projects" },
                        { number: "Rp 2B+", label: "Cost Savings Generated" },
                        { number: "95%", label: "Client Retention" },
                        { number: "4.9/5", label: "Satisfaction Score" }
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

