"use client";

import { PhoneIcon, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { DashboardIllustration } from "./DashboardIllustration";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "'Jameel Noori Nastaleeq', 'Jameel Noori Nastaleeq Regular', 'jameel-noori-nastaleeq-regular', serif";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const products = [
  { code: "POS", name: "All Business Types", nameUr: "تمام کاروباروں کے لیے" },
  { code: "TMS", name: "Transport Management", nameUr: "ٹرانسپورٹ مینجمنٹ" },
  { code: "SMS", name: "School Management", nameUr: "اسکول مینجمنٹ" },
  { code: "RMS", name: "Restaurant System", nameUr: "ریسٹورنٹ سسٹم" },
  { code: "BMS", name: "Recurring Billing System", nameUr: "ریکرنگ بلنگ سسٹم" },
];

export function HeroSection() {
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

  return (
    <section
      id="hero"
      className="figma-hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "56px 72px",
        maxWidth: "1440px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="figma-hero-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          width: "100%",
        }}
      >
        {/* ── Left Column ──────────────────────────────────────────── */}
        <div className="figma-hero-copy" style={{ flex: "0 0 52%", paddingRight: "64px" }}>
          {/* Eyebrow badge */}
          <motion.div {...fadeUp(0)} style={{ display: "inline-flex" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                background: "rgba(197,255,0,0.07)",
                border: "1px solid rgba(197,255,0,0.22)",
                borderRadius: "100px",
                padding: "7px 18px",
                marginBottom: "34px",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: LIME,
                  boxShadow: `0 0 10px ${LIME}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: isUrdu ? "16px" : "13px",
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: 500,
                  color: LIME,
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {isUrdu ? "ہر قسم کے کاروبار کے لیے سافٹ ویئر" : "Software for Every Kind of Business"}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontSize: isUrdu ? "clamp(42px, 5vw, 68px)" : "clamp(38px, 4.2vw, 60px)",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              marginBottom: "22px",
              margin: "0 0 22px 0",
            }}
          >
            {isUrdu ? "ایک ٹیم۔ " : "One Team. "}
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isUrdu ? "(پانچ اسمارٹ" : "(Five Smart"}
            </span>{" "}
            <br />
            {isUrdu ? "سافٹ ویئر حل۔)" : "Software Solutions)."}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.18)}
            style={{
              fontSize: isUrdu ? "18px" : "16px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.78,
              marginBottom: "36px",
              maxWidth: "460px",
              margin: "0 0 36px 0",
            }}
          >
            {isUrdu ? "ریٹیل کاؤنٹرز سے لے کر ریسٹورنٹس، ٹرانسپورٹ، اسکولز اور سبسکرپشنز تک — ہم وہ سافٹ ویئر بناتے ہیں جو آپ کے کاروبار کو روزانہ چلاتا ہے۔" : "From retail counters to restaurants, transport, schools, and subscriptions — we build the software that runs your operations, every single day."}
          </motion.p>

          {/* Product chips */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
            }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "30px",
            }}
          >
            {products.map((p) => (
              <motion.div
                key={p.code}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.94 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, borderColor: "rgba(197,255,0,0.35)" }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "100px",
                  padding: "7px 15px",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: LIME,
                    opacity: 0.85,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: isUrdu ? "14px" : "12px",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.65)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600, fontFamily: F }}>
                    {p.code}
                  </span>
                  {" — "}
                  {isUrdu ? p.nameUr : p.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tier card */}
          <motion.div
            {...fadeUp(0.34)}
            style={{
              position: "relative",
              background: "rgba(197,255,0,0.045)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(197,255,0,0.22)",
              borderRadius: "20px",
              padding: "20px 22px",
              marginBottom: "34px",
              overflow: "hidden",
            }}
          >
            {/* Glow inside card */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "130px",
                height: "130px",
                background:
                  "radial-gradient(circle, rgba(197,255,0,0.18) 0%, transparent 70%)",
                filter: "blur(16px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              {/* Icon box */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(197,255,0,0.14)",
                  border: "1px solid rgba(197,255,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={16} color={LIME} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: isUrdu ? "14px" : "11px",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 700,
                    color: LIME,
                    letterSpacing: isUrdu ? "0" : "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {isUrdu ? "لچکدار پلانز" : "Flexible Tiers"}
                </div>
                <p
                  style={{
                    fontSize: isUrdu ? "16px" : "14px",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {isUrdu ? (
                    <>
                      ہر پراڈکٹ دو ورژنز میں دستیاب ہے: شروعات کے لیے <span style={{ color: "#FFFFFF", fontWeight: 500, fontFamily: F }}>Basic</span>، اور مکمل آپریشنز کے لیے <span style={{ color: LIME, fontWeight: 600, fontFamily: F }}>Pro</span>۔
                    </>
                  ) : (
                    <>
                      Every product comes in two versions:{" "}
                      <span style={{ color: "#FFFFFF", fontWeight: 500 }}>Basic</span>{" "}
                      for getting started, and{" "}
                      <span style={{ color: LIME, fontWeight: 600 }}>Pro</span> for
                      full-scale operations.
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            {...fadeUp(0.42)}
            className="cta-row cta-row-left"
          >
            <SiteButton href="#products" variant="primary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
              {isUrdu ? "ہمارے سافٹ ویئر دیکھیں" : "Explore Our Software"}
              <ArrowRight size={15} strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
            </SiteButton>
            <SiteButton href="tel:+923706277633" variant="secondary" style={{ fontFamily: F, direction: isUrdu ? "ltr" : undefined }}>
              <PhoneIcon size={14} strokeWidth={2} />
              <span>+92 370 6277633</span>
            </SiteButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            {...fadeUp(0.5)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            {[
              { v: "500+", l: "Businesses Served", lUr: "کاروبار جن کو ہم نے خدمات فراہم کیں" },
              { v: "5", l: "Integrated Products", lUr: "مربوط پراڈکٹس" },
              { v: "99.9%", l: "Uptime SLA", lUr: "اپ ٹائم (SLA)" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: "1px",
                      height: "28px",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  />
                )}
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontFamily: F,
                      fontWeight: 700,
                      color: LIME,
                      lineHeight: 1,
                    }}
                  >
                    {stat.v}
                  </div>
                  <div
                    style={{
                      fontSize: isUrdu ? "13px" : "11px",
                      fontFamily: isUrdu ? UF : F,
                      color: "rgba(255,255,255,0.38)",
                      marginTop: "3px",
                    }}
                  >
                    {isUrdu ? stat.lUr : stat.l}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column ─────────────────────────────────────────── */}
        <motion.div
          className="figma-hero-visual"
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: "0 0 48%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DashboardIllustration />
        </motion.div>
      </div>
    </section>
  );
}
