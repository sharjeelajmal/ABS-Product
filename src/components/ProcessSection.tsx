"use client";

import { Fragment, useState, useEffect, type ReactElement } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  User,
  Settings2,
  Monitor,
  Users,
  GraduationCap,
  Rocket,
  Headphones,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const DIM = "rgba(255,255,255,0.42)";
const BORDER_DIM = "rgba(255,255,255,0.07)";

interface Step {
  num: string;
  title: string;
  icons: ReactElement[];
  desc: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Consult",
    icons: [
      <MessageCircle key="a" size={15} strokeWidth={1.6} />,
      <User key="b" size={15} strokeWidth={1.6} />,
    ],
    desc: "We understand your business type and recommend the right product, and the right plan — Basic or Pro.",
  },
  {
    num: "02",
    title: "Setup",
    icons: [
      <Settings2 key="a" size={15} strokeWidth={1.6} />,
      <Monitor key="b" size={15} strokeWidth={1.6} />,
    ],
    desc: "Your chosen system is installed and configured for your exact operations, from a single outlet to multiple branches.",
  },
  {
    num: "03",
    title: "Train",
    icons: [
      <Users key="a" size={15} strokeWidth={1.6} />,
      <GraduationCap key="b" size={15} strokeWidth={1.6} />,
    ],
    desc: "Hands-on training for your staff, so your team is confident using the system from day one.",
  },
  {
    num: "04",
    title: "Launch",
    icons: [<Rocket key="a" size={15} strokeWidth={1.6} />],
    desc: "Your software goes live, with your data, users, and settings fully in place.",
  },
  {
    num: "05",
    title: "Support",
    icons: [
      <Headphones key="a" size={15} strokeWidth={1.6} />,
      <ShieldCheck key="b" size={15} strokeWidth={1.6} />,
    ],
    desc: "Ongoing local support for updates, troubleshooting, and upgrading from Basic to Pro whenever you're ready.",
  },
];

const NODE_XS = [10, 30, 50, 70, 90];

// ─── Step Card ───────────────────────────────────────────────────────────────

