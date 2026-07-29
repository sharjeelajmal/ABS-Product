"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { SiteButton } from "./SiteButton";

const LIME = "#C5FF00";
const F = "'Geist', system-ui, -apple-system, sans-serif";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Products", href: "#products" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
] as const;

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
              flexShrink: 0,
            }}
          >
            <motion.span
              whileHover={{ rotate: 8, scale: 1.05 }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${LIME} 0%, #A8D800 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#050505",
                fontFamily: F,
                fontWeight: 800,
                fontSize: 14,
                boxShadow: "0 0 20px rgba(197,255,0,0.35)",
                flexShrink: 0,
              }}
            >
              A
            </motion.span>
            <span
              className="site-header-brand"
              style={{
                fontFamily: F,
                fontWeight: 700,
                fontSize: 14,
                color: "#fff",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Aura Business Solution
            </span>
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
                    fontFamily: F,
                    fontSize: 13,
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
                  {link.label}
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
            >
              <Phone size={13} />
              Call
            </SiteButton>
            <SiteButton
              href="#products"
              variant="primary"
              className="!flex-none !px-4 !py-2 !text-[12px] !rounded-full"
              onClick={(e) => {
                e.preventDefault();
                navigate("#products");
              }}
            >
              Get a Quote
              <ArrowRight size={14} strokeWidth={2.5} />
            </SiteButton>
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
                      fontFamily: F,
                      fontSize: 15,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#050505" : "rgba(255,255,255,0.8)",
                      background: isActive ? LIME : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                    <ArrowRight size={15} />
                  </motion.a>
                );
              })}
              <div className="cta-row" style={{ marginTop: 8, padding: 4, gap: 8 }}>
                <SiteButton href="tel:+923706277633" variant="secondary">
                  <Phone size={14} />
                  Call
                </SiteButton>
                <SiteButton
                  href="#products"
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("#products");
                  }}
                >
                  Get a Quote
                  <ArrowRight size={14} strokeWidth={2.5} />
                </SiteButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
