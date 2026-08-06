"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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
const UF = "var(--font-noto-nastaliq), 'Noto Nastaliq Urdu', serif";
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
  titleUr: string;
  description: string;
  descriptionUr: string;
  accent?: boolean;
}

const services: Service[] = [
  {
    icons: [<Settings2 size={18} strokeWidth={1.6} />, <Monitor size={18} strokeWidth={1.6} />],
    title: "Setup & Installation",
    titleUr: "سیٹ اپ اور انسٹالیشن",
    description: "Complete hardware and software setup for your chosen system — POS, TMS, SMS, Restaurant, or Recurring Billing — configured to match your business.",
    descriptionUr: "آپ کے منتخب کردہ سسٹم — POS، TMS، SMS، ریسٹورنٹ، یا ریکرنگ بلنگ — کے لیے مکمل ہارڈویئر اور سافٹ ویئر سیٹ اپ، آپ کے کاروبار کے مطابق تیار۔",
  },
  {
    icons: [<Users size={18} strokeWidth={1.6} />, <GraduationCap size={18} strokeWidth={1.6} />],
    title: "Staff Training",
    titleUr: "اسٹاف ٹریننگ",
    description: "Hands-on training for your team so staff are confident using the system from day one, on both Basic and Pro plans.",
    descriptionUr: "آپ کی ٹیم کے لیے عملی تربیت تاکہ اسٹاف پہلے دن سے ہی سسٹم استعمال کرنے میں مکمل اعتماد رکھے — Basic اور Pro دونوں پلانز پر۔",
  },
  {
    icons: [<Code2 size={18} strokeWidth={1.6} />],
    title: "Custom Development",
    titleUr: "کسٹم ڈویلپمنٹ",
    description: "Need a feature specific to your business? We customize any of our products to match exactly how you work.",
    descriptionUr: "آپ کے کاروبار کے لیے کوئی خاص فیچر چاہیے؟ ہم اپنے کسی بھی پراڈکٹ کو آپ کے کام کے عین مطابق کسٹمائز کرتے ہیں۔",
    accent: true,
  },
  {
    icons: [<CloudUpload size={18} strokeWidth={1.6} />, <ShieldCheck size={18} strokeWidth={1.6} />],
    title: "Cloud Backup & Sync",
    titleUr: "کلاؤڈ بیک اپ اور سنک",
    description: "Your data — sales, records, schedules, or billing — is backed up automatically and synced in real time across locations.",
    descriptionUr: "آپ کا ڈیٹا — سیلز، ریکارڈز، شیڈولز، یا بلنگ — خودکار طریقے سے محفوظ ہوتا ہے اور تمام مقامات پر ریئل ٹائم میں سنک ہوتا ہے۔",
  },
  {
    icons: [<Network size={18} strokeWidth={1.6} />, <LayoutGrid size={18} strokeWidth={1.6} />],
    title: "Multi-Branch / Multi-User Management",
    titleUr: "ملٹی برانچ / ملٹی یوزر مینجمنٹ",
    description: "Run and monitor multiple branches, vehicles, classes, or accounts from a single unified dashboard.",
    descriptionUr: "ایک ہی مربوط ڈیش بورڈ سے متعدد برانچز، گاڑیاں، کلاسز، یا اکاؤنٹس کو چلائیں اور مانیٹر کریں۔",
  },
  {
    icons: [<Headphones size={18} strokeWidth={1.6} />, <ShieldCheck size={18} strokeWidth={1.6} />],
    title: "Ongoing Support & Maintenance",
    titleUr: "مسلسل سپورٹ اور مینٹیننس",
    description: "Local, responsive support for updates, troubleshooting, and upgrades — from Basic to Pro, whenever you need us.",
    descriptionUr: "اپ ڈیٹس، خرابیوں کے حل، اور اپ گریڈز کے لیے مقامی اور فوری سپورٹ — Basic سے Pro تک، جب بھی آپ کو ضرورت ہو۔",
  },
];

function ServiceCard({ service, index, isUrdu }: { service: Service; index: number; isUrdu: boolean }) {
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
            fontFamily: isUrdu ? UF : F,
            fontWeight: 700,
            color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.92)",
            lineHeight: 1.3,
            margin: 0,
            marginBottom: "10px",
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {isUrdu ? service.titleUr : service.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            fontFamily: isUrdu ? UF : F,
            fontWeight: 400,
            color: hovered ? "rgba(255,255,255,0.58)" : DIM,
            lineHeight: 1.72,
            margin: 0,
            transition: "color 0.3s ease",
          }}
        >
          {isUrdu ? service.descriptionUr : service.description}
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
            fontFamily: isUrdu ? UF : F,
            fontWeight: 600,
            color: LIME,
            letterSpacing: "0.03em",
          }}
        >
          {isUrdu ? "مزید جانیں" : "Learn more"}
        </span>
        <ArrowRight size={13} color={LIME} strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

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
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: 500,
                  color: LIME,
                  letterSpacing: "0.02em",
                }}
              >
                {isUrdu ? "ہم کیا پیش کرتے ہیں" : "What We Offer"}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: "clamp(32px, 3.6vw, 52px)",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}
          >
            {isUrdu ? "ایک پلیٹ فارم سروسز کا، " : "One Platform of Services, "}
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isUrdu ? "ہر پراڈکٹ کے پیچھے" : "Behind Every Product"}
            </span>{" "}
            {isUrdu ? "جو ہم بناتے ہیں" : "We Build"}
          </motion.h2>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.16)}
            style={{
              fontSize: "16px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.78,
              margin: "20px 0 0 0",
            }}
          >
            {isUrdu ? "چاہے POS ہو، TMS، SMS، ریسٹورنٹ، یا ریکرنگ بلنگ — ہر پراڈکٹ کے ساتھ وہی مکمل سروس سپورٹ شامل ہے۔" : "Whether it's POS, TMS, SMS, Restaurant, or Recurring Billing — every product comes with the same full-service support."}
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
            <ServiceCard key={i} service={service} index={i} isUrdu={isUrdu ?? false} />
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
          <SiteButton href="#products" variant="primary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
            {isUrdu ? "شروع کریں" : "Get Started"}
            <ArrowRight size={15} strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
          </SiteButton>
          <SiteButton href="#products" variant="secondary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
            {isUrdu ? "Basic اور Pro کا موازنہ کریں" : "Compare Basic & Pro"}
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
            { en: "Available for all 5 products", ur: "تمام 5 پراڈکٹس کے لیے دستیاب" },
            { en: "Basic & Pro plans", ur: "Basic اور Pro پلانز" },
            { en: "Local & remote support", ur: "مقامی اور دور دراز سپورٹ" },
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
                  fontFamily: isUrdu ? UF : F,
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                {isUrdu ? item.ur : item.en}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
