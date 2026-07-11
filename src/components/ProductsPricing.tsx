"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const plans = [
  {
    id: "pricing-pos",
    title: "Point of Sale (POS)",
    price: "$299",
    popular: false,
    perfectFor: ["Retail Stores", "Supermarkets", "Restaurants", "Pharmacies"],
    includes: [
      "Complete POS Dashboard",
      "Sales & Billing System",
      "Inventory Management",
      "Customer Management",
      "Reports & Analytics",
      "Free Installation",
      "Initial Setup Assistance",
    ],
  },
  {
    id: "pricing-crm",
    title: "Customer Relationship Management (CRM)",
    price: "$399",
    popular: true,
    perfectFor: ["Agencies", "Sales Teams", "Service Businesses", "Growing Companies"],
    includes: [
      "Lead & Customer Management",
      "Sales Pipeline",
      "Task Management",
      "Team Collaboration",
      "Reports & Insights",
      "Free Setup Support",
    ],
  },
  {
    id: "pricing-school",
    title: "School Management System",
    price: "$499",
    popular: false,
    perfectFor: ["Schools", "Colleges", "Academies", "Educational Institutes"],
    includes: [
      "Student Management",
      "Attendance System",
      "Fee Management",
      "Exam & Results",
      "Parent & Teacher Portal",
      "Installation & Training",
    ],
  },
];

const purchaseIncludes = [
  "Professional Installation",
  "Initial Configuration",
  "User Training",
  "Technical Documentation",
  "Free Post-Launch Support",
  "Future Upgrade Options",
];

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PricingButton({
  label,
  variant = "primary",
  fullWidth = true,
}: {
  label: string;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
}) {
  if (variant === "ghost") {
    return (
      <button
        className={`group relative overflow-hidden border border-[var(--primary)]/45 text-[var(--primary)] bg-[var(--primary)]/5 px-5 py-3.5 rounded-2xl type-btn transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 ${fullWidth ? "w-full" : ""}`}
      >
        <span className="absolute inset-0 w-0 group-hover:w-full bg-[var(--primary)] transition-all duration-[400ms] ease-out" />
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">{label}</span>
      </button>
    );
  }

  return (
    <button
      className={`group relative overflow-hidden bg-[var(--primary)] text-black px-5 py-3.5 rounded-2xl type-btn border border-[var(--primary)] transition-all duration-300 active:scale-[0.98] shadow-[0_0_18px_rgba(197,255,0,0.22)] hover:shadow-[0_0_28px_rgba(197,255,0,0.4)] flex items-center justify-center gap-2 ${fullWidth ? "w-full" : ""}`}
    >
      <span className="absolute inset-0 w-0 bg-[#111] group-hover:w-full transition-all duration-[400ms] ease-out" />
      <span className="relative z-10 group-hover:text-[var(--primary)] transition-colors duration-300">{label}</span>
    </button>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  return (
    <ScrollReveal direction="up" delay={index * 60}>
      <article
        className={`relative h-full flex flex-col mobile-card md:rounded-2xl md:border p-5 sm:p-6 transition-all duration-300 ${
          plan.popular
            ? "md:border-[var(--primary)]/40 md:bg-[#0c0c0e]/90 md:shadow-[0_0_40px_rgba(197,255,0,0.12)] md:scale-[1.02] md:z-10"
            : "md:border-[var(--glass-border)] md:bg-[#0c0c0e]/70"
        } md:backdrop-blur-xl`}
      >
        {plan.popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--primary)] text-black type-eyebrow font-semibold shadow-[0_0_16px_rgba(197,255,0,0.4)]">
            Most Popular
          </span>
        )}

        <div className="mb-4 pt-1">
          <h3 className="type-h3 mb-4">{plan.title}</h3>
          <p className="type-label text-gray-500 mb-1">Starting From</p>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--primary)]">{plan.price}</p>
        </div>

        <div className="mb-5">
          <p className="type-label text-gray-500 mb-2">Perfect For</p>
          <div className="flex flex-wrap gap-1.5">
            {plan.perfectFor.map((tag) => (
              <span
                key={tag}
                className="type-tag px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 mb-6">
          <p className="type-label text-gray-500 mb-3">What&apos;s Included</p>
          <ul className="space-y-2">
            {plan.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 type-caption text-gray-300">
                <span className="w-5 h-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2.5 mt-auto">
          <PricingButton label="View Demo" variant="ghost" />
          <PricingButton label="Get Started" variant="primary" />
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ProductsPricing() {
  return (
    <section id="pricing" className="page-section px-4 md:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] type-eyebrow text-gray-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              Products &amp; Pricing
            </span>
            <h2 className="type-h2 mb-3">
              Choose the Right Solution for{" "}
              <span className="text-[var(--primary)] italic">Your Business</span>
            </h2>
            <p className="type-body-muted">
              Whether you&apos;re looking for a ready-to-use business solution or a fully customized system,
              we offer flexible pricing to match your business needs. Every product is built with performance,
              reliability, and future growth in mind.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile: snap carousel */}
        <div className="md:hidden flex gap-[10px] overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide mb-[10px]">
          {plans.map((plan, index) => (
            <div key={plan.id} className="snap-center shrink-0 w-[88vw] max-w-[340px]">
              <PricingCard plan={plan} index={index} />
            </div>
          ))}
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-[10px] items-stretch mb-[10px]">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Custom solution */}
        <ScrollReveal direction="up" delay={100}>
          <article className="mobile-card md:rounded-3xl md:border md:border-[var(--glass-border)] md:bg-[#0a0a0c]/80 md:backdrop-blur-2xl p-5 sm:p-8 md:p-10 mb-[10px] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--primary)]/8 blur-[90px] pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <span className="inline-block type-label text-[var(--primary)] mb-3">Custom Solution</span>
                <h3 className="type-h2 mb-3">Need a Custom Solution?</h3>
                <p className="type-body-muted">
                  Every business has unique requirements. If our ready-made products don&apos;t perfectly match
                  your workflow, we&apos;ll build a custom solution tailored specifically to your business.
                </p>
                <div className="mt-6">
                  <p className="type-label text-gray-500 mb-1">Price</p>
                  <p className="text-3xl sm:text-4xl font-bold text-[var(--primary)]">Custom Quote</p>
                </div>
              </div>

              <div>
                <p className="type-label text-gray-500 mb-3">What&apos;s Included</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {[
                    "Custom Features",
                    "Modern UI/UX",
                    "Scalable Architecture",
                    "Ongoing Support",
                    "Future Enhancements",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 type-caption text-gray-300 rounded-xl px-3 py-2.5 border border-white/[0.05] bg-white/[0.02]">
                      <span className="w-5 h-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <PricingButton label="Request a Quote" variant="primary" fullWidth />
                  <PricingButton label="Schedule a Free Consultation" variant="ghost" fullWidth />
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* Every purchase includes */}
        <ScrollReveal direction="up" delay={140}>
          <div className="mobile-card md:rounded-2xl md:border md:border-[var(--glass-border)] md:bg-[#0c0c0e]/60 md:backdrop-blur-xl p-5 sm:p-7">
            <h3 className="type-h3 text-center mb-5">Every Purchase Includes</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {purchaseIncludes.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 type-caption text-gray-300 rounded-xl px-4 py-3 border border-white/[0.05] bg-white/[0.02]"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="w-6 h-6 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
