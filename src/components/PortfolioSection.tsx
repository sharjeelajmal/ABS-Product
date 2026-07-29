"use client";

import { useState, useEffect, type ReactElement } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const DIM = "rgba(255,255,255,0.40)";
const BORDER = "rgba(255,255,255,0.08)";

// ─── Shared mini-UI primitives ────────────────────────────────────────────────

const mG = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "14px",
} as React.CSSProperties;

function MiniHeader({ title, badge }: { title: string; badge: string }) {
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
          fontFamily: F,
          color: "rgba(255,255,255,0.38)",
          letterSpacing: "0.07em",
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
          fontFamily: F,
          color: LIME,
          background: "rgba(197,255,0,0.1)",
          border: "1px solid rgba(197,255,0,0.22)",
          padding: "2px 8px",
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

function MiniStat({ v, l, lime }: { v: string; l: string; lime?: boolean }) {
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
          fontFamily: F,
          color: "rgba(255,255,255,0.3)",
          marginTop: "3px",
        }}
      >
        {l}
      </div>
    </div>
  );
}

function MiniProgress({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: "7px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "3px",
        }}
      >
        <span style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.38)" }}>
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

function POSMockup() {
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
        <MiniHeader title="POS Dashboard" badge="LIVE" />
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
          <span style={{ fontSize: "11px", fontFamily: F, color: "rgba(255,255,255,0.36)" }}>
            Today's Revenue
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
          {[
            { n: "Grocery Store", a: "$8,240", p: "+12%" },
            { n: "Electronics", a: "$11,320", p: "+8%" },
            { n: "Café & Bakery", a: "$5,331", p: "+24%" },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: i < 2 ? "8px" : 0,
              }}
            >
              <span style={{ fontSize: "10.5px", fontFamily: F, color: "rgba(255,255,255,0.38)" }}>
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
            fontFamily: F,
            color: "rgba(255,255,255,0.2)",
            marginBottom: "6px",
          }}
        >
          Weekly Revenue
        </div>
        <MiniBars data={[28, 52, 38, 68, 48, 82, 60, 100]} />
        <div style={{ display: "flex", gap: "3px", marginTop: "4px" }}>
          {["M", "T", "W", "T", "F", "S", "S", "T"].map((d, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: "8px",
                fontFamily: F,
                color: "rgba(255,255,255,0.18)",
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "14px" }}>
          <MiniStat v="892" l="Orders" />
          <MiniStat v="48" l="Products" />
          <MiniStat v="94%" l="Fulfilled" lime />
        </div>
      </div>
    </div>
  );
}

function TMSMockup() {
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
        <MiniHeader title="Fleet Dashboard" badge="24 ROUTES" />
        <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
          <MiniStat v="48" l="Vehicles" />
          <MiniStat v="94%" l="On-Time" lime />
          <MiniStat v="3" l="Alerts" />
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
            fontFamily: F,
            color: "rgba(255,255,255,0.2)",
            padding: "10px 12px 6px",
            letterSpacing: "0.06em",
          }}
        >
          ROUTE MAP
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

