import Contact from '../components/contact';
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar } from 'lucide-react';

export default function ContactPage() {
    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            detail: "hello@seriaflow.com",
            subdetal: "We'll respond within 24 hours"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            detail: "+62 21 1234 5678",
            subdetal: "Mon-Fri, 9AM - 6PM WIB"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Office",
            detail: "Jakarta, Indonesia",
            subdetal: "Offices in Jakarta & Surabaya"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Business Hours",
            detail: "Mon - Fri: 9AM - 6PM",
            subdetal: "Weekend: By appointment"
        }
    ];

    const contactMethods = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Live Chat",
            description: "Chat dengan team kami real-time untuk quick questions",
            cta: "Start Chat",
            gradient: "from-cyan-500 to-blue-600"
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Schedule Meeting",
            description: "Book 30-min consultation call dengan AI specialist kami",
            cta: "Book Now",
            gradient: "from-purple-500 to-pink-600"
        },
        {
            icon: <Mail className="w-8 h-8" />,
            title: "Email Us",
            description: "Send detailed inquiry dan kami akan respond in 24 hours",
            cta: "Send Email",
            gradient: "from-cyan-500 to-purple-600"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative px-4">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="gradient-text">Get In Touch</span>
                    <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                        Mari Diskusikan Kebutuhan AI Anda
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Whether you&apos;re ready to start building atau just exploring possibilities,
                    kami here to help. Reach out dan let&apos;s transform your business bersama.
                </p>
            </section>

            {/* Contact Methods */}
            <section className="max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="glass-strong rounded-2xl p-8 text-center hover-lift group">
                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${method.gradient} text-white mb-6 group-hover:scale-110 transition-all duration-300`}>
                                {method.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{method.title}</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">{method.description}</p>
                            <button className="w-full px-6 py-3 rounded-xl font-semibold glass border border-cyan-500/30 text-cyan-400 hover:border-cyan-500 hover:text-white transition-all duration-300">
                                {method.cta}
                            </button>
                        </div>
                    ))}
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
    );
}
