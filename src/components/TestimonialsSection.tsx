"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "'Jameel Noori Nastaleeq', 'Jameel Noori Nastaleeq Regular', 'jameel-noori-nastaleeq-regular', serif";

// ─── Injected keyframes ───────────────────────────────────────────────────────

const CSS = `
  @keyframes ts-float-a {
    0%, 100% { transform: translateY(0px); }
    50%  { transform: translateY(-10px); }
  }
  @keyframes ts-float-b {
    0%, 100% { transform: translateY(0px); }
    50%  { transform: translateY(-7px); }
  }
  @keyframes ts-glow-pulse {
    0%, 100% { opacity: 0.35; }
    50%  { opacity: 0.75; }
  }
  @keyframes ts-particle {
    0%   { transform: translateY(0) scale(1); opacity: 0.7; }
    100% { transform: translateY(-70px) scale(0); opacity: 0; }
  }
  @keyframes ts-shimmer {
    0%   { left: -120%; }
    100% { left: 180%; }
  }
  @keyframes ts-quote-in {
    0%   { opacity: 0; transform: scale(0.7) rotate(-8deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
`;

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 1.5l1.545 3.13L13 5.145l-2.5 2.435.59 3.44L8 9.385l-3.09 1.635.59-3.44L3 5.145l3.455-.515L8 1.5z"
            fill={LIME}
            fillOpacity="0.9"
            stroke={LIME}
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  );
}

// ─── Quote mark ───────────────────────────────────────────────────────────────

function QuoteMark({ size = 48, hovered = false }: { size?: number; hovered?: boolean }) {
  return (
    <div
      style={{
        fontSize: `${size}px`,
        fontFamily: "Georgia, serif",
        fontWeight: 900,
        lineHeight: 1,
        color: LIME,
        textShadow: hovered
          ? `0 0 30px rgba(197,255,0,0.8), 0 0 60px rgba(197,255,0,0.35)`
          : `0 0 18px rgba(197,255,0,0.5), 0 0 40px rgba(197,255,0,0.18)`,
        transition: "text-shadow 0.4s ease",
        animation: "ts-quote-in 0.5s ease-out both",
        userSelect: "none",
      }}
    >
      "
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  src,
  name,
  size = 56,
  hovered = false,
}: {
  src: string;
  name: string;
  size?: number;
  hovered?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          inset: "-3px",
          borderRadius: "50%",
          background: `conic-gradient(${LIME} 0deg, rgba(197,255,0,0.1) 180deg, ${LIME} 360deg)`,
          opacity: hovered ? 0.9 : 0.4,
          transition: "opacity 0.3s ease",
          animation: "ts-glow-pulse 2.5s ease-in-out infinite",
        }}
      />
      <img
        src={src}
        alt={name}
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "top center",
          border: "2px solid rgba(10,10,12,0.95)",
          display: "block",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      />
    </div>
  );
}

// ─── Verified badge ───────────────────────────────────────────────────────────

function VerifiedBadge({ isUrdu }: { isUrdu?: boolean }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "rgba(197,255,0,0.08)",
        border: "1px solid rgba(197,255,0,0.2)",
        borderRadius: "100px",
        padding: "3px 9px",
      }}
    >
      <BadgeCheck size={10} color={LIME} strokeWidth={2.5} />
      <span
        style={{
          fontSize: isUrdu ? "11px" : "10px",
          fontFamily: isUrdu ? UF : F,
          fontWeight: 600,
          color: "rgba(197,255,0,0.85)",
          letterSpacing: isUrdu ? "0.01em" : "0.03em",
        }}
      >
        {isUrdu ? "تصدیق شدہ کلائنٹ" : "Verified Client"}
      </span>
    </div>
  );
}

// ─── Testimonial data ─────────────────────────────────────────────────────────

interface Testimonial {
  quote: string;
  quoteUr: string;
  name: string;
  nameUr: string;
  role: string;
  roleUr: string;
  company: string;
  avatar: string;
}

