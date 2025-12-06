import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    title: string;
    description: string;
    primaryCTA?: {
        text: string;
        href: string;
        showArrow?: boolean;
    };
    secondaryCTA?: {
        text: string;
        href: string;
    };
    className?: string;
}

/**
 * Reusable CTA Section component for consistent call-to-action blocks
 * Used at the bottom of most pages
 */
export default function CTASection({
    title,
    description,
    primaryCTA = { text: "Hubungi Saya", href: "/contact", showArrow: false },
    secondaryCTA,
    className = '',
}: CTASectionProps) {
    return (
        <section
            className={`max-w-4xl mx-auto glass-strong rounded-3xl p-12 text-center ${className}`}
            aria-labelledby="cta-title"
        >
            <h2 id="cta-title" className="text-4xl font-bold mb-6">
                <span className="gradient-text">{title}</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href={primaryCTA.href}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-2xl hover:glow-cyan transition-all duration-300 hover:-translate-y-1"
                    aria-label={primaryCTA.text}
                >
                    {primaryCTA.text}
                    {primaryCTA.showArrow && <ArrowRight className="w-5 h-5" aria-hidden="true" />}
                </Link>

                {secondaryCTA && (
                    <Link
                        href={secondaryCTA.href}
                        className="px-8 py-4 rounded-xl font-semibold glass-strong border border-cyan-500/30 text-white hover:border-cyan-500 transition-all duration-300"
                        aria-label={secondaryCTA.text}
                    >
                        {secondaryCTA.text}
                    </Link>
                )}
            </div>
        </section>
    );
}
