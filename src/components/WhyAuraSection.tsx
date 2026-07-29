"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Wallet,
  Server,
  Cloud,
  Code2,
  Shield,
  ArrowRight,
  Phone,
} from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const CSS = `
  @keyframes wa-float-a {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%  { transform: translateY(-10px) rotate(-2deg); }
  }
  @keyframes wa-float-b {
    0%, 100% { transform: translateY(0px) rotate(1.5deg); }
    50%  { transform: translateY(-8px) rotate(1.5deg); }
  }
  @keyframes wa-float-c {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%  { transform: translateY(-6px) rotate(-1deg); }
  }
  @keyframes wa-float-d {
    0%, 100% { transform: translateY(0px) rotate(2.5deg); }
    50%  { transform: translateY(-9px) rotate(2.5deg); }
  }
  @keyframes wa-dot-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%  { opacity: 1; transform: scale(1.35); }
  }
  @keyframes wa-line-draw {
    0%   { stroke-dashoffset: 300; opacity: 0; }
    40%  { opacity: 0.6; }
    100% { stroke-dashoffset: 0; opacity: 0.35; }
  }
  @keyframes wa-particle {
    0%   { transform: translateY(0) scale(1); opacity: 0.7; }
    100% { transform: translateY(-65px) scale(0); opacity: 0; }
  }
  @keyframes wa-icon-glow {
    0%, 100% { box-shadow: 0 0 12px rgba(197,255,0,0.25); }
    50%  { box-shadow: 0 0 24px rgba(197,255,0,0.55); }
  }
  @keyframes wa-spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`;

// ─── Pakistan map illustration ────────────────────────────────────────────────

const CITIES = [
  { cx: 104, cy: 42, label: "ISB", delay: "0s" },
  { cx: 130, cy: 78, label: "LHR", delay: "0.4s" },
  { cx: 88, cy: 162, label: "KHI", delay: "0.8s" },
  { cx: 46, cy: 110, label: "QTA", delay: "0.2s" },
  { cx: 80, cy: 28, label: "PEW", delay: "0.6s" },
];

const CONNECTIONS = [
  [0, 1], [0, 3], [0, 4],
  [1, 2], [2, 3], [3, 4],
];