const FEATURED: Testimonial = {
  quote:
    "Yar inka Garments POS system sach mein bohot zabardast hai. Pehle manual inventory mein bohot masle hotay thay, ab sab kuch ek click pe hai. Billing itni fast ho gayi hai ke rush hours mein bhi koi tension nahi hoti. Highly recommended!",
  quoteUr: "یار ان کا گارمنٹس پی او ایس سسٹم سچ میں بہت زبردست ہے۔ پہلے مینوئل انوینٹری میں بہت مسئلے ہوتے تھے، اب سب کچھ ایک کلک پر ہے۔ بلنگ اتنی تیز ہو گئی ہے کہ رش کے اوقات میں بھی کوئی ٹینشن نہیں ہوتی۔ بہت زیادہ تجویز کردہ!",
  name: "Rashid Ali",
  nameUr: "راشد علی",
  role: "Owner",
  roleUr: "مالک",
  company: "Mr Denum",
  avatar: "/avatar_rashid.png",
};

const SECONDARIES: Testimonial[] = [
  {
    quote:
      "Transport business mein tracking sab se bara headache hota hai, lekin inka TMS lagwane ke baad life kafi aasan ho gayi hai. Ab mujhe live pata hota hai ke meri gaariyan kahan hain. Paisa wasool system hai.",
    quoteUr: "ٹرانسپورٹ کے کاروبار میں ٹریکنگ سب سے بڑا دردِ سر ہوتا ہے، لیکن ان کا ٹی ایم ایس لگوانے کے بعد زندگی کافی آسان ہو گئی ہے۔ اب مجھے لائیو پتہ ہوتا ہے کہ میری گاڑیاں کہاں ہیں۔ پیسہ وصول سسٹم ہے۔",
    name: "Abbas Shah",
    nameUr: "عباس شاہ",
    role: "Owner",
    roleUr: "مالک",
    company: "Tiger Transport",
    avatar: "/avatar_abbas.png",
  },
  {
    quote:
      "Maine bohot se software try kiye hain lekin inke Mart POS ki baat hi alag hai. Speed itni achi hai ke lambi lines minton mein clear ho jati hain, aur sham ko closing mein bhi koi khuwari nahi hoti.",
    quoteUr: "میں نے بہت سے سافٹ ویئر ٹرائی کیے ہیں لیکن ان کے مارٹ پی او ایس کی بات ہی الگ ہے۔ اسپیڈ اتنی اچھی ہے کہ لمبی لائنیں منٹوں میں کلیئر ہو جاتی ہیں، اور شام کو کلوزنگ میں بھی کوئی خواری نہیں ہوتی۔",
    name: "Muhammad Ali",
    nameUr: "محمد علی",
    role: "Owner",
    roleUr: "مالک",
    company: "Home Mart",
    avatar: "/avatar_muhammad.png",
  },
  {
    quote:
      "Pehle har bachay ki fees aur record maintain karna azaab lagta tha. Inka SMS use karna shuru kiya hai aur ab literally saray kaam automated hain. Staff ka bohot sara time bach jata hai.",
    quoteUr: "پہلے ہر بچے کی فیس اور ریکارڈ مینٹین کرنا عذاب لگتا تھا۔ ان کا ایس ایم ایس استعمال کرنا شروع کیا ہے اور اب سچ میں سارے کام آٹومیٹڈ ہیں۔ اسٹاف کا بہت سارا وقت بچ جاتا ہے۔",
    name: "Muhmmad Ahsan",
    nameUr: "محمد احسن",
    role: "Owner",
    roleUr: "مالک",
    company: "School Network",
    avatar: "/avatar_ahsan.png",
  },
];

// ─── Trust metrics data ───────────────────────────────────────────────────────

