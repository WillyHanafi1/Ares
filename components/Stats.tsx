'use client';

import { STATS, STATS_DETAILED } from '@/lib/constants';

interface StatsProps {
    variant?: 'default' | 'detailed' | 'compact';
    className?: string;
    showBackground?: boolean;
}

/**
 * Reusable Stats component for displaying business metrics
 * Used across Home, Services, Case Studies, and About pages
 */
export default function Stats({
    variant = 'default',
    className = '',
    showBackground = true
}: StatsProps) {
    const stats = variant === 'detailed' ? STATS_DETAILED : STATS;

    const containerClass = showBackground
        ? 'glass-strong p-6 rounded-2xl'
        : 'p-6';

    if (variant === 'compact') {
        return (
            <div className={`grid grid-cols-3 gap-4 ${className}`}>
                {STATS.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                        <div className="text-gray-400 text-xs">{stat.label}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}
            role="list"
            aria-label="Business statistics"
        >
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`text-center hover-lift transition-all duration-300 ${containerClass}`}
                    role="listitem"
                >
                    <div
                        className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                        aria-label={`${stat.number} ${stat.label}`}
                    >
                        {stat.number}
                    </div>
                    <div className="text-gray-400">
                        {stat.label}
                    </div>
                    {'description' in stat && (
                        <div className="text-gray-500 text-sm mt-1">
                            {stat.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