function PakistanMap() {
  return (
    <svg
      viewBox="0 0 180 185"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <radialGradient id="wa-city-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.6" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
        <filter id="wa-glow-filter">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Pakistan outline */}
      <path
        d="
          M54,5 L66,2 L80,4 L95,7 L110,5 L124,8
          L134,16 L140,26 L143,38 L145,50
          L147,63 L146,76 L149,87 L150,100
          L150,112 L148,125 L142,138
          L133,150 L120,160 L106,165
          L92,166 L78,163 L66,157
          L54,149 L44,140 L38,128
          L36,114 L37,100 L39,87
          L38,75 L40,63 L44,53
          L48,42 L52,32 L54,20 Z
        "
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Fill with very subtle lime tint */}
      <path
        d="
          M54,5 L66,2 L80,4 L95,7 L110,5 L124,8
          L134,16 L140,26 L143,38 L145,50
          L147,63 L146,76 L149,87 L150,100
          L150,112 L148,125 L142,138
          L133,150 L120,160 L106,165
          L92,166 L78,163 L66,157
          L54,149 L44,140 L38,128
          L36,114 L37,100 L39,87
          L38,75 L40,63 L44,53
          L48,42 L52,32 L54,20 Z
        "
        fill={`url(#wa-map-fill)`}
      />
      <defs>
        <radialGradient id="wa-map-fill" cx="55%" cy="50%" r="55%">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.04" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0.01" />
        </radialGradient>
      </defs>

      {/* Connection lines */}
      {CONNECTIONS.map(([a, b], i) => (
        <line
          key={i}
          x1={CITIES[a].cx}
          y1={CITIES[a].cy}
          x2={CITIES[b].cx}
          y2={CITIES[b].cy}
          stroke={LIME}
          strokeWidth="0.7"
          strokeDasharray="300"
          strokeDashoffset="0"
          opacity="0.3"
          style={{ animation: `wa-line-draw 1.6s ease-out ${0.3 + i * 0.12}s both` }}
        />
      ))}

      {/* City dots */}
      {CITIES.map((c, i) => (
        <g key={i}>
          {/* Glow halo */}
          <circle
            cx={c.cx}
            cy={c.cy}
            r="8"
            fill={LIME}
            opacity="0.1"
            style={{ animation: `wa-dot-pulse 2.5s ease-in-out infinite ${c.delay}` }}
          />
          {/* Outer ring */}
          <circle
            cx={c.cx}
            cy={c.cy}
            r="4.5"
            fill="none"
            stroke={LIME}
            strokeWidth="0.8"
            opacity="0.6"
          />
          {/* Inner dot */}
          <circle
            cx={c.cx}
            cy={c.cy}
            r="2"
            fill={LIME}
            filter="url(#wa-glow-filter)"
            style={{ animation: `wa-dot-pulse 2.5s ease-in-out infinite ${c.delay}` }}
          />
          {/* Label */}
          <text
            x={c.cx + 6}
            y={c.cy - 6}
            fontSize="6"
            fontFamily={F}
            fontWeight="700"
            fill={LIME}
            opacity="0.7"
            letterSpacing="0.03em"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Left illustration panel ──────────────────────────────────────────────────

function IllustrationPanel() {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        minHeight: "580px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Main glass card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          height: "540px",
          background: "rgba(9,9,12,0.9)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          overflow: "visible",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Inner content */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "28px",
          }}
        >
          {/* Background radial glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "380px",
              height: "380px",
              background: "radial-gradient(circle, rgba(197,255,0,0.055) 0%, transparent 65%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />

          {/* Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
            }}
          />

          {/* Pakistan Map — centered */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-46%, -50%)",
              width: "200px",
              height: "230px",
              opacity: 0.85,
            }}
          >
            <PakistanMap />
          </div>

          {/* Orbit ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px dashed rgba(197,255,0,0.1)",
              animation: "wa-spin-slow 28s linear infinite",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Floating cards ─────────────────────────────────────────── */}

        {/* Top-left: PKR card */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "-20px",
            background: "rgba(9,9,12,0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(197,255,0,0.2)",
            borderRadius: "16px",
            padding: "14px 18px",
            boxShadow: "0 0 30px rgba(197,255,0,0.1), 0 12px 32px rgba(0,0,0,0.5)",
            animation: "wa-float-a 5s ease-in-out infinite",
            minWidth: "110px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "18px", fontFamily: F, fontWeight: 800, color: LIME, lineHeight: 1 }}>₨</span>
            <span style={{ fontSize: "10px", fontFamily: F, fontWeight: 700, color: LIME, letterSpacing: "0.04em" }}>PKR</span>
          </div>
          <div style={{ fontSize: "11px", fontFamily: F, color: "rgba(255,255,255,0.4)" }}>Transparent</div>
          <div style={{ fontSize: "11px", fontFamily: F, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>Pricing</div>
        </div>

        {/* Top-right: Cloud card */}
        <div
          style={{
            position: "absolute",
            top: "28px",
            right: "-24px",
            background: "rgba(9,9,12,0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "14px 18px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            animation: "wa-float-b 6s ease-in-out infinite 0.5s",
            minWidth: "120px",
          }}
        >
          <Cloud size={20} color={LIME} strokeWidth={1.5} style={{ marginBottom: "6px" }} />
          <div style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.4)", marginBottom: "2px" }}>Infrastructure</div>
          <div style={{ fontSize: "11px", fontFamily: F, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>Local Tested</div>
          <div style={{ display: "flex", gap: "3px", marginTop: "8px" }}>
            {[100, 85, 92].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h * 0.18}px`, background: i === 2 ? LIME : "rgba(255,255,255,0.1)", borderRadius: "2px" }} />
            ))}
          </div>
        </div>

        {/* Center dashboard card */}
        <div
          style={{
            position: "absolute",
            bottom: "110px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            background: "rgba(7,7,10,0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(197,255,0,0.15)",
            borderRadius: "18px",
            padding: "16px 18px",
            boxShadow: "0 0 40px rgba(197,255,0,0.1), 0 16px 48px rgba(0,0,0,0.65)",
            animation: "wa-float-c 7s ease-in-out infinite 1s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: LIME, boxShadow: `0 0 6px ${LIME}` }} />
            <span style={{ fontSize: "9px", fontFamily: F, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Dashboard</span>
            <span style={{ marginLeft: "auto", fontSize: "9px", fontFamily: F, color: LIME, background: "rgba(197,255,0,0.1)", padding: "1px 6px", borderRadius: "8px" }}>LIVE</span>
          </div>
          <div style={{ fontSize: "19px", fontFamily: F, fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: "4px" }}>₨ 2.4M</div>
          <div style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.35)", marginBottom: "10px" }}>Monthly Revenue ↑ 18%</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "28px" }}>
            {[40, 55, 38, 72, 50, 85, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: i === 6 ? LIME : "rgba(255,255,255,0.07)" }} />
            ))}
          </div>
        </div>

        {/* Bottom-left: JazzCash/Easypaisa */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "-20px",
            background: "rgba(9,9,12,0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "12px 14px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            animation: "wa-float-d 5.5s ease-in-out infinite 0.8s",
          }}
        >
          <div style={{ fontSize: "9px", fontFamily: F, color: "rgba(255,255,255,0.3)", marginBottom: "8px", letterSpacing: "0.05em" }}>PAYMENTS</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "rgba(255,106,0,0.15)", border: "1px solid rgba(255,106,0,0.3)", borderRadius: "8px", padding: "5px 8px" }}>
              <div style={{ fontSize: "9px", fontFamily: F, fontWeight: 700, color: "#FF6A00" }}>Jazz</div>
              <div style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.3)" }}>Cash</div>
            </div>
            <div style={{ background: "rgba(0,180,100,0.12)", border: "1px solid rgba(0,180,100,0.25)", borderRadius: "8px", padding: "5px 8px" }}>
              <div style={{ fontSize: "9px", fontFamily: F, fontWeight: 700, color: "#00B464" }}>Easy</div>
              <div style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.3)" }}>paisa</div>
            </div>
          </div>
        </div>

        {/* Bottom-right: Security card */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "-20px",
            background: "rgba(9,9,12,0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "14px 16px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            animation: "wa-float-a 6.5s ease-in-out infinite 1.5s",
          }}
        >
          <Shield size={18} color={LIME} strokeWidth={1.5} style={{ marginBottom: "6px" }} />
          <div style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.38)", marginBottom: "2px" }}>Source Code</div>
          <div style={{ fontSize: "11px", fontFamily: F, fontWeight: 700, color: "#fff" }}>You Own It</div>
          <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "1px", marginTop: "8px" }}>
            <div style={{ width: "100%", height: "100%", background: LIME, borderRadius: "1px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Feature card data ────────────────────────────────────────────────────────

const FEATURES = [
  {
    num: "01",
    title: "Local Team, Local Time Zone",
    desc: "Direct access to your developers during Pakistan working hours — no handoff delays across time zones.",
    icons: [Users, MessageSquare],
    color: LIME,
  },
  {
    num: "02",
    title: "PKR-Friendly Pricing",
    desc: "Transparent Basic and Pro pricing in PKR, with no hidden currency conversion surprises.",
    icons: [Wallet],
    color: LIME,
  },
  {
    num: "03",
    title: "Built for Local Infrastructure",
    desc: "Every product is tested for local networks, JazzCash/Easypaisa integration, and everyday connectivity.",
    icons: [Server, Cloud],
    color: LIME,
  },
  {
    num: "04",
    title: "You Own What We Build",
    desc: "Full source code and documentation handed over with every product — no lock-in, no dependency on us.",
    icons: [Code2, Shield],
    color: LIME,
  },
];

// ─── Feature card ─────────────────────────────────────────────────────────────

function FeatureCard({
  feat,
  delay,
}: {
  feat: (typeof FEATURES)[0];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  const Icon0 = feat.icons[0];
  const Icon1 = feat.icons[1];

  return (
    <motion.div
      className="rs-compact-pad"
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "rgba(10,10,13,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(197,255,0,0.28)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "22px",
        padding: "28px 32px 28px 36px",
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        boxShadow: hovered
          ? "0 0 50px rgba(197,255,0,0.08), 0 16px 48px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-4px) translateX(4px)" : "translateY(0) translateX(0)",
        transition:
          "transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.35s ease",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Left lime accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: "3px",
          borderRadius: "0 3px 3px 0",
          background: hovered
            ? `linear-gradient(180deg, ${LIME} 0%, rgba(197,255,0,0.4) 100%)`
            : `linear-gradient(180deg, rgba(197,255,0,0.5) 0%, rgba(197,255,0,0.15) 100%)`,
          boxShadow: hovered ? `0 0 14px rgba(197,255,0,0.6)` : `0 0 8px rgba(197,255,0,0.2)`,
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      />

      {/* Icon cluster */}
      <div
        style={{
          position: "relative",
          flexShrink: 0,
          width: "52px",
          height: "52px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            background: hovered
              ? "rgba(197,255,0,0.1)"
              : "rgba(197,255,0,0.06)",
            border: `1px solid ${hovered ? "rgba(197,255,0,0.3)" : "rgba(197,255,0,0.14)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.3s ease, border-color 0.3s ease",
            animation: hovered ? "wa-icon-glow 1.5s ease-in-out infinite" : undefined,
          }}
        >
          <Icon0
            size={22}
            color={LIME}
            strokeWidth={1.6}
            style={{
              opacity: hovered ? 1 : 0.8,
              transition: "opacity 0.2s ease",
            }}
          />
        </div>
        {/* Secondary icon badge */}
        {Icon1 && (
          <div
            style={{
              position: "absolute",
              bottom: "-4px",
              right: "-4px",
              width: "22px",
              height: "22px",
              borderRadius: "7px",
              background: "rgba(10,10,13,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon1 size={11} color="rgba(255,255,255,0.5)" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            fontSize: "17px",
            fontFamily: F,
            fontWeight: 700,
            color: hovered ? "#fff" : "rgba(255,255,255,0.88)",
            letterSpacing: "-0.02em",
            margin: "0 0 8px 0",
            lineHeight: 1.3,
            transition: "color 0.2s ease",
          }}
        >
          {feat.title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            fontFamily: F,
            fontWeight: 400,
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.72,
            margin: 0,
            transition: "color 0.2s ease",
          }}
        >
          {feat.desc}
        </p>
      </div>

      {/* Number badge */}
      <div
        style={{
          flexShrink: 0,
          fontSize: "11px",
          fontFamily: F,
          fontWeight: 700,
          color: hovered ? LIME : "rgba(255,255,255,0.2)",
          background: hovered ? "rgba(197,255,0,0.08)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgba(197,255,0,0.2)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "100px",
          padding: "4px 10px",
          letterSpacing: "0.04em",
          transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
        }}
      >
        {feat.num}
      </div>
    </motion.div>
  );
}

// ─── Fade-up helper ───────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

// ─── Section ──────────────────────────────────────────────────────────────────

export function WhyAuraSection() {
  return (
    <>
      <style>{CSS}</style>
      <section
        id="why-aura"
        className="figma-section"
        style={{
          padding: "72px 72px",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* ── Background decorations ─────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(197,255,0,0.05) 0%, transparent 60%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(197,255,0,0.038) 0%, transparent 65%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        {/* Floating circles */}
        <div style={{ position: "absolute", top: "15%", right: "6%", width: "180px", height: "180px", borderRadius: "50%", border: "1px solid rgba(197,255,0,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "30%", left: "2%", width: "140px", height: "140px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.035)", pointerEvents: "none" }} />

        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            pointerEvents: "none",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
          }}
        />

        {/* Particles */}
        {[
          { x: "8%", delay: "0s", dur: "5s" },
          { x: "35%", delay: "1.5s", dur: "4.2s" },
          { x: "62%", delay: "0.7s", dur: "5.5s" },
          { x: "90%", delay: "2.1s", dur: "4.8s" },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              bottom: "12%",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: LIME,
              boxShadow: `0 0 6px ${LIME}`,
              animation: `wa-particle ${p.dur} ease-out infinite ${p.delay}`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Section header ──────────────────────────────────────── */}
          <div
            style={{
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto 80px auto",
            }}
          >
            <motion.div {...fadeUp(0)} style={{ display: "inline-block" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  background: "rgba(197,255,0,0.07)",
                  border: "1px solid rgba(197,255,0,0.22)",
                  borderRadius: "100px",
                  padding: "7px 18px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: LIME,
                    boxShadow: `0 0 9px ${LIME}`,
                  }}
                />
                <span
                  style={{
                    fontSize: "13px",
                    fontFamily: F,
                    fontWeight: 500,
                    color: LIME,
                    letterSpacing: "0.02em",
                  }}
                >
                  Why Aura
                </span>
              </div>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              style={{
                fontSize: "clamp(28px, 3.2vw, 50px)",
                fontFamily: F,
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 18px 0",
              }}
            >
              Built for the{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Pakistani Market,
              </span>{" "}
              <br />
              Held to a Global Standard
            </motion.h2>

            <motion.p
              {...fadeUp(0.15)}
              style={{
                fontSize: "16px",
                fontFamily: F,
                fontWeight: 400,
                color: "rgba(255,255,255,0.47)",
                lineHeight: 1.78,
                margin: 0,
              }}
            >
              Whether it's POS, TMS, SMS, Restaurant, or Recurring Billing — we
              build every product with local businesses in mind, not as an
              afterthought.
            </motion.p>
          </div>

          {/* ── Two-column layout ───────────────────────────────────── */}
          <div
            className="rs-cols-2 rs-stack-tablet rs-section-gap"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "center",
              marginBottom: "64px",
            }}
          >
            {/* Left: illustration */}
            <motion.div
              className="rs-illust"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <IllustrationPanel />
            </motion.div>

            {/* Right: feature cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {FEATURES.map((f, i) => (
                <FeatureCard key={f.num} feat={f} delay={0.18 + i * 0.1} />
              ))}
            </div>
          </div>

          {/* ── CTA glass banner ────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.55)}
            className="rs-banner-row"
            style={{
              background: "rgba(10,10,13,0.88)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "28px",
              padding: "44px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 16px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Banner glow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "30%",
                transform: "translateY(-50%)",
                width: "400px",
                height: "200px",
                background: "radial-gradient(ellipse, rgba(197,255,0,0.06) 0%, transparent 70%)",
                filter: "blur(30px)",
                pointerEvents: "none",
              }}
            />
            {/* Banner left accent line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "15%",
                bottom: "15%",
                width: "3px",
                borderRadius: "0 3px 3px 0",
                background: `linear-gradient(180deg, ${LIME} 0%, rgba(197,255,0,0.2) 100%)`,
                boxShadow: `0 0 16px rgba(197,255,0,0.4)`,
              }}
            />

            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: "clamp(17px, 1.6vw, 22px)",
                  fontFamily: F,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                }}
              >
                Ready to get started with Aura?
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontFamily: F,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                See every product live or book a call with our team.
              </div>
            </div>

            <div className="cta-row" style={{ flexShrink: 0, width: "auto", position: "relative" }}>
              <SiteButton href="#products" variant="primary">
                See All Products
                <ArrowRight size={14} strokeWidth={2.5} />
              </SiteButton>
              <SiteButton href="tel:+923706277633" variant="secondary">
                <Phone size={13} strokeWidth={2} />
                Talk to Our Team
              </SiteButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
