// =====================================================
// SERIAFLOW SHARED CONSTANTS
// Centralized data to maintain consistency across pages
// =====================================================

import { ReactNode } from 'react';

// =====================================================
// BUSINESS STATISTICS
// Update these values as your business grows
// =====================================================
export const STATS = [
    { number: "20+", label: "Automations Deployed" },
    { number: "500+", label: "Hours Saved" },
    { number: "5", label: "Industries Served" }
] as const;

export const STATS_DETAILED = [
    { number: "20+", label: "Automations Deployed", description: "Production-ready automation systems" },
    { number: "500+", label: "Hours Saved for Clients", description: "Cumulative time saved through automation" },
    { number: "5", label: "Industries Served", description: "E-Commerce, SaaS, Real Estate, Services, Marketing" }
] as const;

// =====================================================
// NAVIGATION
// =====================================================
export const NAV_ITEMS = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About', href: '/about' },
] as const;

// =====================================================
// CONTACT INFORMATION
// =====================================================
export const CONTACT_INFO = {
    email: "willy@seriaflow.com",
    emailDisplay: "hello@seriaflow.com",
    phone: "+62 812 3456 7890",
    phoneClean: "6281234567890", // For WhatsApp links
    location: "Jakarta, Indonesia",
    businessHours: "Mon - Fri: 9AM - 6PM WIB",
    responseTime: "24 hours",
} as const;

export const SOCIAL_LINKS = {
    whatsapp: `https://wa.me/${CONTACT_INFO.phoneClean}`,
    whatsappWithMessage: (message: string) =>
        `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(message)}`,
    email: `mailto:${CONTACT_INFO.email}`,
    emailWithSubject: (subject: string) =>
        `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}`,
} as const;

// =====================================================
// SITE METADATA
// =====================================================
export const SITE_CONFIG = {
    name: "Seriaflow",
    tagline: "AI Automation yang Menghemat Waktu untuk Bisnis Anda",
    description: "Solusi AI automation praktis dan terjangkau untuk mengotomatisasi proses bisnis repetitif. Dari WhatsApp bot sampai data processing.",
    url: "https://seriaflow.com",
    locale: "id_ID",
    creator: "Willy Hanafi",
} as const;

// =====================================================
// SEO METADATA TEMPLATES
// =====================================================
export const SEO = {
    home: {
        title: "Seriaflow - AI Automation Agency Indonesia",
        description: "AI automation praktis dan terjangkau untuk bisnis Indonesia. WhatsApp bot, data processing, dan workflow automation.",
    },
    services: {
        title: "AI Solutions & Layanan Automation | Seriaflow",
        description: "Chatbot AI, WhatsApp automation, business process automation, dan data processing untuk efisiensi bisnis Anda.",
    },
    pricing: {
        title: "Pricing Plans - Harga Layanan AI Automation | Seriaflow",
        description: "Pilihan paket AI automation yang fleksibel untuk berbagai skala bisnis. Mulai dari Rp 5 Juta/bulan.",
    },
    caseStudies: {
        title: "Portfolio & Case Studies | Seriaflow",
        description: "Real projects dengan measurable results. Lihat bagaimana AI automation membantu berbagai bisnis Indonesia.",
    },
    about: {
        title: "Tentang Seriaflow - AI Automation Specialist",
        description: "AI automation specialist yang membantu bisnis Indonesia mengotomatisasi proses repetitif dengan solusi praktis dan terjangkau.",
    },
    contact: {
        title: "Hubungi Kami - Konsultasi Gratis | Seriaflow",
        description: "Diskusi kebutuhan AI automation bisnis Anda. Konsultasi gratis 30 menit untuk explore solusi yang tepat.",
    },
} as const;

// =====================================================
// JSON-LD STRUCTURED DATA
// =====================================================
export const STRUCTURED_DATA = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        logo: {
            "@type": "ImageObject",
            url: `${SITE_CONFIG.url}/logo.png`,
            width: 512,
            height: 512,
        },
        image: `${SITE_CONFIG.url}/logo.png`,
        founder: {
            "@type": "Person",
            name: SITE_CONFIG.creator,
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: CONTACT_INFO.phone,
            contactType: "customer service",
            availableLanguage: ["Indonesian", "English"],
        },
        sameAs: [],
    },

    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        publisher: {
            "@id": `${SITE_CONFIG.url}/#organization`,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    },

    localBusiness: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_CONFIG.url}/#localbusiness`,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        image: `${SITE_CONFIG.url}/logo.png`,
        logo: `${SITE_CONFIG.url}/logo.png`,
        telephone: CONTACT_INFO.phone,
        email: CONTACT_INFO.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Jakarta",
            addressCountry: "ID",
        },
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$",
    },
};

// =====================================================
// INDUSTRIES SERVED
// =====================================================
export const INDUSTRIES = [
    "E-Commerce",
    "SaaS / Tech Startup",
    "Real Estate",
    "Professional Services",
    "Healthcare",
    "Marketing Agency",
] as const;

// =====================================================
// VALUE PROPOSITIONS
// =====================================================
export const VALUE_PROPS = [
    {
        title: "No Setup Fee",
        description: "Langsung mulai tanpa biaya awal"
    },
    {
        title: "Flexible",
        description: "Upgrade/downgrade kapan saja"
    },
    {
        title: "30-Day Trial",
        description: "Risk-free money back guarantee"
    },
] as const;
