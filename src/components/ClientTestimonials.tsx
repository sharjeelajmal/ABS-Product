"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  TestimonialsColumn,
  type TestimonialItem,
} from "@/components/ui/testimonials-column";
import { scrollToHash } from "@/lib/navigation";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Happy Clients" },
  { value: "99%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

const testimonials: TestimonialItem[] = [
  {
    text: "Exactly what our business needed. The POS system made our daily operations much easier. Billing is faster and inventory is always up to date.",
    name: "Ahmed R.",
    role: "Retail Store Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    text: "Professional from start to finish. They understood our workflow before building. The final product feels modern, fast, and saves our team hours every week.",
    name: "Sarah M.",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    text: "Smooth experience and excellent support. From demo to setup, everything was handled professionally. Support responded quickly every time we needed help.",
    name: "Daniel K.",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    text: "A solution built around our needs. They customized the software to match our process instead of forcing us to change how we work. Productivity is up across the team.",
    name: "Emily T.",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    text: "Our school management went fully digital in weeks. Attendance, fees, and results are now handled in one place. Parents love the portal too.",
    name: "Hassan A.",
    role: "School Principal",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    text: "The CRM transformed how we track leads and follow-ups. Our sales team finally has one clear dashboard instead of scattered spreadsheets.",
    name: "Maria L.",
    role: "Sales Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
];

const columnOne = [testimonials[0], testimonials[3], testimonials[5]];
const columnTwo = [testimonials[1], testimonials[4], testimonials[2]];
const columnThree = [testimonials[2], testimonials[5], testimonials[0], testimonials[4]];

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-3 sm:px-6 sm:py-4 min-w-0 flex-1">
      <p className="type-h3 text-[var(--primary)] leading-none mb-1">{value}</p>
      <p className="type-eyebrow text-gray-500 text-center whitespace-nowrap">{label}</p>
    </div>
  );
}

export function ClientTestimonials() {
  return (
    <section id="testimonials" className="page-section px-4 md:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="relative overflow-hidden mobile-card md:rounded-3xl md:border md:border-[var(--glass-border)] md:bg-[#0a0a0c]/80 md:backdrop-blur-2xl">
            {/* Ambient glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-[var(--primary)]/[0.06] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--primary)]/[0.03] rounded-full blur-[80px] pointer-events-none" />

            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent" />

            {/* Stats bar */}
            <div className="relative border-b border-[var(--glass-border)] bg-white/[0.02]">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--glass-border)]">
                {stats.map((stat) => (
                  <StatPill key={stat.label} {...stat} />
                ))}
              </div>
            </div>

            <div className="relative p-5 sm:p-8 md:p-10">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/25 type-eyebrow text-[var(--primary)] mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                    Client Testimonials
                  </span>
                  <h2 className="type-h2 mb-3">
                    Trusted by Businesses{" "}
                    <span className="text-[var(--primary)] italic">Across Industries</span>
                  </h2>
                  <p className="type-body-muted">
                    Real feedback from teams who switched to smarter, faster, and more reliable software.
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 4).map((t) => (
                      <div
                        key={t.name}
                        className="w-9 h-9 rounded-full ring-2 ring-[#0a0a0c] overflow-hidden bg-[#1a1a1e]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full ring-2 ring-[#0a0a0c] bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center type-eyebrow text-[var(--primary)] font-bold">
                      +20
                    </div>
                  </div>
                  <div className="h-10 w-px bg-[var(--glass-border)] hidden sm:block" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="type-h3 text-[var(--foreground)] leading-none">4.9</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--primary)]">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="type-eyebrow text-gray-500">Average client rating</p>
                  </div>
                </div>
              </div>

              {/* Marquee frame */}
              <div className="relative rounded-2xl border border-[var(--glass-border)] bg-[#060608]/90 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,255,0,0.04),transparent_55%)] pointer-events-none" />
                <div className="absolute top-3 left-4 z-10 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/[0.06] backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="type-eyebrow text-gray-400">Live reviews</span>
                </div>

                <div className="relative h-[340px] sm:h-[360px] md:h-[380px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
                  <div className="flex justify-center gap-[10px] h-full px-2 py-3 pt-10">
                    <TestimonialsColumn
                      className="hidden md:block flex-1 max-w-[280px]"
                      testimonials={columnOne}
                      duration={18}
                    />
                    <TestimonialsColumn
                      className="flex-1 max-w-[280px]"
                      testimonials={columnTwo}
                      duration={22}
                    />
                    <TestimonialsColumn
                      className="hidden lg:block flex-1 max-w-[280px]"
                      testimonials={columnThree}
                      duration={20}
                    />
                  </div>
                </div>

                <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                  <span className="type-eyebrow text-gray-600 px-3 py-1 rounded-full bg-black/30 border border-white/[0.04] backdrop-blur-sm">
                    Hover to pause · Scroll to explore
                  </span>
                </div>
              </div>

              {/* Integrated CTA */}
              <div className="mt-[10px] relative rounded-2xl border border-[var(--glass-border)] bg-gradient-to-r from-[#0c0c0e] via-[#0a0a0c] to-[#0c0c0e] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-[var(--primary)]/60 to-transparent" />
                <div>
                  <p className="type-h3 mb-1">Ready to see it in action?</p>
                  <p className="type-caption text-gray-500">Book a free demo and discover what fits your business.</p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToHash("#contact")}
                  className="group relative shrink-0 overflow-hidden bg-[var(--primary)] text-black px-7 py-3.5 rounded-xl type-btn border border-[var(--primary)] transition-all duration-300 active:scale-[0.98] shadow-[0_0_24px_rgba(197,255,0,0.2)] hover:shadow-[0_0_36px_rgba(197,255,0,0.35)] flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span className="absolute inset-0 w-0 bg-[#111] group-hover:w-full transition-all duration-[400ms] ease-out" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-[var(--primary)] transition-colors duration-300">
                    Book a Free Demo
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
