"use client";

import { type CSSProperties } from "react";
import { motion } from "framer-motion";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const DIM = "rgba(255,255,255,0.42)";
const MID = "rgba(255,255,255,0.68)";
const BRIGHT = "#FFFFFF";
const BORDER_DIM = "rgba(255,255,255,0.07)";

const GLASS_BASE: CSSProperties = {
  background: "rgba(13, 13, 13, 0.9)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "18px",
  boxShadow:
    "0 12px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const GLASS_LIME: CSSProperties = {
  ...GLASS_BASE,
  border: "1px solid rgba(197,255,0,0.25)",
  boxShadow:
    "0 12px 48px rgba(0,0,0,0.55), 0 0 35px rgba(197,255,0,0.09), inset 0 1px 0 rgba(197,255,0,0.12)",
};

// ─── Primitives ─────────────────────────────────────────────────────────────

function Stat({
  v,
  l,
  lime,
}: {
  v: string;
  l: string;
  lime?: boolean;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "15px",
          fontFamily: F,
          fontWeight: 700,
          color: lime ? LIME : BRIGHT,
          lineHeight: 1,
        }}
      >
        {v}
      </div>
      <div
        style={{
          fontSize: "9px",
          fontFamily: F,
          color: DIM,
          marginTop: "3px",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {l}
      </div>
    </div>
  );
}

function CardHeader({ title, badge }: { title: string; badge: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "13px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
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
            fontSize: "10px",
            fontFamily: F,
            fontWeight: 600,
            color: DIM,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>
      <span
        style={{
          fontSize: "9px",
          fontFamily: F,
          color: LIME,
          background: "rgba(197,255,0,0.1)",
          border: "1px solid rgba(197,255,0,0.24)",
          padding: "2px 9px",
          borderRadius: "20px",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        }}
      >
        {badge}
      </span>
    </div>
  );
}

function Bars({ data }: { data: number[] }) {
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "34px" }}
    >
      {data.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            borderRadius: "3px 3px 0 0",
            background:
              i === data.length - 1 ? LIME : "rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}

function LineChart() {
  return (
    <svg
      viewBox="0 0 170 50"
      style={{ width: "100%", height: "36px" }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="bill-lc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.25" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,44 C20,40 28,38 38,42 S58,24 78,30 S108,11 128,14 S150,9 170,8 L170,50 L0,50 Z"
        fill="url(#bill-lc)"
      />
      <path
        d="M0,44 C20,40 28,38 38,42 S58,24 78,30 S108,11 128,14 S150,9 170,8"
        fill="none"
        stroke={LIME}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="170" cy="8" r="3" fill={LIME} />
    </svg>
  );
}

function ProgressBar({
  label,
  value,
  faded,
}: {
  label: string;
  value: number;
  faded?: boolean;
}) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <span style={{ fontSize: "10px", fontFamily: F, color: DIM }}>
          {label}
        </span>
        <span style={{ fontSize: "10px", fontFamily: F, color: MID }}>
          {value}%
        </span>
      </div>
      <div
        style={{
          height: "3px",
          background: BORDER_DIM,
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: faded ? "rgba(197,255,0,0.38)" : LIME,
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
}

// ─── Dashboard Cards ─────────────────────────────────────────────────────────

function POSDashboard() {
  return (
    <div style={{ ...GLASS_LIME, padding: "18px", width: "262px" }}>
      <CardHeader title="POS Dashboard" badge="LIVE" />
      <div
        style={{
          fontSize: "27px",
          fontFamily: F,
          fontWeight: 800,
          color: BRIGHT,
          lineHeight: 1,
        }}
      >
        $24,891
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "4px",
          marginBottom: "13px",
        }}
      >
        <span style={{ fontSize: "11px", fontFamily: F, color: DIM }}>
          Today's Revenue
        </span>
        <span
          style={{
            fontSize: "10px",
            fontFamily: F,
            color: LIME,
            background: "rgba(197,255,0,0.1)",
            padding: "1px 7px",
            borderRadius: "10px",
          }}
        >
          ↑ 14.2%
        </span>
      </div>
      <Bars data={[32, 47, 40, 65, 53, 80, 100]} />
      <div
        style={{
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: `1px solid ${BORDER_DIM}`,
        }}
      >
        {[
          { name: "Grocery Store", amt: "$8,240", pct: "+12%" },
          { name: "Electronics Shop", amt: "$11,320", pct: "+8%" },
          { name: "Café & Bakery", amt: "$5,331", pct: "+24%" },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: i < 2 ? "9px" : 0,
            }}
          >
            <span style={{ fontSize: "11px", fontFamily: F, color: DIM }}>
              {row.name}
            </span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "7px" }}
            >
              <span
                style={{ fontSize: "11px", fontFamily: F, color: BRIGHT }}
              >
                {row.amt}
              </span>
              <span style={{ fontSize: "9px", fontFamily: F, color: LIME }}>
                {row.pct}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TMSDashboard() {
  return (
    <div style={{ ...GLASS_BASE, padding: "16px", width: "212px" }}>
      <CardHeader title="Transport Mgmt" badge="24 ROUTES" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "12px",
        }}
      >
        <Stat v="48" l="Vehicles" />
        <Stat v="94%" l="On-Time" lime />
        <Stat v="3" l="Alerts" />
      </div>
      <div
        style={{
          paddingTop: "10px",
          borderTop: `1px solid ${BORDER_DIM}`,
        }}
      >
        {[
          { route: "KHI → LHR", p: 72, ok: true },
          { route: "ISB → RWP", p: 45, ok: false },
          { route: "LHR → FSD", p: 88, ok: true },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: i < 2 ? "9px" : 0,
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: F,
                color: DIM,
                flex: 1,
              }}
            >
              {r.route}
            </span>
            <div
              style={{
                width: "48px",
                height: "3px",
                background: BORDER_DIM,
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
                fontSize: "11px",
                fontFamily: F,
                color: r.ok ? LIME : "#FF6B35",
                width: "10px",
                textAlign: "center",
              }}
            >
              {r.ok ? "✓" : "!"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SMSDashboard() {
  return (
    <div style={{ ...GLASS_BASE, padding: "16px", width: "208px" }}>
      <CardHeader title="School Mgmt" badge="2024-25" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "12px",
        }}
      >
        <Stat v="1,204" l="Students" />
        <Stat v="68" l="Staff" />
        <Stat v="96%" l="Attend." lime />
      </div>
      <div
        style={{ paddingTop: "10px", borderTop: `1px solid ${BORDER_DIM}` }}
      >
        <ProgressBar label="A Grade" value={42} />
        <ProgressBar label="B Grade" value={31} />
        <ProgressBar label="C Grade" value={18} faded />
      </div>
    </div>
  );
}