function SMSMockup() {
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
        <MiniHeader title="School Mgmt" badge="2024-25" />
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          <MiniStat v="1,204" l="Students" />
          <MiniStat v="68" l="Staff" />
          <MiniStat v="96%" l="Attend." lime />
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "12px",
          }}
        >
          <MiniProgress label="A Grade" value={42} />
          <MiniProgress label="B Grade" value={31} />
          <MiniProgress label="C Grade" value={18} />
        </div>
      </div>

      {/* Right: attendance heatmap + fee chart */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ fontSize: "9px", fontFamily: F, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
          MONTHLY ATTENDANCE
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
          <div style={{ fontSize: "9px", fontFamily: F, color: "rgba(255,255,255,0.2)", marginBottom: "6px" }}>
            FEE COLLECTION
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

function RestaurantMockup() {
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
        <MiniHeader title="Restaurant" badge="OPEN" />
        <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
          <MiniStat v="23" l="Orders" lime />
          <MiniStat v="18/24" l="Tables" />
          <MiniStat v="$3.4K" l="Revenue" />
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "10px",
          }}
        >
          {[
            { s: "Kitchen", c: 8, m: 12 },
            { s: "Bar", c: 4, m: 8 },
            { s: "Delivery", c: 11, m: 15 },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: i < 2 ? "8px" : 0,
              }}
            >
              <span style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.38)", width: "50px" }}>
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
        <div style={{ fontSize: "9px", fontFamily: F, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: "10px" }}>
          TABLE STATUS
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
                  fontSize: "8px",
                  fontFamily: F,
                  color: t.occupied ? "rgba(197,255,0,0.6)" : "rgba(255,255,255,0.18)",
                  marginTop: "2px",
                }}
              >
                {t.occupied ? `${t.guests}p` : "Free"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingMockup() {
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
        <MiniHeader title="Recurring Billing" badge="ACTIVE" />
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
            fontFamily: F,
            color: "rgba(255,255,255,0.35)",
            marginTop: "3px",
            marginBottom: "14px",
          }}
        >
          Monthly Recurring Revenue
        </div>
        <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
          <MiniStat v="384" l="Active" />
          <MiniStat v="1.2%" l="Churn" />
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "10px",
          }}
        >
          {[
            { n: "Suhaib's POS", a: "$4,800/mo", due: "3d" },
            { n: "Ali Transport", a: "$2,400/mo", due: "7d" },
            { n: "Bright School", a: "$1,200/mo", due: "12d" },
          ].map((inv, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: i < 2 ? "7px" : 0,
              }}
            >
              <span style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.4)" }}>
                {inv.n}
              </span>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "10px", fontFamily: F, color: "#fff" }}>
                  {inv.a}
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontFamily: F,
                    color: "rgba(197,255,0,0.7)",
                    background: "rgba(197,255,0,0.08)",
                    padding: "0 5px",
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
        <div style={{ fontSize: "9px", fontFamily: F, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: "8px" }}>
          MRR GROWTH
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
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
            <span key={m} style={{ fontSize: "8px", fontFamily: F, color: "rgba(255,255,255,0.2)" }}>
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
          <span style={{ fontSize: "10px", fontFamily: F, color: "rgba(255,255,255,0.5)" }}>
            Next billing
          </span>
          <span style={{ fontSize: "10px", fontFamily: F, color: LIME, fontWeight: 600 }}>
            14 invoices due
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Project data ─────────────────────────────────────────────────────────────

type MockupKey = "pos" | "tms" | "sms" | "restaurant" | "billing";

const MOCKUPS: Record<MockupKey, () => ReactElement> = {
  pos: POSMockup,
  tms: TMSMockup,
  sms: SMSMockup,
  restaurant: RestaurantMockup,
  billing: BillingMockup,
};

interface Project {
  tag: string;
  category: string;
  title: string;
  description: string;
  badges: string[];
  mockup: MockupKey;
  featured?: boolean;
}

