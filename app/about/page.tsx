import { Target, Eye, Award, Users, Globe, Zap, Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const team = [
        {
            name: "David Santoso",
            position: "Founder & CEO",
            bio: "15+ years experience in AI and enterprise software. Ex-Google ML Engineer.",
            image: "👨‍💼"
        },
        {
            name: "Sarah Wijaya",
            position: "CTO",
            bio: "PhD in Machine Learning from MIT. Former AI Research Lead at Microsoft.",
            image: "👩‍💻"
        },
        {
            name: "Michael Chen",
            position: "Head of Product",
            bio: "Product strategist with 10+ years building AI solutions for Fortune 500 companies.",
            image: "👨‍🔬"
        },
        {
            name: "Lisa Tan",
            position: "Head of Customer Success",
            bio: "Expert in digital transformation with track record helping 100+ companies adopt AI.",
            image: "👩‍💼"
        }
    ];

    const values = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Innovation First",
            description: "We constantly push boundaries dengan latest AI technologies untuk deliver cutting-edge solutions"
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Client-Centric",
            description: "Success client adalah success kami. Kami committed untuk long-term partnership dan measurable results"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Impact Driven",
            description: "Focus pada real business impact dan ROI, bukan hanya technology for technology's sake"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Transparency",
            description: "Open communication, honest timelines, dan clear metrics throughout the journey"
        }
    ];

    const milestones = [
        { year: "2021", event: "Seriaflow founded dengan vision: democratize AI for Indonesian businesses" },
        { year: "2022", event: "Launched first AI chatbot platform. Served 20+ clients across industries" },
        { year: "2023", event: "Expanded to full AI automation suite. Team grew to 25+ AI specialists" },
        { year: "2024", event: "50+ successful projects. Generated Rp 2B+ cost savings untuk clients" },
        { year: "2025", event: "Opening regional offices. Launching enterprise AI platform" }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 relative px-4">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-20">
                <h1 className="text-6xl md:text-7xl font-bold mb-6">
                    <span className="gradient-text">About Seriaflow</span>
                    <span className="block text-gray-300 text-3xl md:text-4xl mt-4">
                        Empowering Businesses with AI
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    We're on a mission to make AI automation accessible dan affordable untuk every business di Indonesia,
                    regardless of size atau industry
                </p>
            </section>

            {/* Story Section */}
            <section className="max-w-5xl mx-auto mb-20">
                <div className="glass-strong rounded-3xl p-12">
                    <h2 className="text-4xl font-bold gradient-text mb-6">Our Story</h2>
                    <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                        <p>
                            Seriaflow lahir dari frustration terhadap gap yang besar antara kekuatan AI technology dan implementation-nya di Indonesian businesses. Banyak companies tahu mereka butuh AI automation, tapi overwhelmed dengan complexity, cost, dan lack of expertise.
                        </p>
                        <p>
                            Kami founded Seriaflow dengan simple belief: <span className="text-cyan-400 font-semibold">AI automation shouldn't be privilege of tech giants</span>. Every business, dari startup hingga enterprise, deserve access to tools yang sama powerful untuk compete dan grow.
                        </p>
                        <p>
                            Today, kami proud telah help 50+ businesses transform operations mereka, save millions in costs, dan unlock new growth opportunities yang previously impossible. Tapi ini baru permulaan.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Mission */}
                    <div className="glass-strong rounded-3xl p-12 hover-lift">
                        <div className="inline-flex p-4 rounded-xl glass text-cyan-400 mb-6">
                            <Target className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Democratize AI automation untuk Indonesian businesses dengan providing affordable, effective,
                            dan scalable solutions yang deliver measurable ROI. Kami committed untuk transform cara businesses
                            operate melalui intelligent automation.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="glass-strong rounded-3xl p-12 hover-lift">
                        <div className="inline-flex p-4 rounded-xl glass text-purple-400 mb-6">
                            <Eye className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Menjadi leading AI automation partner di Southeast Asia, recognized untuk innovation,
                            client success, dan contribution terhadap digital transformation of regional businesses.
                            Kami envision future dimana every business leverage AI untuk competitive advantage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    <span className="gradient-text">Our Values</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <div key={index} className="glass-strong rounded-2xl p-8 text-center hover-lift">
                            <div className="inline-flex p-4 rounded-xl glass text-cyan-400 mb-4">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Milestones */}
            <section className="max-w-5xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    <span className="gradient-text">Our Journey</span>
                </h2>
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500" />

                    {/* Milestones */}
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="relative pl-20">
                                <div className="absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center glass-strong border-2 border-cyan-500">
                                    <span className="font-bold gradient-text">{milestone.year}</span>
                                </div>
                                <div className="glass-strong rounded-2xl p-6">
                                    <p className="text-gray-300 leading-relaxed">{milestone.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    <span className="gradient-text">Meet Our Team</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="glass-strong rounded-2xl p-6 text-center hover-lift group">
                            <div className="text-7xl mb-4">{member.image}</div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:gradient-text transition-all">
                                {member.name}
                            </h3>
                            <p className="text-cyan-400 font-medium text-sm mb-4">{member.position}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto mb-20">
                <div className="glass-strong rounded-3xl p-12">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        <span className="gradient-text">By The Numbers</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Award className="w-8 h-8" />, number: "50+", label: "Projects Delivered" },
                            { icon: <Users className="w-8 h-8" />, number: "25+", label: "Team Members" },
                            { icon: <Globe className="w-8 h-8" />, number: "10+", label: "Industries Served" },
                            { icon: <TrendingUp className="w-8 h-8" />, number: "95%", label: "Client Retention" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex p-3 rounded-xl glass text-cyan-400 mb-4">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center">
                <h2 className="text-4xl font-bold mb-6">
                    <span className="gradient-text">Join Our Growth Journey</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                    Ready to transform your business dengan AI automation? Mari discuss bagaimana kami bisa help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
                    >
                        Get In Touch
                    </Link>
                    <Link
                        href="/case-studies"
                        className="px-8 py-4 rounded-xl font-semibold glass-strong border border-cyan-500/30 text-white hover:border-cyan-500 transition-all duration-300"
                    >
                        View Case Studies
                    </Link>
                </div>
            </section>
        </main>
    );
}
