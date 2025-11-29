import { Check, X, Sparkles, Zap, Rocket } from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: string;
    period: string;
    description: string;
    features: { name: string; included: boolean }[];
    cta: string;
    highlighted?: boolean;
    gradient: string;
}

export default function PricingPage() {
    const tiers: PricingTier[] = [
        {
            name: "Starter",
            icon: <Sparkles className="w-8 h-8" />,
            price: "Rp 5 Juta",
            period: "/bulan",
            description: "Perfect untuk small business yang baru mulai automation journey",
            gradient: "from-cyan-500 to-blue-600",
            features: [
                { name: "1 AI Chatbot (basic)", included: true },
                { name: "Up to 1,000 conversations/month", included: true },
                { name: "Email support", included: true },
                { name: "Basic analytics dashboard", included: true },
                { name: "2 integrations", included: true },
                { name: "Monthly optimization", included: false },
                { name: "Custom AI model", included: false },
                { name: "Dedicated account manager", included: false },
                { name: "24/7 priority support", included: false }
            ],
            cta: "Mulai Sekarang"
        },
        {
            name: "Professional",
            icon: <Zap className="w-8 h-8" />,
            price: "Rp 15 Juta",
            period: "/bulan",
            description: "Ideal untuk growing business yang butuh automation lebih comprehensive",
            gradient: "from-purple-500 to-pink-600",
            highlighted: true,
            features: [
                { name: "Multiple AI solutions", included: true },
                { name: "Up to 10,000 conversations/month", included: true },
                { name: "Priority email & chat support", included: true },
                { name: "Advanced analytics & reporting", included: true },
                { name: "Unlimited integrations", included: true },
                { name: "Weekly optimization", included: true },
                { name: "Custom workflows", included: true },
                { name: "Dedicated account manager", included: false },
                { name: "24/7 priority support", included: false }
            ],
            cta: "Get Started"
        },
        {
            name: "Enterprise",
            icon: <Rocket className="w-8 h-8" />,
            price: "Custom",
            period: "pricing",
            description: "Full-scale AI transformation untuk large enterprises dengan kebutuhan khusus",
            gradient: "from-cyan-500 to-purple-600",
            features: [
                { name: "Unlimited AI solutions", included: true },
                { name: "Unlimited conversations", included: true },
                { name: "24/7 priority support", included: true },
                { name: "Custom analytics & BI integration", included: true },
                { name: "White-label solutions", included: true },
                { name: "Daily optimization & monitoring", included: true },
                { name: "Custom AI model development", included: true },
                { name: "Dedicated account manager", included: true },
                { name: "SLA guarantee 99.9%", included: true }
            ],
            cta: "Contact Sales"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative px-4">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="gradient-text">Pricing Plans</span>
                    <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                        Yang Sesuai dengan Kebutuhan Anda
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Pilih paket yang sesuai dengan kebutuhan dan budget bisnis Anda—bisa adjust kapan saja
                </p>

                {/* Value Proposition */}
                <div className="mt-12 glass-strong rounded-2xl p-8 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">No Setup Fee</div>
                            <div className="text-gray-400 text-sm">Langsung mulai tanpa biaya awal</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">Flexible</div>
                            <div className="text-gray-400 text-sm">Upgrade/downgrade kapan saja</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold gradient-text mb-2">30-Day Trial</div>
                            <div className="text-gray-400 text-sm">Risk-free money back guarantee</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative group ${tier.highlighted
                                ? 'lg:-mt-8 glass-strong border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20'
                                : 'glass-strong'
                                } rounded-3xl p-8 hover-lift transition-all duration-500`}
                        >
                            {/* Popular Badge */}
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Icon */}
                            <div
                                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${tier.gradient} mb-6 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                            >
                                {tier.icon}
                            </div>

                            {/* Tier Name */}
                            <h3 className="text-3xl font-bold text-white mb-2">{tier.name}</h3>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-5xl font-bold gradient-text">{tier.price}</span>
                                <span className="text-gray-400 text-lg">{tier.period}</span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 mb-8 leading-relaxed">{tier.description}</p>

                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className={`block w-full text-center py-4 rounded-xl font-bold transition-all duration-300 mb-8 ${tier.highlighted
                                    ? `bg-gradient-to-r ${tier.gradient} text-white hover:shadow-2xl hover:-translate-y-1`
                                    : 'glass border border-cyan-500/30 text-cyan-400 hover:border-cyan-500 hover:text-white'
                                    }`}
                            >
                                {tier.cta}
                            </Link>

                            {/* Features List */}
                            <div className="space-y-4">
                                {tier.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                        )}
                                        <span
                                            className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600 line-through'
                                                }`}
                                        >
                                            {feature.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    <span className="gradient-text">Frequently Asked Questions</span>
                </h2>
                <div className="space-y-6">
                    {[
                        {
                            q: "Apakah ada kontrak minimum?",
                            a: "Tidak ada kontrak minimum untuk Starter dan Professional tier. Enterprise tier biasanya 12 bulan untuk mendapatkan value maksimal."
                        },
                        {
                            q: "Bagaimana cara upgrade/downgrade?",
                            a: "Anda bisa upgrade atau downgrade kapan saja melalui dashboard atau dengan menghubungi account manager Anda."
                        },
                        {
                            q: "Apakah ada biaya setup?",
                            a: "Tidak ada biaya setup. Semua initial configuration dan training sudah included dalam monthly fee."
                        },
                        {
                            q: "Bagaimana dengan data security?",
                            a: "Semua data encrypted end-to-end dan kami compliance dengan GDPR dan ISO 27001 standards."
                        }
                    ].map((faq, index) => (
                        <div key={index} className="glass-strong rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                            <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center">
                <h2 className="text-4xl font-bold mb-6">
                    <span className="gradient-text">Masih Bingung Pilih Yang Mana?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                    Schedule diskusi gratis dan saya akan bantu pilih plan yang paling sesuai dengan kebutuhan bisnis Anda
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
                >
                    Hubungi Saya
                </Link>
            </section>
        </main>
    );
}
