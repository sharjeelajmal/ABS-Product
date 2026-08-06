"use client";

import { useState, useEffect, type ReactElement } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "var(--font-noto-nastaliq), 'Noto Nastaliq Urdu', serif";
const DIM = "rgba(255,255,255,0.40)";
const BORDER = "rgba(255,255,255,0.08)";

// ─── Shared mini-UI primitives ────────────────────────────────────────────────

const mG = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "14px",
} as React.CSSProperties;

function MiniHeader({ title, badge, isUrdu }: { title: string; badge: string; isUrdu?: boolean }) {
  return (
    <div style={mG}>
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: LIME,
          boxShadow: `0 0 7px ${LIME}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "10px",
          fontFamily: isUrdu ? UF : F,
          color: "rgba(255,255,255,0.38)",
          letterSpacing: isUrdu ? "0.02em" : "0.07em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {title}
      </span>
      <div
        style={{
          marginLeft: "auto",
          fontSize: "9px",
          fontFamily: isUrdu ? UF : F,
          color: LIME,
          background: "rgba(197,255,0,0.1)",
          border: "1px solid rgba(197,255,0,0.22)",
          padding: isUrdu ? "1px 8px" : "2px 8px",
          borderRadius: "20px",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        {badge}
      </div>
    </div>
  );
}

function MiniBars({ data }: { data: number[] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "56px" }}>
      {data.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            borderRadius: "3px 3px 0 0",
            background: i === data.length - 1 ? LIME : "rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}

function MiniStat({ v, l, lime, isUrdu }: { v: string; l: string; lime?: boolean; isUrdu?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "8px",
        padding: "7px 8px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontFamily: F,
          fontWeight: 700,
          color: lime ? LIME : "#fff",
          lineHeight: 1,
        }}
      >
        {v}
      </div>
      <div
        style={{
          fontSize: "9px",
          fontFamily: isUrdu ? UF : F,
          color: "rgba(255,255,255,0.3)",
          marginTop: "3px",
        }}
      >
        {l}
      </div>
    </div>
  );
}

function MiniProgress({ label, value, isUrdu }: { label: string; value: number; isUrdu?: boolean }) {
  return (
    <div style={{ marginBottom: "7px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "3px",
        }}
      >
        <span style={{ fontSize: "10px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.38)" }}>
          {label}
        </span>
        <span style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.6)" }}>
          {value}%
        </span>
      </div>
      <div
        style={{
          height: "3px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: LIME,
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
}

// ─── Dashboard Mockups ─────────────────────────────────────────────────────────

function POSMockup({ isUrdu }: { isUrdu: boolean }) {
  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        display: "flex",
        gap: "18px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "20%",
          width: "220px",
          height: "220px",
          background: "radial-gradient(circle, rgba(197,255,0,0.07) 0%, transparent 65%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Left: KPIs */}
      <div style={{ flex: "0 0 190px" }}>
        <MiniHeader title={isUrdu ? "POS ڈیش بورڈ" : "POS Dashboard"} badge={isUrdu ? "لائیو" : "LIVE"} isUrdu={isUrdu} />
        <div
          style={{
            fontSize: "26px",
            fontFamily: F,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1,
          }}
        >
          $24,891
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "4px",
            marginBottom: "16px",
          }}
        >
          <span style={{ fontSize: "11px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.36)" }}>
            {isUrdu ? "آج کی آمدنی" : "Today's Revenue"}
          </span>
          <span
            style={{
              fontSize: "10px",
              fontFamily: F,
              color: LIME,
              background: "rgba(197,255,0,0.1)",
              padding: "0 6px",
              borderRadius: "10px",
            }}
          >
            ↑ 14.2%
          </span>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "12px",
          }}
        >
          {(isUrdu ? [
            { n: "گروسری اسٹور", a: "$8,240", p: "+12%" },
            { n: "الیکٹرانکس", a: "$11,320", p: "+8%" },
            { n: "کیفے اینڈ بیکری", a: "$5,331", p: "+24%" },
          ] : [
            { n: "Grocery Store", a: "$8,240", p: "+12%" },
            { n: "Electronics", a: "$11,320", p: "+8%" },
            { n: "Café & Bakery", a: "$5,331", p: "+24%" },
          ]).map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: i < 2 ? "8px" : 0,
              }}
            >
              <span style={{ fontSize: "10.5px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.38)" }}>
                {row.n}
              </span>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "10.5px", fontFamily: F, color: "#fff" }}>
                  {row.a}
                </span>
                <span style={{ fontSize: "9px", fontFamily: F, color: LIME }}>{row.p}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: chart */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div
          style={{
            fontSize: "9px",
            fontFamily: isUrdu ? UF : F,
            color: "rgba(255,255,255,0.2)",
            marginBottom: "6px",
          }}
        >
          {isUrdu ? "ہفتہ وار آمدنی" : "Weekly Revenue"}
        </div>
        <MiniBars data={[28, 52, 38, 68, 48, 82, 60, 100]} />
        <div style={{ display: "flex", gap: "3px", marginTop: "4px" }}>
          {(isUrdu ? ["پ", "م", "ب", "ج", "ج", "ہ", "ا", "آج"] : ["M", "T", "W", "T", "F", "S", "S", "T"]).map((d, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: "8px",
                fontFamily: isUrdu ? UF : F,
                color: "rgba(255,255,255,0.18)",
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "14px" }}>
          <MiniStat v="892" l={isUrdu ? "آرڈرز" : "Orders"} isUrdu={isUrdu} />
          <MiniStat v="48" l={isUrdu ? "پراڈکٹس" : "Products"} isUrdu={isUrdu} />
          <MiniStat v="94%" l={isUrdu ? "مکمل شدہ" : "Fulfilled"} lime isUrdu={isUrdu} />
        </div>
      </div>
    </div>
  );
}

function TMSMockup({ isUrdu }: { isUrdu: boolean }) {
  const routes = [
    { r: "KHI → LHR", p: 72, ok: true },
    { r: "ISB → RWP", p: 45, ok: false },
    { r: "LHR → FSD", p: 88, ok: true },
  ];
  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        display: "flex",
        gap: "18px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "30%",
          width: "200px",
          height: "150px",
          background: "radial-gradient(circle, rgba(197,255,0,0.06) 0%, transparent 70%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      {/* Left */}
      <div style={{ flex: "0 0 175px" }}>
        <MiniHeader title={isUrdu ? "فلیٹ ڈیش بورڈ" : "Fleet Dashboard"} badge={isUrdu ? "24 روٹس" : "24 ROUTES"} isUrdu={isUrdu} />
        <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
          <MiniStat v="48" l={isUrdu ? "گاڑیاں" : "Vehicles"} isUrdu={isUrdu} />
          <MiniStat v="94%" l={isUrdu ? "وقت پر" : "On-Time"} lime isUrdu={isUrdu} />
          <MiniStat v="3" l={isUrdu ? "الرٹس" : "Alerts"} isUrdu={isUrdu} />
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "12px",
          }}
        >
          {routes.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: i < 2 ? "9px" : 0,
              }}
            >
              <span style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.38)", flex: 1 }}>
                {r.r}
              </span>
              <div
                style={{
                  width: "52px",
                  height: "3px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${r.p}%`,
                    background: r.ok ? LIME : "#FF6B35",
                    borderRadius: "2px",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: F,
                  color: r.ok ? LIME : "#FF6B35",
                }}
              >
                {r.ok ? "✓" : "!"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: abstract map */}
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            fontFamily: isUrdu ? UF : F,
            color: "rgba(255,255,255,0.2)",
            padding: "10px 12px 6px",
            letterSpacing: isUrdu ? "0.02em" : "0.06em",
          }}
        >
          {isUrdu ? "روٹ میپ" : "ROUTE MAP"}
        </div>
        {/* Grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              top: `${y}%`,
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(255,255,255,0.04)",
            }}
          />
        ))}
        {[25, 50, 75].map((x) => (
          <div
            key={x}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(255,255,255,0.04)",
            }}
          />
        ))}
        {/* Route lines */}
        <svg
          viewBox="0 0 200 140"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          preserveAspectRatio="none"
        >
          <path d="M20,120 Q60,80 100,60 T180,20" fill="none" stroke={LIME} strokeWidth="1.5" strokeOpacity="0.7" />
          <path d="M20,100 Q80,90 130,50 T190,40" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M10,130 Q50,100 90,80 T170,30" fill="none" stroke="rgba(197,255,0,0.35)" strokeWidth="1" strokeDasharray="4,4" />
          {/* Vehicle dots */}
          <circle cx="80" cy="78" r="4" fill={LIME} opacity="0.9" />
          <circle cx="80" cy="78" r="8" fill={LIME} opacity="0.15" />
          <circle cx="120" cy="62" r="4" fill="#FF6B35" opacity="0.9" />
          <circle cx="50" cy="105" r="3" fill="rgba(197,255,0,0.6)" />
        </svg>
      </div>
    </div>
  );
}

