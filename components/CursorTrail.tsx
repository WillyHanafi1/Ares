'use client';

import { useEffect, useRef } from 'react';

class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  value: number;

  constructor(options: {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
  } = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
    this.value = 0;
  }

  update(): number {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }
}

class Node {
  x: number = 0;
  y: number = 0;
  vy: number = 0;
  vx: number = 0;
}

class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(options: { spring: number }, config: typeof CONFIG) {
    this.spring = options.spring + 0.1 * Math.random() - 0.02;
    this.friction = config.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];
    
    for (let i = 0; i < config.size; i++) {
      const node = new Node();
      this.nodes.push(node);
    }
  }

  update(pos: { x: number; y: number }, config: typeof CONFIG) {
    let spring = this.spring;
    let node = this.nodes[0];
    
    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;

    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];
      
      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * config.dampening;
        node.vy += prev.vy * config.dampening;
      }
      
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    for (let i = 1; i < this.nodes.length - 2; i++) {
      const node = this.nodes[i];
      const next = this.nodes[i + 1];
      x = 0.5 * (node.x + next.x);
      y = 0.5 * (node.y + next.y);
      ctx.quadraticCurveTo(node.x, node.y, x, y);
    }
    
    const node = this.nodes[this.nodes.length - 2];
    const next = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(node.x, node.y, next.x, next.y);
    ctx.stroke();
    ctx.closePath();
  }
}

const CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const linesRef = useRef<Line[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const oscillatorRef = useRef<Oscillator | null>(null);
  const runningRef = useRef(true);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    contextRef.current = ctx;
    oscillatorRef.current = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initLines = () => {
      linesRef.current = [];
      for (let i = 0; i < CONFIG.trails; i++) {
        linesRef.current.push(
          new Line({ spring: 0.4 + (i / CONFIG.trails) * 0.025 }, CONFIG)
        );
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        posRef.current.x = e.touches[0].pageX;
        posRef.current.y = e.touches[0].pageY;
      }
      e.preventDefault();
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        posRef.current.x = e.touches[0].pageX;
        posRef.current.y = e.touches[0].pageY;
      }
    };

    const render = () => {
      if (!runningRef.current || !contextRef.current || !oscillatorRef.current) return;

      const ctx = contextRef.current;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(oscillatorRef.current.update())},50%,50%,0.25)`;
      ctx.lineWidth = 1;

      for (const line of linesRef.current) {
        line.update(posRef.current, CONFIG);
        line.draw(ctx);
      }

      frameRef.current++;
      window.requestAnimationFrame(render);
    };

    resizeCanvas();
    initLines();
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    const handleFocus = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        render();
      }
    };

    window.addEventListener('focus', handleFocus);

    render();

    return () => {
      runningRef.current = false;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
