"use client";

import { useState, useEffect, type CSSProperties, type ReactElement } from "react";
import { usePathname } from "next/navigation";
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
const UF = "'Jameel Noori Nastaleeq', 'Jameel Noori Nastaleeq Regular', 'jameel-noori-nastaleeq-regular', serif";
const DIM = "rgba(255,255,255,0.42)";
const BORDER = "rgba(255,255,255,0.08)";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Feature {
  name: string;
  nameUr: string;
  basic: boolean;
  pro: boolean;
}

interface Product {
  id: string;
  name: string;
  nameUr: string;
  label: string;
  labelUr: string;
  icon: ReactElement;
  features: Feature[];
}

const products: Product[] = [
  {
    id: "pos",
    name: "POS",
    nameUr: "پی او ایس",
    label: "Point of Sale",
    labelUr: "پوائنٹ آف سیل",
    icon: <ShoppingCart size={15} strokeWidth={1.8} />,
    features: [
      { name: "Single branch billing", nameUr: "سنگل برانچ بلنگ", basic: true, pro: true },
      { name: "Inventory low-stock alerts", nameUr: "انوینٹری الرٹس", basic: true, pro: true },
      { name: "Standard sales reports", nameUr: "معیاری سیلز رپورٹس", basic: true, pro: true },
      { name: "Multi-branch sync", nameUr: "ملٹی برانچ سنک", basic: false, pro: true },
      { name: "Advanced sales & profit reports", nameUr: "ایڈوانسڈ سیلز اور پرافٹ رپورٹس", basic: false, pro: true },
      { name: "JazzCash / Easypaisa integration", nameUr: "JazzCash / Easypaisa انٹیگریشن", basic: false, pro: true },
      { name: "Priority support", nameUr: "ترجیحی سپورٹ", basic: false, pro: true },
    ],
  },
  {
    id: "tms",
    name: "TMS",
    nameUr: "ٹی ایم ایس",
    label: "Transport Management",
    labelUr: "ٹرانسپورٹ مینجمنٹ",
    icon: <Truck size={15} strokeWidth={1.8} />,
    features: [
      { name: "Vehicle & route tracking", nameUr: "گاڑیوں اور روٹس کی ٹریکنگ", basic: true, pro: true },
      { name: "Basic trip logs", nameUr: "بنیادی ٹرپ لاگز", basic: true, pro: true },
      { name: "Up to 10 vehicles", nameUr: "10 گاڑیوں تک", basic: true, pro: false },
      { name: "Unlimited vehicles", nameUr: "لامحدود گاڑیاں", basic: false, pro: true },
      { name: "Driver performance reports", nameUr: "ڈرائیور کی کارکردگی کی رپورٹس", basic: false, pro: true },
      { name: "Route optimization", nameUr: "روٹ آپٹیمائزیشن", basic: false, pro: true },
      { name: "Priority support", nameUr: "ترجیحی سپورٹ", basic: false, pro: true },
    ],
  },
  {
    id: "sms",
    name: "SMS",
    nameUr: "ایس ایم ایس",
    label: "School Management",
    labelUr: "اسکول مینجمنٹ",
    icon: <BookOpen size={15} strokeWidth={1.8} />,
    features: [
      { name: "Student & class records", nameUr: "طلبہ اور کلاسز کا ریکارڈ", basic: true, pro: true },
      { name: "Attendance tracking", nameUr: "حاضری ٹریکنگ", basic: true, pro: true },
      { name: "Basic fee management", nameUr: "بنیادی فیس مینجمنٹ", basic: true, pro: true },
      { name: "Online fee collection", nameUr: "آن لائن فیس وصولی", basic: false, pro: true },
      { name: "Result & report card generation", nameUr: "نتائج اور رپورٹ کارڈز کی تیاری", basic: false, pro: true },
      { name: "Parent SMS / WhatsApp alerts", nameUr: "والدین کے لیے SMS / WhatsApp الرٹس", basic: false, pro: true },
      { name: "Priority support", nameUr: "ترجیحی سپورٹ", basic: false, pro: true },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant",
    nameUr: "ریسٹورنٹ",
    label: "Restaurant System",
    labelUr: "ریسٹورنٹ سسٹم",
    icon: <UtensilsCrossed size={15} strokeWidth={1.8} />,
    features: [
      { name: "Table & order management", nameUr: "ٹیبل اور آرڈر مینجمنٹ", basic: true, pro: true },
      { name: "Menu management", nameUr: "مینو مینجمنٹ", basic: true, pro: true },
      { name: "Basic daily sales reports", nameUr: "بنیادی روزمرہ سیلز رپورٹس", basic: true, pro: true },
      { name: "Kitchen display / order printing", nameUr: "کچن ڈسپلے / آرڈر پرنٹنگ", basic: false, pro: true },
      { name: "Delivery & takeaway management", nameUr: "ڈیلیوری اور ٹیک اوے مینجمنٹ", basic: false, pro: true },
      { name: "Detailed profit & item-wise reports", nameUr: "تفصیلی منافع اور آئٹم وار رپورٹس", basic: false, pro: true },
      { name: "Priority support", nameUr: "ترجیحی سپورٹ", basic: false, pro: true },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    nameUr: "بلنگ",
    label: "Recurring Billing",
    labelUr: "ریکرنگ بلنگ",
    icon: <ReceiptText size={15} strokeWidth={1.8} />,
    features: [
      { name: "Manual subscription tracking", nameUr: "دستی سبسکرپشن ٹریکنگ", basic: true, pro: true },
      { name: "Basic invoice generation", nameUr: "بنیادی انوائسنگ", basic: true, pro: true },
      { name: "Single payment cycle", nameUr: "سنگل پیمنٹ سائیکل", basic: true, pro: true },
      { name: "Automated recurring invoices", nameUr: "خودکار ریکرنگ انوائسز", basic: false, pro: true },
      { name: "Multiple billing cycles", nameUr: "متعدد بلنگ سائیکلز", basic: false, pro: true },
      { name: "Payment reminders & alerts", nameUr: "پیمنٹ ریمائنڈرز اور الرٹس", basic: false, pro: true },
      { name: "Priority support", nameUr: "ترجیحی سپورٹ", basic: false, pro: true },
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

function ComparisonTable({ features, isUrdu }: { features: Feature[]; isUrdu: boolean }) {
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
                fontSize: isUrdu ? "12px" : "11px",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 700,
                color: LIME,
                letterSpacing: isUrdu ? "0.02em" : "0.05em",
                lineHeight: 1,
                paddingTop: isUrdu ? "2px" : "0px",
              }}
            >
              {isUrdu ? "زیادہ منتخب کردہ" : "MOST POPULAR"}
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
              fontSize: isUrdu ? "14px" : "12px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: isUrdu ? "0.03em" : "0.08em",
              textTransform: isUrdu ? "none" : "uppercase",
            }}
          >
            {isUrdu ? "فیچر" : "Feature"}
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
              fontSize: isUrdu ? "13px" : "11px",
              fontFamily: isUrdu ? UF : F,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {isUrdu ? "شروعات کے لیے" : "Get started"}
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
              fontSize: isUrdu ? "13px" : "11px",
              fontFamily: isUrdu ? UF : F,
              color: "rgba(197,255,0,0.55)",
            }}
          >
            {isUrdu ? "مکمل آپریشنز کے لیے" : "Full scale"}
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
            <div style={{ ...cellBase }}>
              <span
                style={{
                  fontSize: isUrdu ? "15.5px" : "14px",
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: 400,
                  color: isHovered
                    ? "rgba(255,255,255,0.88)"
                    : "rgba(255,255,255,0.68)",
                  lineHeight: 1.5,
                  transition: "color 0.2s ease",
                }}
              >
                {isUrdu ? feature.nameUr : feature.name}
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