const METRICS = [
  { icon: "⭐", value: "100+", label: "Businesses Served" },
  { icon: "🚀", value: "50+", label: "Successful Deployments" },
  { icon: "💬", value: "98%", label: "Client Satisfaction" },
  { icon: "🤝", value: "Long-Term", label: "Support Included" },
];

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ t, isUrdu }: { t: Testimonial; isUrdu?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rs-featured-card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "rgba(10,10,13,0.9)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: `1px solid ${hovered ? "rgba(197,255,0,0.3)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: "28px",
        padding: "52px 56px",
        boxShadow: hovered
          ? "0 0 80px rgba(197,255,0,0.1), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(197,255,0,0.07)"
          : "0 16px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition:
          "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.4s ease",
        overflow: "hidden",
      }}
    >
      {/* Top-right decorative large quote */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "36px",
          fontSize: "180px",
          fontFamily: "Georgia, serif",
          fontWeight: 900,
          color: LIME,
          opacity: hovered ? 0.055 : 0.03,
          lineHeight: 1,
          userSelect: "none",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* Glass shimmer on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "28px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "60%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent)",
              animation: "ts-shimmer 1.2s ease-out both",
            }}
          />
        </div>
      )}

      {/* Top: stars + quote mark */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "28px",
        }}
      >
        <Stars size={16} />
        <QuoteMark size={52} hovered={hovered} />
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: isUrdu ? "clamp(19px, 1.9vw, 24px)" : "clamp(17px, 1.7vw, 22px)",
          fontFamily: isUrdu ? UF : F,
          fontWeight: 400,
          color: hovered ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.78)",
          lineHeight: 1.72,
          margin: "0 0 40px 0",
          letterSpacing: "-0.01em",
          fontStyle: "italic",
          transition: "color 0.2s ease",
          maxWidth: "760px",
        }}
      >
        {isUrdu ? t.quoteUr : t.quote}
      </p>

      {/* Bottom: avatar + info + badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <Avatar src={t.avatar} name={t.name} size={68} hovered={hovered} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "4px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: isUrdu ? "18px" : "16px",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              {isUrdu ? t.nameUr : t.name}
            </span>
            <VerifiedBadge isUrdu={isUrdu} />
          </div>
          <div
            style={{
              fontSize: isUrdu ? "16px" : "14px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.42)",
            }}
          >
            {isUrdu ? t.roleUr : t.role}
            <span style={{ margin: "0 7px", opacity: 0.4 }}>·</span>
            <span style={{ fontFamily: isUrdu ? F : undefined }}>{t.company}</span>
          </div>
        </div>

        {/* Product tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(197,255,0,0.07)",
            border: "1px solid rgba(197,255,0,0.15)",
            borderRadius: "100px",
            padding: "8px 16px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: LIME,
              boxShadow: `0 0 8px ${LIME}`,
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontFamily: F,
              fontWeight: 600,
              color: LIME,
              letterSpacing: "0.03em",
            }}
          >
            POS System
          </span>
        </div>
      </div>

      {/* Bottom edge lime line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, rgba(197,255,0,${hovered ? 0.4 : 0.15}) 50%, transparent 100%)`,
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.div>
  );
}

// ─── Secondary card ───────────────────────────────────────────────────────────

function SecondaryCard({
  t,
  delay,
  product,
  isUrdu,
}: {
  t: Testimonial;
  delay: number;
  product: string;
  isUrdu?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rs-compact-pad"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "rgba(10,10,13,0.9)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? "rgba(197,255,0,0.25)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "24px",
        padding: "36px 36px",
        boxShadow: hovered
          ? "0 0 55px rgba(197,255,0,0.08), 0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(197,255,0,0.06)"
          : "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
        transition:
          "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.4s ease",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Decorative corner quote */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "24px",
          fontSize: "110px",
          fontFamily: "Georgia, serif",
          fontWeight: 900,
          color: LIME,
          opacity: hovered ? 0.05 : 0.025,
          lineHeight: 1,
          userSelect: "none",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* Stars + quote icon row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "22px",
        }}
      >
        <Stars size={13} />
        <QuoteMark size={38} hovered={hovered} />
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: isUrdu ? "18px" : "16px",
          fontFamily: isUrdu ? UF : F,
          fontWeight: 400,
          color: hovered ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.7)",
          lineHeight: 1.75,
          margin: "0 0 32px 0",
          fontStyle: "italic",
          letterSpacing: "-0.005em",
          flex: 1,
          transition: "color 0.2s ease",
        }}
      >
        {isUrdu ? t.quoteUr : t.quote}
      </p>

      {/* Bottom */}
      <div>
        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            marginBottom: "20px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
          <Avatar src={t.avatar} name={t.name} size={52} hovered={hovered} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "3px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: isUrdu ? "16px" : "14px",
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {isUrdu ? t.nameUr : t.name}
              </span>
              <VerifiedBadge isUrdu={isUrdu} />
            </div>
            <div
              style={{
                fontSize: isUrdu ? "14px" : "12px",
                fontFamily: isUrdu ? UF : F,
                color: "rgba(255,255,255,0.38)",
              }}
            >
              {isUrdu ? t.roleUr : t.role}
              <span style={{ margin: "0 6px", opacity: 0.4 }}>·</span>
              <span style={{ fontFamily: isUrdu ? F : undefined }}>{t.company}</span>
            </div>
          </div>
        </div>
        {/* Product badge */}
        <div style={{ marginTop: "16px" }}>
          <span
            style={{
              fontSize: "10px",
              fontFamily: F,
              fontWeight: 500,
              color: "rgba(197,255,0,0.65)",
              background: "rgba(197,255,0,0.06)",
              border: "1px solid rgba(197,255,0,0.14)",
              padding: "4px 10px",
              borderRadius: "20px",
              letterSpacing: "0.02em",
            }}
          >
            {product}
          </span>
        </div>
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

