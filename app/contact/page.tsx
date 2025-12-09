import Contact from '../components/contact';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SEO, CONTACT_INFO, STRUCTURED_DATA } from '@/lib/constants';

export const metadata: Metadata = {
    title: SEO.contact.title,
    description: SEO.contact.description,
    openGraph: {
        title: SEO.contact.title,
        description: SEO.contact.description,
    },
};

export default function ContactPage() {
    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" aria-hidden="true" />,
            title: "Email",
            detail: CONTACT_INFO.email,
            subdetal: `We'll respond within ${CONTACT_INFO.responseTime}`
        },
        {
            icon: <Phone className="w-6 h-6" aria-hidden="true" />,
            title: "Phone / WhatsApp",
            detail: CONTACT_INFO.phone,
            subdetal: "Mon-Fri, 9AM - 6PM WIB"
        },
        {
            icon: <MapPin className="w-6 h-6" aria-hidden="true" />,
            title: "Location",
            detail: CONTACT_INFO.location,
            subdetal: "Remote-first, available nationwide"
        },
        {
            icon: <Clock className="w-6 h-6" aria-hidden="true" />,
            title: "Business Hours",
            detail: CONTACT_INFO.businessHours,
            subdetal: "Weekend: By appointment"
        }
    ];

    return (
        <>
            {/* JSON-LD for LocalBusiness - using Next.js Script for proper hydration */}
            <Script
                id="local-business-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(STRUCTURED_DATA.localBusiness),
                }}
            />
            <main className="min-h-screen pt-32 pb-20 relative px-4">
                <section className="max-w-7xl mx-auto text-center mb-20">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6">
                        <span className="gradient-text">Get In Touch</span>
                        <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                            Mari Diskusikan Kebutuhan AI Anda
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Siap untuk memulai atau masih eksplorasi? Saya siap membantu.
                        Hubungi saya dan mari transformasi bisnis Anda bersama.
                    </p>
                </section>

                {/* Contact Info Cards */}
                <section className="max-w-7xl mx-auto mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="glass-strong rounded-2xl p-6 hover-lift">
                                <div className="inline-flex p-3 rounded-xl glass text-cyan-400 mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="font-bold text-white mb-2">{info.title}</h3>
                                <p className="text-gray-300 font-medium mb-1">{info.detail}</p>
                                <p className="text-gray-500 text-sm">{info.subdetal}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Main Contact Form - Reuse existing component */}
                <Contact />

                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto mt-20">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        <span className="gradient-text">Pertanyaan Umum</span>
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "Berapa lama waktu implementasi solusi AI?",
                                a: "Umumnya 4-8 minggu dari konsultasi awal hingga deployment penuh, tergantung kompleksitas. Kami akan berikan timeline detail dalam proposal."
                            },
                            {
                                q: "Apakah ada konsultasi gratis?",
                                a: "Ya! Kami menyediakan konsultasi gratis 30 menit untuk memahami kebutuhan Anda dan mengeksplorasi solusi yang tepat."
                            },
                            {
                                q: "Industri apa saja yang dilayani?",
                                a: "Kami melayani berbagai industri termasuk E-Commerce, Finance, Healthcare, Retail, dan lainnya. Solusi AI kami dapat disesuaikan untuk kebutuhan spesifik industri Anda."
                            },
                            {
                                q: "Apakah ada support setelah implementasi?",
                                a: "Tentu! Semua paket sudah termasuk ongoing support, maintenance, dan optimisasi untuk memastikan kesuksesan jangka panjang."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="glass-strong rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-cyan-400 mb-3">{faq.q}</h3>
                                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

