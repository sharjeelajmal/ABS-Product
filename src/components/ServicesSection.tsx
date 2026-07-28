"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Settings2,
  Users,
  GraduationCap,
  Code2,
  CloudUpload,
  ShieldCheck,
  Network,
  Headphones,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const DIM = "rgba(255,255,255,0.42)";
const BORDER = "rgba(255,255,255,0.08)";
const BORDER_HOVER = "rgba(197,255,0,0.28)";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

interface Service {
  icons: ReactNode[];
  title: string;
  description: string;
  accent?: boolean;
}

const services: Service[] = [
  {
    icons: [<Settings2 size={18} strokeWidth={1.6} />, <Monitor size={18} strokeWidth={1.6} />],
    title: "Setup & Installation",
    description:
      "Complete hardware and software setup for your chosen system — POS, TMS, SMS, Restaurant, or Recurring Billing — configured to match your business.",
  },
  {
    icons: [<Users size={18} strokeWidth={1.6} />, <GraduationCap size={18} strokeWidth={1.6} />],
    title: "Staff Training",
    description:
      "Hands-on training for your team so staff are confident using the system from day one, on both Basic and Pro plans.",
  },
  {
    icons: [<Code2 size={18} strokeWidth={1.6} />],
    title: "Custom Development",
    description:
      "Need a feature specific to your business? We customize any of our products to match exactly how you work.",
    accent: true,
  },
  {
    icons: [<CloudUpload size={18} strokeWidth={1.6} />, <ShieldCheck size={18} strokeWidth={1.6} />],
    title: "Cloud Backup & Sync",
    description:
      "Your data — sales, records, schedules, or billing — is backed up automatically and synced in real time across locations.",
  },
  {
    icons: [<Network size={18} strokeWidth={1.6} />, <LayoutGrid size={18} strokeWidth={1.6} />],
    title: "Multi-Branch / Multi-User Management",
    description:
      "Run and monitor multiple branches, vehicles, classes, or accounts from a single unified dashboard.",
  },
  {
    icons: [<Headphones size={18} strokeWidth={1.6} />, <ShieldCheck size={18} strokeWidth={1.6} />],
    title: "Ongoing Support & Maintenance",
    description:
      "Local, responsive support for updates, troubleshooting, and upgrades — from Basic to Pro, whenever you need us.",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      {...fadeUp(0.08 * index)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "rgba(197,255,0,0.035)"
          : "rgba(14,14,14,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? BORDER_HOVER : BORDER}`,
        borderRadius: "20px",
        padding: "32px",
        cursor: "default",
        transition:
          "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 40px rgba(197,255,0,0.07), 0 16px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(197,255,0,0.1)"
          : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Corner glow on hover */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "160px",
          height: "160px",
          background:
            "radial-gradient(circle, rgba(197,255,0,0.14) 0%, transparent 70%)",
          filter: "blur(20px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Icon cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {service.icons.map((icon, i) => (
          <div
            key={i}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "11px",
              background: hovered
                ? "rgba(197,255,0,0.12)"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${hovered ? "rgba(197,255,0,0.25)" : "rgba(255,255,255,0.08)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: hovered ? LIME : "rgba(255,255,255,0.55)",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Title */}
      <div>
        <h3
          style={{
            fontSize: "17px",
            fontFamily: F,
            fontWeight: 700,
            color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.92)",
            lineHeight: 1.3,
            margin: 0,
            marginBottom: "10px",
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            fontFamily: F,
            fontWeight: 400,
            color: hovered ? "rgba(255,255,255,0.58)" : DIM,
            lineHeight: 1.72,
            margin: 0,
            transition: "color 0.3s ease",
          }}
        >
          {service.description}
        </p>
      </div>

      {/* Subtle arrow on hover */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontFamily: F,
            fontWeight: 600,
            color: LIME,
            letterSpacing: "0.03em",
          }}
        >
          Learn more
        </span>
        <ArrowRight size={13} color={LIME} strokeWidth={2.5} />
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
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
      {/* Section ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(197,255,0,0.055) 0%, transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section header ─────────────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto 48px auto",
          }}
        >
          {/* Eyebrow */}
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
                  flexShrink: 0,
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
                What We Offer
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: "clamp(32px, 3.6vw, 52px)",
              fontFamily: F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}
          >
            One Platform of Services,{" "}
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Behind Every Product
            </span>{" "}
            We Build
          </motion.h2>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.16)}
            style={{
              fontSize: "16px",
              fontFamily: F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.78,
              margin: "20px 0 0 0",
            }}
          >
            Whether it's POS, TMS, SMS, Restaurant, or Recurring Billing —
            every product comes with the same full-service support.
          </motion.p>
        </div>

        {/* ── Service cards grid ──────────────────────────────────── */}
        <div
          className="figma-services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(197,255,0,0.15) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)",
            marginBottom: "40px",
          }}
        />

        {/* ── CTA group ───────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.34)} className="cta-row">
          <SiteButton href="#products" variant="primary">
            Get Started
            <ArrowRight size={15} strokeWidth={2.5} />
          </SiteButton>
          <SiteButton href="#products" variant="secondary">
            Compare Basic &amp; Pro
          </SiteButton>
        </motion.div>

        {/* ── Bottom trust strip ──────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {[
            "Available for all 5 products",
            "Basic & Pro plans",
            "Local & remote support",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.45 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: LIME,
                  opacity: 0.7,
                  boxShadow: `0 0 6px ${LIME}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: F,
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