const projects: Project[] = [
  {
    tag: "Retail · POS",
    category: "Point of Sale",
    title: "Multi-Branch POS for a Retail Chain",
    description:
      "Replaced manual billing across multiple outlets with a synced POS system — real-time stock and sales visible from one dashboard.",
    badges: ["Multi Branch", "Cloud", "Realtime Sync", "Analytics"],
    mockup: "pos",
    featured: true,
  },
  {
    tag: "Transport · TMS",
    category: "Fleet Management",
    title: "Fleet Tracking System for a Logistics Company",
    description:
      "A TMS platform giving live vehicle tracking, trip logs, and driver reports across a growing delivery fleet.",
    badges: ["Fleet Tracking", "Analytics", "Cloud", "Realtime Sync"],
    mockup: "tms",
  },
  {
    tag: "Education · SMS",
    category: "School Management",
    title: "School Management System for a Private School Network",
    description:
      "Digitized attendance, fee collection, and result generation for a multi-campus school network.",
    badges: ["Multi Campus", "Automation", "Cloud", "Analytics"],
    mockup: "sms",
  },
  {
    tag: "Food & Beverage · Restaurant",
    category: "Restaurant System",
    title: "Order & Table Management for a Restaurant Chain",
    description:
      "A restaurant system handling dine-in, takeaway, and kitchen order printing across several branches.",
    badges: ["Multi Branch", "Cloud", "Analytics", "Restaurant"],
    mockup: "restaurant",
    featured: true,
  },
  {
    tag: "Subscriptions · Billing",
    category: "Recurring Billing",
    title: "Automated Billing for a Subscription Business",
    description:
      "A recurring billing system that replaced manual invoicing with automated cycles and payment reminders.",
    badges: ["Automation", "Cloud", "Analytics", "Billing"],
    mockup: "billing",
  },
];

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
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
          <MockupComponent />
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
              fontFamily: F,
              fontWeight: 500,
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.03em",
            }}
          >
            {project.tag}
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
              fontFamily: F,
              fontWeight: 600,
              color: "rgba(197,255,0,0.8)",
              background: "rgba(197,255,0,0.08)",
              border: "1px solid rgba(197,255,0,0.18)",
              padding: "2px 9px",
              borderRadius: "20px",
            }}
          >
            {project.category}
          </span>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "10px",
              fontFamily: F,
              color: LIME,
              background: "rgba(197,255,0,0.08)",
              border: "1px solid rgba(197,255,0,0.18)",
              padding: "3px 10px",
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
            Completed
          </div>
        </div>

        {/* Title */}
        <h3
          className="rs-project-title"
          style={{
            fontSize: project.featured ? "20px" : "18px",
            fontFamily: F,
            fontWeight: 700,
            color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.92)",
            lineHeight: 1.28,
            letterSpacing: "-0.02em",
            margin: "0 0 10px 0",
            transition: "color 0.2s ease",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="rs-project-desc"
          style={{
            fontSize: "14px",
            fontFamily: F,
            color: hovered ? "rgba(255,255,255,0.55)" : DIM,
            lineHeight: 1.7,
            margin: "0 0 20px 0",
            transition: "color 0.2s ease",
          }}
        >
          {project.description}
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
            <span style={{ fontSize: "13px", fontFamily: F, fontWeight: 600 }}>
              View Case Study
            </span>
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </div>

          {/* Tech badges */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {project.badges.map((b) => (
              <span
                key={b}
                style={{
                  fontSize: "10px",
                  fontFamily: F,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "3px 9px",
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
                  fontFamily: F,
                  fontWeight: 500,
                  color: LIME,
                  letterSpacing: "0.02em",
                }}
              >
                Selected Work
              </span>
            </div>
          </motion.div>

          <motion.h2
            {...fadeUp(0.08)}
            style={{
              fontSize: "clamp(30px, 3.4vw, 50px)",
              fontFamily: F,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "0 0 18px 0",
            }}
          >
            Real Systems We've{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Built and Deployed
            </span>
          </motion.h2>

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
            A sample of the POS, TMS, SMS, Restaurant, and Recurring Billing
            systems our team has delivered for clients.
          </motion.p>
        </div>

        {/* ── Masonry Grid ───────────────────────────────────────── */}
        {isMobile ? (
          <div className="rs-portfolio-stack" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.mockup} project={p} delay={0.08 * i} />
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
                <ProjectCard key={p.mockup} project={p} delay={0.08 * (i * 2)} />
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
                <ProjectCard key={p.mockup} project={p} delay={0.08 * (i * 2 + 1)} />
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
          <SiteButton href="#portfolio" variant="primary">
            View Full Portfolio
          </SiteButton>
          <SiteButton href="#contact" variant="secondary">
            Start Your Project
            <ArrowRight size={15} strokeWidth={2} />
          </SiteButton>
        </motion.div>
      </div>
    </section>
  );
}
