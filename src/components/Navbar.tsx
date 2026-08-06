"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";
const UF = "'Jameel Noori Nastaleeq', 'Jameel Noori Nastaleeq Regular', 'jameel-noori-nastaleeq-regular', serif";

const NAV_LINKS = [
  { label: "Home", labelUr: "ہوم", href: "#hero" },
  { label: "Services", labelUr: "سروسز", href: "#services" },
  { label: "Process", labelUr: "پراسیس", href: "#process" },
  { label: "Products", labelUr: "پراڈکٹس", href: "#products" },
  { label: "Portfolio", labelUr: "پورٹ فولیو", href: "#portfolio" },
  { label: "Contact", labelUr: "رابطہ", href: "#contact" },
];

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 88;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", hash);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  const pathname = usePathname();
  const router = useRouter();
  const isUrdu = pathname?.startsWith("/ur");

  const toggleLanguage = () => {
    if (isUrdu) {
      router.push(pathname.replace(/^\/ur/, "") || "/");
    } else {
      router.push(`/ur${pathname === "/" ? "" : pathname}`);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = [
        "hero",
        "services",
        "process",
        "products",
        "portfolio",
        "videos",
        "why-aura",
        "testimonials",
        "engagement",
        "contact",
      ];
      const y = window.scrollY + 120;
      let current = "#hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = `#${id}`;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navigate = useCallback((href: string) => {
    scrollToHash(href);
    setOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding:
            "max(12px, env(safe-area-inset-top)) 16px 0",
        }}
      >
        <div
          className="site-header-inner"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: scrolled ? "10px 18px" : "14px 22px",
            borderRadius: "100px",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(255,255,255,0.06)",
            background: scrolled
              ? "rgba(8,8,8,0.82)"
              : "rgba(255,255,255,0.03)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "inset 0 1px 0 rgba(255,255,255,0.04)",
            transition:
              "padding 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Brand */}
          <a
            href="#hero"
            className="site-header-brand"
            onClick={(e) => {
              e.preventDefault();
              navigate("#hero");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              minWidth: 0,
              flexShrink: 1,
            }}
          >
            <img
              src="/Logo.png"
              alt="Aura Business Solution Logo"
              style={{
                height: "32px",
                width: "auto",
                objectFit: "contain",
                flexShrink: 0
              }}
            />
            <div className="brand-text-container" style={{ display: "flex", flexDirection: "column", lineHeight: 1.1, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: F,
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}
              >
                Aura
              </span>
              <span
                className="brand-subtitle"
                style={{
                  fontFamily: F,
                  fontWeight: 500,
                  fontSize: 11,
                  background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                Business Solution
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="site-header-desktop-nav"
            style={{
              display: "none",
              alignItems: "center",
              gap: 4,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 100,
              padding: 4,
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.href);
                  }}
                  style={{
                    position: "relative",
                    padding: "8px 16px",
                    borderRadius: 100,
                    fontFamily: isUrdu ? UF : F,
                    fontSize: isUrdu ? 16 : 13,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#050505" : "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    zIndex: 1,
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 100,
                        background: LIME,
                        zIndex: -1,
                        boxShadow: "0 0 18px rgba(197,255,0,0.35)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isUrdu ? link.labelUr : link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div
            className="site-header-desktop-cta"
            style={{ display: "none", alignItems: "center", gap: 10 }}
          >
            <SiteButton
              href="tel:+923706277633"
              variant="secondary"
              className="!flex-none !px-3.5 !py-2 !text-[12px] !rounded-full"
              style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 15 : undefined }}
            >
              <Phone size={13} />
              {isUrdu ? "کال کریں" : "Call"}
            </SiteButton>
            <SiteButton
              href="#products"
              variant="primary"
              className="!flex-none !px-4 !py-2 !text-[12px] !rounded-full"
              style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 15 : undefined }}
              onClick={(e) => {
                e.preventDefault();
                navigate("#products");
              }}
            >
              {isUrdu ? "کوٹیشن حاصل کریں" : "Get a Quote"}
              <ArrowRight size={14} strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
            </SiteButton>
          </div>

          <div className="site-header-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Language Toggle */}
            <div
              onClick={toggleLanguage}
              className="language-toggle"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                padding: "2px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                cursor: "pointer",
                flexShrink: 0
              }}
            >
              <span className="lang-btn" style={{ 
                padding: "4px 8px", 
                borderRadius: 100, 
                background: !isUrdu ? LIME : "transparent",
                color: !isUrdu ? "#050505" : "rgba(255,255,255,0.7)",
                fontFamily: F, fontSize: 12, fontWeight: 600,
                transition: "all 0.2s"
              }}>Eng</span>
              <span className="lang-btn" style={{ 
                padding: "4px 8px", 
                borderRadius: 100, 
                background: isUrdu ? LIME : "transparent",
                color: isUrdu ? "#050505" : "rgba(255,255,255,0.7)",
                fontFamily: F, fontSize: 12, fontWeight: 600,
                transition: "all 0.2s"
              }}>Ur</span>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="site-header-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: "calc(72px + env(safe-area-inset-top))",
                left: 16,
                right: 16,
                zIndex: 95,
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(10,10,10,0.94)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                padding: 12,
                boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
              }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.href);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 16px",
                      borderRadius: 14,
                      marginBottom: 4,
                      fontFamily: isUrdu ? UF : F,
                      fontSize: isUrdu ? 18 : 15,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#050505" : "rgba(255,255,255,0.8)",
                      background: isActive ? LIME : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    {isUrdu ? link.labelUr : link.label}
                    <ArrowRight size={15} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
                  </motion.a>
                );
              })}
              <div className="cta-row" style={{ marginTop: 8, padding: 4, gap: 8 }}>
                <SiteButton href="tel:+923706277633" variant="secondary" style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 15 : undefined }}>
                  <Phone size={14} />
                  {isUrdu ? "کال کریں" : "Call"}
                </SiteButton>
                <SiteButton
                  href="#products"
                  variant="primary"
                  style={{ fontFamily: isUrdu ? UF : F, fontSize: isUrdu ? 15 : undefined }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("#products");
                  }}
                >
                  {isUrdu ? "کوٹیشن حاصل کریں" : "Get a Quote"}
                  <ArrowRight size={14} strokeWidth={2.5} style={{ transform: isUrdu ? "scaleX(-1)" : "none" }} />
                </SiteButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
