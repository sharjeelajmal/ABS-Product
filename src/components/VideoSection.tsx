"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";

// ─── Injected keyframe animations ────────────────────────────────────────────

const CSS = `
  @keyframes vs-pulse {
    0%, 100% { transform: scale(1); opacity: 0.55; }
    50% { transform: scale(1.18); opacity: 0; }
  }
  @keyframes vs-pulse2 {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.38); opacity: 0; }
  }
  @keyframes vs-glow-border {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  @keyframes vs-float-a {
    0%, 100% { transform: translateY(0px) rotate(-3deg); }
    50% { transform: translateY(-10px) rotate(-3deg); }
  }
  @keyframes vs-float-b {
    0%, 100% { transform: translateY(0px) rotate(2deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
  }
  @keyframes vs-float-c {
    0%, 100% { transform: translateY(0px) rotate(-1.5deg); }
    50% { transform: translateY(-6px) rotate(-1.5deg); }
  }
  @keyframes vs-float-d {
    0%, 100% { transform: translateY(0px) rotate(3.5deg); }
    50% { transform: translateY(-9px) rotate(3.5deg); }
  }
  @keyframes vs-scan {
    0% { transform: translateY(0%); opacity: 0.6; }
    100% { transform: translateY(1000%); opacity: 0; }
  }
  @keyframes vs-particle {
    0% { transform: translateY(0) scale(1); opacity: 0.8; }
    100% { transform: translateY(-80px) scale(0); opacity: 0; }
  }
  @keyframes vs-shimmer {
    0% { left: -100%; }
    100% { left: 200%; }
  }
`;

// ─── Mini dashboard thumbnails ────────────────────────────────────────────────

