"use client";

import { useState, useEffect } from "react";
import { scrollToHash, getActiveSection } from "@/lib/navigation";

const ACCENT = "#C5FF00";

const navItems = [
  {
    href: "#top",
    label: "Home",
    id: "top",
    icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "#solutions",
    label: "Solutions",
    id: "solutions",
    icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    href: "#pricing",
    label: "Pricing",
    id: "pricing",
    icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    id: "contact",
    icon: (active: boolean) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? ACCENT : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export function MobileBottomNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const update = () => setActive(getActiveSection());

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    window.addEventListener("nav:product", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("nav:product", update);
    };
  }, []);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 mobile-bottom-nav"
      aria-label="Mobile navigation"
    >
      <div className="mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] rounded-2xl border border-[var(--glass-border)] bg-[#0c0c0e]/90 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
        <ul className="grid grid-cols-4">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(item.href);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-1 transition-colors duration-200 active:scale-95 ${
                    isActive ? "text-[var(--primary)]" : "text-gray-500"
                  }`}
                >
                  {item.icon(isActive)}
                  <span className="text-[10px] font-semibold">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
