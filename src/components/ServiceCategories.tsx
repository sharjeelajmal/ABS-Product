"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const categories = [
  {
    id: "cat-pos",
    short: "POS",
    title: "Point of Sale (POS)",
    description:
      "Complete sales and inventory management software for retail stores, supermarkets, restaurants, pharmacies, and growing businesses.",
    includes: [
      "Inventory Management",
      "Billing & Invoicing",
      "Barcode Support",
      "Sales Reports",
      "Customer Management",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: "cat-crm",
    short: "CRM",
    title: "Customer Relationship Management (CRM)",
    description:
      "Organize leads, manage customers, track sales activities, and improve team productivity with a centralized CRM system.",
    includes: [
      "Lead Tracking",
      "Sales Pipeline",
      "Customer Database",
      "Task Management",
      "Analytics",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "cat-school",
    short: "School",
    title: "School Management System",
    description:
      "Digitize school operations and manage students, teachers, attendance, fees, examinations, and communication from one platform.",
    includes: [
      "Student Records",
      "Attendance",
      "Fee Management",
      "Results",
      "Parent Portal",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: "cat-custom",
    short: "Custom",
    title: "Custom Business Software",
    description:
      "Need a solution tailored specifically to your business? We develop custom software that matches your workflows, goals, and operational requirements.",
    includes: [
      "Custom Dashboards",
      "Workflow Automation",
      "Business Portals",
      "Reporting Systems",
      "API Integrations",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
      </svg>
    ),
  },
  {
    id: "cat-web",
    short: "Web Apps",
    title: "Web Applications",
    description:
      "Modern, fast, and scalable web applications designed to improve business processes and deliver exceptional user experiences.",
    includes: [
      "Admin Panels",
      "SaaS Platforms",
      "Business Portals",
      "Internal Tools",
      "Customer Portals",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: "cat-automation",
    short: "Automation",
    title: "Business Automation Solutions",
    description:
      "Reduce manual work and increase efficiency with intelligent automation systems built around your business processes.",
    includes: [
      "Process Automation",
      "Data Management",
      "Notifications",
      "Reporting",
      "Workflow Optimization",
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9" />
      </svg>
    ),
  },
];

function CategoryDetail({ category }: { category: (typeof categories)[0] }) {
  return (
    <div className="relative h-full flex flex-col">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[var(--primary)]/10 blur-[80px] pointer-events-none" />

      <div className="relative flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(197,255,0,0.12)]">
          {category.icon}
        </div>
        <div className="min-w-0 pt-1">
          <p className="type-label text-[var(--primary)] mb-1.5">Service Category</p>
          <h3 className="type-h3">{category.title}</h3>
        </div>
      </div>

      <p className="type-body-muted mb-6">{category.description}</p>

      <div className="mt-auto">
        <p className="type-label text-gray-500 mb-3">Includes</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {category.includes.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 border border-white/[0.06] bg-white/[0.03] type-caption text-gray-300"
            >
              <span className="w-5 h-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button className="group mt-6 relative overflow-hidden border border-[var(--primary)]/40 text-[var(--primary)] bg-[var(--primary)]/5 px-6 py-3 rounded-2xl md:rounded-full type-btn transition-all duration-300 active:scale-95 w-full sm:w-auto inline-flex items-center justify-center gap-2">
        <span className="absolute inset-0 w-0 group-hover:w-full bg-[var(--primary)] transition-all duration-[400ms] ease-out" />
        <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export function ServiceCategories() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="page-section px-4 md:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] type-eyebrow text-gray-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              Our Service Categories
            </span>
            <h2 className="type-h2 mb-3">
              Software Solutions Designed for{" "}
              <span className="text-[var(--primary)] italic">Every Stage of Business Growth</span>
            </h2>
            <p className="type-body-muted">
              From managing daily operations to improving customer relationships and streamlining
              administration, we build software that helps businesses work smarter, faster, and more efficiently.
            </p>
            <p className="type-body font-semibold text-[var(--primary)] mt-2">
              Choose the solution that fits your needs.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <div className="mobile-card md:rounded-3xl md:border md:border-[var(--glass-border)] md:bg-[#0a0a0c]/80 md:backdrop-blur-2xl overflow-hidden">
            {/* Mobile tabs */}
            <div className="md:hidden p-3 border-b border-[var(--glass-border)]">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
                {categories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => setActive(i)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl type-btn transition-all duration-300 active:scale-95 ${
                      active === i
                        ? "bg-[var(--primary)] text-black shadow-[0_0_16px_rgba(197,255,0,0.25)]"
                        : "bg-white/[0.04] text-gray-400 border border-[var(--glass-border)]"
                    }`}
                  >
                    {cat.short}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,320px)_1fr] min-h-0">
              {/* Desktop sidebar */}
              <div className="hidden lg:flex flex-col border-r border-[var(--glass-border)] p-3 gap-1">
                {categories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => setActive(i)}
                    className={`group relative flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 ${
                      active === i
                        ? "bg-[var(--primary)]/10 border border-[var(--primary)]/25"
                        : "border border-transparent hover:bg-white/[0.03] hover:border-white/[0.06]"
                    }`}
                  >
                    {active === i && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full bg-[var(--primary)] shadow-[0_0_12px_rgba(197,255,0,0.6)]" />
                    )}
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        active === i
                          ? "bg-[var(--primary)] text-black"
                          : "bg-white/[0.05] text-gray-400 group-hover:text-[var(--primary)]"
                      }`}
                    >
                      {cat.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`type-caption font-semibold block truncate ${active === i ? "text-[var(--foreground)]" : "text-gray-400 group-hover:text-gray-200"}`}>
                        {cat.short}
                      </span>
                      <span className="type-eyebrow text-gray-500 truncate block mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 transition-all duration-300 ${
                        active === i ? "text-[var(--primary)] opacity-100" : "text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Detail panel */}
              <div className="relative p-5 sm:p-7 md:p-8 lg:p-10 min-h-[420px]">
                {categories.map((cat, i) => (
                  <div
                    key={cat.id}
                    className={`transition-all duration-500 ease-out ${
                      active === i
                        ? "opacity-100 translate-y-0 relative z-10"
                        : "opacity-0 translate-y-3 absolute inset-0 p-5 sm:p-7 md:p-8 lg:p-10 pointer-events-none"
                    }`}
                    aria-hidden={active !== i}
                  >
                    <CategoryDetail category={cat} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile progress dots */}
            <div className="md:hidden flex justify-center gap-1.5 py-3 border-t border-[var(--glass-border)]">
              {categories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to category ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-6 bg-[var(--primary)]" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Quick stats strip */}
        <ScrollReveal direction="up" delay={120}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] mt-[10px]">
            {[
              { value: "6+", label: "Service Categories" },
              { value: "120+", label: "Active Clients" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="mobile-card md:rounded-2xl md:border md:border-[var(--glass-border)] md:bg-[#0c0c0e]/60 p-4 text-center"
              >
                <p className="type-h3 text-[var(--primary)] mb-1">{stat.value}</p>
                <p className="type-caption text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