function StepCard({
  step,
  isTop,
  index,
}: {
  step: Step;
  isTop: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: isTop ? -28 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: 0.1 * index, ease: "easeOut" }}
      whileHover={{ y: isTop ? -4 : 4, scale: 1.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "rgba(197,255,0,0.04)" : "rgba(13,13,13,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(197,255,0,0.28)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "20px",
        padding: "20px",
        overflow: "hidden",
        cursor: "default",
        width: "100%",
        boxSizing: "border-box" as const,
        transition:
          "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 36px rgba(197,255,0,0.08), 0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(197,255,0,0.08)"
          : "0 4px 20px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Ambient corner glow */}
      <div
        style={{
          position: "absolute",
          top: isTop ? "auto" : "-50px",
          bottom: isTop ? "-50px" : "auto",
          right: "-50px",
          width: "130px",
          height: "130px",
          background:
            "radial-gradient(circle, rgba(197,255,0,0.18) 0%, transparent 70%)",
          filter: "blur(18px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Large background step number */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "14px",
          fontSize: "42px",
          fontFamily: F,
          fontWeight: 800,
          color: hovered
            ? "rgba(197,255,0,0.09)"
            : "rgba(255,255,255,0.04)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          transition: "color 0.3s ease",
        }}
      >
        {step.num}
      </div>

      {/* Icon cluster */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginBottom: "14px",
        }}
      >
        {step.icons.map((icon, i) => (
          <div
            key={i}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "9px",
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
      <h3
        style={{
          fontSize: "15px",
          fontFamily: F,
          fontWeight: 700,
          color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.9)",
          margin: "0 0 8px 0",
          lineHeight: 1.3,
          letterSpacing: "-0.012em",
          transition: "color 0.3s ease",
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "12.5px",
          fontFamily: F,
          fontWeight: 400,
          color: hovered ? "rgba(255,255,255,0.52)" : DIM,
          lineHeight: 1.72,
          margin: 0,
          transition: "color 0.3s ease",
        }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

// ─── Horizontal Timeline (Desktop) ───────────────────────────────────────────

function HorizontalTimeline() {
  return (
    <div
      style={{
        position: "relative",
        height: "620px",
        marginBottom: "56px",
      }}
    >
      {/* Radial background glow behind the whole timeline */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "320px",
          background:
            "radial-gradient(ellipse, rgba(197,255,0,0.065) 0%, transparent 65%)",
          filter: "blur(45px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Horizontal connector line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${NODE_XS[0]}%`,
          right: `${100 - NODE_XS[4]}%`,
          height: "1px",
          transform: "translateY(-50%)",
          zIndex: 1,
          background: `linear-gradient(90deg,
            rgba(197,255,0,0.25) 0%,
            rgba(197,255,0,0.65) 20%,
            rgba(197,255,0,0.9) 50%,
            rgba(197,255,0,0.65) 80%,
            rgba(197,255,0,0.25) 100%
          )`,
          boxShadow:
            "0 0 12px rgba(197,255,0,0.35), 0 0 2px rgba(197,255,0,0.9)",
        }}
      />

      {/* Per-step: node + stem + card */}
      {steps.map((step, i) => {
        const nx = NODE_XS[i];
        const isTop = i % 2 === 0;

        return (
          <Fragment key={i}>
            {/* Node outer ring */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${nx}%`,
                transform: "translate(-50%, -50%)",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "1px solid rgba(197,255,0,0.32)",
                background: "rgba(197,255,0,0.06)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 3,
              }}
            >
              {/* Inner glow dot */}
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: LIME,
                  boxShadow:
                    "0 0 14px rgba(197,255,0,0.95), 0 0 4px rgba(197,255,0,1)",
                }}
              />
            </div>

            {/* Vertical stem */}
            <div
              style={{
                position: "absolute",
                left: `${nx}%`,
                transform: "translateX(-50%)",
                width: "1px",
                zIndex: 2,
                ...(isTop
                  ? {
                      bottom: "calc(50% + 17px)",
                      height: "14px",
                      background:
                        "linear-gradient(180deg, rgba(197,255,0,0), rgba(197,255,0,0.45))",
                    }
                  : {
                      top: "calc(50% + 17px)",
                      height: "14px",
                      background:
                        "linear-gradient(0deg, rgba(197,255,0,0), rgba(197,255,0,0.45))",
                    }),
              }}
            />

            {/* Card */}
            <div
              style={{
                position: "absolute",
                left: `${nx}%`,
                transform: "translateX(-50%)",
                width: "19%",
                zIndex: 4,
                ...(isTop
                  ? { bottom: "calc(50% + 31px)" }
                  : { top: "calc(50% + 31px)" }),
              }}
            >
              <StepCard step={step} isTop={isTop} index={i} />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

// ─── Vertical Timeline (Mobile) ──────────────────────────────────────────────

function VerticalTimeline() {
  return (
    <div
      style={{
        position: "relative",
        paddingLeft: "52px",
        marginBottom: "64px",
      }}
    >
      {/* Vertical connector line */}
      <div
        style={{
          position: "absolute",
          left: "16px",
          top: "17px",
          bottom: "17px",
          width: "1px",
          background: `linear-gradient(180deg,
            rgba(197,255,0,0.2) 0%,
            rgba(197,255,0,0.75) 40%,
            rgba(197,255,0,0.75) 60%,
            rgba(197,255,0,0.2) 100%
          )`,
          boxShadow: "0 0 8px rgba(197,255,0,0.3)",
        }}
      />

      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            marginBottom: i < steps.length - 1 ? "20px" : 0,
          }}
        >
          {/* Node */}
          <div
            style={{
              position: "absolute",
              left: "-52px",
              top: "18px",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1px solid rgba(197,255,0,0.32)",
              background: "rgba(197,255,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: LIME,
                boxShadow: "0 0 12px rgba(197,255,0,0.9)",
              }}
            />
          </div>

          <StepCard step={step} isTop={false} index={i} />
        </div>
      ))}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export function ProcessSection() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="process"
      className="figma-section"
      style={{
        padding: "72px 72px",
        maxWidth: "1440px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box" as const,
        position: "relative",
      }}
    >
      {/* Ambient top glow */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(197,255,0,0.05) 0%, transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section Header ─────────────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 56px auto",
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
                How We Work
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: "clamp(30px, 3.4vw, 50px)",
              fontFamily: F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "0 0 20px 0",
            }}
          >
            From First Call to Full Support —{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              A Clear, Five-Step Process
            </span>
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
              margin: 0,
            }}
          >
            Every product — POS, TMS, SMS, Restaurant, or Recurring Billing —
            goes through the same reliable process, whether you choose Basic or
            Pro.
          </motion.p>
        </div>

        {/* ── Timeline ───────────────────────────────────────────── */}
        {isDesktop ? <HorizontalTimeline /> : <VerticalTimeline />}

        {/* ── Divider ────────────────────────────────────────────── */}
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

        {/* ── CTAs ───────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.34)} className="cta-row">
          <SiteButton href="tel:+923706277633" variant="primary">
          Free Consultation
            <ArrowRight size={15} strokeWidth={2.5} />
          </SiteButton>
          <SiteButton href="#products" variant="secondary">
            See Pricing Plans
          </SiteButton>
        </motion.div>

        {/* ── Step indicators strip ───────────────────────────────── */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            marginTop: "48px",
            flexWrap: "wrap",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "0 16px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: LIME,
                    opacity: 0.7,
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${LIME}`,
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: F,
                    color: "rgba(255,255,255,0.35)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.num} {step.title}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "16px",
                    background: "rgba(255,255,255,0.1)",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
