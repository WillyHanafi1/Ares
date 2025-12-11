'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const lastScrollY = useRef(0);

    // Navigation items
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'About', href: '/about' },
    ];

    // Throttled scroll handler for better performance
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            lastScrollY.current = window.scrollY;

            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(lastScrollY.current > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const isActive = (path: string) => pathname === path;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Sparkles className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                            <div className="absolute inset-0 blur-xl bg-cyan-400/30 group-hover:bg-cyan-400/50 transition-all duration-300" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">Seriaflow</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative text-sm font-medium transition-colors duration-300 ${isActive(item.href)
                                    ? 'text-cyan-400'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {item.name}
                                {isActive(item.href) && (
                                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
                                )}
                            </Link>
                        ))}

                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="relative px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group"
                        >
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden glass p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${isActive(item.href)
                                    ? 'glass-strong text-cyan-400 border-l-4 border-cyan-400'
                                    : 'text-gray-300 hover:glass hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="block mx-4 mt-4 px-6 py-3 rounded-xl text-center font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