function RestaurantDashboard() {
  return (
    <div style={{ ...GLASS_BASE, padding: "16px", width: "216px" }}>
      <CardHeader title="Restaurant" badge="OPEN" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "12px",
        }}
      >
        <Stat v="23" l="Orders" lime />
        <Stat v="18/24" l="Tables" />
        <Stat v="$3.4K" l="Revenue" />
      </div>
      <div
        style={{ paddingTop: "10px", borderTop: `1px solid ${BORDER_DIM}` }}
      >
        {[
          { name: "Kitchen", cur: 8, max: 12 },
          { name: "Bar", cur: 4, max: 8 },
          { name: "Delivery", cur: 11, max: 15 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: i < 2 ? "9px" : 0,
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: F,
                color: DIM,
                width: "52px",
              }}
            >
              {s.name}
            </span>
            <div
              style={{
                flex: 1,
                height: "4px",
                background: BORDER_DIM,
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(s.cur / s.max) * 100}%`,
                  background: LIME,
                  borderRadius: "2px",
                }}
              />
            </div>
            <span
              style={{ fontSize: "9px", fontFamily: F, color: DIM }}
            >
              {s.cur}/{s.max}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingDashboard() {
  return (
    <div style={{ ...GLASS_BASE, padding: "16px", width: "206px" }}>
      <CardHeader title="Recurring Billing" badge="ACTIVE" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <Stat v="$42.8K" l="MRR" lime />
        <Stat v="384" l="Active" />
        <Stat v="1.2%" l="Churn" />
      </div>
      <LineChart />
      <div
        style={{
          paddingTop: "9px",
          borderTop: `1px solid ${BORDER_DIM}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "10px", fontFamily: F, color: DIM }}>
          Next Billing
        </span>
        <span style={{ fontSize: "10px", fontFamily: F, color: BRIGHT }}>
          14 invoices due
        </span>
      </div>
    </div>
  );
}

// ─── Composition ─────────────────────────────────────────────────────────────


export function DashboardIllustration() {
  return (
    <div
      style={{
        position: "relative",
        width: "560px",
        height: "600px",
        flexShrink: 0,
      }}
    >
      {/* Ambient glow behind composition */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(197,255,0,0.11) 0%, transparent 65%)",
          filter: "blur(35px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* SMS — top left */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "6px",
          zIndex: 4,
          transform: "rotate(-7deg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1, y: [0, -11, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.5 },
            scale: { duration: 0.7, delay: 0.5 },
            y: { duration: 4.1, delay: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <SMSDashboard />
        </motion.div>
      </div>

      {/* TMS — top right */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "6px",
          zIndex: 3,
          transform: "rotate(5deg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1, y: [0, -9, 0]  }}
          transition={{
            opacity: { duration: 0.7, delay: 0.7 },
            scale: { duration: 0.7, delay: 0.7 },
            y: { duration: 3.8, delay: 1.0, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <TMSDashboard />
        </motion.div>
      </div>

      {/* POS — center (main hero card) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, -13, 0]  }}
          transition={{
            opacity: { duration: 0.9, delay: 0.2 },
            scale: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 4.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <POSDashboard />
        </motion.div>
      </div>

      {/* Restaurant — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          right: "4px",
          zIndex: 6,
          transform: "rotate(4deg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0]  }}
          transition={{
            opacity: { duration: 0.7, delay: 0.9 },
            scale: { duration: 0.7, delay: 0.9 },
            y: { duration: 4.3, delay: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <RestaurantDashboard />
        </motion.div>
      </div>

      {/* Billing — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          left: "6px",
          zIndex: 5,
          transform: "rotate(-4deg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1, y: [0, -9, 0]  }}
          transition={{
            opacity: { duration: 0.7, delay: 1.1 },
            scale: { duration: 0.7, delay: 1.1 },
            y: { duration: 4.0, delay: 3.0, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <BillingDashboard />
        </motion.div>
      </div>
    </div>
  );
}
