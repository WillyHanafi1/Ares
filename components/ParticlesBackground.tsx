'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsDisabled(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect if mobile device (for performance optimization)
    const isMobile = window.innerWidth < 768;
    const isLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles - fewer on mobile for performance
    const baseCount = isMobile ? 20 : 50;
    const maxCount = isLowPerformance ? 30 : 100;
    const particleCount = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 30000 : 15000)),
      maxCount
    );

    particlesRef.current = Array.from({ length: Math.max(particleCount, baseCount) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
      vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
      size: Math.random() * (isMobile ? 1.5 : 2) + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Mouse move handler - only on non-touch devices
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Connection distance - shorter on mobile for performance
    const connectionDistance = isMobile ? 80 : 120;
    const mouseInteractionDistance = isMobile ? 0 : 150; // Disable on mobile

    // Animation loop with frame skipping for low-end devices
    let frameCount = 0;
    const frameSkip = isLowPerformance ? 2 : 1;

    const animate = () => {
      if (!ctx || !canvas) return;

      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
        ctx.fill();

        // Draw connections (skip every other particle on mobile for performance)
        const checkInterval = isMobile ? 2 : 1;
        particlesRef.current.forEach((otherParticle, j) => {
          if (i === j || j % checkInterval !== 0) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - distance / connectionDistance) * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Mouse interaction (disabled on mobile)
        if (mouseInteractionDistance > 0) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInteractionDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseInteractionDistance - distance) / mouseInteractionDistance;
            particle.vx -= Math.cos(angle) * force * 0.2;
            particle.vy -= Math.sin(angle) * force * 0.2;
          }
        }

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

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
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Don't render if disabled
  if (isDisabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}