function ComparisonCards({ features, isUrdu }: { features: Feature[]; isUrdu: boolean }) {
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
              fontSize: isUrdu ? "13px" : "11px",
              fontFamily: isUrdu ? UF : F,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {isUrdu ? "شروعات کے لیے" : "Get started"}
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
                  fontSize: isUrdu ? "13.5px" : "12px",
                  fontFamily: isUrdu ? UF : F,
                  color: f.basic
                    ? "rgba(255,255,255,0.72)"
                    : "rgba(255,255,255,0.28)",
                  lineHeight: 1.5,
                }}
              >
                {isUrdu ? f.nameUr : f.name}
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
                fontSize: isUrdu ? "10px" : "9px",
                fontFamily: isUrdu ? UF : F,
                fontWeight: 700,
                color: LIME,
                background: "rgba(197,255,0,0.12)",
                border: "1px solid rgba(197,255,0,0.3)",
                padding: isUrdu ? "2px 7px" : "1px 7px",
                borderRadius: "20px",
                letterSpacing: isUrdu ? "0.02em" : "0.05em",
                lineHeight: 1,
              }}
            >
              {isUrdu ? "مقبول" : "POPULAR"}
            </div>
          </div>
          <div
            style={{
              fontSize: isUrdu ? "13px" : "11px",
              fontFamily: isUrdu ? UF : F,
              color: "rgba(197,255,0,0.5)",
            }}
          >
            {isUrdu ? "مکمل آپریشنز کے لیے" : "Full scale"}
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
                  fontSize: isUrdu ? "13.5px" : "12px",
                  fontFamily: isUrdu ? UF : F,
                  color: f.pro
                    ? "rgba(255,255,255,0.88)"
                    : "rgba(255,255,255,0.28)",
                  lineHeight: 1.5,
                }}
              >
                {isUrdu ? f.nameUr : f.name}
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
  isUrdu,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  isUrdu: boolean;
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
                  fontSize: isUrdu ? 11 : 9,
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.01em",
                  lineHeight: 1.1,
                  textAlign: "center",
                }}
              >
                {isUrdu ? product.nameUr : product.name}
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
                  fontSize: isUrdu ? "14px" : "13px",
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "nowrap",
                  transition: "font-weight 0.15s ease, color 0.25s ease",
                  color: isActive ? "#050505" : "rgba(255,255,255,0.65)",
                  paddingTop: isUrdu ? "2px" : "0px",
                }}
              >
                {isUrdu ? product.nameUr : product.name}
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
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

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
                  fontSize: isUrdu ? "15px" : "13px",
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: 500,
                  color: LIME,
                  letterSpacing: "0.02em",
                }}
              >
                {isUrdu ? "ہمارے پراڈکٹس" : "Our Products"}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: isUrdu ? "clamp(32px, 3.8vw, 54px)" : "clamp(28px, 3.2vw, 48px)",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              margin: "0 0 18px 0",
            }}
          >
            {isUrdu ? "موازنہ کرنے کے لیے پراڈکٹ منتخب کریں " : "Choose a Product to Compare "}
            <br className="hidden md:block" />
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isUrdu ? "Basic بمقابلہ Pro" : "Basic vs Pro"}
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.16)}
            style={{
              fontSize: isUrdu ? "18px" : "16px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {isUrdu ? "نیچے کوئی بھی پراڈکٹ کلک کریں تاکہ دیکھ سکیں کہ ہر پلان میں کیا شامل ہے۔" : "Click any product below to see exactly what's included in each plan."}
          </motion.p>
        </div>

        {/* ── Tab Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeUp(0.22)}>
          <TabBar activeIndex={activeTab} onSelect={setActiveTab} isUrdu={isUrdu ?? false} />
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
              fontSize: isUrdu ? "15px" : "13px",
              fontFamily: isUrdu ? UF : F,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {isUrdu ? (
              <>
                "<span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, fontFamily: F }}>{active.name}</span>" کے لیے پلانز دیکھے جا رہے ہیں
              </>
            ) : (
              <>
                Comparing plans for{" "}
                <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                  {active.label}
                </span>
              </>
            )}
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
              <ComparisonTable features={active.features} isUrdu={isUrdu ?? false} />
            ) : (
              <ComparisonCards features={active.features} isUrdu={isUrdu ?? false} />
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
          <SiteButton href="tel:+923706277633" variant="primary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
            {isUrdu ? "کوٹیشن حاصل کریں" : "Get a Quote"}
          </SiteButton>
          <SiteButton href="tel:+923706277633" variant="secondary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
            {isUrdu ? "سیلز ٹیم سے بات کریں" : "Talk to Sales"}
            <ArrowRight size={14} strokeWidth={2} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
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
          {(isUrdu
            ? [
                "کوئی چھپی فیس نہیں",
                "کسی بھی وقت منسوخ کریں",
                "Basic سے Pro میں اپ گریڈ کریں",
              ]
            : [
                "No hidden fees",
                "Cancel anytime",
                "Upgrade from Basic to Pro",
              ]
          ).map((item, i) => (
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
                  fontSize: isUrdu ? "14px" : "12.5px",
                  fontFamily: isUrdu ? UF : F,
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
