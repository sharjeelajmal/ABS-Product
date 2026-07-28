"use client";

import { motion } from "framer-motion";

export function BackgroundDecor() {
  const particles = [
    { top: "22%", left: "18%", size: 3, opacity: 0.5 },
    { top: "38%", left: "8%", size: 2, opacity: 0.4 },
    { top: "62%", left: "74%", size: 4, opacity: 0.3 },
    { top: "78%", left: "42%", size: 2, opacity: 0.5 },
    { top: "12%", left: "72%", size: 3, opacity: 0.35 },
    { top: "48%", left: "88%", size: 2, opacity: 0.45 },
    { top: "68%", left: "25%", size: 3, opacity: 0.3 },
    { top: "90%", left: "60%", size: 2, opacity: 0.4 },
    { top: "5%", left: "45%", size: 2, opacity: 0.35 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      <motion.div
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "5%",
          right: "-8%",
          width: "760px",
          height: "760px",
          background: "radial-gradient(circle, rgba(197,255,0,0.09) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      <motion.div
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "520px",
          height: "520px",
          background: "radial-gradient(circle, rgba(197,255,0,0.05) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "30%",
          width: "500px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(197,255,0,0.04) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "8%",
          right: "12%",
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "8%",
          left: "8%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          border: "1px solid rgba(197,255,0,0.07)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1000px",
          height: "1000px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.02)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "650px",
          height: "650px",
          borderRadius: "50%",
          border: "1px solid rgba(197,255,0,0.04)",
        }}
      />

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="bg-particle"
          animate={{ y: [0, -10, 0], opacity: [p.opacity, Math.min(1, p.opacity + 0.25), p.opacity] }}
          transition={{
            duration: 4 + i * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "#C5FF00",
            boxShadow: `0 0 ${p.size * 4}px rgba(197,255,0,0.7)`,
          }}
        />
      ))}
    </div>
  );
}
