"use client";

import { useState, useEffect, type CSSProperties, type ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Truck,
  BookOpen,
  UtensilsCrossed,
  ReceiptText,
  Check,
  Minus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const DIM = "rgba(255,255,255,0.42)";
const BORDER = "rgba(255,255,255,0.08)";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Feature {
  name: string;
  basic: boolean;
  pro: boolean;
}

interface Product {
  id: string;
  name: string;
  label: string;
  icon: ReactElement;
  features: Feature[];
}

const products: Product[] = [
  {
    id: "pos",
    name: "POS",
    label: "Point of Sale",
    icon: <ShoppingCart size={15} strokeWidth={1.8} />,
    features: [
      { name: "Single branch billing", basic: true, pro: true },
      { name: "Inventory low-stock alerts", basic: true, pro: true },
      { name: "Standard sales reports", basic: true, pro: true },
      { name: "Multi-branch sync", basic: false, pro: true },
      { name: "Advanced sales & profit reports", basic: false, pro: true },
      { name: "JazzCash / Easypaisa integration", basic: false, pro: true },
      { name: "Priority support", basic: false, pro: true },
    ],
  },
  {
    id: "tms",
    name: "TMS",
    label: "Transport Management",
    icon: <Truck size={15} strokeWidth={1.8} />,
    features: [
      { name: "Vehicle & route tracking", basic: true, pro: true },
      { name: "Basic trip logs", basic: true, pro: true },
      { name: "Up to 10 vehicles", basic: true, pro: false },
      { name: "Unlimited vehicles", basic: false, pro: true },
      { name: "Driver performance reports", basic: false, pro: true },
      { name: "Route optimization", basic: false, pro: true },
      { name: "Priority support", basic: false, pro: true },
    ],
  },
  {
    id: "sms",
    name: "SMS",
    label: "School Management",
    icon: <BookOpen size={15} strokeWidth={1.8} />,
    features: [
      { name: "Student & class records", basic: true, pro: true },
      { name: "Attendance tracking", basic: true, pro: true },
      { name: "Basic fee management", basic: true, pro: true },
      { name: "Online fee collection", basic: false, pro: true },
      { name: "Result & report card generation", basic: false, pro: true },
      { name: "Parent SMS / WhatsApp alerts", basic: false, pro: true },
      { name: "Priority support", basic: false, pro: true },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant",
    label: "Restaurant System",
    icon: <UtensilsCrossed size={15} strokeWidth={1.8} />,
    features: [
      { name: "Table & order management", basic: true, pro: true },
      { name: "Menu management", basic: true, pro: true },
      { name: "Basic daily sales reports", basic: true, pro: true },
      { name: "Kitchen display / order printing", basic: false, pro: true },
      { name: "Delivery & takeaway management", basic: false, pro: true },
      { name: "Detailed profit & item-wise reports", basic: false, pro: true },
      { name: "Priority support", basic: false, pro: true },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    label: "Recurring Billing",
    icon: <ReceiptText size={15} strokeWidth={1.8} />,
    features: [
      { name: "Manual subscription tracking", basic: true, pro: true },
      { name: "Basic invoice generation", basic: true, pro: true },
      { name: "Single payment cycle", basic: true, pro: true },
      { name: "Automated recurring invoices", basic: false, pro: true },
      { name: "Multiple billing cycles", basic: false, pro: true },
      { name: "Payment reminders & alerts", basic: false, pro: true },
      { name: "Priority support", basic: false, pro: true },
    ],
  },
];

// ─── Primitives ───────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <div
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "rgba(197,255,0,0.1)",
        border: "1px solid rgba(197,255,0,0.28)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Check size={13} color={LIME} strokeWidth={2.5} />
    </div>
  );
}

function DashIcon() {
  return (
    <div
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Minus size={14} color="rgba(255,255,255,0.18)" strokeWidth={1.5} />
    </div>
  );
}

// ─── Desktop Comparison Table ─────────────────────────────────────────────────

function ComparisonTable({ features }: { features: Feature[] }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const totalRows = features.length;

  const cellBase: CSSProperties = {
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    transition: "background 0.2s ease",
    boxSizing: "border-box",
  };

  const proColBg = "rgba(197,255,0,0.035)";
  const proLeftBorder = "1px solid rgba(197,255,0,0.14)";
  const proRightBorder = "1px solid rgba(197,255,0,0.14)";

  return (
    <div
      style={{
        background: "rgba(11,11,11,0.92)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow:
          "0 12px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Most Popular badge row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          padding: "16px 24px 0",
          gap: 0,
        }}
      >
        <div />
        <div />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(197,255,0,0.12)",
              border: "1px solid rgba(197,255,0,0.3)",
              borderRadius: "100px",
              padding: "4px 12px",
            }}
          >
            <Sparkles size={10} color={LIME} />
            <span
              style={{
                fontSize: "11px",
                fontFamily: F,
                fontWeight: 700,
                color: LIME,
                letterSpacing: "0.05em",
              }}
            >
              MOST POPULAR
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ ...cellBase, paddingTop: "12px", paddingBottom: "16px" }}>
          <span
            style={{
              fontSize: "12px",
              fontFamily: F,
              fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Feature
          </span>
        </div>
        {/* Basic header */}
        <div
          style={{
            ...cellBase,
            justifyContent: "center",
            flexDirection: "column",
            gap: "4px",
            paddingTop: "12px",
            paddingBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontFamily: F,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            Basic
          </span>
          <span
            style={{
              fontSize: "11px",
              fontFamily: F,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Get started
          </span>
        </div>
        {/* Pro header */}
        <div
          style={{
            ...cellBase,
            justifyContent: "center",
            flexDirection: "column",
            gap: "4px",
            paddingTop: "12px",
            paddingBottom: "16px",
            background: proColBg,
            borderLeft: proLeftBorder,
            borderRight: proRightBorder,
            borderTop: "1px solid rgba(197,255,0,0.14)",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontFamily: F,
              fontWeight: 700,
              color: LIME,
            }}
          >
            Pro
          </span>
          <span
            style={{
              fontSize: "11px",
              fontFamily: F,
              color: "rgba(197,255,0,0.55)",
            }}
          >
            Full scale
          </span>
        </div>
      </div>

      {/* Feature rows */}
      {features.map((feature, i) => {
        const isHovered = hoveredRow === i;
        const isLast = i === totalRows - 1;

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              borderBottom: isLast
                ? "none"
                : "1px solid rgba(255,255,255,0.05)",
              background: isHovered
                ? "rgba(255,255,255,0.025)"
                : "transparent",
              transition: "background 0.2s ease",
              cursor: "default",
            }}
          >
            {/* Feature name */}
            <div style={{ ...cellBase }}>
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: F,
                  fontWeight: 400,
                  color: isHovered
                    ? "rgba(255,255,255,0.88)"
                    : "rgba(255,255,255,0.68)",
                  lineHeight: 1.5,
                  transition: "color 0.2s ease",
                }}
              >
                {feature.name}
              </span>
            </div>

            {/* Basic */}
            <div style={{ ...cellBase, justifyContent: "center" }}>
              {feature.basic ? <CheckIcon /> : <DashIcon />}
            </div>

            {/* Pro */}
            <div
              style={{
                ...cellBase,
                justifyContent: "center",
                background: isHovered
                  ? "rgba(197,255,0,0.06)"
                  : proColBg,
                borderLeft: proLeftBorder,
                borderRight: proRightBorder,
                ...(isLast
                  ? { borderBottom: "1px solid rgba(197,255,0,0.14)" }
                  : {}),
                transition: "background 0.2s ease",
              }}
            >
              {feature.pro ? <CheckIcon /> : <DashIcon />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Mobile Comparison Cards ──────────────────────────────────────────────────

function ComparisonCards({ features }: { features: Feature[] }) {
  return (
    <div
      className="rs-cmp-cards"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
      }}
    >
      {/* Basic card */}
      <div
        style={{
          background: "rgba(13,13,13,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "20px",
          padding: "20px",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "16px",
              fontFamily: F,
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            Basic
          </div>
          <div
            style={{
              fontSize: "11px",
              fontFamily: F,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Get started
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              {f.basic ? (
                <Check
                  size={13}
                  color={LIME}
                  strokeWidth={2.5}
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />
              ) : (
                <Minus
                  size={13}
                  color="rgba(255,255,255,0.18)"
                  strokeWidth={1.5}
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />
              )}
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: F,
                  color: f.basic
                    ? "rgba(255,255,255,0.72)"
                    : "rgba(255,255,255,0.28)",
                  lineHeight: 1.5,
                }}
              >
                {f.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pro card */}
      <div
        style={{
          background: "rgba(197,255,0,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(197,255,0,0.25)",
          borderRadius: "20px",
          padding: "20px",
          boxShadow:
            "0 0 30px rgba(197,255,0,0.07), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(197,255,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontFamily: F,
                fontWeight: 700,
                color: LIME,
              }}
            >
              Pro
            </div>
            <div
              style={{
                fontSize: "9px",
                fontFamily: F,
                fontWeight: 700,
                color: LIME,
                background: "rgba(197,255,0,0.12)",
                border: "1px solid rgba(197,255,0,0.3)",
                padding: "1px 7px",
                borderRadius: "20px",
                letterSpacing: "0.05em",
              }}
            >
              POPULAR
            </div>
          </div>
          <div
            style={{
              fontSize: "11px",
              fontFamily: F,
              color: "rgba(197,255,0,0.5)",
            }}
          >
            Full scale
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              {f.pro ? (
                <Check
                  size={13}
                  color={LIME}
                  strokeWidth={2.5}
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />
              ) : (
                <Minus
                  size={13}
                  color="rgba(255,255,255,0.18)"
                  strokeWidth={1.5}
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />
              )}
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: F,
                  color: f.pro
                    ? "rgba(255,255,255,0.88)"
                    : "rgba(255,255,255,0.28)",
                  lineHeight: 1.5,
                }}
              >
                {f.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────

function TabBar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      {/* Mobile / tablet — app-style icon grid */}
      <div
        className="product-tabs-mobile"
        style={{
          display: "none",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 6,
          padding: 6,
          borderRadius: 18,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {products.map((product, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelect(i)}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                minHeight: 58,
                padding: "8px 2px",
                borderRadius: 14,
                border: "none",
                background: isActive ? LIME : "transparent",
                color: isActive ? "#050505" : "rgba(255,255,255,0.55)",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                boxShadow: isActive ? "0 0 18px rgba(197,255,0,0.35)" : "none",
                transition: "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <span style={{ display: "flex", color: "inherit" }}>{product.icon}</span>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: F,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.01em",
                  lineHeight: 1.1,
                  textAlign: "center",
                }}
              >
                {product.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop — pill tabs */}
      <div
        className="product-tabs-desktop"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          flexWrap: "nowrap",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "100px",
          padding: "6px",
          width: "fit-content",
          margin: "0 auto",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        {products.map((product, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 18px",
                borderRadius: "100px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                zIndex: 1,
                transition: "color 0.25s ease",
                color: isActive ? "#050505" : "rgba(255,255,255,0.55)",
                flexShrink: 0,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: LIME,
                    borderRadius: "100px",
                    zIndex: -1,
                    boxShadow: "0 0 20px rgba(197,255,0,0.4)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span
                style={{
                  display: "flex",
                  color: isActive ? "#050505" : "rgba(255,255,255,0.5)",
                  transition: "color 0.25s ease",
                  flexShrink: 0,
                }}
              >
                {product.icon}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: F,
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "nowrap",
                  transition: "font-weight 0.15s ease, color 0.25s ease",
                  color: isActive ? "#050505" : "rgba(255,255,255,0.65)",
                }}
              >
                {product.name}
              </span>
            </button>
          );
        })}
      </div>
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function ComparisonSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const active = products[activeTab];

  return (
    <section
      id="products"
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
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(197,255,0,0.06) 0%, transparent 65%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Floating blurred circles */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(197,255,0,0.04) 0%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "1px solid rgba(197,255,0,0.06)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section Header ─────────────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "640px",
            margin: "0 auto 40px auto",
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
                Our Products
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: "clamp(28px, 3.2vw, 48px)",
              fontFamily: F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              margin: "0 0 18px 0",
            }}
          >
            Choose a Product to Compare{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Basic vs Pro
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
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Click any product below to see exactly what's included in each
            plan.
          </motion.p>
        </div>

        {/* ── Tab Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeUp(0.22)}>
          <TabBar activeIndex={activeTab} onSelect={setActiveTab} />
        </motion.div>

        {/* ── Active product label ───────────────────────────────── */}
        <motion.div
          key={`label-${activeTab}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontFamily: F,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Comparing plans for{" "}
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              {active.label}
            </span>
          </span>
        </motion.div>

        {/* ── Comparison Content ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {isDesktop ? (
              <ComparisonTable features={active.features} />
            ) : (
              <ComparisonCards features={active.features} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Divider ────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(197,255,0,0.15) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)",
            margin: "40px 0 36px",
          }}
        />

        {/* ── CTAs ───────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.34)} className="cta-row">
          <SiteButton href="tel:+923706277633" variant="primary">
            Get a Quote
          </SiteButton>
          <SiteButton href="tel:+923706277633" variant="secondary">
            Talk to Sales
            <ArrowRight size={14} strokeWidth={2} />
          </SiteButton>
        </motion.div>

        {/* ── Bottom reassurance ─────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            marginTop: "36px",
            flexWrap: "wrap",
          }}
        >
          {[
            "No hidden fees",
            "Cancel anytime",
            "Upgrade from Basic to Pro",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.45 }}
              style={{ display: "flex", alignItems: "center", gap: "7px" }}
            >
              <Check size={12} color={LIME} strokeWidth={2.5} />
              <span
                style={{
                  fontSize: "12.5px",
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
