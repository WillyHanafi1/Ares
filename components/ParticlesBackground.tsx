'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: 'cyan' | 'purple';
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const [isDisabled, setIsDisabled] = useState(false);

  // Throttled scroll handler to pause animation during scroll
  const handleScroll = useCallback(() => {
    isScrollingRef.current = true;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Resume animation 150ms after scroll stops
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsDisabled(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect device capabilities
    const isMobile = window.innerWidth < 768;
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    // Set canvas size with device pixel ratio consideration
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Add scroll listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // OPTIMIZED: Reduced particle count significantly
    const baseCount = isMobile ? 12 : 25;
    const maxCount = isLowPerformance ? 15 : 40;
    const particleCount = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 50000 : 25000)),
      maxCount
    );

    // Create particles with alternating colors
    particlesRef.current = Array.from({ length: Math.max(particleCount, baseCount) }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      color: i % 2 === 0 ? 'cyan' : 'purple' as const,
    }));

    // Animation loop - OPTIMIZED
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      // Skip frame if scrolling (major performance improvement)
      if (isScrollingRef.current) {
        return;
      }

      // Frame rate limiting
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) {
        return;
      }
      lastTime = currentTime - (deltaTime % frameInterval);

      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw particles (NO connection lines - removed O(n²))
      const width = window.innerWidth;
      const height = window.innerHeight;

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges (smoother than bouncing)
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle with glow effect
        const color = particle.color === 'cyan'
          ? `rgba(6, 182, 212, ${particle.opacity})`
          : `rgba(168, 85, 247, ${particle.opacity})`;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    // Listen for reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsDisabled(true);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [handleScroll]);

  if (isDisabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: 0.6,
        transform: 'translateZ(0)', // GPU acceleration
        willChange: 'auto', // Let browser decide
      }}
      aria-hidden="true"
    />
  );
}