function SMSMockup({ isUrdu }: { isUrdu: boolean }) {
  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        display: "flex",
        gap: "18px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "40%",
          width: "200px",
          height: "160px",
          background: "radial-gradient(circle, rgba(197,255,0,0.06) 0%, transparent 70%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />
      {/* Left */}
      <div style={{ flex: "0 0 180px" }}>
        <MiniHeader title={isUrdu ? "اسکول مینجمنٹ" : "School Mgmt"} badge="2024-25" isUrdu={isUrdu} />
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          <MiniStat v="1,204" l={isUrdu ? "طلبہ" : "Students"} isUrdu={isUrdu} />
          <MiniStat v="68" l={isUrdu ? "اسٹاف" : "Staff"} isUrdu={isUrdu} />
          <MiniStat v="96%" l={isUrdu ? "حاضری" : "Attend."} lime isUrdu={isUrdu} />
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "12px",
          }}
        >
          <MiniProgress label={isUrdu ? "A گریڈ" : "A Grade"} value={42} isUrdu={isUrdu} />
          <MiniProgress label={isUrdu ? "B گریڈ" : "B Grade"} value={31} isUrdu={isUrdu} />
          <MiniProgress label={isUrdu ? "C گریڈ" : "C Grade"} value={18} isUrdu={isUrdu} />
        </div>
      </div>

      {/* Right: attendance heatmap + fee chart */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ fontSize: "9px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.2)", letterSpacing: isUrdu ? "0.02em" : "0.06em" }}>
          {isUrdu ? "ماہانہ حاضری" : "MONTHLY ATTENDANCE"}
        </div>
        {/* Heatmap grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3px" }}>
          {Array.from({ length: 28 }, (_, i) => {
            const v = Math.random();
            return (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  borderRadius: "3px",
                  background:
                    v > 0.85
                      ? LIME
                      : v > 0.6
                      ? "rgba(197,255,0,0.4)"
                      : v > 0.35
                      ? "rgba(197,255,0,0.15)"
                      : "rgba(255,255,255,0.05)",
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "10px",
          }}
        >
          <div style={{ fontSize: "9px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.2)", marginBottom: "6px" }}>
            {isUrdu ? "فیس وصولی" : "FEE COLLECTION"}
          </div>
          <div style={{ display: "flex", gap: "3px", height: "32px", alignItems: "flex-end" }}>
            {[60, 75, 55, 90, 70, 85, 100].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: "2px 2px 0 0",
                  background: i === 6 ? LIME : "rgba(255,255,255,0.07)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantMockup({ isUrdu }: { isUrdu: boolean }) {
  const tables = [
    { id: 1, occupied: true, guests: 4 },
    { id: 2, occupied: true, guests: 2 },
    { id: 3, occupied: false, guests: 0 },
    { id: 4, occupied: true, guests: 6 },
    { id: 5, occupied: false, guests: 0 },
    { id: 6, occupied: true, guests: 3 },
    { id: 7, occupied: true, guests: 2 },
    { id: 8, occupied: false, guests: 0 },
    { id: 9, occupied: true, guests: 5 },
    { id: 10, occupied: false, guests: 0 },
    { id: 11, occupied: true, guests: 4 },
    { id: 12, occupied: false, guests: 0 },
  ];
  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        display: "flex",
        gap: "18px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "180px",
          height: "180px",
          background: "radial-gradient(circle, rgba(197,255,0,0.06) 0%, transparent 70%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      {/* Left: KPIs + orders */}
      <div style={{ flex: "0 0 170px" }}>
        <MiniHeader title={isUrdu ? "ریسٹورنٹ" : "Restaurant"} badge={isUrdu ? "اوپن" : "OPEN"} isUrdu={isUrdu} />
        <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
          <MiniStat v="23" l={isUrdu ? "آرڈرز" : "Orders"} lime isUrdu={isUrdu} />
          <MiniStat v="18/24" l={isUrdu ? "ٹیبلز" : "Tables"} isUrdu={isUrdu} />
          <MiniStat v="$3.4K" l={isUrdu ? "آمدنی" : "Revenue"} isUrdu={isUrdu} />
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "10px",
          }}
        >
          {(isUrdu ? [
            { s: "کچن", c: 8, m: 12 },
            { s: "بار", c: 4, m: 8 },
            { s: "ڈیلیوری", c: 11, m: 15 },
          ] : [
            { s: "Kitchen", c: 8, m: 12 },
            { s: "Bar", c: 4, m: 8 },
            { s: "Delivery", c: 11, m: 15 },
          ]).map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: i < 2 ? "8px" : 0,
              }}
            >
              <span style={{ fontSize: "10px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.38)", width: "50px" }}>
                {item.s}
              </span>
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(item.c / item.m) * 100}%`,
                    background: LIME,
                    borderRadius: "2px",
                  }}
                />
              </div>
              <span style={{ fontSize: "9px", fontFamily: F, color: "rgba(255,255,255,0.3)" }}>
                {item.c}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: table grid */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "9px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.2)", letterSpacing: isUrdu ? "0.02em" : "0.06em", marginBottom: "10px" }}>
          {isUrdu ? "ٹیبل کی صورتحال" : "TABLE STATUS"}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "6px",
          }}
        >
          {tables.map((t) => (
            <div
              key={t.id}
              style={{
                background: t.occupied ? "rgba(197,255,0,0.1)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${t.occupied ? "rgba(197,255,0,0.25)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "8px",
                padding: "6px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  fontFamily: F,
                  color: t.occupied ? LIME : "rgba(255,255,255,0.25)",
                  fontWeight: 600,
                }}
              >
                T{t.id}
              </div>
              <div
                style={{
                  fontSize: isUrdu && !t.occupied ? "11px" : "8px",
                  fontFamily: isUrdu ? UF : F,
                  color: t.occupied ? "rgba(197,255,0,0.6)" : "rgba(255,255,255,0.18)",
                  marginTop: "2px",
                }}
              >
                {t.occupied ? `${t.guests}p` : (isUrdu ? "خالی" : "Free")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingMockup({ isUrdu }: { isUrdu: boolean }) {
  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        display: "flex",
        gap: "18px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "25%",
          width: "220px",
          height: "160px",
          background: "radial-gradient(circle, rgba(197,255,0,0.07) 0%, transparent 65%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Left */}
      <div style={{ flex: "0 0 175px" }}>
        <MiniHeader title={isUrdu ? "ریکرنگ بلنگ" : "Recurring Billing"} badge={isUrdu ? "فعال" : "ACTIVE"} isUrdu={isUrdu} />
        <div
          style={{
            fontSize: "24px",
            fontFamily: F,
            fontWeight: 800,
            color: LIME,
            lineHeight: 1,
          }}
        >
          $42.8K
        </div>
        <div
          style={{
            fontSize: "11px",
            fontFamily: isUrdu ? UF : F,
            color: "rgba(255,255,255,0.35)",
            marginTop: "3px",
            marginBottom: "14px",
          }}
        >
          {isUrdu ? "ماہانہ ریکرنگ آمدنی" : "Monthly Recurring Revenue"}
        </div>
        <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
          <MiniStat v="384" l={isUrdu ? "صارفین" : "Active"} isUrdu={isUrdu} />
          <MiniStat v="1.2%" l={isUrdu ? "چرن" : "Churn"} isUrdu={isUrdu} />
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "10px",
          }}
        >
          {(isUrdu ? [
            { n: "Suhaib's POS", a: "$4,800/ماہ", due: "3دن" },
            { n: "Ali Transport", a: "$2,400/ماہ", due: "7دن" },
            { n: "Bright School", a: "$1,200/ماہ", due: "12دن" },
          ] : [
            { n: "Suhaib's POS", a: "$4,800/mo", due: "3d" },
            { n: "Ali Transport", a: "$2,400/mo", due: "7d" },
            { n: "Bright School", a: "$1,200/mo", due: "12d" },
          ]).map((inv, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: i < 2 ? "7px" : 0,
              }}
            >
              <span style={{ fontSize: "10px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.4)" }}>
                {inv.n}
              </span>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "10px", fontFamily: F, color: "#fff" }}>
                  {inv.a}
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontFamily: isUrdu ? UF : F,
                    color: "rgba(197,255,0,0.7)",
                    background: "rgba(197,255,0,0.08)",
                    padding: isUrdu ? "0px 5px" : "0 5px",
                    borderRadius: "8px",
                  }}
                >
                  {inv.due}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: revenue chart */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: "9px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.2)", letterSpacing: isUrdu ? "0.02em" : "0.06em", marginBottom: "8px" }}>
          {isUrdu ? "MRR گروتھ" : "MRR GROWTH"}
        </div>
        <svg
          viewBox="0 0 160 90"
          style={{ width: "100%", flex: 1, maxHeight: "90px" }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="billing-grad-portfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LIME} stopOpacity="0.25" />
              <stop offset="100%" stopColor={LIME} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,85 C20,80 30,78 40,72 S60,55 80,48 S110,28 130,20 S150,14 160,10 L160,90 L0,90 Z"
            fill="url(#billing-grad-portfolio)"
          />
          <path
            d="M0,85 C20,80 30,78 40,72 S60,55 80,48 S110,28 130,20 S150,14 160,10"
            fill="none"
            stroke={LIME}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="160" cy="10" r="3.5" fill={LIME} />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          {(isUrdu ? ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]).map((m) => (
            <span key={m} style={{ fontSize: "8px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.2)" }}>
              {m}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: "10px",
            background: "rgba(197,255,0,0.06)",
            border: "1px solid rgba(197,255,0,0.15)",
            borderRadius: "8px",
            padding: "8px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "10px", fontFamily: isUrdu ? UF : F, color: "rgba(255,255,255,0.5)" }}>
            {isUrdu ? "اگلی بلنگ" : "Next billing"}
          </span>
          <span style={{ fontSize: "10px", fontFamily: isUrdu ? UF : F, color: LIME, fontWeight: 600 }}>
            {isUrdu ? "14 انوائسز باقی" : "14 invoices due"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Project data ─────────────────────────────────────────────────────────────

type MockupKey = "pos" | "tms" | "sms" | "restaurant" | "billing";

const MOCKUPS: Record<MockupKey, (props: { isUrdu: boolean }) => ReactElement> = {
  pos: POSMockup,
  tms: TMSMockup,
  sms: SMSMockup,
  restaurant: RestaurantMockup,
  billing: BillingMockup,
};

interface Project {
  tag: string;
  tagUr: string;
  category: string;
  categoryUr: string;
  title: string;
  titleUr: string;
  description: string;
  descriptionUr: string;
  badges: string[];
  badgesUr: string[];
  mockup: MockupKey;
  featured?: boolean;
}

const projects: Project[] = [
  {
    tag: "Retail · POS",
    tagUr: "ریٹیل · POS · پوائنٹ آف سیل · مکمل شدہ",
    category: "Point of Sale",
    categoryUr: "پوائنٹ آف سیل",
    title: "Multi-Branch POS for a Retail Chain",
    titleUr: "ریٹیل چین کے لیے ملٹی برانچ POS",
    description:
      "Replaced manual billing across multiple outlets with a synced POS system — real-time stock and sales visible from one dashboard.",
    descriptionUr: "متعدد آؤٹ لیٹس پر دستی بلنگ کی جگہ ایک سنک شدہ POS سسٹم — تمام اسٹاک اور سیلز ایک ہی ڈیش بورڈ سے ریئل ٹائم میں نظر آتے ہیں۔",
    badges: ["Multi Branch", "Cloud", "Realtime Sync", "Analytics"],
    badgesUr: ["ملٹی برانچ", "کلاؤڈ", "ریئل ٹائم سنک", "تجزیات"],
    mockup: "pos",
    featured: true,
  },
  {
    tag: "Transport · TMS",
    tagUr: "ٹرانسپورٹ · TMS · فلیٹ مینجمنٹ · مکمل شدہ",
    category: "Fleet Management",
    categoryUr: "فلیٹ مینجمنٹ",
    title: "Fleet Tracking System for a Logistics Company",
    titleUr: "لاجسٹکس کمپنی کے لیے فلیٹ ٹریکنگ سسٹم",
    description:
      "A TMS platform giving live vehicle tracking, trip logs, and driver reports across a growing delivery fleet.",
    descriptionUr: "ایک TMS پلیٹ فارم جو بڑھتی ہوئی ڈیلیوری فلیٹ میں لائیو گاڑی ٹریکنگ، ٹرپ لاگز، اور ڈرائیور رپورٹس فراہم کرتا ہے۔",
    badges: ["Fleet Tracking", "Analytics", "Cloud", "Realtime Sync"],
    badgesUr: ["فلیٹ ٹریکنگ", "تجزیات", "کلاؤڈ", "ریئل ٹائم سنک"],
    mockup: "tms",
  },
  {
    tag: "Education · SMS",
    tagUr: "تعلیم · SMS · اسکول مینجمنٹ · مکمل شدہ",
    category: "School Management",
    categoryUr: "اسکول مینجمنٹ",
    title: "School Management System for a Private School Network",
    titleUr: "پرائیویٹ اسکول نیٹ ورک کے لیے اسکول مینجمنٹ سسٹم",
    description:
      "Digitized attendance, fee collection, and result generation for a multi-campus school network.",
    descriptionUr: "ایک ملٹی کیمپس اسکول نیٹ ورک کے لیے حاضری، فیس وصولی، اور نتائج کی تیاری کو ڈیجیٹل بنایا گیا۔",
    badges: ["Multi Campus", "Automation", "Cloud", "Analytics"],
    badgesUr: ["ملٹی کیمپس", "آٹومیشن", "کلاؤڈ", "تجزیات"],
    mockup: "sms",
  },
  {
    tag: "Food & Beverage · Restaurant",
    tagUr: "فوڈ اینڈ بیوریج · ریسٹورنٹ · ریسٹورنٹ سسٹم · مکمل شدہ",
    category: "Restaurant System",
    categoryUr: "ریسٹورنٹ سسٹم",
    title: "Order & Table Management for a Restaurant Chain",
    titleUr: "ریسٹورنٹ چین کے لیے آرڈر اور ٹیبل مینجمنٹ",
    description:
      "A restaurant system handling dine-in, takeaway, and kitchen order printing across several branches.",
    descriptionUr: "ایک ریسٹورنٹ سسٹم جو متعدد برانچز میں ڈائن اِن، ٹیک اوے، اور کچن آرڈر پرنٹنگ کو سنبھالتا ہے۔",
    badges: ["Multi Branch", "Cloud", "Analytics", "Restaurant"],
    badgesUr: ["ملٹی برانچ", "کلاؤڈ", "تجزیات", "ریسٹورنٹ"],
    mockup: "restaurant",
    featured: true,
  },
  {
    tag: "Subscriptions · Billing",
    tagUr: "سبسکرپشنز · بلنگ · ریکرنگ بلنگ · مکمل شدہ",
    category: "Recurring Billing",
    categoryUr: "ریکرنگ بلنگ",
    title: "Automated Billing for a Subscription Business",
    titleUr: "سبسکرپشن بزنس کے لیے خودکار بلنگ",
    description:
      "A recurring billing system that replaced manual invoicing with automated cycles and payment reminders.",
    descriptionUr: "ایک ریکرنگ بلنگ سسٹم جس نے دستی انوائسنگ کی جگہ خودکار سائیکلز اور پیمنٹ ریمائنڈرز متعارف کروائے۔",
    badges: ["Automation", "Cloud", "Analytics", "Billing"],
    badgesUr: ["آٹومیشن", "کلاؤڈ", "تجزیات", "بلنگ"],
    mockup: "billing",
  },
];

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  delay,
  isUrdu,
}: {
  project: Project;
  delay: number;
  isUrdu: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const MockupComponent = MOCKUPS[project.mockup];
  const mockupHeight = project.featured ? 264 : 220;

  return (
    <motion.div
      className="rs-project-card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "rgba(10, 10, 10, 0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? "rgba(197,255,0,0.28)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "default",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition:
          "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 0 50px rgba(197,255,0,0.08), 0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(197,255,0,0.08)"
          : "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Dashboard preview area */}
      <div
        className="rs-project-mock"
        style={{
          height: `${mockupHeight}px`,
          background: "rgba(8,8,8,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
          transform: hovered ? "scale(1.015)" : "scale(1)",
          transformOrigin: "center bottom",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="rs-project-mock-inner">
          <MockupComponent isUrdu={isUrdu} />
        </div>
        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "64px",
            background: "linear-gradient(0deg, rgba(10,10,10,0.95) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Top-right glow flare */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "100px",
            height: "100px",
            background: "radial-gradient(circle, rgba(197,255,0,0.12) 0%, transparent 70%)",
            filter: "blur(12px)",
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Card content */}
      <div className="rs-project-body" style={{ padding: "24px" }}>
        {/* Tags row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 500,
              color: "rgba(255,255,255,0.38)",
              letterSpacing: isUrdu ? "0.02em" : "0.03em",
            }}
          >
            {isUrdu ? project.tagUr : project.tag}
          </span>
          <span
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 600,
              color: "rgba(197,255,0,0.8)",
              background: "rgba(197,255,0,0.08)",
              border: "1px solid rgba(197,255,0,0.18)",
              padding: isUrdu ? "1px 9px" : "2px 9px",
              borderRadius: "20px",
            }}
          >
            {isUrdu ? project.categoryUr : project.category}
          </span>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "10px",
              fontFamily: isUrdu ? UF : F,
              color: LIME,
              background: "rgba(197,255,0,0.08)",
              border: "1px solid rgba(197,255,0,0.18)",
              padding: isUrdu ? "1px 10px" : "3px 10px",
              borderRadius: "20px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: LIME,
                boxShadow: `0 0 6px ${LIME}`,
              }}
            />
            {isUrdu ? "مکمل شدہ" : "Completed"}
          </div>
        </div>

        {/* Title */}
        <h3
          className="rs-project-title"
          style={{
            fontSize: project.featured ? (isUrdu ? "22px" : "20px") : (isUrdu ? "20px" : "18px"),
            fontFamily: isUrdu ? UF : F,
            fontWeight: 700,
            color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.92)",
            lineHeight: 1.28,
            letterSpacing: "-0.02em",
            margin: "0 0 10px 0",
            transition: "color 0.2s ease",
          }}
        >
          {isUrdu ? project.titleUr : project.title}
        </h3>

        {/* Description */}
        <p
          className="rs-project-desc"
          style={{
            fontSize: "14px",
            fontFamily: isUrdu ? UF : F,
            color: hovered ? "rgba(255,255,255,0.55)" : DIM,
            lineHeight: 1.7,
            margin: "0 0 20px 0",
            transition: "color 0.2s ease",
          }}
        >
          {isUrdu ? project.descriptionUr : project.description}
        </p>

        {/* Bottom: CTA + badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* View link */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: hovered ? LIME : "rgba(255,255,255,0.55)",
              transition: "color 0.2s ease",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "13px", fontFamily: isUrdu ? UF : F, fontWeight: 600 }}>
              {isUrdu ? "کیس اسٹڈی دیکھیں" : "View Case Study"}
            </span>
            <ArrowUpRight size={14} strokeWidth={2.2} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
          </div>

          {/* Tech badges */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {(isUrdu ? project.badgesUr : project.badges).map((b) => (
              <span
                key={b}
                style={{
                  fontSize: "10px",
                  fontFamily: isUrdu ? UF : F,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: isUrdu ? "1px 9px" : "3px 9px",
                  borderRadius: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                {b}
              </span>
            ))}
          </div>
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

export function PortfolioSection() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const leftProjects = [projects[0], projects[2], projects[4]];
  const rightProjects = [projects[1], projects[3]];

  return (
    <section
      id="portfolio"
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
      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(197,255,0,0.055) 0%, transparent 60%)",
          filter: "blur(55px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "1px solid rgba(197,255,0,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "2%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section Header ─────────────────────────────────────── */}
        <div
          className="rs-portfolio-head"
          style={{
            textAlign: "center",
            maxWidth: "680px",
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
                {isUrdu ? "منتخب کام" : "Selected Work"}
              </span>
            </div>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: "clamp(30px, 3.4vw, 50px)",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "0 0 18px 0",
            }}
          >
            {isUrdu ? "حقیقی سسٹمز جو ہم نے " : "Real Systems We've "}
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isUrdu ? "بنائے اور نافذ کیے" : "Built and Deployed"}
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.16)}
            style={{
              fontSize: "16px",
              fontFamily: isUrdu ? UF : F,
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.78,
              margin: 0,
            }}
          >
            {isUrdu ? "POS، TMS، SMS، ریسٹورنٹ، اور ریکرنگ بلنگ سسٹمز کا ایک نمونہ جو ہماری ٹیم نے کلائنٹس کے لیے تیار کیا ہے۔" : "A sample of the POS, TMS, SMS, Restaurant, and Recurring Billing systems our team has delivered for clients."}
          </motion.p>
        </div>

        {/* ── Masonry Grid ───────────────────────────────────────── */}
        {isMobile ? (
          <div className="rs-portfolio-stack" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.mockup} project={p} delay={0.08 * i} isUrdu={isUrdu ?? false} />
            ))}
          </div>
        ) : (
          <div
            className="rs-portfolio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              alignItems: "start",
              marginBottom: "80px",
            }}
          >
            {/* Left column */}
            <div className="rs-portfolio-col" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {leftProjects.map((p, i) => (
                <ProjectCard key={p.mockup} project={p} delay={0.08 * (i * 2)} isUrdu={isUrdu ?? false} />
              ))}
            </div>

            {/* Right column — offset for asymmetric rhythm */}
            <div
              className="rs-portfolio-col rs-portfolio-col-offset"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "56px",
              }}
            >
              {rightProjects.map((p, i) => (
                <ProjectCard key={p.mockup} project={p} delay={0.08 * (i * 2 + 1)} isUrdu={isUrdu ?? false} />
              ))}
            </div>
          </div>
        )}

        {/* ── Divider ────────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(197,255,0,0.15) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)",
            marginBottom: "56px",
          }}
        />

        {/* ── CTAs ───────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.34)} className="cta-row">
          <SiteButton href="#portfolio" variant="primary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
            {isUrdu ? "مکمل پورٹ فولیو دیکھیں" : "View Full Portfolio"}
          </SiteButton>
          <SiteButton href="#contact" variant="secondary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 16 : undefined }}>
            {isUrdu ? "اپنا پروجیکٹ شروع کریں" : "Start Your Project"}
            <ArrowRight size={15} strokeWidth={2} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
          </SiteButton>
        </motion.div>
      </div>
    </section>
  );
}
