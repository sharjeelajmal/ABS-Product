"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const ACCENT = "#C5FF00";

const products = [
  {
    id: "pos",
    tab: "POS",
    badge: "Retail & Commerce",
    title: "Point of Sale (POS)",
    description:
      "Manage sales, inventory, customers, billing, and reports from one powerful dashboard. Perfect for retail stores, supermarkets, restaurants, pharmacies, and other growing businesses.",
    features: [
      "Smart Billing & Invoicing",
      "Inventory Management",
      "Barcode Support",
      "Sales & Profit Reports",
      "Customer Management",
      "Staff & Role Management",
    ],
    cta: "Explore POS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: "crm",
    tab: "CRM",
    badge: "Sales & Growth",
    title: "Customer Relationship Management (CRM)",
    description:
      "Keep your leads, customers, sales pipeline, and team organized in one place. Never miss a follow-up and build stronger customer relationships.",
    features: [
      "Lead Management",
      "Customer Database",
      "Sales Pipeline",
      "Task & Follow-up Tracking",
      "Team Collaboration",
      "Analytics & Reports",
    ],
    cta: "Explore CRM",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "school",
    tab: "School",
    badge: "Education",
    title: "School Management System",
    description:
      "A complete digital solution for schools, colleges, and educational institutions to manage students, teachers, attendance, fees, examinations, and more.",
    features: [
      "Student Management",
      "Attendance Tracking",
      "Fee Management",
      "Exam & Result Management",
      "Parent Portal",
      "Teacher Dashboard",
    ],
    cta: "Explore School Management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

function ActionButton({
  label,
  variant = "primary",
}: {
  label: string;
  variant?: "primary" | "ghost";
}) {
  if (variant === "ghost") {
    return (
      <button className="group relative overflow-hidden border border-[var(--primary)]/50 text-[var(--primary)] bg-[var(--primary)]/5 px-7 py-3.5 rounded-2xl md:rounded-full type-btn transition-all duration-300 active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2">
        <span className="absolute inset-0 w-0 group-hover:w-full bg-[var(--primary)] transition-all duration-[400ms] ease-out" />
        <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
          {label}
          <ArrowIcon />
        </span>
      </button>
    );
  }

  return (
    <button className="group relative overflow-hidden bg-[var(--primary)] text-black px-7 py-3.5 rounded-2xl md:rounded-full type-btn border border-[var(--primary)] transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(197,255,0,0.25)] hover:shadow-[0_0_32px_rgba(197,255,0,0.45)] w-full sm:w-auto flex items-center justify-center gap-2">
      <span className="absolute inset-0 w-0 bg-[#111] group-hover:w-full transition-all duration-[400ms] ease-out" />
      <span className="relative z-10 flex items-center gap-2 group-hover:text-[var(--primary)] transition-colors duration-300">
        {label}
        <ArrowIcon />
      </span>
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ProductPanel({
  product,
  isActive,
}: {
  product: (typeof products)[0];
  isActive: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start lg:items-center transition-all duration-500 ${
        isActive
          ? "opacity-100 translate-y-0 relative z-10"
          : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
      }`}
      aria-hidden={!isActive}
    >
      <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
        <span className="inline-block type-label text-[var(--primary)] px-3 py-1 rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/10">
          {product.badge}
        </span>

        <h3 className="type-h3">{product.title}</h3>

        <p className="type-body-muted">{product.description}</p>

        <div>
          <p className="type-label text-gray-400 mb-3">Key Features</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 type-caption text-gray-400 rounded-xl px-3 py-2.5 border border-white/[0.04] bg-white/[0.02]"
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-[var(--primary)]/15 text-[var(--primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <ActionButton label={product.cta} variant="ghost" />
      </div>

      <div className="relative order-1 lg:order-2">
        <div
          className="absolute -inset-3 rounded-3xl blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
        />
        <div className="relative rounded-2xl border border-[var(--glass-border)] bg-[#0c0c0e]/80 backdrop-blur-xl p-4 sm:p-7 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent" />

          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)]">
                {product.icon}
              </div>
              <div>
                <p className="type-label text-gray-500">Live Preview</p>
                <p className="type-caption font-semibold text-[var(--foreground)]">{product.tab} Dashboard</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {[68, 42, 55].map((v, i) => (
              <div key={i} className="rounded-lg p-2.5 sm:p-3 border border-white/5 bg-white/[0.03]">
                <div className="h-1.5 w-8 sm:w-10 rounded-full mb-2 bg-[var(--primary)]/40" />
                <p className={`type-h3 ${i === 0 ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`}>
                  {v}{i === 0 ? "%" : i === 1 ? "K" : "+"}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {[88, 70, 52, 36].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--primary)] transition-all duration-1000 ease-out"
                  style={{ width: `${w}%`, opacity: i === 0 ? 1 : i === 1 ? 0.65 : 0.35 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SoftwareSolutions() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const applyHash = (hash: string) => {
      const id = hash.replace("#", "");
      const index = products.findIndex((p) => p.id === id);
      if (index >= 0) setActive(index);
    };

    applyHash(window.location.hash);

    const onHashChange = () => applyHash(window.location.hash);
    const onNavProduct = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const index = products.findIndex((p) => p.id === id);
      if (index >= 0) setActive(index);
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("nav:product", onNavProduct);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("nav:product", onNavProduct);
    };
  }, []);

  return (
    <section id="solutions" className="page-section px-4 md:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="mobile-card md:mobile-card-none text-center max-w-3xl mx-auto mb-6 sm:mb-10 p-5 md:p-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] type-eyebrow text-gray-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              Our Software Solutions
            </span>
            <h2 className="type-h2 mb-4">
              Powerful Software Built for{" "}
              <span className="text-[var(--primary)] italic">Modern Businesses</span>
            </h2>
            <p className="type-body-muted">
              Every business has different challenges, and using the right software can make all the difference.
              We develop modern, scalable, and easy-to-use business solutions that help you save time, improve
              productivity, and grow with confidence.
            </p>
            <p className="type-body-subtle mt-2">
              Whether you&apos;re managing a retail store, running a company, or operating an educational institution,
              our software is designed to simplify your daily operations.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <div className="mobile-card md:rounded-3xl md:border md:border-[var(--glass-border)] md:bg-[#0a0a0c]/70 md:backdrop-blur-xl p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 mb-6 sm:mb-8">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  id={product.id}
                  onClick={() => {
                    setActive(index);
                    window.history.replaceState(null, "", `#${product.id}`);
                  }}
                  className={`scroll-mt-28 px-3 sm:px-7 py-3 sm:py-3 rounded-xl sm:rounded-full type-btn transition-all duration-300 active:scale-95 ${
                    active === index
                      ? "text-black bg-[var(--primary)] shadow-[0_0_20px_rgba(197,255,0,0.3)]"
                      : "text-gray-400 border border-[var(--glass-border)] bg-white/[0.02] hover:text-white hover:border-white/15"
                  }`}
                >
                  {product.tab}
                </button>
              ))}
            </div>

            <div className="relative min-h-[640px] sm:min-h-[520px] lg:min-h-[420px]">
              {products.map((product, index) => (
                <ProductPanel key={product.id} product={product} isActive={active === index} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Custom Solutions — temporarily hidden
        <ScrollReveal direction="up" delay={120} className="mt-4 sm:mt-10">
          <div className="mobile-card md:rounded-2xl md:border md:border-[var(--glass-border)] md:bg-[#0a0a0c]/60 md:backdrop-blur-xl p-6 sm:p-10 text-center">
            <span className="inline-block type-label text-[var(--primary)] mb-3">
              Custom Solutions
            </span>
            <h3 className="type-h2 mb-3">Need Something Custom?</h3>
            <p className="type-body-muted max-w-xl mx-auto mb-2">
              Every business is unique, and sometimes off-the-shelf software isn&apos;t enough.
            </p>
            <p className="type-body-subtle max-w-xl mx-auto mb-6">
              If you have a specific idea or workflow in mind, we&apos;ll build a custom solution tailored to your
              business needs—designed to scale as your business grows.
            </p>
            <div className="flex justify-center">
              <ActionButton label="Discuss Your Project" variant="primary" />
            </div>
          </div>
        </ScrollReveal>
        */}
      </div>
    </section>
  );
}
