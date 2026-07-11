"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  radius: number;
  color: [number, number, number];
  phase: number;
  speed: number;
  ampX: number;
  ampY: number;
}

export function AnimatedShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const orbs: Orb[] = [
      { x: 0.25, y: 0.15, radius: 0.42, color: [197, 255, 0], phase: 0, speed: 0.0004, ampX: 0.08, ampY: 0.06 },
      { x: 0.78, y: 0.35, radius: 0.38, color: [80, 120, 255], phase: 2.1, speed: 0.00035, ampX: 0.07, ampY: 0.09 },
      { x: 0.55, y: 0.72, radius: 0.45, color: [0, 210, 190], phase: 4.2, speed: 0.0003, ampX: 0.09, ampY: 0.05 },
    ];

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener("mousemove", onMouseMove);

    function render(time: number) {
      if (!ctx) return;
      const mx = (mouseRef.current.x - 0.5) * 60;
      const my = (mouseRef.current.y - 0.5) * 40;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const orb of orbs) {
        const t = time * orb.speed + orb.phase;
        const cx = (orb.x + Math.sin(t) * orb.ampX) * width + mx * orb.radius;
        const cy = (orb.y + Math.cos(t * 0.85) * orb.ampY) * height + my * orb.radius;
        const r = orb.radius * Math.max(width, height);

        const [cr, cg, cb] = orb.color;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `rgba(${cr},${cg},${cb},0.18)`);
        gradient.addColorStop(0.35, `rgba(${cr},${cg},${cb},0.08)`);
        gradient.addColorStop(0.7, `rgba(${cr},${cg},${cb},0.02)`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = "source-over";
      animationId = requestAnimationFrame(render);
    }

    resize();
    render(0);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 35%, black 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 35%, black 10%, transparent 75%)",
        }}
      />

      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5FF00]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(900px,90vw)] h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(197,255,0,0.12)_0%,transparent_65%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.85)_100%)]" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />
    </div>
  );
}
