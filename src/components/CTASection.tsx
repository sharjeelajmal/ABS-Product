"use client";

import { useState, type FC } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Globe, Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "'Jameel Noori Nastaleeq', 'Jameel Noori Nastaleeq Regular', 'jameel-noori-nastaleeq-regular', serif";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const CSS = `
  @keyframes cta-float-a {
    0%, 100% { transform: translateY(0px); }
    50%  { transform: translateY(-12px); }
  }
  @keyframes cta-float-b {
    0%, 100% { transform: translateY(0px); }
    50%  { transform: translateY(-8px); }
  }
  @keyframes cta-particle {
    0%   { transform: translateY(0) scale(1); opacity: 0.8; }
    100% { transform: translateY(-90px) scale(0); opacity: 0; }
  }
  @keyframes cta-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes cta-spin-rev {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes cta-glow-breathe {
    0%, 100% {
      box-shadow:
        0 0 80px rgba(197,255,0,0.1),
        0 0 160px rgba(197,255,0,0.04),
        0 40px 120px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(255,255,255,0.05);
    }
    50% {
      box-shadow:
        0 0 120px rgba(197,255,0,0.18),
        0 0 200px rgba(197,255,0,0.07),
        0 40px 120px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(255,255,255,0.07);
    }
  }
  @keyframes cta-text-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes cta-dot-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%  { opacity: 1; transform: scale(1.4); }
  }
  @media (max-width: 640px) {
    .cta-mobile-col {
      flex-direction: column !important;
      gap: 16px !important;
    }
  }
`;

// ─── Copy button utility ──────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        background: copied ? "rgba(197,255,0,0.12)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${copied ? "rgba(197,255,0,0.28)" : "rgba(255,255,255,0.08)"}`,
        cursor: "pointer",
        transition: "background 0.2s ease, border-color 0.2s ease",
        flexShrink: 0,
      }}
    >
      {copied ? (
        <Check size={12} color={LIME} strokeWidth={2.5} />
      ) : (
        <Copy size={12} color="rgba(255,255,255,0.4)" strokeWidth={2} />
      )}
    </button>
  );
}

// ─── Contact card ─────────────────────────────────────────────────────────────

