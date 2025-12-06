import Contact from '../components/contact';
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SEO, CONTACT_INFO, SOCIAL_LINKS, STRUCTURED_DATA } from '@/lib/constants';

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
                        Whether you&apos;re ready to start building atau just exploring possibilities,
                        saya here to help. Reach out dan let&apos;s transform your business bersama.
                    </p>
                </section>

                {/* Contact Methods - Now with functional links */}
                <section className="max-w-7xl mx-auto mb-20" aria-labelledby="contact-methods-title">
                    <h2 id="contact-methods-title" className="sr-only">Contact Methods</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* WhatsApp Chat */}
                        <div className="glass-strong rounded-2xl p-8 text-center hover-lift group">
                            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white mb-6 group-hover:scale-110 transition-all duration-300">
                                <MessageSquare className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">WhatsApp Chat</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Chat langsung via WhatsApp untuk quick questions dan consultation</p>
                            <a
                                href={SOCIAL_LINKS.whatsappWithMessage("Halo, saya tertarik dengan layanan AI automation Seriaflow.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full px-6 py-3 rounded-xl font-semibold glass border border-green-500/30 text-green-400 hover:border-green-500 hover:text-white hover:bg-green-500/20 transition-all duration-300"
                                aria-label="Start WhatsApp chat"
                            >
                                Chat via WhatsApp
                            </a>
                        </div>

                        {/* Schedule Meeting */}
                        <div className="glass-strong rounded-2xl p-8 text-center hover-lift group">
                            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white mb-6 group-hover:scale-110 transition-all duration-300">
                                <Calendar className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Schedule Meeting</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Book 30-min consultation call untuk discuss kebutuhan automation Anda</p>
                            <a
                                href={SOCIAL_LINKS.emailWithSubject("Booking Consultation - Seriaflow")}
                                className="block w-full px-6 py-3 rounded-xl font-semibold glass border border-purple-500/30 text-purple-400 hover:border-purple-500 hover:text-white hover:bg-purple-500/20 transition-all duration-300"
                                aria-label="Schedule a meeting via email"
                            >
                                Book via Email
                            </a>
                        </div>

                        {/* Email */}
                        <div className="glass-strong rounded-2xl p-8 text-center hover-lift group">
                            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white mb-6 group-hover:scale-110 transition-all duration-300">
                                <Mail className="w-8 h-8" aria-hidden="true" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Email Us</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Send detailed inquiry dan saya akan respond within {CONTACT_INFO.responseTime}</p>
                            <a
                                href={SOCIAL_LINKS.emailWithSubject("Inquiry - Seriaflow AI Automation")}
                                className="block w-full px-6 py-3 rounded-xl font-semibold glass border border-cyan-500/30 text-cyan-400 hover:border-cyan-500 hover:text-white hover:bg-cyan-500/20 transition-all duration-300"
                                aria-label="Send email inquiry"
                            >
                                Send Email
                            </a>
                        </div>
                    </div>
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
                        <span className="gradient-text">Quick Answers</span>
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "How long does it take to implement AI solution?",
                                a: "Typically 4-8 weeks dari initial consultation hingga full deployment, depending on complexity. We provide detailed timeline dalam proposal."
                            },
                            {
                                q: "Do you offer free consultation?",
                                a: "Yes! Kami provide free 30-minute consultation untuk understand your needs dan explore potential solutions."
                            },
                            {
                                q: "What industries do you serve?",
                                a: "Kami serve berbagai industries termasuk E-Commerce, Finance, Healthcare, Retail, dan lebih. Our AI solutions adaptable untuk specific industry needs."
                            },
                            {
                                q: "Is there ongoing support after implementation?",
                                a: "Absolutely! Semua plans include ongoing support, maintenance, dan optimization untuk ensure long-term success."
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