export function TestimonialsSection() {
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

  const displayMetrics = isUrdu ? [
    { icon: "⭐", value: "100+", label: "کاروباروں کو سروس دی" },
    { icon: "🚀", value: "50+", label: "کامیاب تنصیبات" },
    { icon: "💬", value: "98%", label: "کلائنٹ کا اطمینان" },
    { icon: "🤝", value: "طویل المدت", label: "سپورٹ شامل ہے" },
  ] : METRICS;

  return (
    <>
      <style>{CSS}</style>
      <section
        id="testimonials"
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
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "600px",
            background:
              "radial-gradient(ellipse, rgba(197,255,0,0.052) 0%, transparent 62%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "-2%",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.035)",
            pointerEvents: "none",
            animation: "ts-float-b 7s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "-3%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "1px solid rgba(197,255,0,0.06)",
            pointerEvents: "none",
            animation: "ts-float-a 9s ease-in-out infinite 1s",
          }}
        />

        {/* Decorative huge background quote marks */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "2%",
            fontSize: "340px",
            fontFamily: "Georgia, serif",
            fontWeight: 900,
            color: LIME,
            opacity: 0.018,
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          "
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            right: "3%",
            fontSize: "240px",
            fontFamily: "Georgia, serif",
            fontWeight: 900,
            color: LIME,
            opacity: 0.013,
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            transform: "rotate(180deg)",
          }}
        >
          "
        </div>

        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            pointerEvents: "none",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Particles */}
        {[
          { x: "15%", delay: "0s", dur: "4s" },
          { x: "42%", delay: "1.2s", dur: "5s" },
          { x: "68%", delay: "0.5s", dur: "4.5s" },
          { x: "88%", delay: "2s", dur: "3.8s" },
          { x: "28%", delay: "1.8s", dur: "5.5s" },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              bottom: "15%",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: LIME,
              boxShadow: `0 0 6px ${LIME}`,
              animation: `ts-particle ${p.dur} ease-out infinite ${p.delay}`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Section Header ──────────────────────────────────────── */}
          <div
            style={{
              textAlign: "center",
              maxWidth: "640px",
              margin: "0 auto 64px auto",
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
                    fontSize: isUrdu ? "15px" : "13px",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 500,
                    color: LIME,
                    letterSpacing: "0.02em",
                  }}
                >
                  {isUrdu ? "کلائنٹ فیڈ بیک" : "Client Feedback"}
                </span>
              </div>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              style={{
                fontSize: isUrdu ? "clamp(34px, 3.8vw, 54px)" : "clamp(28px, 3.2vw, 48px)",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 18px 0",
              }}
            >
              {isUrdu ? "مقامی کاروباروں کا " : "What Clients Say After "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {isUrdu ? "ہم پر اعتماد" : "Working With Us"}
              </span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.15)}
              style={{
                fontSize: isUrdu ? "18px" : "16px",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 400,
                color: "rgba(255,255,255,0.47)",
                lineHeight: 1.78,
                margin: 0,
              }}
            >
              {isUrdu ? "دیکھیں کہ کیسے ہمارے سسٹمز پورے پاکستان میں کمپنیوں کو ان کے کاموں کو ہموار کرنے اور تیزی سے ترقی کرنے میں مدد کر رہے ہیں۔" : "Real feedback from businesses using our POS, TMS, SMS, Restaurant, and Recurring Billing systems."}
            </motion.p>
          </div>

          {/* ── Trust metrics row ───────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.2)}
            className="rs-cols-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
              marginBottom: "32px",
            }}
          >
            {displayMetrics.map((m, i) => (
              <motion.div
                key={i}
                className="rs-metrics-cell"
                whileHover={{ background: "rgba(14,14,17,0.98)" }}
                style={{
                  background: "rgba(10,10,13,0.95)",
                  padding: "26px 28px",
                  textAlign: "center",
                  cursor: "default",
                  transition: "background 0.2s ease",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    marginBottom: "8px",
                    lineHeight: 1,
                  }}
                >
                  {m.icon}
                </div>
                <div
                  style={{
                    fontSize: isUrdu && i === 3 ? "clamp(15px, 1.3vw, 20px)" : "clamp(17px, 1.5vw, 22px)",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 800,
                    color: i === 2 ? LIME : "#FFFFFF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "5px",
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: isUrdu ? "14px" : "12px",
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.36)",
                  }}
                >
                  {m.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Featured testimonial ────────────────────────────────── */}
          <div style={{ marginBottom: "20px" }}>
            <FeaturedCard t={FEATURED} isUrdu={isUrdu ?? false} />
          </div>

          {/* ── Secondary testimonials ──────────────────────────────── */}
          <div
            className="rs-cols-3 rs-section-gap"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "72px",
            }}
          >
            <SecondaryCard t={SECONDARIES[0]} delay={0.28} product={isUrdu ? "ٹی ایم ایس سسٹم" : "TMS System"} isUrdu={isUrdu ?? false} />
            <SecondaryCard t={SECONDARIES[1]} delay={0.36} product={isUrdu ? "مارٹ پی او ایس" : "Mart POS"} isUrdu={isUrdu ?? false} />
            <SecondaryCard t={SECONDARIES[2]} delay={0.44} product={isUrdu ? "ایس ایم ایس سسٹم" : "SMS System"} isUrdu={isUrdu ?? false} />
          </div>

          {/* ── Divider ─────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.4)}
            style={{
              width: "100%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(197,255,0,0.14) 50%, rgba(255,255,255,0.07) 80%, transparent 100%)",
              marginBottom: "56px",
            }}
          />

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.44)}
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: isUrdu ? "16px" : "14px",
                fontFamily: isUrdu ? UF : F,
                color: "rgba(255,255,255,0.35)",
                marginBottom: "24px",
                letterSpacing: "0.01em",
              }}
            >
              {isUrdu ? "100 سے زیادہ کاروباروں میں شامل ہوں جو پہلے ہی ہمارے سسٹمز پر چل رہے ہیں" : "Join 100+ businesses already running on Aura"}
            </div>
            <SiteButton href="#testimonials" variant="primary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
              {isUrdu ? "مزید جائزے پڑھیں" : "Read More Reviews"}
              <ArrowRight size={15} strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
            </SiteButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
