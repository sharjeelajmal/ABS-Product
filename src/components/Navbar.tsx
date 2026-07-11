"use client";

import { useState, useEffect, useCallback } from "react";
import { NAV_LINKS, MOBILE_NAV, scrollToHash } from "@/lib/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const linkBase =
  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";
const linkActive = "text-black bg-[var(--primary)] font-semibold shadow-[0_0_16px_rgba(197,255,0,0.35)]";
const linkInactive = "text-gray-400 hover:text-[var(--foreground)] hover:bg-white/[0.06]";

function NavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToHash(href);
        onNavigate?.();
      }}
      className={`${linkBase} ${active ? linkActive : linkInactive}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </a>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy();

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const isActive = (id: string) => activeSection === id;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 md:px-6 pt-[env(safe-area-inset-top)]">
        <div
          className={`mx-auto flex justify-between items-center transition-all duration-300 px-4 md:px-8 ${
            scrolled
              ? "md:mt-4 h-14 md:h-16 md:max-w-6xl md:rounded-2xl md:border md:border-[var(--glass-border)] md:bg-[var(--glass-bg)]/85 md:backdrop-blur-2xl md:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              : "h-14 md:h-20 md:max-w-6xl md:rounded-2xl md:bg-transparent"
          } mobile-nav-bar md:mt-4`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#top");
              closeMenu();
            }}
            className="text-base md:text-xl font-bold tracking-tight flex items-center gap-2.5 md:gap-3 group min-w-0"
          >
            <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#90c200] flex items-center justify-center text-black font-bold shrink-0 shadow-[0_0_15px_rgba(197,255,0,0.3)] group-active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>
            </span>
            <span className="truncate text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-[var(--foreground)] to-gray-400">
              Aura Business Solution
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-[var(--glass-bg)]/40 border border-[var(--glass-border)] rounded-full px-2 py-1.5 backdrop-blur-md">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.id}
                href={item.href}
                label={item.label}
                active={isActive(item.id)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[var(--foreground)] p-2.5 rounded-xl bg-white/[0.04] border border-[var(--glass-border)] active:scale-95 transition-transform"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            )}
          </button>
        </div>
      </nav>

      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMenu} aria-hidden />
        <div className={`absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom))] inset-x-3 transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[#0c0c0e]/95 backdrop-blur-3xl p-3 flex flex-col gap-1 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            {MOBILE_NAV.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(item.href);
                  closeMenu();
                }}
                className={`font-medium p-3.5 rounded-xl transition-all duration-200 flex items-center justify-between active:scale-[0.98] ${
                  isActive(item.id)
                    ? "text-black bg-[var(--primary)] font-semibold"
                    : "text-gray-300 hover:text-[var(--primary)] hover:bg-white/[0.04]"
                }`}
                aria-current={isActive(item.id) ? "page" : undefined}
              >
                {item.label}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