function POSThumbnail() {
  return (
    <div style={{ padding: "10px", height: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "2px" }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: LIME, boxShadow: `0 0 5px ${LIME}` }} />
        <span style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase" }}>POS</span>
        <span style={{ marginLeft: "auto", fontSize: "7px", fontFamily: F, color: LIME, background: "rgba(197,255,0,0.1)", border: `1px solid rgba(197,255,0,0.2)`, padding: "1px 5px", borderRadius: "10px" }}>LIVE</span>
      </div>
      <div style={{ fontSize: "16px", fontFamily: F, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$24.8K</div>
      <div style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.35)" }}>Today's Revenue ↑14%</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "32px", marginTop: "2px" }}>
        {[30, 50, 38, 65, 45, 80, 58, 100].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: i === 7 ? LIME : "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        {[{ v: "892", l: "Orders" }, { v: "94%", l: "Fulfill" }].map((s, i) => (
          <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "5px", padding: "4px 5px", textAlign: "center" }}>
            <div style={{ fontSize: "10px", fontFamily: F, fontWeight: 700, color: i === 1 ? LIME : "#fff" }}>{s.v}</div>
            <div style={{ fontSize: "7px", fontFamily: F, color: "rgba(255,255,255,0.3)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TMSThumbnail() {
  return (
    <div style={{ padding: "10px", height: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: LIME, boxShadow: `0 0 5px ${LIME}` }} />
        <span style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Fleet</span>
        <span style={{ marginLeft: "auto", fontSize: "7px", fontFamily: F, color: LIME }}>48 vehicles</span>
      </div>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 120 60" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
          {[20, 40, 60].map(y => <line key={y} x1="0" y1={y} x2="120" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
          {[40, 80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
          <path d="M5,52 Q25,40 45,32 T85,18 T115,8" fill="none" stroke={LIME} strokeWidth="1.2" strokeOpacity="0.8" />
          <path d="M5,55 Q30,46 55,38 T90,25" fill="none" stroke="#FF6B35" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="55" cy="34" r="3" fill={LIME} opacity="0.9" />
          <circle cx="55" cy="34" r="6" fill={LIME} opacity="0.15" />
          <circle cx="30" cy="44" r="2.5" fill="#FF6B35" opacity="0.8" />
        </svg>
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        {[{ v: "94%", l: "On-Time", lime: true }, { v: "24", l: "Routes" }].map((s, i) => (
          <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "5px", padding: "4px", textAlign: "center" }}>
            <div style={{ fontSize: "10px", fontFamily: F, fontWeight: 700, color: s.lime ? LIME : "#fff" }}>{s.v}</div>
            <div style={{ fontSize: "7px", fontFamily: F, color: "rgba(255,255,255,0.3)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SMSThumbnail() {
  return (
    <div style={{ padding: "10px", height: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: LIME, boxShadow: `0 0 5px ${LIME}` }} />
        <span style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase" }}>School</span>
        <span style={{ marginLeft: "auto", fontSize: "7px", fontFamily: F, color: "rgba(197,255,0,0.6)" }}>2024-25</span>
      </div>
      <div style={{ fontSize: "14px", fontFamily: F, fontWeight: 800, color: "#fff", lineHeight: 1 }}>1,204</div>
      <div style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.35)" }}>Students · 96% Attendance</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", flex: 1 }}>
        {Array.from({ length: 21 }, (_, i) => {
          const v = [0.9, 0.7, 0.5, 0.85, 0.3, 0.95, 0.6, 0.8, 0.4, 0.9, 0.7, 0.6, 0.85, 0.5, 0.9, 0.3, 0.8, 0.7, 0.95, 0.4, 0.6][i];
          return <div key={i} style={{ borderRadius: "2px", background: v > 0.8 ? LIME : v > 0.55 ? "rgba(197,255,0,0.35)" : "rgba(255,255,255,0.06)" }} />;
        })}
      </div>
    </div>
  );
}

function RestaurantThumbnail() {
  const tables = [true, true, false, true, false, true, true, false, true, false, true, false];
  return (
    <div style={{ padding: "10px", height: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: LIME, boxShadow: `0 0 5px ${LIME}` }} />
        <span style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Restaurant</span>
        <span style={{ marginLeft: "auto", fontSize: "7px", fontFamily: F, color: LIME, background: "rgba(197,255,0,0.1)", padding: "1px 5px", borderRadius: "8px" }}>OPEN</span>
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: "5px", padding: "4px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontFamily: F, fontWeight: 700, color: LIME }}>23</div>
          <div style={{ fontSize: "7px", fontFamily: F, color: "rgba(255,255,255,0.3)" }}>Orders</div>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: "5px", padding: "4px", textAlign: "center" }}>
          <div style={{ fontSize: "12px", fontFamily: F, fontWeight: 700, color: "#fff" }}>18/24</div>
          <div style={{ fontSize: "7px", fontFamily: F, color: "rgba(255,255,255,0.3)" }}>Tables</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3px", flex: 1 }}>
        {tables.map((occ, i) => (
          <div key={i} style={{ background: occ ? "rgba(197,255,0,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${occ ? "rgba(197,255,0,0.2)" : "rgba(255,255,255,0.05)"}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "7px", fontFamily: F, color: occ ? LIME : "rgba(255,255,255,0.2)", fontWeight: 600 }}>T{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingThumbnail() {
  return (
    <div style={{ padding: "10px", height: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: LIME, boxShadow: `0 0 5px ${LIME}` }} />
        <span style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Billing</span>
      </div>
      <div style={{ fontSize: "16px", fontFamily: F, fontWeight: 800, color: LIME, lineHeight: 1 }}>$42.8K</div>
      <div style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.35)" }}>MRR · 384 Active</div>
      <svg viewBox="0 0 100 40" style={{ width: "100%", flex: 1 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="vs-bill-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={LIME} stopOpacity="0.25" />
            <stop offset="100%" stopColor={LIME} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,38 C15,35 25,32 35,28 S55,18 70,12 S85,7 100,4 L100,40 L0,40 Z" fill="url(#vs-bill-grad)" />
        <path d="M0,38 C15,35 25,32 35,28 S55,18 70,12 S85,7 100,4" fill="none" stroke={LIME} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="100" cy="4" r="2.5" fill={LIME} />
      </svg>
    </div>
  );
}

// ─── Main dashboard collage (the video thumbnail) ────────────────────────────

function DashboardCollage({ hovered }: { hovered: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #060608 0%, #09090c 50%, #06080a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Radial glow in center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "70%",
          background: "radial-gradient(ellipse, rgba(197,255,0,0.08) 0%, transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          transition: "opacity 0.5s ease",
          opacity: hovered ? 1.4 : 1,
        }}
      />

      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${LIME} 50%, transparent 100%)`,
            opacity: 0.12,
            animation: "vs-scan 4s linear infinite",
          }}
        />
      </div>

      {/* ── Floating dashboard cards ─────────────────────────────────────── */}

      {/* Center-left: POS (largest) */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "26%",
          height: "70%",
          background: "rgba(10,10,12,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(197,255,0,0.18)",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(197,255,0,0.1), 0 16px 40px rgba(0,0,0,0.55)",
          animation: "vs-float-a 4.5s ease-in-out infinite",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <POSThumbnail />
      </div>

      {/* Top center: TMS */}
      <div
        style={{
          position: "absolute",
          left: "36%",
          top: "6%",
          width: "28%",
          height: "42%",
          background: "rgba(10,10,12,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "14px",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
          animation: "vs-float-b 5.5s ease-in-out infinite",
        }}
      >
        <TMSThumbnail />
      </div>

      {/* Bottom center: Restaurant */}
      <div
        style={{
          position: "absolute",
          left: "34%",
          bottom: "6%",
          width: "28%",
          height: "44%",
          background: "rgba(10,10,12,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
          animation: "vs-float-c 6s ease-in-out infinite",
        }}
      >
        <RestaurantThumbnail />
      </div>

      {/* Top right: SMS */}
      <div
        style={{
          position: "absolute",
          right: "4%",
          top: "8%",
          width: "24%",
          height: "44%",
          background: "rgba(10,10,12,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "14px",
          boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          animation: "vs-float-b 5s ease-in-out infinite 0.8s",
        }}
      >
        <SMSThumbnail />
      </div>

      {/* Bottom right: Billing */}
      <div
        style={{
          position: "absolute",
          right: "4%",
          bottom: "8%",
          width: "24%",
          height: "40%",
          background: "rgba(10,10,12,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(197,255,0,0.12)",
          borderRadius: "14px",
          boxShadow: "0 0 25px rgba(197,255,0,0.06), 0 12px 32px rgba(0,0,0,0.5)",
          animation: "vs-float-d 5.8s ease-in-out infinite 0.3s",
        }}
      >
        <BillingThumbnail />
      </div>

      {/* Floating particles */}
      {[
        { x: "20%", delay: "0s" },
        { x: "45%", delay: "1.5s" },
        { x: "70%", delay: "0.8s" },
        { x: "85%", delay: "2.2s" },
        { x: "12%", delay: "1.1s" },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            bottom: "20%",
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: LIME,
            boxShadow: `0 0 6px ${LIME}`,
            animation: `vs-particle ${3 + i * 0.5}s ease-out infinite ${p.delay}`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── Fade-up helper ───────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

// ─── Stats row data ───────────────────────────────────────────────────────────

const STATS = [
  { v: "5", l: "Software Products" },
  { v: "Live", l: "Demonstration" },
  { v: "Basic & Pro", l: "Plans Available" },
  { v: "Local", l: "Support Included" },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + 0.4;
        });
      }, 80);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const handlePlay = () => {
    if (!playing) {
      setProgress(0);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <section
        id="videos"
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
        {/* Ambient background */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(197,255,0,0.05) 0%, transparent 60%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "5%",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.035)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "4%",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            border: "1px solid rgba(197,255,0,0.05)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px auto" }}>
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
                  Product Demo
                </span>
              </div>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              style={{
                fontSize: "clamp(28px, 3.2vw, 48px)",
                fontFamily: F,
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
              }}
            >
              Watch Our{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Software in Action
              </span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.15)}
              style={{
                fontSize: "16px",
                fontFamily: F,
                fontWeight: 400,
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              See every system live — from POS to Fleet to School to Restaurant to
              Recurring Billing. Real software, real workflows.
            </motion.p>
          </div>

          {/* ── Video player ───────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.2)}
            style={{ maxWidth: "1040px", margin: "0 auto 28px auto" }}
          >
            {/* Outer glow ring */}
            <div
              style={{
                position: "relative",
                borderRadius: "28px",
                padding: "1px",
                background: hovered
                  ? `linear-gradient(135deg, rgba(197,255,0,0.4) 0%, rgba(197,255,0,0.08) 50%, rgba(197,255,0,0.25) 100%)`
                  : `linear-gradient(135deg, rgba(197,255,0,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(197,255,0,0.1) 100%)`,
                boxShadow: hovered
                  ? `0 0 80px rgba(197,255,0,0.18), 0 32px 80px rgba(0,0,0,0.7)`
                  : `0 0 40px rgba(197,255,0,0.08), 0 24px 64px rgba(0,0,0,0.65)`,
                transition: "box-shadow 0.5s ease, background 0.4s ease",
                animation: !hovered ? "vs-glow-border 3s ease-in-out infinite" : undefined,
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Glass container */}
              <div
                style={{
                  borderRadius: "27px",
                  overflow: "hidden",
                  background: "rgba(8,8,10,0.96)",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={handlePlay}
              >
                {/* 16:9 video area */}
                <div style={{ position: "relative", paddingBottom: "56.25%" }}>
                  <div style={{ position: "absolute", inset: 0 }}>

                    {/* Dashboard collage (thumbnail) */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        transform: hovered && !playing ? "scale(1.02)" : "scale(1)",
                        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      <DashboardCollage hovered={hovered} />
                    </div>

                    {/* Cinematic overlay */}
                    {!playing && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(0deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.35) 100%)",
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    )}

                    {/* Playing state */}
                    {playing && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(5,5,7,0.9)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: LIME,
                              boxShadow: `0 0 10px ${LIME}`,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "14px",
                              fontFamily: F,
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.7)",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                            }}
                          >
                            Now Playing — Product Walkthrough
                          </span>
                        </div>
                        {/* Fake waveform */}
                        <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "40px" }}>
                          {Array.from({ length: 40 }, (_, i) => {
                            const h = 20 + Math.sin(i * 0.7 + progress * 0.15) * 18 + Math.sin(i * 1.3) * 10;
                            return (
                              <div
                                key={i}
                                style={{
                                  width: "3px",
                                  height: `${Math.max(6, h)}px`,
                                  borderRadius: "2px",
                                  background: i / 40 < progress / 100 ? LIME : "rgba(255,255,255,0.12)",
                                  transition: "background 0.1s",
                                }}
                              />
                            );
                          })}
                        </div>
                        <div
                          style={{
                            fontSize: "13px",
                            fontFamily: F,
                            color: "rgba(255,255,255,0.35)",
                          }}
                        >
                          {Math.floor((progress / 100) * 225)}s / 3:45 — Click to pause
                        </div>
                      </div>
                    )}

                    {/* Top badges */}
                    {!playing && (
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "20px",
                          right: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            background: "rgba(5,5,5,0.65)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "100px",
                            padding: "6px 14px",
                          }}
                        >
                          <Play size={10} fill="#fff" color="#fff" />
                          <span
                            style={{
                              fontSize: "11px",
                              fontFamily: F,
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.85)",
                              letterSpacing: "0.03em",
                            }}
                          >
                            Product Walkthrough
                          </span>
                        </div>

                        <div
                          style={{
                            background: "rgba(5,5,5,0.65)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "100px",
                            padding: "6px 14px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11px",
                              fontFamily: F,
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.7)",
                              letterSpacing: "0.04em",
                            }}
                          >
                            3:45
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Play button */}
                    {!playing && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                        }}
                      >
                        {/* Outer pulse rings */}
                        <div
                          style={{
                            position: "absolute",
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            border: `1px solid rgba(197,255,0,0.5)`,
                            animation: "vs-pulse 2.4s ease-out infinite",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            width: "130px",
                            height: "130px",
                            borderRadius: "50%",
                            border: `1px solid rgba(197,255,0,0.25)`,
                            animation: "vs-pulse2 2.4s ease-out infinite 0.4s",
                          }}
                        />
                        {/* Play circle */}
                        <div
                          style={{
                            width: "76px",
                            height: "76px",
                            borderRadius: "50%",
                            background: hovered ? LIME : "rgba(197,255,0,0.9)",
                            boxShadow: hovered
                              ? `0 0 60px rgba(197,255,0,0.7), 0 0 120px rgba(197,255,0,0.25)`
                              : `0 0 40px rgba(197,255,0,0.45), 0 0 80px rgba(197,255,0,0.15)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transform: hovered ? "scale(1.1)" : "scale(1)",
                            transition: "transform 0.3s ease, background 0.2s ease, box-shadow 0.3s ease",
                          }}
                        >
                          <Play
                            size={28}
                            fill="#050505"
                            color="#050505"
                            style={{ marginLeft: "4px" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Progress bar */}
                    {playing && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "3px",
                          background: "rgba(255,255,255,0.08)",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, ${LIME} 0%, #A8D800 100%)`,
                            boxShadow: `0 0 12px ${LIME}`,
                            transition: "width 0.08s linear",
                          }}
                        />
                      </div>
                    )}

                    {/* Glass reflection overlay at top */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "35%",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Outer glass frame bottom bar */}
              <div
                style={{
                  padding: "0 4px 4px 4px",
                  borderRadius: "0 0 27px 27px",
                }}
              />
            </div>
          </motion.div>

          {/* ── Caption card ───────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.28)}
            style={{
              maxWidth: "1040px",
              margin: "0 auto 52px auto",
            }}
          >
            <div
              className="rs-caption-row"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "36px",
                  borderRadius: "2px",
                  background: `linear-gradient(180deg, ${LIME} 0%, transparent 100%)`,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontSize: "15px",
                  fontFamily: F,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.52)",
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                From setup to daily use — see exactly what your team will experience.
              </p>
              <div
                className="rs-caption-tags"
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: "8px",
                  flexShrink: 0,
                }}
              >
                {["HD Quality", "No Sign-up"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      fontFamily: F,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Stats row ──────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.32)}
            className="rs-cols-4 rs-section-gap"
            style={{
              maxWidth: "1040px",
              margin: "0 auto 64px auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="rs-metrics-cell"
                style={{
                  background: "rgba(10,10,12,0.95)",
                  padding: "24px 28px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Subtle shimmer on hover */}
                <div
                  style={{
                    fontSize: "clamp(18px, 2vw, 26px)",
                    fontFamily: F,
                    fontWeight: 800,
                    color: i === 0 ? LIME : "#FFFFFF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontFamily: F,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Divider ────────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.36)}
            style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(197,255,0,0.12) 50%, rgba(255,255,255,0.07) 80%, transparent 100%)",
              marginBottom: "52px",
            }}
          />

          {/* ── CTAs ───────────────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.4)} className="cta-row">
            <SiteButton href="tel:+923706277633" variant="primary">
              <Calendar size={15} strokeWidth={2.5} />
              Book a Live Demo
            </SiteButton>
            <SiteButton href="#videos" variant="secondary">
              <Play size={14} fill="currentColor" style={{ opacity: 0.8 }} />
              Watch More Videos
              <ArrowRight size={14} strokeWidth={2} style={{ opacity: 0.6 }} />
            </SiteButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