function ContactCard({
  Icon,
  label,
  value,
  href,
  delay,
  isUrdu,
}: {
  Icon: FC<{ size: number; color: string; strokeWidth: number }>;
  label: string;
  value: string;
  href: string;
  delay: number;
  isUrdu?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "rgba(10,10,13,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(197,255,0,0.28)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "18px",
        padding: "18px 22px",
        textDecoration: "none",
        boxShadow: hovered
          ? "0 0 40px rgba(197,255,0,0.08), 0 12px 40px rgba(0,0,0,0.5)"
          : "0 6px 28px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition:
          "transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.35s ease",
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "14px",
          background: hovered ? "rgba(197,255,0,0.1)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${hovered ? "rgba(197,255,0,0.25)" : "rgba(255,255,255,0.08)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Icon
          size={18}
          color={hovered ? LIME : "rgba(255,255,255,0.5)"}
          strokeWidth={1.8}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: isUrdu ? "14px" : "11px",
            fontFamily: isUrdu ? UF : F,
            fontWeight: 600,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: isUrdu ? "0.02em" : "0.06em",
            textTransform: isUrdu ? "none" : "uppercase",
            marginBottom: "3px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "13px",
            fontFamily: F,
            fontWeight: 600,
            color: hovered ? "#fff" : "rgba(255,255,255,0.72)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.2s ease",
          }}
          dir="ltr"
        >
          {value}
        </div>
      </div>

      {/* Arrow + copy */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
        <CopyButton text={value} />
        <ArrowUpRight
          size={14}
          color={hovered ? LIME : "rgba(255,255,255,0.2)"}
          strokeWidth={2}
          style={{ transition: "color 0.2s ease" }}
        />
      </div>

      {/* Bottom lime line on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, rgba(197,255,0,${hovered ? 0.45 : 0}), transparent)`,
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.a>
  );
}

// ─── Fade-up helper ───────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

// ─── Section ──────────────────────────────────────────────────────────────────

export function CTASection() {
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

  return (
    <>
      <style>{CSS}</style>
      <section
        id="contact"
        className="figma-section"
        dir={isUrdu ? "rtl" : "ltr"}
        style={{
          padding: "100px 48px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background decorations ──────────────────────────────── */}

        {/* Deep radial glow — very large */}
        <div
          style={{
            position: "absolute",
            top: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1100px",
            height: "700px",
            background:
              "radial-gradient(ellipse, rgba(197,255,0,0.1) 0%, rgba(197,255,0,0.03) 40%, transparent 65%)",
            filter: "blur(55px)",
            pointerEvents: "none",
          }}
        />

        {/* Secondary glow — bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(197,255,0,0.055) 0%, transparent 65%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Spinning orbit rings */}
        {[320, 480, 660].map((size, i) => (
          <div
            key={i}
            className="rs-hide-mobile"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              border: `1px solid rgba(197,255,0,${0.06 - i * 0.015})`,
              animation: `${i % 2 === 0 ? "cta-spin" : "cta-spin-rev"} ${28 + i * 8}s linear infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Floating particles */}
        {[
          { x: "8%", delay: "0s", dur: "4.5s" },
          { x: "22%", delay: "1.1s", dur: "5.2s" },
          { x: "50%", delay: "0.4s", dur: "4s" },
          { x: "76%", delay: "1.8s", dur: "5.8s" },
          { x: "91%", delay: "0.9s", dur: "4.3s" },
          { x: "35%", delay: "2.2s", dur: "5s" },
          { x: "64%", delay: "1.5s", dur: "4.7s" },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              bottom: `${12 + (i % 3) * 8}%`,
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: LIME,
              boxShadow: `0 0 8px ${LIME}`,
              animation: `cta-particle ${p.dur} ease-out infinite ${p.delay}`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Floating corner icons */}
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "6%",
            opacity: 0.06,
            animation: "cta-float-a 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          <Mail size={48} color={LIME} strokeWidth={1} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "6%",
            opacity: 0.06,
            animation: "cta-float-b 7s ease-in-out infinite 1s",
            pointerEvents: "none",
          }}
        >
          <Phone size={40} color={LIME} strokeWidth={1} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            left: "8%",
            opacity: 0.04,
            animation: "cta-float-b 8s ease-in-out infinite 0.5s",
            pointerEvents: "none",
          }}
        >
          <Globe size={36} color="#fff" strokeWidth={1} />
        </div>

        {/* ── Main glass container ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* Gradient border frame */}
          <div
            style={{
              position: "relative",
              borderRadius: "32px",
              padding: "1.5px",
              background:
                "linear-gradient(145deg, rgba(197,255,0,0.38) 0%, rgba(255,255,255,0.06) 30%, rgba(197,255,0,0.08) 60%, rgba(197,255,0,0.28) 100%)",
              animation: "cta-glow-breathe 3.5s ease-in-out infinite",
            }}
          >
            {/* Inner glass panel */}
            <div
              className="rs-cta-shell"
              style={{
                background:
                  "linear-gradient(160deg, rgba(12,12,16,0.97) 0%, rgba(9,9,12,0.99) 100%)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                borderRadius: "31px",
                padding: "68px 72px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Inner top-left lime glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "-20px",
                  width: "300px",
                  height: "300px",
                  background:
                    "radial-gradient(circle, rgba(197,255,0,0.1) 0%, transparent 65%)",
                  filter: "blur(24px)",
                  pointerEvents: "none",
                }}
              />
              {/* Inner bottom-right subtle glow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-20px",
                  width: "250px",
                  height: "250px",
                  background:
                    "radial-gradient(circle, rgba(197,255,0,0.06) 0%, transparent 65%)",
                  filter: "blur(24px)",
                  pointerEvents: "none",
                }}
              />
              {/* Glass top sheen */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "45%",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.028) 0%, transparent 100%)",
                  borderRadius: "31px 31px 0 0",
                  pointerEvents: "none",
                }}
              />

              {/* Inner grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  pointerEvents: "none",
                  maskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
                }}
              />

              {/* ── Content ──────────────────────────────────────────── */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center",
                }}
              >
                {/* Eyebrow */}
                <motion.div {...fadeUp(0)} style={{ display: "inline-block", marginBottom: "28px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(197,255,0,0.07)",
                      border: "1px solid rgba(197,255,0,0.22)",
                      borderRadius: "100px",
                      padding: "6px 16px",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: LIME,
                        boxShadow: `0 0 9px ${LIME}`,
                        animation: "cta-dot-pulse 2s ease-in-out infinite",
                      }}
                    />
                    <span
                      style={{
                        fontSize: isUrdu ? "14px" : "12px",
                        fontFamily: isUrdu ? UF : F,
                        fontWeight: 600,
                        color: LIME,
                        letterSpacing: "0.04em",
                        textTransform: isUrdu ? "none" : "uppercase",
                      }}
                    >
                      {isUrdu ? "رابطہ کریں" : "Get in Touch"}
                    </span>
                  </div>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  {...fadeUp(0.08)}
                  style={{
                    fontSize: isUrdu ? "clamp(32px, 3.8vw, 52px)" : "clamp(26px, 3.2vw, 46px)",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 800,
                    color: "#FFFFFF",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                    margin: "0 0 20px 0",
                    maxWidth: "720px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {isUrdu ? "آئیے آپ کے " : "Tell Us What You're Building — "}
                  <span
                    style={{
                      background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {isUrdu ? "کاروبار پر بات کریں" : "We'll Reply Within One Business Day."}
                  </span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                  {...fadeUp(0.14)}
                  style={{
                    fontSize: isUrdu ? "18px" : "16px",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.46)",
                    lineHeight: 1.78,
                    margin: "0 0 44px 0",
                    maxWidth: "540px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {isUrdu ? "چاہے آپ کو ڈیمو چاہیے ہو یا قیمتیں معلوم کرنی ہوں، ہماری ٹیم پاکستان کے مقامی وقت کے مطابق دستیاب ہے۔" : "Whether it's POS, TMS, SMS, Restaurant, or Recurring Billing — our team is ready to help you get started."}
                </motion.p>

                {/* CTA buttons */}
                <motion.div {...fadeUp(0.2)} className="cta-row cta-mobile-col" style={{ marginBottom: "48px", display: "flex", gap: "16px", justifyContent: "center" }}>
                  <SiteButton href="mailto:info@aurabusinesssolution.com" variant="primary">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Mail size={15} strokeWidth={2.5} />
                      <span style={{ fontFamily: F }} dir="ltr">info@aurabusinesssolution.com</span>
                    </div>
                  </SiteButton>
                  <SiteButton href="tel:+923706277633" variant="secondary">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Phone size={15} strokeWidth={2} />
                      <span style={{ fontFamily: F }} dir="ltr">+92 370 6277633</span>
                    </div>
                  </SiteButton>
                </motion.div>

                {/* Divider */}
                <motion.div
                  {...fadeUp(0.26)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "32px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 100%)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: isUrdu ? "14px" : "11px",
                      fontFamily: isUrdu ? UF : F,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: isUrdu ? "0.02em" : "0.06em",
                      textTransform: isUrdu ? "none" : "uppercase",
                      flexShrink: 0,
                    }}
                  >
                    {isUrdu ? "یا ہم سے رابطہ کریں" : "or find us at"}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
                    }}
                  />
                </motion.div>

                {/* Contact cards row */}
                <motion.div
                  {...fadeUp(0.32)}
                  className="rs-contact-row"
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <ContactCard
                    Icon={Phone}
                    label={isUrdu ? "فون" : "Phone"}
                    value="+92 370 6277633"
                    href="tel:+923706277633"
                    delay={0.34}
                    isUrdu={isUrdu ?? false}
                  />
                  <ContactCard
                    Icon={Globe}
                    label={isUrdu ? "ویب سائٹ" : "Website"}
                    value="pk.aurabusinesssolution.com"
                    href="https://pk.aurabusinesssolution.com/"
                    delay={0.4}
                    isUrdu={isUrdu ?? false}
                  />
                  <ContactCard
                    Icon={Mail}
                    label={isUrdu ? "ای میل" : "Email"}
                    value="info@aurabusinesssolution.com"
                    href="mailto:info@aurabusinesssolution.com"
                    delay={0.46}
                    isUrdu={isUrdu ?? false}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Footer strip ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            margin: "40px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: LIME,
                boxShadow: `0 0 10px ${LIME}`,
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontFamily: F,
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "-0.01em",
              }}
            >
              Aura Business Solutions
            </span>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            {["POS", "TMS", "SMS", "Restaurant", "Billing"].map((p) => (
              <span
                key={p}
                style={{
                  fontSize: "12px",
                  fontFamily: F,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                {p}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: "12px",
              fontFamily: F,
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © {new Date().getFullYear()} Aura Business Solutions
          </span>
        </motion.div>
      </section>
    </>
  );
}
