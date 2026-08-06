"use client";

import { type FC, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight, ArrowRight } from "lucide-react";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "var(--font-noto-nastaliq), 'Noto Nastaliq Urdu', serif";

type IconProps = { size: number; strokeWidth: number };

function Linkedin({ size, strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Facebook({ size, strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram({ size, strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Github({ size, strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const CSS = `
  .ft-shell {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse 70% 40% at 50% -5%, rgba(197,255,0,0.07) 0%, transparent 55%),
      linear-gradient(180deg, rgba(5,5,5,0) 0%, #030303 10%, #010101 100%);
  }

  .ft-noise {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .ft-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 0%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 0%, transparent 75%);
  }

  .ft-wrap {
    position: relative;
    z-index: 1;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 72px;
    box-sizing: border-box;
  }

  .ft-rail {
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(197,255,0,0.18) 20%,
      rgba(197,255,0,0.55) 50%,
      rgba(197,255,0,0.18) 80%,
      transparent 100%
    );
    margin-bottom: 56px;
    position: relative;
  }

  .ft-rail::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${LIME};
    box-shadow: 0 0 18px rgba(197,255,0,0.7), 0 0 40px rgba(197,255,0,0.35);
    transform: translate(-50%, -50%);
    animation: ft-pulse 2.8s ease-in-out infinite;
  }

  @keyframes ft-pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.35); opacity: 0.7; }
  }

  .ft-mark {
    position: absolute;
    left: 50%;
    bottom: -2%;
    transform: translateX(-50%);
    font-family: ${F};
    font-weight: 900;
    font-size: clamp(88px, 16vw, 220px);
    letter-spacing: -0.06em;
    line-height: 0.8;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.035);
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
  }

  .ft-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px 7px 10px;
    border-radius: 100px;
    background: rgba(197,255,0,0.06);
    border: 1px solid rgba(197,255,0,0.16);
    margin-bottom: 22px;
  }

  .ft-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${LIME};
    box-shadow: 0 0 10px rgba(197,255,0,0.8);
    animation: ft-dot 1.8s ease-in-out infinite;
  }

  @keyframes ft-dot {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.25); }
  }

  .ft-status span {
    font-size: 11px;
    font-family: ${F};
    font-weight: 600;
    color: rgba(197,255,0,0.85);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .ft-logo {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    text-decoration: none;
    margin-bottom: 18px;
  }

  .ft-logo-mark {
    width: 38px;
    height: 38px;
    border-radius: 11px;
    background: linear-gradient(145deg, ${LIME} 0%, #A8D800 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 24px rgba(197,255,0,0.35),
      inset 0 1px 0 rgba(255,255,255,0.35);
    flex-shrink: 0;
  }

  .ft-logo-mark span {
    font-size: 16px;
    font-family: ${F};
    font-weight: 900;
    color: #050505;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .ft-logo-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .ft-logo-text strong {
    font-size: 17px;
    font-family: ${F};
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .ft-logo-text em {
    font-style: normal;
    font-size: 11px;
    font-family: ${F};
    font-weight: 500;
    color: rgba(255,255,255,0.32);
    letter-spacing: 0.02em;
  }

  .ft-blurb {
    font-size: 14px;
    font-family: ${F};
    font-weight: 400;
    color: rgba(255,255,255,0.4);
    line-height: 1.75;
    margin: 0 0 28px;
    max-width: 320px;
  }

  .ft-socials {
    display: flex;
    gap: 8px;
  }

  .ft-social {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.42);
    text-decoration: none;
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease,
      box-shadow 0.3s ease,
      transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ft-social:hover {
    background: rgba(197,255,0,0.1);
    border-color: rgba(197,255,0,0.32);
    color: ${LIME};
    box-shadow: 0 0 22px rgba(197,255,0,0.22);
    transform: translateY(-3px);
  }

  .ft-col-title {
    font-size: 11px;
    font-family: ${F};
    font-weight: 700;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ft-col-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.08), transparent);
    max-width: 48px;
  }

  .ft-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ft-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-family: ${F};
    font-weight: 400;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    padding: 7px 0;
    transition: color 0.22s ease, padding-left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    width: fit-content;
  }

  .ft-link svg {
    width: 12px;
    height: 12px;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    color: ${LIME};
    flex-shrink: 0;
  }

  .ft-link:hover {
    color: rgba(255,255,255,0.92);
    padding-left: 4px;
  }

  .ft-link:hover svg {
    opacity: 1;
    transform: translateX(0);
  }

  .ft-contact-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px;
    border-radius: 18px;
    background:
      linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%);
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  .ft-contact-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    text-decoration: none;
    padding: 8px 10px;
    margin: -8px -10px;
    border-radius: 12px;
    transition: background 0.25s ease;
  }

  .ft-contact-row:hover {
    background: rgba(255,255,255,0.035);
  }

  .ft-contact-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(197,255,0,0.07);
    border: 1px solid rgba(197,255,0,0.12);
    color: rgba(197,255,0,0.75);
    flex-shrink: 0;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  }

  .ft-contact-row:hover .ft-contact-icon {
    background: rgba(197,255,0,0.12);
    border-color: rgba(197,255,0,0.28);
    color: ${LIME};
    box-shadow: 0 0 16px rgba(197,255,0,0.18);
  }

  .ft-contact-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .ft-contact-label {
    font-size: 10px;
    font-family: ${F};
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }

  .ft-contact-value {
    font-size: 13.5px;
    font-family: ${F};
    font-weight: 500;
    color: rgba(255,255,255,0.72);
    line-height: 1.4;
    word-break: break-word;
    transition: color 0.2s ease;
  }

  .ft-contact-row:hover .ft-contact-value {
    color: #fff;
  }

  .ft-web {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 4px;
    padding: 11px 14px;
    border-radius: 12px;
    text-decoration: none;
    background: rgba(197,255,0,0.06);
    border: 1px solid rgba(197,255,0,0.14);
    transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }

  .ft-web:hover {
    background: rgba(197,255,0,0.1);
    border-color: rgba(197,255,0,0.3);
    box-shadow: 0 0 24px rgba(197,255,0,0.12);
    transform: translateY(-1px);
  }

  .ft-web span {
    font-size: 12px;
    font-family: ${F};
    font-weight: 600;
    color: rgba(197,255,0,0.85);
    letter-spacing: 0.01em;
  }

  .ft-web svg {
    color: rgba(197,255,0,0.65);
    flex-shrink: 0;
  }

  .ft-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    padding: 28px 0 40px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .ft-copy {
    font-size: 13px;
    font-family: ${F};
    color: rgba(255,255,255,0.28);
  }

  .ft-legal {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .ft-legal a {
    font-size: 12.5px;
    font-family: ${F};
    font-weight: 500;
    color: rgba(255,255,255,0.32);
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 6px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .ft-legal a:hover {
    color: rgba(255,255,255,0.8);
    background: rgba(255,255,255,0.04);
  }

  .ft-legal-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255,255,255,0.18);
  }

  .ft-origin {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12.5px;
    font-family: ${F};
    color: rgba(255,255,255,0.28);
  }

  .ft-origin strong {
    font-weight: 600;
    color: rgba(255,255,255,0.45);
  }

  .ft-origin-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 8px;
    border-radius: 100px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.02em;
  }

  .ft-grid-main {
    display: grid;
    grid-template-columns: 1.55fr 1fr 1fr 1.15fr;
    gap: 48px;
    margin-bottom: 64px;
  }

  @media (max-width: 1100px) {
    .ft-grid-main {
      grid-template-columns: 1.3fr 1fr 1fr;
      gap: 40px;
    }
    .ft-grid-main > :last-child {
      grid-column: 1 / -1;
      max-width: 420px;
    }
  }

  @media (max-width: 800px) {
    .ft-wrap {
      padding: 0 24px;
    }
    .ft-grid-main {
      grid-template-columns: 1fr 1fr;
      gap: 36px 28px;
      margin-bottom: 48px;
    }
    .ft-grid-main > :first-child {
      grid-column: 1 / -1;
    }
    .ft-grid-main > :last-child {
      grid-column: 1 / -1;
      max-width: none;
    }
    .ft-blurb {
      max-width: none;
    }
    .ft-mark {
      font-size: 96px;
      bottom: 4%;
    }
  }

  @media (max-width: 520px) {
    .ft-grid-main {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .ft-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
      padding-bottom: 32px;
    }
    .ft-rail {
      margin-bottom: 40px;
    }
  }
`;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

function ColHeading({ children }: { children: ReactNode }) {
  return <div className="ft-col-title">{children}</div>;
}

function NavLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="ft-links">
      {links.map((l) => (
        <a key={l.label} href={l.href} className="ft-link">
          <ArrowRight strokeWidth={2.5} />
          {l.label}
        </a>
      ))}
    </div>
  );
}

function SocialIcon({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: FC<IconProps>;
  label: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="ft-social">
      <Icon size={15} strokeWidth={1.8} />
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isUrdu = pathname?.startsWith("/ur");

  return (
    <>
      <style>{CSS}</style>
      <footer id="footer" className="ft-shell" dir={isUrdu ? "rtl" : "ltr"}>
        <div className="ft-noise" />
        <div className="ft-grid" />
        <div className="ft-mark" aria-hidden>
          AURA
        </div>

        <div className="ft-wrap">
          <div className="ft-rail" />

          <div className="ft-grid-main">
            {/* Brand */}
            <motion.div {...fadeUp(0)}>
              <div className="ft-status">
                <span className="ft-status-dot" />
                <span style={{ fontFamily: isUrdu ? UF : F, fontSize: "11px", textTransform: isUrdu ? "none" : "uppercase" }}>{isUrdu ? "نئے پروجیکٹس قبول کیے جا رہے ہیں" : "Accepting new projects"}</span>
              </div>

              <a href="#hero" className="ft-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', textDecoration: 'none' }}>
                <img
                  src="/Logo.png"
                  alt="Aura Business Solutions Logo"
                  style={{ height: "48px", width: "auto", objectFit: "contain" }}
                />
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                  <span
                    style={{
                      fontFamily: F,
                      fontWeight: 800,
                      fontSize: 20,
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Aura
                  </span>
                  <span
                    style={{
                      fontFamily: F,
                      fontWeight: 500,
                      fontSize: 13,
                      background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      letterSpacing: "0.02em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Business Solution
                  </span>
                </div>
              </a>

              <p className="ft-blurb" style={{ fontFamily: isUrdu ? UF : F, fontSize: "14px" }}>
                {isUrdu 
                  ? "حقیقی آپریشنز کے لیے تیار کردہ سافٹ ویئر سسٹمز — POS، TMS، SMS، ریسٹورنٹ، اور ریکرنگ بلنگ، پاکستان بھر کے کاروباروں کے لیے۔"
                  : "Software systems built for real operations — POS, TMS, SMS, Restaurant, and Recurring Billing for businesses across Pakistan."}
              </p>

              <div className="ft-socials">
                <SocialIcon href="https://linkedin.com" Icon={Linkedin} label="LinkedIn" />
                <SocialIcon href="https://facebook.com" Icon={Facebook} label="Facebook" />
                <SocialIcon href="https://instagram.com" Icon={Instagram} label="Instagram" />
                <SocialIcon href="https://github.com" Icon={Github} label="GitHub" />
              </div>
            </motion.div>

            {/* Products */}
            <motion.div {...fadeUp(0.08)}>
              <ColHeading><span style={{ fontFamily: isUrdu ? UF : F, fontSize: "11px", letterSpacing: isUrdu ? "0" : "0.1em", textTransform: isUrdu ? "none" : "uppercase" }}>{isUrdu ? "پراڈکٹس" : "Products"}</span></ColHeading>
              <div className="ft-links">
                {[
                  { label: isUrdu ? "POS سافٹ ویئر" : "POS Software", href: "#products" },
                  { label: isUrdu ? "ٹرانسپورٹ (TMS)" : "Transport (TMS)", href: "#products" },
                  { label: isUrdu ? "اسکول (SMS)" : "School (SMS)", href: "#products" },
                  { label: isUrdu ? "ریسٹورنٹ سسٹم" : "Restaurant System", href: "#products" },
                  { label: isUrdu ? "ریکرنگ بلنگ" : "Recurring Billing", href: "#products" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="ft-link" style={{ fontFamily: isUrdu ? UF : F, fontSize: "14px" }}>
                    <ArrowRight strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Company */}
            <motion.div {...fadeUp(0.14)}>
              <ColHeading><span style={{ fontFamily: isUrdu ? UF : F, fontSize: "11px", letterSpacing: isUrdu ? "0" : "0.1em", textTransform: isUrdu ? "none" : "uppercase" }}>{isUrdu ? "کمپنی" : "Company"}</span></ColHeading>
              <div className="ft-links">
                {[
                  { label: isUrdu ? "ہمارا کام" : "Our Work", href: "#portfolio" },
                  { label: isUrdu ? "ہمارا عمل" : "Our Process", href: "#process" },
                  { label: isUrdu ? "آرا کیوں" : "Why Aura", href: "#why-aura" },
                  { label: isUrdu ? "انگیجمنٹ ماڈلز" : "Engagement Models", href: "#engagement" },
                  { label: isUrdu ? "ہم سے رابطہ کریں" : "Get in Touch", href: "#contact" },
                ].map((l) => (
                  <a key={l.label} href={l.href} className="ft-link" style={{ fontFamily: isUrdu ? UF : F, fontSize: "14px" }}>
                    <ArrowRight strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div {...fadeUp(0.2)}>
              <ColHeading><span style={{ fontFamily: isUrdu ? UF : F, fontSize: "11px", letterSpacing: isUrdu ? "0" : "0.1em", textTransform: isUrdu ? "none" : "uppercase" }}>{isUrdu ? "رابطہ" : "Contact"}</span></ColHeading>
              <div className="ft-contact-card">
                <div className="ft-contact-row" style={{ cursor: "default" }}>
                  <div className="ft-contact-icon">
                    <MapPin size={14} strokeWidth={1.9} />
                  </div>
                  <div className="ft-contact-meta">
                    <span className="ft-contact-label" style={{ fontFamily: isUrdu ? UF : F, fontSize: "10px", letterSpacing: isUrdu ? "0" : "0.08em", textTransform: isUrdu ? "none" : "uppercase" }}>{isUrdu ? "مقام" : "Location"}</span>
                    <span className="ft-contact-value" style={{ fontFamily: isUrdu ? UF : F, fontSize: "13.5px" }}>{isUrdu ? "پاکستان" : "Pakistan"}</span>
                  </div>
                </div>

                <a href="mailto:info@aurabusinesssolution.com" className="ft-contact-row">
                  <div className="ft-contact-icon">
                    <Mail size={14} strokeWidth={1.9} />
                  </div>
                  <div className="ft-contact-meta">
                    <span className="ft-contact-label" style={{ fontFamily: isUrdu ? UF : F, fontSize: "10px", letterSpacing: isUrdu ? "0" : "0.08em", textTransform: isUrdu ? "none" : "uppercase" }}>{isUrdu ? "ای میل" : "Email"}</span>
                    <span className="ft-contact-value" dir="ltr">info@aurabusinesssolution.com</span>
                  </div>
                </a>

                <a href="tel:+923706277633" className="ft-contact-row">
                  <div className="ft-contact-icon">
                    <Phone size={14} strokeWidth={1.9} />
                  </div>
                  <div className="ft-contact-meta">
                    <span className="ft-contact-label" style={{ fontFamily: isUrdu ? UF : F, fontSize: "10px", letterSpacing: isUrdu ? "0" : "0.08em", textTransform: isUrdu ? "none" : "uppercase" }}>{isUrdu ? "فون" : "Phone"}</span>
                    <span className="ft-contact-value" dir="ltr">+92 370 6277633</span>
                  </div>
                </a>

                <a
                  href="https://pk.aurabusinesssolution.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-web"
                >
                  <span dir="ltr">pk.aurabusinesssolution.com</span>
                  <ArrowUpRight size={13} strokeWidth={2.2} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.26)} className="ft-bottom">
            <span className="ft-copy" style={{ fontFamily: isUrdu ? UF : F, fontSize: "13px" }}>
              {isUrdu ? "© 2026 Aura Business Solutions۔ جملہ حقوق محفوظ ہیں۔" : "© 2026 Aura Business Solutions. All rights reserved."}
            </span>

            <div className="ft-legal">
              <a href="#contact" style={{ fontFamily: isUrdu ? UF : F, fontSize: "12.5px" }}>{isUrdu ? "پرائیویسی" : "Privacy"}</a>
              <span className="ft-legal-dot" />
              <a href="#contact" style={{ fontFamily: isUrdu ? UF : F, fontSize: "12.5px" }}>{isUrdu ? "شرائط" : "Terms"}</a>
              <span className="ft-legal-dot" />
              <span className="ft-origin" style={{ fontFamily: isUrdu ? UF : F, fontSize: "12.5px" }}>
                {isUrdu ? "تخلیق کردہ" : "Built in"}
                <span className="ft-origin-chip">{isUrdu ? "پاکستان" : "Pakistan"}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
