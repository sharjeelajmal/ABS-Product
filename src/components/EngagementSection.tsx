"use client";

import { useState, type FC } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Users,
  Briefcase,
  Clock,
  Wrench,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "var(--font-noto-nastaliq), 'Noto Nastaliq Urdu', serif";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const CSS = `
  @keyframes eng-float-a {
    0%, 100% { transform: translateY(0px); }
    50%  { transform: translateY(-10px); }
  }
  @keyframes eng-float-b {
    0%, 100% { transform: translateY(0px); }
    50%  { transform: translateY(-7px); }
  }
  @keyframes eng-glow-pulse {
    0%, 100% { box-shadow: 0 0 40px rgba(197,255,0,0.18), 0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(197,255,0,0.08); }
    50%  { box-shadow: 0 0 70px rgba(197,255,0,0.3), 0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(197,255,0,0.12); }
  }
  @keyframes eng-border-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes eng-particle {
    0%   { transform: translateY(0) scale(1); opacity: 0.7; }
    100% { transform: translateY(-70px) scale(0); opacity: 0; }
  }
  @keyframes eng-badge-pulse {
    0%, 100% { opacity: 1; }
    50%  { opacity: 0.7; }
  }
`;

// ─── Check item ───────────────────────────────────────────────────────────────

function CheckItem({ text, featured, isUrdu }: { text: string; featured?: boolean; isUrdu?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "11px",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          marginTop: "1px",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: featured ? "rgba(197,255,0,0.14)" : "rgba(255,255,255,0.06)",
          border: `1px solid ${featured ? "rgba(197,255,0,0.3)" : "rgba(255,255,255,0.1)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircle2
          size={11}
          color={featured ? LIME : "rgba(255,255,255,0.45)"}
          strokeWidth={2.5}
        />
      </div>
      <span
        style={{
          fontSize: "14px",
          fontFamily: isUrdu ? UF : F,
          fontWeight: 400,
          color: featured ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.52)",
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Icon cluster ─────────────────────────────────────────────────────────────

function IconCluster({
  primary: Primary,
  secondary: Secondary,
  featured,
}: {
  primary: FC<{ size: number; color: string; strokeWidth: number }>;
  secondary: FC<{ size: number; color: string; strokeWidth: number }>;
  featured?: boolean;
}) {
  return (
    <div style={{ position: "relative", width: "56px", height: "56px" }}>
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          background: featured ? "rgba(197,255,0,0.12)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${featured ? "rgba(197,255,0,0.28)" : "rgba(255,255,255,0.1)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: featured ? `0 0 20px rgba(197,255,0,0.18)` : "none",
        }}
      >
        <Primary
          size={24}
          color={featured ? LIME : "rgba(255,255,255,0.6)"}
          strokeWidth={1.6}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-5px",
          right: "-5px",
          width: "24px",
          height: "24px",
          borderRadius: "8px",
          background: featured ? "rgba(9,9,12,0.95)" : "rgba(9,9,12,0.95)",
          border: `1px solid ${featured ? "rgba(197,255,0,0.2)" : "rgba(255,255,255,0.08)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Secondary
          size={12}
          color={featured ? "rgba(197,255,0,0.7)" : "rgba(255,255,255,0.4)"}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

// ─── Card data ────────────────────────────────────────────────────────────────

const MODELS = [
  {
    id: "fixed",
    name: "Fixed Price",
    bestFor: "A clearly scoped project with a defined end date.",
    desc: "Perfect when you know exactly what you need — we agree on scope, timeline, and price before a single line of code is written.",
    features: [
      "Detailed proposal before start",
      "Milestone-based payments",
      "Fixed delivery timeline",
    ],
    cta: "Request a Quote",
    featured: false,
    PrimaryIcon: ClipboardList,
    SecondaryIcon: CheckCircle2,
  },
  {
    id: "dedicated",
    name: "Dedicated Team",
    bestFor: "Ongoing product work needing consistent capacity.",
    desc: "A team reserved for you monthly — building, iterating, and improving your software as an extension of your business.",
    features: [
      "Developers reserved for you monthly",
      "Direct daily communication",
      "Scale team size up or down",
    ],
    cta: "Talk to Us",
    featured: true,
    badge: "Most Chosen",
    PrimaryIcon: Users,
    SecondaryIcon: Briefcase,
  },
  {
    id: "hourly",
    name: "Hourly Support",
    bestFor: "Maintenance, small fixes, and ongoing improvements.",
    desc: "Pay only for what you use. Ideal for businesses that need reliable support without committing to a full project.",
    features: [
      "Pay only for hours used",
      "Priority bug fixing",
      "Monthly usage reporting",
    ],
    cta: "Get Support",
    featured: false,
    PrimaryIcon: Clock,
    SecondaryIcon: Wrench,
  },
];

// ─── Engagement card ──────────────────────────────────────────────────────────

function EngagementCard({
  model,
  delay,
  isUrdu,
}: {
  model: any;
  delay: number;
  isUrdu?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const { featured } = model;

  return (
    <motion.div
      className="rs-eng-card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        // Featured floats up
        marginTop: featured ? 0 : "24px",
        marginBottom: featured ? 0 : "24px",
      }}
    >
      {/* Gradient border wrapper for featured */}
      {featured && (
        <div
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "25px",
            background: `linear-gradient(145deg, rgba(197,255,0,0.55) 0%, rgba(197,255,0,0.08) 40%, rgba(197,255,0,0.35) 100%)`,
            zIndex: 0,
            animation: "eng-glow-pulse 2.8s ease-in-out infinite",
          }}
        />
      )}

      <div
        className="rs-eng-inner"
        style={{
          position: "relative",
          zIndex: 1,
          background: featured
            ? "rgba(10,10,13,0.97)"
            : "rgba(10,10,13,0.88)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: featured
            ? "none"
            : `1px solid ${hovered ? "rgba(197,255,0,0.2)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "24px",
          padding: featured ? "44px 40px" : "36px 36px",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          boxShadow: featured
            ? "none"
            : hovered
            ? "0 0 50px rgba(197,255,0,0.07), 0 20px 56px rgba(0,0,0,0.55)"
            : "0 8px 36px rgba(0,0,0,0.45)",
          transform: hovered && !featured
            ? "translateY(-6px)"
            : "translateY(0)",
          transition:
            "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.4s ease",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Top glass reflection */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 100%)",
            borderRadius: "24px 24px 0 0",
            pointerEvents: "none",
          }}
        />

        {/* Featured lime glow orb */}
        {featured && (
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "200px",
              height: "200px",
              background:
                "radial-gradient(circle, rgba(197,255,0,0.12) 0%, transparent 70%)",
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* "Most Chosen" badge */}
        {featured && model.badge && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(197,255,0,0.1)",
              border: "1px solid rgba(197,255,0,0.28)",
              borderRadius: "100px",
              padding: "5px 13px",
              marginBottom: "24px",
              alignSelf: "flex-start",
              animation: "eng-badge-pulse 2.5s ease-in-out infinite",
            }}
          >
            <Sparkles size={11} color={LIME} strokeWidth={2} />
            <span
              style={{
                fontSize: "11px",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 700,
                color: LIME,
                letterSpacing: "0.04em",
                textTransform: isUrdu ? "none" : "uppercase",
              }}
            >
              {model.badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <IconCluster
            primary={model.PrimaryIcon as any}
            secondary={model.SecondaryIcon as any}
            featured={featured}
          />
        </div>

        {/* Model name */}
        <h3
          style={{
            fontSize: featured ? (isUrdu ? "28px" : "22px") : (isUrdu ? "24px" : "20px"),
            fontFamily: isUrdu ? UF : F,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.025em",
            margin: "0 0 10px 0",
            lineHeight: 1.2,
          }}
        >
          {model.name}
        </h3>

        {/* Best for label */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 700,
              color: featured ? LIME : "rgba(255,255,255,0.35)",
              letterSpacing: isUrdu ? "0.02em" : "0.05em",
              textTransform: isUrdu ? "none" : "uppercase",
              flexShrink: 0,
              marginTop: "1px",
            }}
          >
            {isUrdu ? "کے لیے بہترین" : "Best for"}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.55,
            }}
          >
            {model.bestFor}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: featured
              ? "linear-gradient(90deg, rgba(197,255,0,0.3) 0%, rgba(197,255,0,0.05) 100%)"
              : "rgba(255,255,255,0.06)",
            marginBottom: "20px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            fontFamily: isUrdu ? UF : F,
            fontWeight: 400,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
            margin: "0 0 24px 0",
          }}
        >
          {model.desc}
        </p>

        {/* Feature list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "11px",
            marginBottom: "32px",
            flex: 1,
          }}
        >
          {model.features.map((f: string, i: number) => (
            <CheckItem key={i} text={f} featured={featured} isUrdu={isUrdu} />
          ))}
        </div>

        {/* CTA button */}
        <SiteButton
          href="#contact"
          variant={featured ? "primary" : "secondary"}
          className="btn-uiverse-block flex-none"
          style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}
        >
          {model.cta}
          <ArrowRight size={14} strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
        </SiteButton>
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

export function EngagementSection() {
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

  const displayModels = isUrdu
    ? [
        {
          id: "fixed",
          name: "فکسڈ پرائس",
          bestFor: "واضح پروجیکٹ جس کی تکمیل کی تاریخ مقرر ہو۔",
          desc: "جب آپ کو بالکل معلوم ہو کہ آپ کو کیا چاہیے — ہم کام شروع کرنے سے پہلے دائرہ کار، وقت اور قیمت پر اتفاق کرتے ہیں۔",
          features: [
            "تفصیلی پروپوزل شروع کرنے سے پہلے",
            "مرحلہ وار ادائیگیاں",
            "مقررہ ڈیلیوری ٹائم لائن",
          ],
          cta: "کوٹیشن طلب کریں",
          featured: false,
          PrimaryIcon: ClipboardList,
          SecondaryIcon: CheckCircle2,
        },
        {
          id: "dedicated",
          name: "مختص ٹیم",
          bestFor: "مسلسل پروڈکٹ کے کام کے لیے جسے مستقل توجہ درکار ہو۔",
          desc: "ایک ٹیم جو ماہانہ بنیاد پر آپ کے لیے مخصوص ہے — جو آپ کے کاروبار کے حصے کے طور پر سافٹ ویئر بناتی اور بہتر کرتی ہے۔",
          features: [
            "ماہانہ بنیاد پر ڈویلپرز کی دستیابی",
            "براہ راست روزانہ رابطہ",
            "ٹیم کا سائز کم یا زیادہ کرنے کی سہولت",
          ],
          cta: "ہم سے بات کریں",
          featured: true,
          badge: "سب سے زیادہ منتخب کردہ",
          PrimaryIcon: Users,
          SecondaryIcon: Briefcase,
        },
        {
          id: "hourly",
          name: "گھنٹہ وار سپورٹ",
          bestFor: "مینٹیننس، چھوٹی تبدیلیاں، اور مسلسل بہتری کے لیے۔",
          desc: "صرف اس وقت کے لیے ادائیگی کریں جتنا آپ استعمال کریں۔ ان کاروباروں کے لیے مثالی جنہیں مکمل پروجیکٹ کے بغیر سپورٹ کی ضرورت ہو۔",
          features: [
            "صرف استعمال شدہ گھنٹوں کی ادائیگی",
            "بگ فکسنگ میں ترجیح",
            "ماہانہ استعمال کی رپورٹ",
          ],
          cta: "سپورٹ حاصل کریں",
          featured: false,
          PrimaryIcon: Clock,
          SecondaryIcon: Wrench,
        },
      ]
    : MODELS;

  return (
    <>
      <style>{CSS}</style>
      <section
        id="engagement"
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
        {/* ── Background decorations ──────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "860px",
            height: "520px",
            background:
              "radial-gradient(ellipse, rgba(197,255,0,0.055) 0%, transparent 58%)",
            filter: "blur(65px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "-4%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.035)",
            pointerEvents: "none",
            animation: "eng-float-b 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            right: "-3%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "1px solid rgba(197,255,0,0.06)",
            pointerEvents: "none",
            animation: "eng-float-a 7s ease-in-out infinite 1s",
          }}
        />

        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            pointerEvents: "none",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 50%, black 0%, transparent 100%)",
          }}
        />

        {/* Particles */}
        {[
          { x: "10%", delay: "0s", dur: "4.5s" },
          { x: "38%", delay: "1.2s", dur: "5s" },
          { x: "62%", delay: "0.6s", dur: "4.2s" },
          { x: "88%", delay: "2s", dur: "5.5s" },
          { x: "24%", delay: "1.8s", dur: "4.8s" },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              bottom: "10%",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: LIME,
              boxShadow: `0 0 6px ${LIME}`,
              animation: `eng-particle ${p.dur} ease-out infinite ${p.delay}`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* ── Section header ───────────────────────────────────────── */}
          <div
            style={{
              textAlign: "center",
              maxWidth: "660px",
              margin: "0 auto 72px auto",
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
                    fontFamily: isUrdu ? UF : F,
                    fontWeight: 500,
                    color: LIME,
                    letterSpacing: "0.02em",
                  }}
                >
                  {isUrdu ? "انگیجمنٹ ماڈلز" : "Engagement Models"}
                </span>
              </div>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              style={{
                fontSize: "clamp(28px, 3.2vw, 50px)",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                margin: "0 0 18px 0",
              }}
            >
              {isUrdu ? "اپنی ضرورت کے مطابق " : "Work With Us the Way That "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {isUrdu ? "پلان منتخب کریں" : "Fits Your Business"}
              </span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.15)}
              style={{
                fontSize: "16px",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 400,
                color: "rgba(255,255,255,0.47)",
                lineHeight: 1.78,
                margin: 0,
              }}
            >
              {isUrdu ? "چاہے آپ کو صرف ایک ریڈی میڈ سسٹم چاہیے یا مکمل کسٹمائزیشن کے ساتھ سورس کوڈ، ہمارے پاس آپ کے لیے شفاف آپشنز موجود ہیں۔" : "Every engagement — for any of our products — includes a written scope, clear pricing, and a single point of contact."}
            </motion.p>
          </div>

          {/* ── Cards grid ───────────────────────────────────────────── */}
          <div
            className="rs-eng-grid rs-section-gap"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.08fr 1fr",
              gap: "20px",
              alignItems: "stretch",
              marginBottom: "72px",
            }}
          >
            {displayModels.map((m, i) => (
              <EngagementCard key={m.id} model={m} delay={0.12 + i * 0.1} isUrdu={isUrdu ?? false} />
            ))}
          </div>

          {/* ── Bottom note ──────────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.45)}
            style={{
              textAlign: "center",
            }}
          >
            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(197,255,0,0.14) 50%, rgba(255,255,255,0.07) 80%, transparent 100%)",
                marginBottom: "40px",
              }}
            />

            {/* Trust note */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "28px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {(isUrdu ? [
                "ہر پروجیکٹ کا تحریری دائرہ کار",
                "کوئی طویل مدتی پابندی نہیں",
                "رابطے کے لیے ایک ہی نمائندہ",
                "پی کے آر میں قیمتیں، کوئی چھپے چارجز نہیں",
              ] : [
                "Written scope on every project",
                "No long-term lock-in",
                "Single point of contact",
                "PKR pricing, no surprises",
              ]).map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: LIME,
                      boxShadow: `0 0 6px ${LIME}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontFamily: isUrdu ? UF : F,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
